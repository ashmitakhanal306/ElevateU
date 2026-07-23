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
  const [editData, setEditData] = useState(() => JSON.parse(JSON.stringify(profile)));

  // ── Add-row local state (inputs for new items) ──────────────────────────
  const [newSkillName,  setNewSkillName]  = useState('');
  const [newSkillLevel, setNewSkillLevel] = useState('Beginner');
  const [newInterest,   setNewInterest]   = useState('');
  const [newGoal,       setNewGoal]       = useState('');

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
        { id: generateId(), degree: '', institution: '', year: '', grade: '' },
      ],
    }));


  // ─── Updaters: Skills ─────────────────────────────────────────────────

  const removeSkill = (id) =>
    setEditData((p) => ({ ...p, skills: p.skills.filter((s) => s.id !== id) }));

  const addSkill = () => {
    const name = newSkillName.trim();
    if (!name) return;
    setEditData((p) => ({
      ...p,
      skills: [...p.skills, { id: generateId(), name, level: newSkillLevel }],
    }));
    setNewSkillName('');
    setNewSkillLevel('Beginner');
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
        { id: generateId(), role: '', organization: '', duration: '', description: '' },
      ],
    }));


  // ─── Save Handler ─────────────────────────────────────────────────────

  const handleSave = async () => {
    setIsSaving(true);
    setSaveError('');

    const result = await updateProfile(editData);

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
      className="fixed inset-0 z-[100] flex items-start justify-center bg-black/50 backdrop-blur-sm p-4 sm:p-6 overflow-y-auto"
      onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
    >
      {/* Modal panel */}
      <div
        className="w-full max-w-2xl my-6 bg-bg-surface rounded-2xl shadow-2xl border border-border flex flex-col"
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
                label="Full name"
                value={editData.personal.name}
                onChange={(e) => setPersonal('name', e.target.value)}
                placeholder="Your full name"
              />
              <Input
                label="Email address"
                type="email"
                value={editData.personal.email}
                onChange={(e) => setPersonal('email', e.target.value)}
                placeholder="you@example.com"
              />
              <Input
                label="Phone number"
                type="tel"
                value={editData.personal.phone}
                onChange={(e) => setPersonal('phone', e.target.value)}
                placeholder="+91 98765 43210"
              />
              <Input
                label="Location"
                value={editData.personal.location}
                onChange={(e) => setPersonal('location', e.target.value)}
                placeholder="City, State"
              />
            </div>
          </section>

          {/* ── 2. Education ────────────────────────────────────────────── */}
          <section>
            <SectionTitle icon={GraduationCap} iconClass="text-primary">
              Education
            </SectionTitle>
            <div className="space-y-4">
              {editData.education.map((edu) => (
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
                    label="Degree / Qualification"
                    value={edu.degree}
                    onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                    placeholder="B.Tech in Computer Science"
                  />
                  <Input
                    label="Institution"
                    value={edu.institution}
                    onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                    placeholder="University or School name"
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <Input
                      label="Year"
                      value={edu.year}
                      onChange={(e) => updateEducation(edu.id, 'year', e.target.value)}
                      placeholder="2021 – 2025"
                    />
                    <Input
                      label="Grade / GPA"
                      value={edu.grade}
                      onChange={(e) => updateEducation(edu.id, 'grade', e.target.value)}
                      placeholder="8.5 CGPA"
                    />
                  </div>
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
                  onChange={(e) => setNewSkillName(e.target.value)}
                  placeholder="e.g. TypeScript"
                  onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addSkill(); }}}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="text-xs font-semibold text-text-secondary tracking-wide">Level</span>
                <LevelSelect value={newSkillLevel} onChange={setNewSkillLevel} />
              </div>
              <button
                onClick={addSkill}
                className="mb-0.5 h-[42px] px-3 rounded-xl border border-border bg-bg-surface hover:bg-secondary hover:text-white hover:border-secondary text-text-secondary transition-all duration-200 flex items-center justify-center"
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
              <div className="flex-1">
                <Input
                  label="Add career goal"
                  value={newGoal}
                  onChange={(e) => setNewGoal(e.target.value)}
                  placeholder="e.g. Machine Learning Engineer"
                  disabled={editData.careerGoals.length >= 3}
                  onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addGoal(); }}}
                />
              </div>
              <button
                onClick={addGoal}
                disabled={editData.careerGoals.length >= 3}
                className="mb-0.5 h-[42px] px-3 rounded-xl border border-border bg-bg-surface hover:bg-secondary hover:text-white hover:border-secondary text-text-secondary transition-all duration-200 flex items-center justify-center disabled:opacity-40 disabled:pointer-events-none"
                aria-label="Add career goal"
              >
                <Plus className="h-4 w-4" />
              </button>
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
                  <Input
                    label="Duration"
                    value={exp.duration}
                    onChange={(e) => updateExperience(exp.id, 'duration', e.target.value)}
                    placeholder="Jun 2024 – Aug 2024"
                  />
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
