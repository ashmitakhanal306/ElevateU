import React, { useState, useEffect } from 'react';
import SEO from '../components/SEO';
import {
  GraduationCap, Zap, Heart, Target, Briefcase,
  MapPin, Mail, Phone, Pencil, CalendarDays,
} from 'lucide-react';

import { getProfile } from '../services/profileService';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import EditProfileModal from '../components/profile/EditProfileModal';
import Skeleton from '../components/ui/Skeleton';
import ErrorState from '../components/ui/ErrorState';
import PageHeader from '../components/ui/PageHeader';
import EmptyState from '../components/ui/EmptyState';

const LEVEL_VARIANT = {
  Beginner:     'info',
  Intermediate: 'warning',
  Advanced:     'success',
};

function ProfileSkeleton() {
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex flex-col sm:flex-row items-start gap-5">
          <Skeleton className="h-20 w-20 rounded-full shrink-0" />
          <div className="flex-1 space-y-3 w-full">
            <Skeleton className="h-5 w-48" />
            <Skeleton className="h-4 w-64" />
            <Skeleton className="h-4 w-40" />
          </div>
          <Skeleton className="h-10 w-32 rounded-xl" />
        </div>
      </Card>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="p-6 space-y-4">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </Card>
        ))}
      </div>
      <Card className="p-6 space-y-4">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-4/6" />
      </Card>
    </div>
  );
}

function SectionTitle({ icon: Icon, children, colorClass }) {
  return (
    <h3 className={`flex items-center gap-2 font-bold text-base mb-5 ${colorClass}`}>
      <Icon className="h-5 w-5 shrink-0" />
      {children}
    </h3>
  );
}

export default function StudentProfile() {
  const [profile,     setProfile]     = useState(null);
  const [loading,     setLoading]     = useState(true);
  const [error,       setError]       = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchProfile = () => {
    setLoading(true);
    setError(false);
    getProfile().then((data) => {
      setProfile(data);
      setLoading(false);
    }).catch(() => {
      setError(true);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleSave = (updatedProfile) => {
    setProfile(updatedProfile);
  };

  if (loading) return <ProfileSkeleton />;
  if (error) return <ErrorState onRetry={fetchProfile} />;

  const { personal, education, skills, interests, careerGoals, experience } = profile;

  // Calculate profile completeness
  let completeness = 0;
  if (personal.name && personal.location) completeness += 25;
  if (education.length > 0) completeness += 25;
  if (skills.length > 0) completeness += 25;
  if (careerGoals.length > 0 || interests.length > 0) completeness += 25;

  return (
    <div className="space-y-6 text-left">
      <SEO title="My Profile" noIndex={true} />
      
      <PageHeader 
        title="Student Profile" 
        description="Manage your personal information, skills, and career goals."
      />

      {/* ── COMPLETENESS BAR ────────────────────────────────────────────── */}
      <Card className="p-5 flex items-center justify-between gap-4">
        <div className="flex-1 w-full">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-bold text-text-primary">Profile Completeness</span>
            <span className="text-sm font-bold text-secondary">{completeness}%</span>
          </div>
          <div className="w-full h-2 rounded-full bg-border overflow-hidden">
            <div 
              className="h-full rounded-full bg-secondary transition-all duration-1000" 
              style={{ width: `${completeness}%` }} 
            />
          </div>
        </div>
        {completeness < 100 && (
          <Button variant="outline" size="sm" onClick={() => setIsModalOpen(true)} className="shrink-0 hidden sm:flex">
            Complete Profile
          </Button>
        )}
      </Card>

      {/* ── HEADER CARD ─────────────────────────────────────────────────── */}
      <Card className="p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <div className="h-20 w-20 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white font-bold text-2xl select-none shadow-md shrink-0">
            {personal.avatarInitials}
          </div>
          <div className="flex-1 min-w-0 space-y-1.5">
            <h2 className="text-xl font-extrabold truncate">{personal.name || 'Set your name'}</h2>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-text-secondary">
              <span className="flex items-center gap-1.5"><Mail className="h-3.5 w-3.5 shrink-0" />{personal.email}</span>
              <span className="flex items-center gap-1.5"><Phone className="h-3.5 w-3.5 shrink-0" />{personal.phone || 'Add phone'}</span>
              <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 shrink-0" />{personal.location || 'Add location'}</span>
            </div>
          </div>
          <Button variant="primary" size="md" onClick={() => setIsModalOpen(true)} className="gap-2 shrink-0">
            <Pencil className="h-4 w-4" /> Edit Profile
          </Button>
        </div>
      </Card>

      {/* ── 2-COLUMN GRID ─────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* EDUCATION */}
        <Card className="p-6">
          <SectionTitle icon={GraduationCap} colorClass="text-primary">Education</SectionTitle>
          {education.length === 0 ? (
            <EmptyState icon={GraduationCap} title="No education added" message="Add your education history." />
          ) : (
            <div className="space-y-5">
              {education.map((edu) => (
                <div key={edu.id} className="relative pl-4 border-l-2 border-primary/25">
                  <div className="absolute -left-[5px] top-1 h-2 w-2 rounded-full bg-primary" />
                  <p className="font-semibold text-sm leading-tight">{edu.degree || '—'}</p>
                  <p className="text-text-secondary text-xs mt-0.5">{edu.institution}</p>
                  <div className="flex items-center gap-2 mt-1 text-xs text-text-secondary">
                    <CalendarDays className="h-3 w-3 shrink-0" />
                    <span>{edu.year}</span>
                    {edu.grade && <><span className="h-1 w-1 rounded-full bg-border inline-block" /><span>{edu.grade}</span></>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* SKILLS */}
        <Card className="p-6">
          <SectionTitle icon={Zap} colorClass="text-warning">Skills</SectionTitle>
          {skills.length === 0 ? (
            <EmptyState icon={Zap} title="No skills added" message="Add technical and soft skills." />
          ) : (
            ['Advanced', 'Intermediate', 'Beginner'].map((level) => {
              const levelSkills = skills.filter((s) => s.level === level);
              if (levelSkills.length === 0) return null;
              return (
                <div key={level} className="mb-3">
                  <p className="text-xs font-semibold text-text-secondary uppercase tracking-wide mb-2">{level}</p>
                  <div className="flex flex-wrap gap-2">
                    {levelSkills.map((skill) => (
                      <Badge key={skill.id} variant={LEVEL_VARIANT[level]}>{skill.name}</Badge>
                    ))}
                  </div>
                </div>
              );
            })
          )}
        </Card>

        {/* INTERESTS */}
        <Card className="p-6">
          <SectionTitle icon={Heart} colorClass="text-danger">Interests</SectionTitle>
          {interests.length === 0 ? (
            <EmptyState icon={Heart} title="No interests" message="Add what you are passionate about." />
          ) : (
            <div className="flex flex-wrap gap-2">
              {interests.map((interest) => <Badge key={interest} variant="info">{interest}</Badge>)}
            </div>
          )}
        </Card>

        {/* CAREER GOALS */}
        <Card className="p-6">
          <SectionTitle icon={Target} colorClass="text-success">
            Career Goals
            <span className="ml-auto text-xs font-normal text-text-secondary">{careerGoals.length}/3</span>
          </SectionTitle>
          {careerGoals.length === 0 ? (
            <EmptyState icon={Target} title="No goals set" message="Add career paths you are aiming for." />
          ) : (
            <div className="space-y-2.5">
              {careerGoals.map((goal, idx) => (
                <div key={goal} className="flex items-center gap-3 p-3.5 rounded-xl bg-bg-page border border-border hover:border-success/30 hover:bg-success/5 transition-all duration-200">
                  <div className="h-7 w-7 rounded-full bg-success/15 text-success font-extrabold text-xs flex items-center justify-center shrink-0">{idx + 1}</div>
                  <span className="text-sm font-semibold">{goal}</span>
                </div>
              ))}
            </div>
          )}
        </Card>

      </div>

      {/* EXPERIENCE */}
      <Card className="p-6">
        <SectionTitle icon={Briefcase} colorClass="text-secondary">Experience</SectionTitle>
        {experience.length === 0 ? (
          <EmptyState icon={Briefcase} title="No experience" message="Add your past work or internship experience." />
        ) : (
          <div className="space-y-6">
            {experience.map((exp) => (
              <div key={exp.id} className="relative pl-4 border-l-2 border-secondary/25">
                <div className="absolute -left-[5px] top-1.5 h-2 w-2 rounded-full bg-secondary" />
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
                  <p className="font-bold">{exp.role || '—'}</p>
                  <span className="text-xs text-text-secondary">·</span>
                  <p className="text-secondary text-sm font-semibold">{exp.organization}</p>
                </div>
                <p className="flex items-center gap-1.5 text-xs text-text-secondary mt-0.5">
                  <CalendarDays className="h-3 w-3 shrink-0" />
                  {exp.duration}
                </p>
                <p className="text-sm text-text-secondary mt-2 leading-relaxed">{exp.description}</p>
              </div>
            ))}
          </div>
        )}
      </Card>

      {isModalOpen && (
        <EditProfileModal
          profile={profile}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
