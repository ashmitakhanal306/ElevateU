import React, { useState, useEffect } from 'react';
import SEO from '../components/SEO';
import { useNavigate } from 'react-router-dom';
import { Clock, HelpCircle, CheckCircle2 } from 'lucide-react';
import { getAssessments } from '../services/assessmentService';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Skeleton from '../components/ui/Skeleton';
import EmptyState from '../components/ui/EmptyState';
import ErrorState from '../components/ui/ErrorState';

export default function SkillAssessment() {
  const navigate = useNavigate();
  const [assessments, setAssessments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [filter, setFilter] = useState('All');

  const fetchAssessments = () => {
    setLoading(true);
    setError(false);
    getAssessments().then((data) => {
      setAssessments(data);
      setLoading(false);
    }).catch(() => {
      setError(true);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchAssessments();
  }, []);

  const filteredAssessments = assessments.filter((a) =>
    filter === 'All' ? true : a.category === filter
  );

  return (<div className="space-y-6">
      <SEO title="Skill Assessments" noIndex={true} />
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight">Skill Assessments</h1>
          <p className="text-sm text-text-secondary mt-1">
            Test your knowledge and update your skill profile
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex border-b border-border">
        {['All', 'Technical', 'Soft Skills'].map((tab) => (
          <Button
            key={tab}
            variant="ghost"
            onClick={() => setFilter(tab)}
            className={`px-4 py-3 text-sm font-bold tracking-wide transition-all duration-200 rounded-none h-auto focus:ring-0 active:scale-100 ${
              filter === tab
                ? 'text-secondary border-b-2 border-secondary -mb-px'
                : 'text-text-secondary hover:text-text-primary hover:bg-transparent'
            }`}
          >
            {tab}
          </Button>
        ))}
      </div>

      {/* Assessment Grid */}
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-48" />
          ))}
        </div>
      )}
      
      {!loading && error && <ErrorState onRetry={fetchAssessments} />}

      {!loading && !error && filteredAssessments.length === 0 && (
        <EmptyState 
          title="No assessments found" 
          message={`We couldn't find any ${filter !== 'All' ? filter : ''} assessments at the moment.`} 
        />
      )}

      {!loading && !error && filteredAssessments.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAssessments.map((assessment) => (
            <Card key={assessment.id} className="p-6 flex flex-col transition-transform duration-200" onClick={() => navigate(`/assessment/${assessment.id}`)}>
              <div className="flex justify-between items-start mb-4">
                <Badge variant={assessment.category === 'Technical' ? 'info' : 'warning'}>
                  {assessment.category}
                </Badge>
                {assessment.completed && (
                  <CheckCircle2 className="h-5 w-5 text-success" />
                )}
              </div>
              
              <h3 className="text-lg font-bold mb-2 text-text-primary">
                {assessment.title}
              </h3>
              
              <div className="flex items-center gap-4 text-xs text-text-secondary mb-6">
                <div className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" />
                  {assessment.durationMinutes} mins
                </div>
                <div className="flex items-center gap-1.5">
                  <HelpCircle className="h-3.5 w-3.5" />
                  {assessment.questions.length} questions
                </div>
              </div>
              
              <div className="mt-auto pt-4 border-t border-border">
                <Button
                  variant={assessment.completed ? 'outline' : 'primary'}
                  className="w-full"
                >
                  {assessment.completed ? 'Completed ✓ · Retake' : 'Start assessment'}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
