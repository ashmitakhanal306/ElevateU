import React, { useState, useEffect } from 'react';
import SEO from '../components/SEO';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, TrendingDown, Minus, Briefcase, IndianRupee } from 'lucide-react';
import { getRecommendations } from '../services/careerService';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Skeleton from '../components/ui/Skeleton';

/**
 * Small SVG circular progress ring for the match percentage.
 */
function MatchRing({ value }) {
  const size = 52;
  const stroke = 5;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (value / 100) * circumference;

  let colorClass = 'stroke-secondary';
  if (value >= 80) colorClass = 'stroke-success';
  else if (value < 50) colorClass = 'stroke-border'; // Or text-secondary

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
          style={{ transition: 'stroke-dashoffset 1s ease-in-out' }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-text-primary">
        {value}%
      </div>
    </div>
  );
}

function GrowthIcon({ growth }) {
  if (growth === 'High') {
    return <TrendingUp className="h-4 w-4 text-success" title="High Growth" />;
  }
  if (growth === 'Low') {
    return <TrendingDown className="h-4 w-4 text-danger" title="Low Growth" />;
  }
  return <Minus className="h-4 w-4 text-warning" title="Medium Growth" />;
}

export default function CareerRecommendations() {
  const navigate = useNavigate();
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getRecommendations().then((data) => {
      setCareers(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="space-y-6 pt-4">
      <SEO title="Career Recommendations" noIndex={true} />
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-text-primary">
          Career Recommendations
        </h1>
        <p className="text-sm text-text-secondary mt-1">
          Based on your profile and assessments, here are your best-matching careers.
        </p>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <Skeleton key={i} className="h-48" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {careers.map((career) => (
            <Card 
              key={career.id} 
              className="p-5 flex flex-col hover:border-secondary/50 hover:shadow-md transition-all duration-200 cursor-pointer group"
              onClick={() => navigate(`/career-recommendations/${career.id}`)}
            >
              
              {/* Top row: match ring & badge */}
              <div className="flex justify-between items-start mb-4">
                <MatchRing value={career.matchPercent} />
                <Badge variant="info">{career.category}</Badge>
              </div>

              {/* Title & description */}
              <h3 className="text-lg font-bold text-text-primary group-hover:text-secondary transition-colors duration-200">
                {career.title}
              </h3>
              <p className="text-sm text-text-secondary mt-1.5 line-clamp-2 min-h-[40px]">
                {career.description}
              </p>

              {/* Bottom metadata */}
              <div className="mt-6 pt-4 border-t border-border flex items-center justify-between text-xs text-text-secondary font-medium">
                <div className="flex items-center gap-1.5">
                  <IndianRupee className="h-4 w-4 text-primary" />
                  {career.avgSalaryRange}
                </div>
                <div className="flex items-center gap-1.5">
                  <GrowthIcon growth={career.growthOutlook} />
                  {career.growthOutlook} Growth
                </div>
              </div>

            </Card>
          ))}
        </div>
      )}

    </div>
  );
}
