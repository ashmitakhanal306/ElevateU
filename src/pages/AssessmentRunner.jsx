import React, { useState, useEffect, useCallback } from 'react';
import SEO from '../components/SEO';
import { useParams, useNavigate } from 'react-router-dom';
import { Clock, ArrowRight, ArrowLeft } from 'lucide-react';
import { getAssessmentById, submitAssessment } from '../services/assessmentService';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

export default function AssessmentRunner() {
  const { assessmentId } = useParams();
  const navigate = useNavigate();
  
  const [assessment, setAssessment] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({}); // questionId -> selectedIndex
  const [timeLeft, setTimeLeft] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch assessment & restore in-progress answers from sessionStorage if present
  useEffect(() => {
    getAssessmentById(assessmentId)
      .then((data) => {
        setAssessment(data);

        let initialIndex = 0;
        let initialAnswers = {};
        let initialTime = data.durationMinutes * 60;

        // Restore saved progress from sessionStorage (scoped to assessmentId)
        try {
          const savedProgressRaw = sessionStorage.getItem(`assessment_progress_${assessmentId}`);
          if (savedProgressRaw) {
            const savedProgress = JSON.parse(savedProgressRaw);
            if (savedProgress) {
              if (typeof savedProgress.currentQuestionIndex === 'number' && savedProgress.currentQuestionIndex < data.questions.length) {
                initialIndex = savedProgress.currentQuestionIndex;
              }
              if (savedProgress.answers && typeof savedProgress.answers === 'object') {
                initialAnswers = savedProgress.answers;
              }
              if (typeof savedProgress.timeRemaining === 'number' && savedProgress.timeRemaining > 0) {
                initialTime = savedProgress.timeRemaining;
              }
            }
          }
        } catch (err) {
          console.warn('Failed to read assessment progress from sessionStorage:', err);
        }

        setCurrentIndex(initialIndex);
        setAnswers(initialAnswers);
        setTimeLeft(initialTime);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        navigate('/assessment'); // redirect on error
      });
  }, [assessmentId, navigate]);

  // Submit handler
  const handleSubmit = useCallback(async () => {
    if (!assessment || isSubmitting) return;
    setIsSubmitting(true);
    try {
      const result = await submitAssessment(assessmentId, answers);
      
      // Clear saved progress upon successful submission so completed assessments don't leave stale data
      try {
        sessionStorage.removeItem(`assessment_progress_${assessmentId}`);
      } catch (err) {
        console.warn('Failed to clear assessment progress from sessionStorage:', err);
      }

      // Navigate to results page with result data in state
      navigate(`/assessment/${assessmentId}/results`, { state: { result, assessment } });
    } catch (err) {
      console.error(err);
      setIsSubmitting(false);
    }
  }, [assessment, isSubmitting, assessmentId, answers, navigate]);

  // Autosave progress to sessionStorage whenever state changes (question, answers, time)
  useEffect(() => {
    if (loading || isSubmitting || !assessment) return;

    try {
      const progressData = {
        currentQuestionIndex: currentIndex,
        answers,
        timeRemaining: timeLeft,
      };
      sessionStorage.setItem(`assessment_progress_${assessmentId}`, JSON.stringify(progressData));
    } catch (err) {
      console.warn('Failed to save assessment progress to sessionStorage:', err);
    }
  }, [currentIndex, answers, timeLeft, loading, isSubmitting, assessment, assessmentId]);

  // Timer logic
  useEffect(() => {
    if (loading || isSubmitting || !assessment) return;
    
    if (timeLeft <= 0) {
      handleSubmit();
      return;
    }
    
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    
    return () => clearInterval(timer);
  }, [loading, isSubmitting, assessment, timeLeft, handleSubmit]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin h-8 w-8 border-4 border-secondary border-t-transparent rounded-full" />
      </div>
    );
  }

  const currentQuestion = assessment.questions[currentIndex];
  const totalQuestions = assessment.questions.length;
  const progressPercent = ((currentIndex + 1) / totalQuestions) * 100;

  // Format time (MM:SS)
  const m = Math.floor(timeLeft / 60).toString().padStart(2, '0');
  const s = (timeLeft % 60).toString().padStart(2, '0');

  const handleSelect = (idx) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: idx
    }));
  };

  const hasAnsweredCurrent = answers[currentQuestion.id] !== undefined;
  const isLastQuestion = currentIndex === totalQuestions - 1;

  return (
    <div className="max-w-3xl mx-auto space-y-6 pt-4">
      <SEO title="Skill Assessment" noIndex={true} />
      
      {/* Header: Title, Autosave Note & Timer */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-bg-surface p-4 rounded-xl border border-border shadow-sm">
        <div>
          <h1 className="font-bold text-lg text-text-primary">{assessment.title}</h1>
          <p className="text-xs text-text-secondary flex items-center gap-1.5 mt-0.5 font-medium">
            <span className="h-1.5 w-1.5 rounded-full bg-success inline-block shrink-0" />
            Your progress is saved automatically
          </p>
        </div>
        <div className={`flex items-center gap-2 font-mono font-bold text-lg px-3 py-1.5 rounded-lg border self-start sm:self-auto ${
          timeLeft < 60 ? 'bg-danger/10 text-danger border-danger/20' : 'bg-secondary/10 text-secondary border-secondary/20'
        }`}>
          <Clock className="h-5 w-5" />
          {m}:{s}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs font-bold text-text-secondary uppercase tracking-wide">
          <span>Question {currentIndex + 1} of {totalQuestions}</span>
          <span>{Math.round(progressPercent)}%</span>
        </div>
        <div className="h-2 w-full bg-border rounded-full overflow-hidden">
          <div 
            className="h-full bg-secondary transition-all duration-300 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <Card className="p-6 sm:p-8 space-y-6">
        <h2 className="text-xl font-bold text-text-primary leading-snug">
          {currentQuestion.text}
        </h2>
        
        <div className="space-y-3">
          {currentQuestion.options.map((opt, idx) => {
            const isSelected = answers[currentQuestion.id] === idx;
            return (
              <Button
                key={idx}
                variant="outline"
                onClick={() => handleSelect(idx)}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 h-auto font-normal active:scale-100 ${
                  isSelected 
                    ? 'border-secondary bg-secondary/5 shadow-sm' 
                    : 'border-border bg-bg-page hover:border-secondary/40'
                }`}
              >
                <div className="flex items-center gap-3">
                  {/* Custom radio button */}
                  <div className={`h-5 w-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                    isSelected ? 'border-secondary' : 'border-text-secondary/50'
                  }`}>
                    {isSelected && <div className="h-2.5 w-2.5 rounded-full bg-secondary" />}
                  </div>
                  <span className={`text-sm sm:text-base font-medium ${isSelected ? 'text-text-primary' : 'text-text-secondary'}`}>
                    {opt}
                  </span>
                </div>
              </Button>
            );
          })}
        </div>
      </Card>

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center">
        <Button
          variant="outline"
          onClick={() => setCurrentIndex((p) => Math.max(0, p - 1))}
          disabled={currentIndex === 0 || isSubmitting}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" /> Previous
        </Button>

        {isLastQuestion ? (
          <Button
            variant="primary"
            onClick={handleSubmit}
            disabled={!hasAnsweredCurrent || isSubmitting}
            className="gap-2 min-w-[120px]"
          >
            {isSubmitting ? (
              <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
            ) : (
              'Submit'
            )}
          </Button>
        ) : (
          <Button
            variant="primary"
            onClick={() => setCurrentIndex((p) => Math.min(totalQuestions - 1, p + 1))}
            disabled={!hasAnsweredCurrent || isSubmitting}
            className="gap-2"
          >
            Next <ArrowRight className="h-4 w-4" />
          </Button>
        )}
      </div>

    </div>
  );
}
