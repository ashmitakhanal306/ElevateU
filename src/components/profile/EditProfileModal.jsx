import React, { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { X, CheckCircle } from 'lucide-react';

import { updateProfile } from '../../services/profileService';
import { fetchAllRoadmaps } from '../../services/roadmapService';
import Button from '../ui/Button';

// Steps
import ProfileBasicsStep from './ProfileBasicsStep';
import ProfileEducationStep from './ProfileEducationStep';
import ProfileSkillsStep from './ProfileSkillsStep';
import ProfileGoalsStep from './ProfileGoalsStep';

// ─── Constants ────────────────────────────────────────────────────────────────
const ALLOWED_SKILLS = [
  'JavaScript', 'React.js', 'Python', 'Tailwind CSS', 'SQL',
  'Machine Learning', 'Node.js', 'Git & GitHub', 'Figma',
  'Prototyping', 'User Research', 'Agile Methodology',
  'Data Analysis', 'Communication', 'SEO/SEM', 'Google Analytics',
  'Copywriting', 'Linux', 'Docker', 'AWS / Azure', 'CI/CD',
  'CSS', 'Sass', 'Responsive Design', 'Cloud Computing',
  'AWS', 'System Architecture', 'Express', 'MongoDB',
  'R', 'Tableau', 'Version Control', 'Database Design',
  'PostgreSQL', 'UI/UX Design', 'TypeScript', 'C++',
  'Java', 'HTML', 'Next.js', 'Vue.js', 'Redux', 'Kubernetes'
].sort();

const generateId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;

// ─── Date Parsing and Formatting Helpers ─────────────────────────────────────
const parseYearRange = (yearStr) => {
  if (!yearStr) return { start: '', end: '' };
  const parts = yearStr.split(/[–-]/).map(s => s.trim());
  const getYearOnly = (p, defaultMonth = '01') => {
    const m = p.match(/\b\d{4}\b/);
    return m ? `${m[0]}-${defaultMonth}-01` : '';
  };
  const start = getYearOnly(parts[0], '01');
  const end = parts[1] ? getYearOnly(parts[1], '12') : start;
  return { start, end };
};

const parseDurationRange = (durationStr) => {
  if (!durationStr) return { start: '', end: '' };
  const parts = durationStr.split(/[–-]/).map(s => s.trim());
  const parseSingle = (p, defaultMonth = '01', defaultYear = '2024') => {
    const yearMatch = p.match(/\b\d{4}\b/);
    const year = yearMatch ? yearMatch[0] : defaultYear;
    const months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
    let monthNum = defaultMonth;
    const lower = p.toLowerCase();
    for (let i = 0; i < 12; i++) {
      if (lower.includes(months[i])) {
        monthNum = String(i + 1).padStart(2, '0');
        break;
      }
    }
    return `${year}-${monthNum}-01`;
  };
  const start = parseSingle(parts[0], '01', '2024');
  const end = parts[1] ? parseSingle(parts[1], '12', '2024') : start;
  return { start, end };
};

const formatYearRange = (start, end) => {
  if (!start) return '';
  const startYear = start.split('-')[0];
  if (!end) return startYear;
  const endYear = end.split('-')[0];
  return startYear === endYear ? startYear : `${startYear} – ${endYear}`;
};

const formatDurationRange = (start, end) => {
  if (!start) return '';
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const formatSingle = (dateVal) => {
    const parts = dateVal.split('-');
    if (parts.length < 2) return '';
    const mIdx = parseInt(parts[1], 10) - 1;
    return `${months[mIdx] || 'Jan'} ${parts[0]}`;
  };
  const startFormatted = formatSingle(start);
  if (!end) return startFormatted;
  const endFormatted = formatSingle(end);
  return `${startFormatted} – ${endFormatted}`;
};

function Spinner() {
  return (
    <svg className="animate-spin h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  );
}

const STEPS = ['Basics', 'Education', 'Skills', 'Goals'];

export default function EditProfileModal({ profile, onClose, onSave }) {
  const [currentStep, setCurrentStep] = useState(0);

  const [editData, setEditData] = useState(() => {
    const cloned = JSON.parse(JSON.stringify(profile));
    cloned.education = (cloned.education || []).map((edu) => {
      const { start, end } = parseYearRange(edu.year);
      return { ...edu, start_date: start, end_date: end };
    });
    cloned.experience = (cloned.experience || []).map((exp) => {
      const { start, end } = parseDurationRange(exp.duration);
      return { ...exp, start_date: start, end_date: end };
    });
    return cloned;
  });

  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillLevel, setNewSkillLevel] = useState('Beginner');
  const [newInterest, setNewInterest] = useState('');
  const [newGoal, setNewGoal] = useState('');

  const [validationErrors, setValidationErrors] = useState({});
  const [skillError, setSkillError] = useState('');
  const [availableRoadmaps, setAvailableRoadmaps] = useState([]);

  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState('');

  const handleClose = useCallback(() => onClose(), [onClose]);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') handleClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [handleClose]);

  useEffect(() => {
    fetchAllRoadmaps()
      .then((data) => {
        if (data && data.length > 0) {
          setAvailableRoadmaps(data.map((r) => r.title));
        } else {
          setAvailableRoadmaps([
            'Frontend Developer', 'Backend Developer', 'Data Scientist',
            'Data Analyst', 'UI/UX Designer', 'Product Manager',
            'Digital Marketer', 'DevOps Engineer', 'AI Engineer',
            'Machine Learning', 'Cloud Computing', 'Database Design'
          ]);
        }
      })
      .catch(() => {
        setAvailableRoadmaps([
          'Frontend Developer', 'Backend Developer', 'Data Scientist',
          'Data Analyst', 'UI/UX Designer', 'Product Manager',
          'Digital Marketer', 'DevOps Engineer', 'AI Engineer',
          'Machine Learning', 'Cloud Computing', 'Database Design'
        ]);
      });
  }, []);

  // Updaters
  const setPersonal = (field, value) =>
    setEditData((p) => ({ ...p, personal: { ...p.personal, [field]: value } }));

  const updateEducation = (id, field, value) =>
    setEditData((p) => ({
      ...p,
      education: p.education.map((e) => (e.id === id ? { ...e, [field]: value } : e)),
    }));
  const removeEducation = (id) =>
    setEditData((p) => ({ ...p, education: p.education.filter((e) => e.id !== id) }));
  const addEducation = () =>
    setEditData((p) => ({
      ...p,
      education: [
        ...p.education,
        { id: generateId(), degree: '', institution: '', year: '', grade: '', start_date: '', end_date: '' },
      ],
    }));

  const removeSkill = (id) =>
    setEditData((p) => ({ ...p, skills: p.skills.filter((s) => s.id !== id) }));
  const addSkill = () => {
    const name = newSkillName.trim();
    if (!name) return;
    const matchedSkill = ALLOWED_SKILLS.find(s => s.toLowerCase() === name.toLowerCase());
    if (!matchedSkill) {
      setSkillError(`Only predefined skills are allowed. Please select one from the suggestions.`);
      return;
    }
    if (editData.skills.some(s => s.name.toLowerCase() === matchedSkill.toLowerCase())) {
      setSkillError("You have already added this skill.");
      return;
    }
    setEditData((p) => ({
      ...p,
      skills: [...p.skills, { id: generateId(), name: matchedSkill, level: newSkillLevel }],
    }));
    setNewSkillName('');
    setNewSkillLevel('Beginner');
    setSkillError('');
  };

  const removeInterest = (interest) =>
    setEditData((p) => ({ ...p, interests: p.interests.filter((i) => i !== interest) }));
  const addInterest = () => {
    const val = newInterest.trim();
    if (!val || editData.interests.includes(val)) return;
    setEditData((p) => ({ ...p, interests: [...p.interests, val] }));
    setNewInterest('');
  };

  const removeGoal = (goal) =>
    setEditData((p) => ({ ...p, careerGoals: p.careerGoals.filter((g) => g !== goal) }));
  const addGoal = () => {
    const val = newGoal.trim();
    if (!val || editData.careerGoals.length >= 3 || editData.careerGoals.includes(val)) return;
    setEditData((p) => ({ ...p, careerGoals: [...p.careerGoals, val] }));
    setNewGoal('');
  };

  const updateExperience = (id, field, value) =>
    setEditData((p) => ({
      ...p,
      experience: p.experience.map((e) => (e.id === id ? { ...e, [field]: value } : e)),
    }));
  const removeExperience = (id) =>
    setEditData((p) => ({ ...p, experience: p.experience.filter((e) => e.id !== id) }));
  const addExperience = () =>
    setEditData((p) => ({
      ...p,
      experience: [
        ...p.experience,
        { id: generateId(), role: '', organization: '', duration: '', description: '', start_date: '', end_date: '' },
      ],
    }));

  // Step Validation
  const validateStep = (stepIdx) => {
    const errors = {};
    if (stepIdx === 0) {
      if (!editData.personal.name || !editData.personal.name.trim()) errors.name = 'Full name is required';
      if (!editData.personal.phone || !editData.personal.phone.trim()) {
        errors.phone = 'Phone number is required';
      } else if (editData.personal.phone.replace(/\D/g, '').length !== 10) {
        errors.phone = 'Phone number must be exactly 10 digits';
      }
      if (!editData.personal.location || !editData.personal.location.trim()) errors.location = 'Location is required';
    } else if (stepIdx === 1) {
      if (!editData.education || editData.education.length === 0) {
        errors.education = 'At least one education entry is required';
      } else {
        editData.education.forEach((edu, idx) => {
          if (!edu.degree || !edu.degree.trim()) errors[`edu_${idx}_degree`] = 'Degree is required';
          if (!edu.institution || !edu.institution.trim()) errors[`edu_${idx}_institution`] = 'Institution is required';
          if (!edu.start_date) errors[`edu_${idx}_start`] = 'Start date is required';
          if (!edu.end_date) errors[`edu_${idx}_end`] = 'End date is required';
        });
      }
    }
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setSaveError('');
      setCurrentStep((c) => Math.min(c + 1, STEPS.length - 1));
    } else {
      setSaveError('Please fill in all mandatory elements and correct errors.');
    }
  };

  const prevStep = () => {
    setSaveError('');
    setCurrentStep((c) => Math.max(c - 1, 0));
  };

  const handleSave = async () => {
    if (!validateStep(currentStep)) {
      setSaveError('Please fill in all mandatory elements and correct errors.');
      return;
    }
    setIsSaving(true);
    setSaveError('');
    setValidationErrors({});

    const preparedData = {
      ...editData,
      education: editData.education.map(edu => {
        const yearStr = formatYearRange(edu.start_date, edu.end_date);
        const { start_date: _s1, end_date: _e1, ...rest } = edu;
        return { ...rest, year: yearStr };
      }),
      experience: editData.experience.map(exp => {
        const durationStr = formatDurationRange(exp.start_date, exp.end_date);
        const { start_date: _s2, end_date: _e2, ...rest } = exp;
        return { ...rest, duration: durationStr };
      })
    };

    const result = await updateProfile(preparedData);
    setIsSaving(false);
    if (result.success) {
      onSave(result.profile);
      onClose();
    } else {
      setSaveError('Failed to save. Please try again.');
    }
  };

  return createPortal(
    <div className="fixed inset-0 z-[100] overflow-y-auto bg-black/60 backdrop-blur-sm flex min-h-full items-start justify-center p-4 sm:p-6 pt-10 pb-10 sm:pt-16 sm:pb-16" onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}>
      <div className="relative w-full max-w-2xl bg-bg-surface rounded-2xl shadow-2xl border border-border flex flex-col overflow-hidden" style={{ maxHeight: '80vh' }} onClick={(e) => e.stopPropagation()}>
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-border shrink-0 bg-bg-surface">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-text-primary">Edit Profile</h2>
            <button onClick={handleClose} className="p-2 rounded-xl text-text-secondary hover:bg-bg-page hover:text-text-primary transition-colors duration-200" aria-label="Close">
              <X className="h-5 w-5" />
            </button>
          </div>
          
          {/* Stepper Progress */}
          <div className="flex items-center justify-between relative z-0">
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-border -z-10 -translate-y-1/2"></div>
            {STEPS.map((step, idx) => {
              const isActive = idx === currentStep;
              const isPast = idx < currentStep;
              return (
                <div key={step} className="flex flex-col items-center gap-1.5 bg-bg-surface px-1">
                  <div className={`h-6 w-6 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                    isActive ? 'bg-primary text-white ring-4 ring-primary/20' :
                    isPast ? 'bg-success text-white' : 'bg-bg-page text-text-secondary border border-border'
                  }`}>
                    {isPast ? <CheckCircle className="h-3.5 w-3.5" /> : idx + 1}
                  </div>
                  <span className={`text-[10px] sm:text-xs font-semibold ${isActive || isPast ? 'text-text-primary' : 'text-text-secondary'}`}>
                    {step}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 min-h-0 overflow-y-auto p-6 scrollbar-thin">
          {currentStep === 0 && (
            <ProfileBasicsStep editData={editData} setPersonal={setPersonal} validationErrors={validationErrors} />
          )}
          {currentStep === 1 && (
            <ProfileEducationStep
              editData={editData} validationErrors={validationErrors}
              updateEducation={updateEducation} removeEducation={removeEducation} addEducation={addEducation}
              updateExperience={updateExperience} removeExperience={removeExperience} addExperience={addExperience}
            />
          )}
          {currentStep === 2 && (
            <ProfileSkillsStep
              editData={editData} removeSkill={removeSkill} addSkill={addSkill}
              newSkillName={newSkillName} setNewSkillName={setNewSkillName}
              newSkillLevel={newSkillLevel} setNewSkillLevel={setNewSkillLevel}
              skillError={skillError} setSkillError={setSkillError} ALLOWED_SKILLS={ALLOWED_SKILLS}
            />
          )}
          {currentStep === 3 && (
            <ProfileGoalsStep
              editData={editData} removeInterest={removeInterest} addInterest={addInterest}
              newInterest={newInterest} setNewInterest={setNewInterest}
              removeGoal={removeGoal} addGoal={addGoal}
              newGoal={newGoal} setNewGoal={setNewGoal} availableRoadmaps={availableRoadmaps}
            />
          )}

          {saveError && (
            <p className="mt-6 text-sm font-semibold text-danger bg-danger/10 border border-danger/20 rounded-xl px-4 py-3">
              {saveError}
            </p>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-border flex items-center justify-between shrink-0 bg-bg-surface">
          <Button variant="ghost" onClick={handleClose} className="text-text-secondary hidden sm:inline-flex">
            Cancel
          </Button>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            {currentStep > 0 && (
              <Button variant="outline" onClick={prevStep} className="flex-1 sm:flex-none">
                Back
              </Button>
            )}
            {currentStep < STEPS.length - 1 ? (
              <Button variant="primary" onClick={nextStep} className="flex-1 sm:flex-none">
                Next
              </Button>
            ) : (
              <Button variant="primary" onClick={handleSave} disabled={isSaving} className="gap-2 flex-1 sm:flex-none">
                {isSaving ? <><Spinner /> Saving…</> : 'Complete Profile'}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
