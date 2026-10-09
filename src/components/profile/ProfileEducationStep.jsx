import React from 'react';
import { GraduationCap, Briefcase, Plus, Trash2 } from 'lucide-react';
import Input from '../ui/Input';
import Button from '../ui/Button';

export default function ProfileEducationStep({
  editData,
  validationErrors,
  updateEducation,
  removeEducation,
  addEducation,
  updateExperience,
  removeExperience,
  addExperience,
}) {
  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* ── Education ── */}
      <section>
        <div className="flex items-center gap-2 font-bold text-sm text-primary border-b border-border pb-3 mb-4">
          <GraduationCap className="h-4 w-4 shrink-0" />
          Education *
        </div>
        {validationErrors.education && (
          <p className="text-xs font-semibold text-danger mb-3">{validationErrors.education}</p>
        )}
        <div className="space-y-4">
          {editData.education.map((edu, idx) => (
            <div
              key={edu.id}
              className="relative border border-border rounded-xl p-4 space-y-3 bg-bg-page"
            >
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

      {/* ── Experience ── */}
      <section>
        <div className="flex items-center gap-2 font-bold text-sm text-secondary border-b border-border pb-3 mb-4">
          <Briefcase className="h-4 w-4 shrink-0" />
          Experience
        </div>
        <div className="space-y-4">
          {editData.experience.map((exp) => (
            <div
              key={exp.id}
              className="relative border border-border rounded-xl p-4 space-y-3 bg-bg-page"
            >
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
            </div>
          ))}

          <Button variant="outline" size="sm" onClick={addExperience} className="gap-2">
            <Plus className="h-4 w-4" />
            Add experience
          </Button>
        </div>
      </section>
    </div>
  );
}
