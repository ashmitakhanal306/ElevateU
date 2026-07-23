import React, { useState, useRef, useEffect } from 'react';
import SEO from '../components/SEO';
import { 
  UploadCloud, FileText, X, AlertCircle, CheckCircle2, 
  Info, AlertTriangle, RefreshCcw 
} from 'lucide-react';
import { analyzeResume } from '../services/resumeService';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Input from '../components/ui/Input';

// ─── Score Ring Component ─────────────────────────────────────────────────────

function ScoreRing({ value, size = 120, stroke = 12 }) {
  const [fill, setFill] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setFill(value), 100);
    return () => clearTimeout(t);
  }, [value]);

  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (fill / 100) * circumference;

  let colorClass = 'stroke-danger';
  if (value >= 80) colorClass = 'stroke-success';
  else if (value >= 60) colorClass = 'stroke-warning';

  return (<div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="-rotate-90" aria-hidden="true">
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none"
          stroke="var(--color-border)"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none"
          className={colorClass}
          strokeWidth={stroke}
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 1s ease-out' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-black text-text-primary leading-none">{value}</span>
      </div>
    </div>
  );
}

// ─── Progress Bar Component ───────────────────────────────────────────────────

function ProgressBar({ label, value }) {
  let colorClass = 'bg-danger';
  if (value >= 80) colorClass = 'bg-success';
  else if (value >= 60) colorClass = 'bg-warning';

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-xs font-semibold">
        <span className="text-text-primary uppercase tracking-wide">{label}</span>
        <span className="text-text-secondary">{value}/100</span>
      </div>
      <div className="h-2.5 w-full bg-border rounded-full overflow-hidden">
        <div 
          className={`h-full ${colorClass} rounded-full transition-all duration-1000 ease-out`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ResumeAnalysis() {
  const fileInputRef = useRef(null);
  
  // States: 'idle' -> 'uploading' -> 'analyzing' -> 'results'
  const [status, setStatus] = useState('idle');
  
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  
  // Fake progress bar for the analyzing state (0-100%)
  const [progress, setProgress] = useState(0);
  
  // Results data
  const [report, setReport] = useState(null);

  // ─── File Validation ────────────────────────────────────────────────────────

  const validateFile = (f) => {
    setError('');
    
    // Check type
    const validTypes = [
      'application/pdf', 
      'application/msword', 
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];
    if (!validTypes.includes(f.type) && !f.name.match(/\.(pdf|doc|docx)$/i)) {
      setError('Invalid file type. Please upload a .pdf, .doc, or .docx file.');
      return false;
    }
    
    // Check size (Max 5MB)
    const maxSize = 5 * 1024 * 1024;
    if (f.size > maxSize) {
      setError('File is too large. Maximum size allowed is 5MB.');
      return false;
    }
    
    return true;
  };

  const handleFileChange = (e) => {
    const f = e.target.files[0];
    if (f && validateFile(f)) {
      setFile(f);
      setStatus('uploading');
    }
    // Reset input so the same file can be selected again if removed
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const f = e.dataTransfer.files[0];
    if (f && validateFile(f)) {
      setFile(f);
      setStatus('uploading');
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault(); // necessary to allow dropping
  };

  const removeFile = () => {
    setFile(null);
    setStatus('idle');
    setError('');
  };

  // ─── Analysis Flow ──────────────────────────────────────────────────────────

  const startAnalysis = async () => {
    setStatus('analyzing');
    setProgress(0);
    
    // Simulate a slow-filling progress bar for 1.5s
    let p = 0;
    const interval = setInterval(() => {
      p += 10;
      if (p <= 90) setProgress(p);
    }, 150);

    try {
      const data = await analyzeResume(file);
      clearInterval(interval);
      setProgress(100);
      
      // Give the progress bar 300ms to hit 100% visually before switching views
      setTimeout(() => {
        setReport(data);
        setStatus('results');
      }, 300);
    } catch (err) {
      clearInterval(interval);
      setError('An error occurred during analysis.');
      setStatus('uploading');
    }
  };

  const resetFlow = () => {
    setFile(null);
    setReport(null);
    setStatus('idle');
    setError('');
  };

  // ─── Format Bytes ───────────────────────────────────────────────────────────
  const formatBytes = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // ─── Render Functions ───────────────────────────────────────────────────────

  // Group issues by severity and sort High -> Medium -> Low
  const renderIssues = (issues) => {
    const sorted = [...issues].sort((a, b) => {
      const w = { high: 3, medium: 2, low: 1 };
      return w[b.severity] - w[a.severity];
    });

    return sorted.map((issue, idx) => {
      let Icon = Info;
      let color = 'text-info';
      
      if (issue.severity === 'high') {
        Icon = AlertCircle;
        color = 'text-danger';
      } else if (issue.severity === 'medium') {
        Icon = AlertTriangle;
        color = 'text-warning';
      }

      return (
        <div key={idx} className="flex gap-3 items-start p-3 bg-bg-page border border-border rounded-lg">
          <Icon className={`h-5 w-5 mt-0.5 shrink-0 ${color}`} />
          <div>
            <Badge variant={issue.severity === 'high' ? 'danger' : issue.severity === 'medium' ? 'warning' : 'info'} className="mb-1 text-[10px] px-1.5 py-0.5">
              {issue.severity} priority
            </Badge>
            <p className="text-sm text-text-primary font-medium">{issue.message}</p>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="space-y-6 pt-4 max-w-5xl mx-auto">
      <SEO title="Resume Analysis" noIndex={true} />
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-text-primary">
          Resume Analysis
        </h1>
        <p className="text-sm text-text-secondary mt-1">
          Upload your resume to get an AI-powered ATS score and actionable feedback.
        </p>
      </div>

      {/* ─── STATE: IDLE & UPLOADING ───────────────────────────────────────── */}
      {(status === 'idle' || status === 'uploading') && (
        <Card className="max-w-2xl mx-auto mt-8">
          
          {/* Drag & Drop Zone */}
          {status === 'idle' && (
            <div 
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              className="p-12 flex flex-col items-center justify-center text-center border-2 border-dashed border-border rounded-xl bg-bg-page/50 hover:bg-bg-page transition-colors duration-200"
            >
              <div className="h-16 w-16 bg-secondary/10 rounded-full flex items-center justify-center mb-6">
                <UploadCloud className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-lg font-bold text-text-primary mb-2">
                Drag and drop your resume here
              </h3>
              <p className="text-sm text-text-secondary mb-6">
                Supports .pdf, .doc, and .docx (Max 5MB)
              </p>
              
              <Input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" 
                className="hidden" 
              />
              <Button variant="primary" onClick={() => fileInputRef.current?.click()}>
                Browse files
              </Button>

              {error && (
                <p className="text-danger text-sm font-medium mt-4 flex items-center gap-1.5">
                  <AlertCircle className="h-4 w-4" /> {error}
                </p>
              )}
              
              {/* DEBUG BUTTON FOR E2E TESTING */}
              <Button 
                id="e2e-test-upload" 
                className="opacity-0 absolute top-0 left-0"
                onClick={() => {
                  const f = new File(["dummy content"], "Aditi_Resume.pdf", { type: "application/pdf" });
                  setFile(f);
                  setStatus('uploading');
                }}
              >
                Test Upload
              </Button>
            </div>
          )}

          {/* Selected File View */}
          {status === 'uploading' && file && (
            <div className="p-8 space-y-6">
              <h3 className="text-lg font-bold text-text-primary border-b border-border pb-4">
                Selected File
              </h3>
              <div className="flex items-center justify-between p-4 border border-border bg-bg-page rounded-xl">
                <div className="flex items-center gap-4 overflow-hidden">
                  <div className="p-3 bg-secondary/10 rounded-lg shrink-0">
                    <FileText className="h-6 w-6 text-secondary" />
                  </div>
                  <div className="truncate">
                    <p className="font-semibold text-text-primary truncate">{file.name}</p>
                    <p className="text-xs text-text-secondary">{formatBytes(file.size)}</p>
                  </div>
                </div>
                <Button 
                  variant="ghost"
                  size="sm"
                  onClick={removeFile}
                  className="p-2 hover:bg-danger/10 hover:text-danger text-text-secondary rounded-lg transition-colors shrink-0 h-auto"
                  title="Remove file"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {error && (
                <p className="text-danger text-sm font-medium mt-4 flex items-center gap-1.5">
                  <AlertCircle className="h-4 w-4" /> {error}
                </p>
              )}

              <div className="flex justify-end pt-4 border-t border-border">
                <Button variant="primary" onClick={startAnalysis}>
                  Analyze Resume
                </Button>
              </div>
            </div>
          )}

        </Card>
      )}

      {/* ─── STATE: ANALYZING ────────────────────────────────────────────── */}
      {status === 'analyzing' && (
        <Card className="max-w-xl mx-auto mt-16 p-12 text-center space-y-8 border-t-4 border-t-secondary">
          <div className="relative mx-auto w-20 h-20">
            <div className="absolute inset-0 border-4 border-border rounded-full" />
            <div className="absolute inset-0 border-4 border-secondary border-t-transparent rounded-full animate-spin" />
            <FileText className="h-8 w-8 text-secondary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-text-primary mb-2">
              Analyzing your resume...
            </h3>
            <p className="text-sm text-text-secondary mb-6">
              Scanning formatting, keywords, and ATS readability.
            </p>
            <div className="h-2 w-full bg-border rounded-full overflow-hidden">
              <div 
                className="h-full bg-secondary rounded-full transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </Card>
      )}

      {/* ─── STATE: RESULTS ──────────────────────────────────────────────── */}
      {status === 'results' && report && (
        <div className="space-y-6">
          
          {/* Top Row: Score & Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* ATS Score */}
            <Card className="p-6 col-span-1 flex flex-col items-center justify-center text-center">
              <h3 className="font-bold text-sm text-text-secondary uppercase tracking-wide mb-6">
                ATS Compatibility
              </h3>
              <ScoreRing value={report.atsScore} />
              <p className="text-sm text-text-secondary font-medium mt-4">
                Out of 100
              </p>
            </Card>

            {/* Score Breakdown */}
            <Card className="p-6 col-span-1 md:col-span-2">
              <h3 className="font-bold text-sm text-text-secondary uppercase tracking-wide mb-6">
                Score Breakdown
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-6">
                <ProgressBar label="Formatting" value={report.scoreBreakdown.formatting} />
                <ProgressBar label="Keywords" value={report.scoreBreakdown.keywords} />
                <ProgressBar label="Readability" value={report.scoreBreakdown.readability} />
                <ProgressBar label="Length" value={report.scoreBreakdown.length} />
              </div>
            </Card>
          </div>

          {/* Bottom Grid: Insights */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Strengths */}
            <Card className="p-6">
              <h3 className="flex items-center gap-2 font-bold text-lg text-text-primary mb-5">
                <CheckCircle2 className="h-5 w-5 text-success" />
                Strengths
              </h3>
              <ul className="space-y-3">
                {report.strengths.map((s, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-text-primary">
                    <CheckCircle2 className="h-4 w-4 text-success shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{s}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Issues to fix */}
            <Card className="p-6">
              <h3 className="flex items-center gap-2 font-bold text-lg text-text-primary mb-5">
                <AlertTriangle className="h-5 w-5 text-warning" />
                Issues to fix
              </h3>
              <div className="space-y-3">
                {renderIssues(report.issues)}
              </div>
            </Card>

            {/* Missing Keywords */}
            <Card className="p-6">
              <h3 className="font-bold text-lg text-text-primary mb-5">
                Missing Keywords
              </h3>
              <p className="text-sm text-text-secondary mb-4">
                These keywords are commonly required for your target roles but are missing from your resume.
              </p>
              <div className="flex flex-wrap gap-2">
                {report.missingKeywords.map(kw => (
                  <Badge key={kw} variant="warning" className="text-xs px-2.5 py-1.5 shadow-sm">
                    {kw}
                  </Badge>
                ))}
              </div>
            </Card>

            {/* Suggestions */}
            <Card className="p-6">
              <h3 className="font-bold text-lg text-text-primary mb-5">
                Actionable Suggestions
              </h3>
              <ol className="space-y-4 list-decimal list-inside">
                {report.suggestions.map((s, i) => (
                  <li key={i} className="text-sm text-text-primary leading-relaxed marker:font-bold marker:text-text-secondary">
                    {s}
                  </li>
                ))}
              </ol>
            </Card>

          </div>

          {/* Reset Action */}
          <div className="flex justify-center pt-8 pb-4">
            <Button variant="outline" onClick={resetFlow} className="gap-2">
              <RefreshCcw className="h-4 w-4" /> Analyze another resume
            </Button>
          </div>

        </div>
      )}

    </div>
  );
}
