import React from 'react';
import SEO from '../components/SEO';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import { CheckCircle2, XCircle, ArrowRight, ArrowLeft } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import PageHeader from '../components/ui/PageHeader';

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

  let colorClass = 'bg-secondary';
  if (score >= 80) colorClass = 'bg-success';
  else if (score < 50) colorClass = 'bg-warning';

  return (
    <div className="max-w-2xl mx-auto space-y-6 pt-4">
      <SEO title="Assessment Results" noIndex={true} />
      
      <PageHeader 
        title="Assessment Complete"
        description={assessment.title}
      />

      <Card className="p-8 flex flex-col items-center justify-center text-center space-y-8">
        
        {/* Score Progress Bar */}
        <div className="w-full max-w-md space-y-3">
          <div className="flex justify-between items-baseline text-sm font-bold uppercase tracking-wide text-text-secondary">
            <span>Score</span>
            <span className={`text-3xl ${colorClass.replace('bg-', 'text-')}`}>{score}%</span>
          </div>
          <div className="h-4 w-full bg-border rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all duration-1000 ease-out ${colorClass}`}
              style={{ width: `${score}%` }}
            />
          </div>
        </div>

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
