/**
 * EditProfileModal.jsx
 *
 * Full-screen overlay modal for editing every section of the student profile:
 *   - Personal info (name, email, phone, location)
 *   - Education entries  (add / remove rows)
 *   - Skills             (add with level, remove chips)
 *   - Interests          (add/remove chips)
 *   - Career goals       (add/remove chips, max 3)
 *   - Experience entries (add / remove rows)
 *
 * Props:
 *   profile  {Object}   – Current profile data (will be deep-copied into local state)
 *   onClose  {Function} – Close without saving
 *   onSave   {Function} – Called with the updated profile object after a successful PUT
 */

import React, { useState, useEffect, useCallback } from 'react';
import { X, Plus, Trash2, GraduationCap, Briefcase, Zap, Heart, Target, User } from 'lucide-react';

import { updateProfile } from '../../services/profileService';
import { fetchAllRoadmaps } from '../../services/roadmapService';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Badge from '../ui/Badge';

// ─── Constants ────────────────────────────────────────────────────────────────

const SKILL_LEVELS = ['Beginner', 'Intermediate', 'Advanced'];

/** Badge variant keyed by skill level */
const LEVEL_VARIANT = {
  Beginner:     'info',
  Intermediate: 'warning',
  Advanced:     'success',
};

/** Simple unique ID for new array entries (no external lib needed) */
const generateId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;

/** Valid skills dictionary to restrict skills section input */
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


// ─── Sub-components ───────────────────────────────────────────────────────────

/** Section divider with title + icon inside the modal body */
function SectionTitle({ icon: Icon, iconClass, children }) {
  return (
    <div className={`flex items-center gap-2 font-bold text-sm text-text-primary border-b border-border pb-3 mb-4 ${iconClass}`}>
      <Icon className="h-4 w-4 shrink-0" />
      {children}
    </div>
  );
}

/** Styled select matching Input component aesthetics */
function LevelSelect({ value, onChange }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="px-3 py-2.5 text-sm rounded-xl border border-border bg-bg-surface text-text-primary focus:outline-none focus:ring-4 focus:ring-secondary/25 focus:border-secondary transition-all duration-200 cursor-pointer"
    >
      {SKILL_LEVELS.map((lvl) => (
        <option key={lvl} value={lvl}>{lvl}</option>
      ))}
    </select>
  );
}

/** Styled textarea that matches Input component styling */
function TextArea({ label, value, onChange, placeholder, rows = 3 }) {
  return (
    <div className="flex flex-col gap-1.5 w-full text-left">
      {label && (
        <label className="text-xs font-semibold text-text-secondary select-none tracking-wide">
          {label}
        </label>
      )}
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        placeholder={placeholder}
        className="w-full px-4 py-2.5 text-sm rounded-xl bg-bg-surface border border-border text-text-primary placeholder-text-secondary/40 focus:outline-none focus:ring-4 focus:ring-secondary/25 focus:border-secondary transition-all duration-200 resize-none"
      />
    </div>
  );
}

/** Animated saving spinner */
function Spinner() {
  return (
    <svg className="animate-spin h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  );
}


// ─── Main Component ───────────────────────────────────────────────────────────

export default function EditProfileModal({ profile, onClose, onSave }) {
  // ── Local edit state — deep-cloned from prop so we never mutate parent ──
  const [editData, setEditData] = useState(() => {
    const cloned = JSON.parse(JSON.stringify(profile));
    
    // Parse Year range into start_date and end_date date inputs
    cloned.education = (cloned.education || []).map((edu) => {
      const { start, end } = parseYearRange(edu.year);
      return { ...edu, start_date: start, end_date: end };
    });

    // Parse Duration range into start_date and end_date date inputs
    cloned.experience = (cloned.experience || []).map((exp) => {
      const { start, end } = parseDurationRange(exp.duration);
      return { ...exp, start_date: start, end_date: end };
    });

    return cloned;
  });

  // ── Add-row local state (inputs for new items) ──────────────────────────
  const [newSkillName,  setNewSkillName]  = useState('');
  const [newSkillLevel, setNewSkillLevel] = useState('Beginner');
  const [newInterest,   setNewInterest]   = useState('');
  const [newGoal,       setNewGoal]       = useState('');

  // ── Validation and alignment states ──────────────────────────────────────
  const [validationErrors, setValidationErrors] = useState({});
  const [skillError, setSkillError]             = useState('');
  const [availableRoadmaps, setAvailableRoadmaps] = useState([]);

  // ── Async save state ────────────────────────────────────────────────────
  const [isSaving,   setIsSaving]   = useState(false);
  const [saveError,  setSaveError]  = useState('');

  // ── Close on Escape key & lock body scroll ──────────────────────────────
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

  // ── Load roadmaps on mount for Career Goals dropdown alignment ─────────
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


  // ─── Updaters: Personal ────────────────────────────────────────────────

  const setPersonal = (field, value) =>
    setEditData((p) => ({ ...p, personal: { ...p.personal, [field]: value } }));


  // ─── Updaters: Education ──────────────────────────────────────────────

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


  // ─── Updaters: Skills ─────────────────────────────────────────────────

  const removeSkill = (id) =>
    setEditData((p) => ({ ...p, skills: p.skills.filter((s) => s.id !== id) }));

  const addSkill = () => {
    const name = newSkillName.trim();
    if (!name) return;
    
    // Find skill in allowed list case-insensitively
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


  // ─── Updaters: Interests ──────────────────────────────────────────────

  const removeInterest = (interest) =>
    setEditData((p) => ({ ...p, interests: p.interests.filter((i) => i !== interest) }));

  const addInterest = () => {
    const val = newInterest.trim();
    if (!val || editData.interests.includes(val)) return;
    setEditData((p) => ({ ...p, interests: [...p.interests, val] }));
    setNewInterest('');
  };


  // ─── Updaters: Career Goals (max 3) ───────────────────────────────────

  const removeGoal = (goal) =>
    setEditData((p) => ({ ...p, careerGoals: p.careerGoals.filter((g) => g !== goal) }));

  const addGoal = () => {
    const val = newGoal.trim();
    if (!val || editData.careerGoals.length >= 3 || editData.careerGoals.includes(val)) return;
    setEditData((p) => ({ ...p, careerGoals: [...p.careerGoals, val] }));
    setNewGoal('');
  };


  // ─── Updaters: Experience ─────────────────────────────────────────────

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


  // ─── Save Handler ─────────────────────────────────────────────────────

  const handleSave = async () => {
    // ── Validation checks ──
    const errors = {};
    if (!editData.personal.name || !editData.personal.name.trim()) {
      errors.name = 'Full name is required';
    }
    if (!editData.personal.phone || !editData.personal.phone.trim()) {
      errors.phone = 'Phone number is required';
    } else if (editData.personal.phone.replace(/\D/g, '').length !== 10) {
      errors.phone = 'Phone number must be exactly 10 digits';
    }
    if (!editData.personal.location || !editData.personal.location.trim()) {
      errors.location = 'Location is required';
    }

    if (!editData.education || editData.education.length === 0) {
      errors.education = 'At least one education entry is required';
    } else {
      editData.education.forEach((edu, idx) => {
        if (!edu.degree || !edu.degree.trim()) {
          errors[`edu_${idx}_degree`] = 'Degree is required';
        }
        if (!edu.institution || !edu.institution.trim()) {
          errors[`edu_${idx}_institution`] = 'Institution is required';
        }
        if (!edu.start_date) {
          errors[`edu_${idx}_start`] = 'Start date is required';
        }
        if (!edu.end_date) {
          errors[`edu_${idx}_end`] = 'End date is required';
        }
      });
    }

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      setSaveError('Please fill in all mandatory elements and correct errors.');
      return;
    }

    setIsSaving(true);
    setSaveError('');
    setValidationErrors({});

    // Map start/end dates back to combined strings
    const preparedData = {
      ...editData,
      education: editData.education.map(edu => {
        const yearStr = formatYearRange(edu.start_date, edu.end_date);
        const { start_date, end_date, ...rest } = edu;
        return { ...rest, year: yearStr };
      }),
      experience: editData.experience.map(exp => {
        const durationStr = formatDurationRange(exp.start_date, exp.end_date);
        const { start_date, end_date, ...rest } = exp;
        return { ...rest, duration: durationStr };
      })
    };

    const result = await updateProfile(preparedData);

    setIsSaving(false);

    if (result.success) {
      onSave(result.profile);   // update parent state
      onClose();
    } else {
      setSaveError('Failed to save. Please try again.');
    }
  };


  // ─── Render ───────────────────────────────────────────────────────────

  return (
    /* Backdrop — click outside to close */
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 sm:p-6 overflow-y-auto"
      onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
    >
      {/* Modal panel */}
      <div
        className="relative w-full max-w-2xl my-auto bg-bg-surface rounded-2xl shadow-2xl border border-border flex flex-col max-h-[calc(100vh-48px)] sm:max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >


        {/* ── Modal header ── */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border shrink-0">
          <h2 className="text-lg font-bold text-text-primary">Edit Profile</h2>
          <button
            onClick={handleClose}
            className="p-2 rounded-xl text-text-secondary hover:bg-bg-page hover:text-text-primary transition-colors duration-200"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* ── Scrollable body ── */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8 scrollbar-thin">

          {/* ── 1. Personal Information ─────────────────────────────────── */}
          <section>
            <SectionTitle icon={User} iconClass="text-secondary">
              Personal Information
            </SectionTitle>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Full name *"
                value={editData.personal.name}
                onChange={(e) => setPersonal('name', e.target.value.replace(/[^a-zA-Z\s]/g, ''))}
                placeholder="Your full name (alphabets only)"
                error={validationErrors.name}
              />
              <Input
                label="Email address"
                type="email"
                value={editData.personal.email}
                onChange={(e) => setPersonal('email', e.target.value)}
                placeholder="you@example.com"
              />
              <Input
                label="Phone number *"
                type="tel"
                value={editData.personal.phone}
                onChange={(e) => setPersonal('phone', e.target.value.replace(/\D/g, '').slice(0, 10))}
                placeholder="e.g. 9876543210 (10 digits numeric)"
                error={validationErrors.phone}
              />
              <Input
                label="Location *"
                value={editData.personal.location}
                onChange={(e) => setPersonal('location', e.target.value)}
                placeholder="City, State"
                error={validationErrors.location}
              />
            </div>
          </section>

          {/* ── 2. Education ────────────────────────────────────────────── */}
          <section>
            <SectionTitle icon={GraduationCap} iconClass="text-primary">
              Education *
            </SectionTitle>
            {validationErrors.education && (
              <p className="text-xs font-semibold text-danger mb-3">{validationErrors.education}</p>
            )}
            <div className="space-y-4">
              {editData.education.map((edu, idx) => (
                <div
                  key={edu.id}
                  className="relative border border-border rounded-xl p-4 space-y-3 bg-bg-page"
                >
                  {/* Remove button */}
                  <button
                    onClick={() => removeEducation(edu.id)}
                    className="absolute top-3 right-3 p-1.5 rounded-lg text-text-secondary hover:bg-danger/10 hover:text-danger transition-colors duration-200"
                    aria-label="Remove education entry"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>

                  <Input
                    label="Degree / Qualification *"
                    value={edu.degree}
                    onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                    placeholder="B.Tech in Computer Science"
                    error={validationErrors[`edu_${idx}_degree`]}
                  />
                  <Input
                    label="Institution *"
                    value={edu.institution}
                    onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                    placeholder="University or School name"
                    error={validationErrors[`edu_${idx}_institution`]}
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Input
                      label="Start Date *"
                      type="date"
                      value={edu.start_date || ''}
                      onChange={(e) => updateEducation(edu.id, 'start_date', e.target.value)}
                      error={validationErrors[`edu_${idx}_start`]}
                    />
                    <Input
                      label="End Date (or Expected) *"
                      type="date"
                      value={edu.end_date || ''}
                      onChange={(e) => updateEducation(edu.id, 'end_date', e.target.value)}
                      error={validationErrors[`edu_${idx}_end`]}
                    />
                  </div>
                  <Input
                    label="Grade / GPA"
                    value={edu.grade}
                    onChange={(e) => updateEducation(edu.id, 'grade', e.target.value)}
                    placeholder="8.5 CGPA"
                  />
                </div>
              ))}

              <Button variant="outline" size="sm" onClick={addEducation} className="gap-2">
                <Plus className="h-4 w-4" />
                Add education
              </Button>
            </div>
          </section>

          {/* ── 3. Skills ───────────────────────────────────────────────── */}
          <section>
            <SectionTitle icon={Zap} iconClass="text-warning">
              Skills
            </SectionTitle>

            {/* Existing skills as removable chips */}
            <div className="flex flex-wrap gap-2 mb-4">
              {editData.skills.map((skill) => (
                <span
                  key={skill.id}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border transition-colors duration-200 bg-bg-page border-border text-text-primary"
                >
                  <span className={`h-1.5 w-1.5 rounded-full ${
                    skill.level === 'Advanced'     ? 'bg-success' :
                    skill.level === 'Intermediate' ? 'bg-warning' : 'bg-accent'
                  }`} />
                  {skill.name} · {skill.level}
                  <button
                    onClick={() => removeSkill(skill.id)}
                    className="ml-0.5 text-text-secondary hover:text-danger transition-colors"
                    aria-label={`Remove ${skill.name}`}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>

            {/* Add skill row */}
            <div className="flex gap-2 items-end">
              <div className="flex-1">
                <Input
                  label="Skill name"
                  value={newSkillName}
                  onChange={(e) => { setNewSkillName(e.target.value); setSkillError(''); }}
                  placeholder="Select a skill from list..."
                  list="skills-list"
                  error={skillError}
                  onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addSkill(); }}}
                />
                <datalist id="skills-list">
                  {ALLOWED_SKILLS.map((skill) => (
                    <option key={skill} value={skill} />
                  ))}
                </datalist>
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="text-xs font-semibold text-text-secondary tracking-wide">Level</span>
                <LevelSelect value={newSkillLevel} onChange={setNewSkillLevel} />
              </div>
              <button
                type="button"
                onClick={addSkill}
                className="mb-0.5 h-[42px] px-3 rounded-xl border border-border bg-bg-surface hover:bg-secondary hover:text-white hover:border-secondary text-text-secondary transition-all duration-200 flex items-center justify-center font-bold"
                aria-label="Add skill"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </section>

          {/* ── 4. Interests ────────────────────────────────────────────── */}
          <section>
            <SectionTitle icon={Heart} iconClass="text-danger">
              Interests
            </SectionTitle>

            {/* Existing interest chips */}
            <div className="flex flex-wrap gap-2 mb-4">
              {editData.interests.map((interest) => (
                <span
                  key={interest}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-accent/10 text-accent border border-accent/20"
                >
                  {interest}
                  <button
                    onClick={() => removeInterest(interest)}
                    className="ml-0.5 hover:text-danger transition-colors"
                    aria-label={`Remove ${interest}`}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
              {editData.interests.length === 0 && (
                <span className="text-xs text-text-secondary italic">No interests added yet.</span>
              )}
            </div>

            {/* Add interest row */}
            <div className="flex gap-2 items-end">
              <div className="flex-1">
                <Input
                  label="Add interest"
                  value={newInterest}
                  onChange={(e) => setNewInterest(e.target.value)}
                  placeholder="e.g. Cloud Computing"
                  onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addInterest(); }}}
                />
              </div>
              <button
                onClick={addInterest}
                className="mb-0.5 h-[42px] px-3 rounded-xl border border-border bg-bg-surface hover:bg-secondary hover:text-white hover:border-secondary text-text-secondary transition-all duration-200 flex items-center justify-center"
                aria-label="Add interest"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </section>

          {/* ── 5. Career Goals ─────────────────────────────────────────── */}
          <section>
            <SectionTitle icon={Target} iconClass="text-success">
              Career Goals
              <span className="ml-auto text-xs font-normal text-text-secondary">
                {editData.careerGoals.length}/3
              </span>
            </SectionTitle>

            {/* Existing goal chips */}
            <div className="flex flex-wrap gap-2 mb-4">
              {editData.careerGoals.map((goal) => (
                <span
                  key={goal}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-success/10 text-success border border-success/20"
                >
                  {goal}
                  <button
                    onClick={() => removeGoal(goal)}
                    className="ml-0.5 hover:text-danger transition-colors"
                    aria-label={`Remove ${goal}`}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
              {editData.careerGoals.length === 0 && (
                <span className="text-xs text-text-secondary italic">No goals added yet.</span>
              )}
            </div>

            {/* Add goal row */}
            <div className="flex gap-2 items-end">
              <div className="flex-1 text-left">
                <label className="text-xs font-semibold text-text-secondary select-none tracking-wide mb-1.5 block">
                  Select Career Goal (aligned with roadmaps)
                </label>
                <select
                  value={newGoal}
                  onChange={(e) => setNewGoal(e.target.value)}
                  disabled={editData.careerGoals.length >= 3}
                  className="w-full px-4 py-2.5 text-sm rounded-xl border border-border bg-bg-surface text-text-primary focus:outline-none focus:ring-4 focus:ring-secondary/25 focus:border-secondary transition-all duration-200 cursor-pointer disabled:opacity-50"
                >
                  <option value="">-- Choose a career goal --</option>
                  {availableRoadmaps
                    .filter((title) => !editData.careerGoals.includes(title))
                    .map((title) => (
                      <option key={title} value={title}>
                        {title}
                      </option>
                    ))}
                </select>
              </div>
              <Button
                type="button"
                variant="outline"
                onClick={addGoal}
                disabled={editData.careerGoals.length >= 3 || !newGoal}
                className="mb-0.5 h-[42px] px-4 rounded-xl border border-border hover:bg-secondary hover:text-white"
              >
                <Plus className="h-4 w-4 mr-1" /> Add
              </Button>
            </div>
            {editData.careerGoals.length >= 3 && (
              <p className="text-xs text-text-secondary mt-2">
                Maximum 3 career goals reached. Remove one to add another.
              </p>
            )}
          </section>

          {/* ── 6. Experience ───────────────────────────────────────────── */}
          <section>
            <SectionTitle icon={Briefcase} iconClass="text-secondary">
              Experience
            </SectionTitle>
            <div className="space-y-4">
              {editData.experience.map((exp) => (
                <div
                  key={exp.id}
                  className="relative border border-border rounded-xl p-4 space-y-3 bg-bg-page"
                >
                  {/* Remove button */}
                  <button
                    onClick={() => removeExperience(exp.id)}
                    className="absolute top-3 right-3 p-1.5 rounded-lg text-text-secondary hover:bg-danger/10 hover:text-danger transition-colors duration-200"
                    aria-label="Remove experience entry"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Input
                      label="Role / Title"
                      value={exp.role}
                      onChange={(e) => updateExperience(exp.id, 'role', e.target.value)}
                      placeholder="Frontend Developer Intern"
                    />
                    <Input
                      label="Organization"
                      value={exp.organization}
                      onChange={(e) => updateExperience(exp.id, 'organization', e.target.value)}
                      placeholder="Company or Project name"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Input
                      label="Start Date"
                      type="date"
                      value={exp.start_date || ''}
                      onChange={(e) => updateExperience(exp.id, 'start_date', e.target.value)}
                    />
                    <Input
                      label="End Date"
                      type="date"
                      value={exp.end_date || ''}
                      onChange={(e) => updateExperience(exp.id, 'end_date', e.target.value)}
                    />
                  </div>
                  <TextArea
                    label="Description"
                    value={exp.description}
                    onChange={(val) => updateExperience(exp.id, 'description', val)}
                    placeholder="Describe your responsibilities, achievements, and impact..."
                    rows={3}
                  />
                </div>
              ))}

              <Button variant="outline" size="sm" onClick={addExperience} className="gap-2">
                <Plus className="h-4 w-4" />
                Add experience
              </Button>
            </div>
          </section>

        </div>{/* end scrollable body */}

        {/* ── Modal footer ── */}
        <div className="px-6 py-4 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0 bg-bg-surface rounded-b-2xl">
          {/* Save error */}
          {saveError && (
            <p className="text-xs text-danger font-medium">{saveError}</p>
          )}
          <div className="flex gap-3 ml-auto">
            <Button variant="outline" onClick={handleClose} disabled={isSaving}>
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleSave}
              disabled={isSaving}
              className="gap-2 min-w-[130px]"
            >
              {isSaving ? (
                <>
                  <Spinner />
                  Saving…
                </>
              ) : (
                'Save changes'
              )}
            </Button>
          </div>
        </div>

      </div>{/* end modal panel */}
    </div>
  );
}
