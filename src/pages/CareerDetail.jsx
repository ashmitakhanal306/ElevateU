import React, { useState, useEffect } from 'react';
import SEO from '../components/SEO';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, TrendingUp, IndianRupee, Target, CheckCircle2, AlertCircle } from 'lucide-react';
import { getCareerDetail } from '../services/careerService';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';

export default function CareerDetail() {
  const { careerId } = useParams();
  const navigate = useNavigate();
  
  const [career, setCareer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCareerDetail(careerId)
      .then((data) => {
        setCareer(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        navigate('/career-recommendations');
      });
  }, [careerId, navigate]);

  if (loading) {
    return (<div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin h-8 w-8 border-4 border-secondary border-t-transparent rounded-full" />
      </div>
    );
  }

  const {
    title,
    description,
    category,
    matchPercent,
    avgSalaryRange,
    growthOutlook,
    matchedSkills,
    missingSkills
  } = career;

  return (
    <div className="max-w-4xl mx-auto space-y-6 pt-4">
      <SEO title="Career Details" noIndex={true} />
      
      {/* Back Button */}
      <Button 
        variant="ghost"
        size="sm"
        onClick={() => navigate('/career-recommendations')}
        className="flex items-center gap-2 text-sm font-semibold text-text-secondary hover:text-secondary transition-colors duration-200 group h-auto p-0 hover:bg-transparent"
      >
        <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
        Back to recommendations
      </Button>

      {/* Header Card */}
      <Card className="p-8 border-t-4 border-t-secondary relative overflow-hidden">
        
        {/* Large faint background score text */}
        <div className="absolute -right-4 -bottom-8 text-9xl font-black text-border/40 select-none pointer-events-none">
          {matchPercent}%
        </div>

        <div className="relative z-10 flex flex-col md:flex-row justify-between gap-6">
          <div className="space-y-4">
            <div>
              <Badge variant="info" className="mb-2">{category}</Badge>
              <h1 className="text-3xl font-extrabold text-text-primary tracking-tight">
                {title}
              </h1>
            </div>
            <p className="text-text-secondary max-w-xl text-base leading-relaxed">
              {description}
            </p>
            <div className="flex flex-wrap items-center gap-6 pt-2 text-sm font-semibold text-text-primary">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-primary/10 rounded-lg"><IndianRupee className="h-4 w-4 text-primary" /></div>
                {avgSalaryRange}
              </div>
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-success/10 rounded-lg"><TrendingUp className="h-4 w-4 text-success" /></div>
                {growthOutlook} Growth
              </div>
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-secondary/10 rounded-lg"><Target className="h-4 w-4 text-secondary" /></div>
                {matchPercent}% Match
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Skill Gap Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Matched Skills */}
        <Card className="p-6">
          <h3 className="flex items-center gap-2 font-bold text-lg text-text-primary mb-5">
            <CheckCircle2 className="h-5 w-5 text-success" />
            Skills you already have
          </h3>
          {matchedSkills.length === 0 ? (
            <p className="text-sm text-text-secondary italic">None of the required skills match your profile.</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {matchedSkills.map(skill => (
                <Badge key={skill.name} variant="success" className="text-xs px-2.5 py-1">
                  {skill.name} <span className="opacity-60 ml-1">({skill.level})</span>
                </Badge>
              ))}
            </div>
          )}
        </Card>

        {/* Missing Skills */}
        <Card className="p-6">
          <h3 className="flex items-center gap-2 font-bold text-lg text-text-primary mb-5">
            <AlertCircle className="h-5 w-5 text-warning" />
            Skills you need to build
          </h3>
          {missingSkills.length === 0 ? (
            <p className="text-sm text-text-secondary italic">You meet all the required skills for this role!</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {missingSkills.map(skill => (
                <Badge key={skill.name} variant="warning" className="text-xs px-2.5 py-1">
                  {skill.name} <span className="opacity-60 ml-1">({skill.level})</span>
                </Badge>
              ))}
            </div>
          )}
        </Card>

      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 pt-2">
        <Button 
          variant="outline" 
          size="lg"
          className="flex-1"
          onClick={() => navigate('/skill-gap', { state: { careerId: career.id } })}
        >
          See full skill gap analysis
        </Button>
        <Button 
          variant="primary" 
          size="lg"
          className="flex-1"
          onClick={() => navigate('/courses')}
        >
          Find courses for missing skills
        </Button>
      </div>

    </div>
  );
}
