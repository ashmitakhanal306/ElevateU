import React, { useState, useEffect, useMemo } from 'react';
import SEO from '../components/SEO';
import { Link } from 'react-router-dom';
import { MapPin, IndianRupee, CheckCircle2 } from 'lucide-react';
import { getOpportunityRecommendations } from '../services/opportunityService';
import { getProfile } from '../services/profileService';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Skeleton from '../components/ui/Skeleton';
import EmptyState from '../components/ui/EmptyState';
import ErrorState from '../components/ui/ErrorState';
import PageHeader from '../components/ui/PageHeader';
import MatchRing from '../components/shared/MatchRing';

export default function JobsPage() {
  const [profileSkills, setProfileSkills] = useState([]);
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [jobType, setJobType] = useState('All');
  const [jobLocation, setJobLocation] = useState('');

  const fetchData = async () => {
    setLoading(true);
    setError(false);
    try {
      const [oppData, profileData] = await Promise.all([
        getOpportunityRecommendations(),
        getProfile()
      ]);
      setOpportunities(oppData);
      setProfileSkills(profileData.skills?.map(s => s.name.toLowerCase()) || []);
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredJobs = useMemo(() => {
    return opportunities.filter(j => {
      if (jobType !== 'All' && j.type !== jobType) return false;
      if (jobLocation && !j.location.toLowerCase().includes(jobLocation.toLowerCase())) return false;
      return true;
    });
  }, [opportunities, jobType, jobLocation]);

  const renderSkeletons = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {[1, 2, 3, 4, 5, 6].map(i => (
        <Skeleton key={i} className="h-64" />
      ))}
    </div>
  );

  return (
    <div className="space-y-6 pt-4">
      <SEO title="Jobs" noIndex={true} />
      
      <PageHeader 
        title="Jobs & Internships" 
        description={
          <>Discover jobs tailored to your profile. <Link to="/courses" className="text-secondary hover:underline font-medium">Looking for courses? See Courses</Link></>
        }
      />

      <div className="sticky top-20 z-20 flex flex-wrap gap-4 p-4 bg-bg-surface/95 backdrop-blur-sm border border-border rounded-xl shadow-sm mt-4 mb-2">
        <div className="flex-1 min-w-[200px] relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary z-10" />
          <Input 
            type="text"
            placeholder="Filter by location..."
            value={jobLocation}
            onChange={(e) => setJobLocation(e.target.value)}
            className="pl-9"
          />
        </div>
        <select
          value={jobType}
          onChange={(e) => setJobType(e.target.value)}
          className="bg-bg-page border border-border text-text-primary text-sm rounded-lg focus:ring-secondary focus:border-secondary block p-2.5"
        >
          <option value="All">All Types</option>
          <option value="Job">Full-time Jobs</option>
          <option value="Internship">Internships</option>
        </select>
      </div>

      {loading ? renderSkeletons() : error ? <ErrorState onRetry={fetchData} /> : filteredJobs.length === 0 ? (
        <EmptyState 
          title="No opportunities found" 
          message="We couldn't find any opportunities matching your filters. Try adjusting them." 
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredJobs.map(job => {
            const matchCount = job.requiredSkills.filter(s => profileSkills.includes(s.toLowerCase())).length;
            return (
              <Card key={job.id} className="flex flex-col h-full p-5 hover:border-secondary/50 transition-colors">
                
                <div className="flex justify-between items-start gap-4 mb-3">
                  <div className="flex flex-col items-start gap-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant={job.type === 'Internship' ? 'warning' : 'primary'}>
                        {job.type}
                      </Badge>
                      {matchCount > 0 && (
                        <Badge variant="success" className="text-[10px]">
                          {matchCount} {matchCount === 1 ? 'skill' : 'skills'} match
                        </Badge>
                      )}
                    </div>
                    <h3 className="text-lg font-bold text-text-primary leading-tight">
                      {job.title}
                    </h3>
                    <p className="text-sm text-text-secondary font-medium">
                      {job.company}
                    </p>
                  </div>
                  <MatchRing value={job.matchPercent} />
                </div>

              <div className="flex items-center gap-4 text-xs font-semibold text-text-secondary mb-4">
                <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> {job.location}</span>
                <span className="flex items-center gap-1.5 text-success"><IndianRupee className="h-3.5 w-3.5" /> {job.stipendOrSalary}</span>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {job.requiredSkills.map(skill => {
                  const hasSkill = profileSkills.includes(skill.toLowerCase());
                  return (
                    <span 
                      key={skill} 
                      className={`text-xs px-2 py-1 border rounded-md flex items-center gap-1 ${
                        hasSkill 
                          ? 'bg-success/10 text-success border-success/20' 
                          : 'bg-bg-page text-text-secondary border-border'
                      }`}
                    >
                      {hasSkill && <CheckCircle2 className="h-3 w-3" />}
                      {skill}
                    </span>
                  );
                })}
              </div>

              <div className="mt-auto pt-4 border-t border-border flex items-center justify-between">
                <span className="text-xs text-text-secondary">
                  Posted {job.postedDaysAgo} {job.postedDaysAgo === 1 ? 'day' : 'days'} ago
                </span>
                <Button variant="primary" size="sm">Apply Now</Button>
              </div>

            </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
