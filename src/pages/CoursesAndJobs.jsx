import React, { useState, useEffect, useMemo } from 'react';
import SEO from '../components/SEO';
import { useLocation } from 'react-router-dom';
import { 
  BookOpen, Briefcase, Star, Clock, MapPin, 
  IndianRupee, Flame, CheckCircle2 
} from 'lucide-react';
import { getCourseRecommendations, getOpportunityRecommendations } from '../services/opportunityService';
import { getProfile } from '../services/profileService';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Skeleton from '../components/ui/Skeleton';
import EmptyState from '../components/ui/EmptyState';
import ErrorState from '../components/ui/ErrorState';

// ─── Match Ring Component (Reused logic) ──────────────────────────────────────

function MatchRing({ value, size = 48, stroke = 4 }) {
  const [fill, setFill] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setFill(value), 100);
    return () => clearTimeout(t);
  }, [value]);

  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (fill / 100) * circumference;

  let colorClass = 'stroke-danger';
  if (value >= 70) colorClass = 'stroke-success';
  else if (value >= 40) colorClass = 'stroke-warning';

  return (<div className="relative inline-flex items-center justify-center shrink-0">
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
      <div className="absolute inset-0 flex flex-col items-center justify-center text-[10px] font-bold text-text-primary">
        {value}%
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function CoursesAndJobs() {
  const location = useLocation();
  const initialSkillFilter = location.state?.filterSkill || '';

  const [activeTab, setActiveTab] = useState('courses'); // 'courses' or 'jobs'
  const [profileSkills, setProfileSkills] = useState([]);
  const [profileInterests, setProfileInterests] = useState([]);
  const [profileCareerGoals, setProfileCareerGoals] = useState([]);

  // Data states
  const [courses, setCourses] = useState([]);
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Filter states - Courses
  const [courseType, setCourseType] = useState('All');
  const [courseLevel, setCourseLevel] = useState('All');
  const [courseSearch, setCourseSearch] = useState(initialSkillFilter);

  // Filter states - Jobs
  const [jobType, setJobType] = useState('All');
  const [jobLocation, setJobLocation] = useState('');

  // 1. Fetch data on mount
  const fetchData = async () => {
    setLoading(true);
    setError(false);
    try {
      const [courseData, oppData, profileData] = await Promise.all([
        getCourseRecommendations(),
        getOpportunityRecommendations(),
        getProfile()
      ]);
      setCourses(courseData);
      setOpportunities(oppData);
      setProfileSkills(profileData.skills?.map(s => s.name.toLowerCase()) || []);
      setProfileInterests(profileData.interests?.map(i => i.toLowerCase()) || []);
      setProfileCareerGoals(profileData.careerGoals?.map(g => g.toLowerCase()) || []);
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

  // ─── Filtering Logic ────────────────────────────────────────────────────────

  // Memoize filtered course list so we only recalculate when course list or filters change
  const filteredCourses = useMemo(() => {
    return courses.filter(c => {
      // 1. Type & Level filters
      if (courseType !== 'All' && c.type !== courseType) return false;
      if (courseLevel !== 'All' && c.level !== courseLevel) return false;

      // 2. User profile matching (Skills, Interests, and Career Goals)
      const hasMatchingSkill = c.skillsTaught.some(s => profileSkills.includes(s.toLowerCase()));

      const hasMatchingInterest = profileInterests.some(interest => {
        const interestClean = interest.toLowerCase().trim();
        if (!interestClean) return false;
        return c.title.toLowerCase().includes(interestClean) ||
               c.skillsTaught.some(s => s.toLowerCase().includes(interestClean) || interestClean.includes(s.toLowerCase()));
      });

      const hasMatchingGoal = profileCareerGoals.some(goal => {
        const goalClean = goal.toLowerCase().replace(/developer|engineer|designer|manager/g, '').trim();
        if (!goalClean) return false;
        return c.title.toLowerCase().includes(goalClean) ||
               c.skillsTaught.some(s => s.toLowerCase().includes(goalClean) || goalClean.includes(s.toLowerCase()));
      });

      // Show ONLY the courses user had mentioned in form
      if (!hasMatchingSkill && !hasMatchingInterest && !hasMatchingGoal) return false;

      // 3. Search query filter
      if (courseSearch) {
        const searchLower = courseSearch.toLowerCase();
        const matchesSkill = c.skillsTaught.some(s => s.toLowerCase().includes(searchLower));
        const matchesTitle = c.title.toLowerCase().includes(searchLower);
        if (!matchesSkill && !matchesTitle) return false;
      }
      return true;
    });
  }, [courses, courseType, courseLevel, courseSearch, profileSkills, profileInterests, profileCareerGoals]);

  // Memoize filtered job list so we only recalculate when job list or filters change
  const filteredJobs = useMemo(() => {
    return opportunities.filter(j => {
      if (jobType !== 'All' && j.type !== jobType) return false;
      if (jobLocation && !j.location.toLowerCase().includes(jobLocation.toLowerCase())) return false;
      return true;
    });
  }, [opportunities, jobType, jobLocation]);

  // ─── Render Helpers ─────────────────────────────────────────────────────────

  const renderSkeletons = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {[1, 2, 3, 4, 5, 6].map(i => (
        <Skeleton key={i} className="h-64" />
      ))}
    </div>
  );

  return (
    <div className="space-y-6 pt-4">
      <SEO title="Explore Opportunities" noIndex={true} />
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-text-primary">
          Explore Opportunities
        </h1>
        <p className="text-sm text-text-secondary mt-1">
          Find courses to bridge your skill gaps and discover jobs tailored to your profile.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-border">
        <Button
          variant="ghost"
          onClick={() => setActiveTab('courses')}
          className={`flex items-center gap-2 py-4 px-6 font-semibold text-sm transition-colors border-b-2 rounded-none h-auto focus:ring-0 active:scale-100 ${
            activeTab === 'courses' 
              ? 'border-secondary text-secondary bg-secondary/5' 
              : 'border-transparent text-text-secondary hover:text-text-primary hover:bg-bg-page/50'
          }`}
        >
          <BookOpen className="h-4 w-4" /> Courses & Certifications
        </Button>
        <Button
          variant="ghost"
          onClick={() => setActiveTab('jobs')}
          className={`flex items-center gap-2 py-4 px-6 font-semibold text-sm transition-colors border-b-2 rounded-none h-auto focus:ring-0 active:scale-100 ${
            activeTab === 'jobs' 
              ? 'border-secondary text-secondary bg-secondary/5' 
              : 'border-transparent text-text-secondary hover:text-text-primary hover:bg-bg-page/50'
          }`}
        >
          <Briefcase className="h-4 w-4" /> Internships & Jobs
        </Button>
      </div>

      {/* ─── COURSES TAB ───────────────────────────────────────────────────── */}
      {activeTab === 'courses' && (
        <div className="space-y-6">
          {/* Filters */}
          <div className="flex flex-wrap gap-4 p-4 bg-bg-surface border border-border rounded-xl shadow-sm">
            <Input 
              type="text"
              placeholder="Search skills or title..."
              value={courseSearch}
              onChange={(e) => setCourseSearch(e.target.value)}
              className="flex-1 min-w-[200px]"
            />
            <select
              value={courseType}
              onChange={(e) => setCourseType(e.target.value)}
              className="bg-bg-page border border-border text-text-primary text-sm rounded-lg focus:ring-secondary focus:border-secondary block p-2.5"
            >
              <option value="All">All Types</option>
              <option value="Course">Courses</option>
              <option value="Certification">Certifications</option>
            </select>
            <select
              value={courseLevel}
              onChange={(e) => setCourseLevel(e.target.value)}
              className="bg-bg-page border border-border text-text-primary text-sm rounded-lg focus:ring-secondary focus:border-secondary block p-2.5"
            >
              <option value="All">All Levels</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>

          {/* Grid */}
          {loading ? renderSkeletons() : error ? <ErrorState onRetry={fetchData} /> : filteredCourses.length === 0 ? (
            <EmptyState 
              title="No courses found" 
              message="We couldn't find any courses matching your filters. Try adjusting them." 
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredCourses.map(course => (
                <Card 
                  key={course.id} 
                  className={`flex flex-col p-5 transition-transform duration-200 hover:-translate-y-1 ${
                    course.relevance === 'high' ? 'border-2 border-warning/50 shadow-warning/10 shadow-lg relative' : ''
                  }`}
                >
                  {course.relevance === 'high' && (
                    <div className="absolute -top-3 -right-3 bg-bg-surface p-1 rounded-full shadow-sm border border-border">
                      <div className="bg-warning/20 p-1.5 rounded-full text-warning">
                        <Flame className="h-4 w-4" />
                      </div>
                    </div>
                  )}

                  <div className="flex justify-between items-start mb-3">
                    <Badge variant={course.type === 'Certification' ? 'secondary' : 'info'}>
                      {course.type}
                    </Badge>
                    <div className="flex items-center gap-1 text-sm font-semibold text-text-primary bg-bg-page px-2 py-0.5 rounded-full border border-border">
                      <Star className="h-3.5 w-3.5 text-warning fill-warning" />
                      {course.rating}
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-text-primary line-clamp-2 leading-tight mb-1">
                    {course.title}
                  </h3>
                  <p className="text-sm text-text-secondary mb-4 font-medium">
                    by {course.provider}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {course.skillsTaught.map(skill => (
                      <span key={skill} className="text-xs px-2 py-1 bg-bg-page text-text-primary border border-border rounded-md">
                        {skill}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto pt-4 border-t border-border flex items-center justify-between">
                    <div className="flex flex-col gap-1 text-xs text-text-secondary font-medium">
                      <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> {course.durationWeeks} Weeks</span>
                      <span className="flex items-center gap-1.5"><BookOpen className="h-3.5 w-3.5" /> {course.level}</span>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        if (course.url && course.url !== '#') {
                          window.open(course.url, '_blank', 'noopener,noreferrer');
                        }
                      }}
                    >
                      View Course
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ─── JOBS TAB ──────────────────────────────────────────────────────── */}
      {activeTab === 'jobs' && (
        <div className="space-y-6">
          {/* Filters */}
          <div className="flex flex-wrap gap-4 p-4 bg-bg-surface border border-border rounded-xl shadow-sm">
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

          {/* Grid */}
          {loading ? renderSkeletons() : error ? <ErrorState onRetry={fetchData} /> : filteredJobs.length === 0 ? (
            <EmptyState 
              title="No opportunities found" 
              message="We couldn't find any opportunities matching your filters. Try adjusting them." 
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredJobs.map(job => (
                <Card key={job.id} className="flex flex-col p-5 hover:border-secondary/50 transition-colors">
                  
                  <div className="flex justify-between items-start gap-4 mb-3">
                    <div>
                      <Badge variant={job.type === 'Internship' ? 'warning' : 'primary'} className="mb-2">
                        {job.type}
                      </Badge>
                      <h3 className="text-lg font-bold text-text-primary leading-tight">
                        {job.title}
                      </h3>
                      <p className="text-sm text-text-secondary mt-1 font-medium">
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
              ))}
            </div>
          )}
        </div>
      )}

    </div>
  );
}
