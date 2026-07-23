import React from 'react';
import SEO from '../components/SEO';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import { CheckCircle2, XCircle, ArrowRight, ArrowLeft } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';

/**
 * Animated SVG Circular Progress Ring.
 * Reused styling concept from the Dashboard.
 */
function CircularScoreRing({ value, size = 160, stroke = 12 }) {
  const [fill, setFill] = React.useState(0);
  React.useEffect(() => {
    const t = setTimeout(() => setFill(value), 100);
    return () => clearTimeout(t);
  }, [value]);

  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (fill / 100) * circumference;

  let colorClass = 'stroke-secondary';
  if (value >= 80) colorClass = 'stroke-success';
  else if (value < 50) colorClass = 'stroke-warning';

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
          style={{ transition: 'stroke-dashoffset 1.2s cubic-bezier(0.4, 0, 0.2, 1)' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-4xl font-black text-text-primary leading-none">{value}%</span>
        <span className="text-xs font-semibold text-text-secondary mt-1 uppercase tracking-wide">
          Score
        </span>
      </div>
    </div>
  );
}

export default function AssessmentResults() {
  const location = useLocation();
  const navigate = useNavigate();

  // Result and assessment details are passed via router state
  const { result, assessment } = location.state || {};

  // If accessed directly without completing an assessment, redirect back
  if (!result || !assessment) {
    return <Navigate to="/assessment" replace />;
  }

  const { score, correctCount, totalQuestions, skillLevel, breakdown } = result;

  const levelVariant = 
    skillLevel === 'Advanced' ? 'success' :
    skillLevel === 'Intermediate' ? 'warning' : 'info';

  return (
    <div className="max-w-2xl mx-auto space-y-6 pt-4">
      <SEO title="Assessment Results" noIndex={true} />
      
      {/* Header Info */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Assessment Complete</h1>
        <p className="text-text-secondary">{assessment.title}</p>
      </div>

      <Card className="p-8 flex flex-col items-center justify-center text-center space-y-6">
        
        {/* Score Ring */}
        <CircularScoreRing value={score} />

        {/* Summary text */}
        <div className="space-y-3">
          <p className="text-text-secondary text-sm">
            You answered <strong className="text-text-primary">{correctCount}</strong> out of <strong className="text-text-primary">{totalQuestions}</strong> questions correctly.
          </p>
          <div className="flex items-center justify-center gap-2">
            <span className="text-sm font-semibold text-text-secondary uppercase tracking-wide">
              Skill Level:
            </span>
            <Badge variant={levelVariant} className="px-3 py-1 text-sm">
              {skillLevel}
            </Badge>
          </div>
        </div>

      </Card>

      {/* Breakdown */}
      <Card className="p-6">
        <h3 className="font-bold text-lg mb-4">Question Breakdown</h3>
        <div className="space-y-3">
          {breakdown.map((item, idx) => (
            <div key={item.questionId} className="flex items-start gap-3 p-3 rounded-xl bg-bg-page border border-border">
              <div className="shrink-0 mt-0.5">
                {item.correct ? (
                  <CheckCircle2 className="h-5 w-5 text-success" />
                ) : (
                  <XCircle className="h-5 w-5 text-danger" />
                )}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-text-primary">
                  <span className="text-text-secondary mr-2">{idx + 1}.</span>
                  {item.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 pt-4">
        <Button 
          variant="outline" 
          className="flex-1 gap-2"
          onClick={() => navigate('/assessment')}
        >
          <ArrowLeft className="h-4 w-4" /> Back to assessments
        </Button>
        <Button 
          variant="primary" 
          className="flex-1 gap-2"
          onClick={() => navigate('/career-recommendations')}
        >
          View career matches <ArrowRight className="h-4 w-4" />
        </Button>
      </div>

    </div>
  );
}
