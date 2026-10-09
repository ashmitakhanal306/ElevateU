import React, { useState, useEffect, useMemo } from 'react';
import SEO from '../components/SEO';
import { useLocation, Link } from 'react-router-dom';
import { BookOpen, Star, Clock, Flame } from 'lucide-react';
import { getCourseRecommendations } from '../services/opportunityService';
import { getProfile } from '../services/profileService';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Skeleton from '../components/ui/Skeleton';
import EmptyState from '../components/ui/EmptyState';
import ErrorState from '../components/ui/ErrorState';
import PageHeader from '../components/ui/PageHeader';

export default function CoursesPage() {
  const location = useLocation();
  const initialSkillFilter = location.state?.filterSkill || '';

  const [profileSkills, setProfileSkills] = useState([]);
  const [profileInterests, setProfileInterests] = useState([]);
  const [profileCareerGoals, setProfileCareerGoals] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [courseType, setCourseType] = useState('All');
  const [courseLevel, setCourseLevel] = useState('All');
  const [courseSearch, setCourseSearch] = useState(initialSkillFilter);

  const fetchData = async () => {
    setLoading(true);
    setError(false);
    try {
      const [courseData, profileData] = await Promise.all([
        getCourseRecommendations(),
        getProfile()
      ]);
      setCourses(courseData);
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

  const filteredCourses = useMemo(() => {
    return courses.filter(c => {
      if (courseType !== 'All' && c.type !== courseType) return false;
      if (courseLevel !== 'All' && c.level !== courseLevel) return false;

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

      if (!hasMatchingSkill && !hasMatchingInterest && !hasMatchingGoal) return false;

      if (courseSearch) {
        const searchLower = courseSearch.toLowerCase();
        const matchesSkill = c.skillsTaught.some(s => s.toLowerCase().includes(searchLower));
        const matchesTitle = c.title.toLowerCase().includes(searchLower);
        if (!matchesSkill && !matchesTitle) return false;
      }
      return true;
    });
  }, [courses, courseType, courseLevel, courseSearch, profileSkills, profileInterests, profileCareerGoals]);

  const renderSkeletons = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {[1, 2, 3, 4, 5, 6].map(i => (
        <Skeleton key={i} className="h-64" />
      ))}
    </div>
  );

  return (
    <div className="space-y-6 pt-4">
      <SEO title="Courses" noIndex={true} />
      
      <PageHeader 
        title="Courses" 
        description={
          <>Find courses to bridge your skill gaps. <Link to="/jobs" className="text-secondary hover:underline font-medium">Looking for jobs? See Jobs</Link></>
        }
      />

      <div className="sticky top-20 z-20 flex flex-wrap gap-4 p-4 bg-bg-surface/95 backdrop-blur-sm border border-border rounded-xl shadow-sm mt-4 mb-2">
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

      {loading ? renderSkeletons() : error ? <ErrorState onRetry={fetchData} /> : filteredCourses.length === 0 ? (
        <EmptyState 
          title="No courses found" 
          message="We couldn't find any courses matching your filters. Try adjusting them." 
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredCourses.map(course => {
            const matchCount = course.skillsTaught.filter(s => profileSkills.includes(s.toLowerCase())).length;
            return (
              <Card 
                key={course.id} 
                className={`flex flex-col h-full p-5 transition-transform duration-200 hover:-translate-y-1 ${
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

                <div className="flex flex-wrap justify-between items-start gap-2 mb-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant={course.type === 'Certification' ? 'secondary' : 'info'}>
                      {course.type}
                    </Badge>
                    {matchCount > 0 && (
                      <Badge variant="success" className="text-[10px]">
                        {matchCount} {matchCount === 1 ? 'skill' : 'skills'} match
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-sm font-semibold text-text-primary bg-bg-page px-2 py-0.5 rounded-full border border-border shrink-0">
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
            );
          })}
        </div>
      )}
    </div>
  );
}
