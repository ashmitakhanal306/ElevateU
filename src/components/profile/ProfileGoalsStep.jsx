import React from 'react';
import { Heart, Target, X, Plus } from 'lucide-react';
import Input from '../ui/Input';
import Button from '../ui/Button';

export default function ProfileGoalsStep({
  editData,
  removeInterest,
  addInterest,
  newInterest,
  setNewInterest,
  removeGoal,
  addGoal,
  newGoal,
  setNewGoal,
  availableRoadmaps,
}) {
  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* ── Interests ── */}
      <section>
        <div className="flex items-center gap-2 font-bold text-sm text-danger border-b border-border pb-3 mb-4">
          <Heart className="h-4 w-4 shrink-0" />
          Interests
        </div>
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

      {/* ── Career Goals ── */}
      <section>
        <div className="flex items-center gap-2 font-bold text-sm text-success border-b border-border pb-3 mb-4">
          <Target className="h-4 w-4 shrink-0" />
          Career Goals
          <span className="ml-auto text-xs font-normal text-text-secondary">
            {editData.careerGoals.length}/3
          </span>
        </div>
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
    </div>
  );
}
