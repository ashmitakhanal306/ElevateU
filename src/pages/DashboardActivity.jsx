import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ClipboardCheck, BookOpen, FileText, Compass, Activity, ArrowRight } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import EmptyState from '../components/ui/EmptyState';

const ACTIVITY_META = {
  assessment: {
    Icon: ClipboardCheck,
    bg:   'bg-accent/10',
    text: 'text-accent',
  },
  course: {
    Icon: BookOpen,
    bg:   'bg-success/10',
    text: 'text-success',
  },
  resume: {
    Icon: FileText,
    bg:   'bg-warning/10',
    text: 'text-warning',
  },
};

const QUICK_ACTIONS = [
  { label: 'Take an assessment',    path: '/assessment',             Icon: ClipboardCheck },
  { label: 'View career matches',   path: '/career-recommendations', Icon: Compass        },
  { label: 'Browse courses & jobs', path: '/courses',                Icon: BookOpen       },
  { label: 'Analyse my resume',     path: '/resume-analysis',        Icon: FileText       },
];

export default function DashboardActivity({ recentActivity = [] }) {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Recent Activity feed */}
      <Card className="p-6 flex flex-col">
        <h3 className="font-bold mb-5 flex items-center gap-2">
          <Activity className="h-5 w-5 text-primary" />
          Recent Activity
        </h3>
        
        {recentActivity.length === 0 ? (
          <EmptyState
            icon={Activity}
            title="No recent activity"
            message="Your completed actions will appear here."
          />
        ) : (
          <div className="space-y-4">
            {recentActivity.map((item, idx) => {
              const meta = ACTIVITY_META[item.type] ?? ACTIVITY_META.assessment;
              const { Icon, bg, text } = meta;
              return (
                <div key={idx} className="flex items-start gap-3 group">
                  <div className={`p-2 rounded-xl ${bg} ${text} shrink-0 transition-transform duration-200 group-hover:scale-110`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-text-primary leading-snug truncate">
                      {item.label}
                    </p>
                    <p className="text-xs text-text-secondary mt-0.5">{item.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Card>

      {/* Quick Actions panel */}
      <Card className="p-6">
        <h3 className="font-bold mb-5 flex items-center gap-2">
          <ArrowRight className="h-5 w-5 text-secondary" />
          Quick Actions
        </h3>
        <div className="grid grid-cols-1 gap-3">
          {QUICK_ACTIONS.map(({ label, path, Icon }) => (
            <Button
              key={path}
              variant="outline"
              onClick={() => navigate(path)}
              className="flex items-center gap-3 w-full px-4 py-3 text-left font-semibold text-text-primary group active:scale-[0.98] h-auto border-border bg-bg-surface hover:bg-bg-page hover:border-secondary/40"
            >
              <div className="p-1.5 rounded-lg bg-secondary/10 text-secondary group-hover:bg-secondary group-hover:text-white transition-all duration-200">
                <Icon className="h-4 w-4" />
              </div>
              {label}
              <ArrowRight className="h-3.5 w-3.5 ml-auto text-text-secondary group-hover:text-secondary group-hover:translate-x-0.5 transition-all duration-200" />
            </Button>
          ))}
        </div>
      </Card>
    </div>
  );
}
