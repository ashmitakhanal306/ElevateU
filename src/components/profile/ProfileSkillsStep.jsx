import React from 'react';
import { Zap, X, Plus } from 'lucide-react';
import Input from '../ui/Input';

const SKILL_LEVELS = ['Beginner', 'Intermediate', 'Advanced'];

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

export default function ProfileSkillsStep({
  editData,
  removeSkill,
  addSkill,
  newSkillName,
  setNewSkillName,
  newSkillLevel,
  setNewSkillLevel,
  skillError,
  setSkillError,
  ALLOWED_SKILLS,
}) {
  return (
    <section className="animate-fade-in-up">
      <div className="flex items-center gap-2 font-bold text-sm text-warning border-b border-border pb-3 mb-4">
        <Zap className="h-4 w-4 shrink-0" />
        Skills
      </div>

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
  );
}
