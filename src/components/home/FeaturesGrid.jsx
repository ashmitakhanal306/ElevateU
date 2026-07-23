import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import { ClipboardList, Target, AlertTriangle, FileText, Map, MessageCircle } from 'lucide-react';

const FEATURES = [
  {
    title: 'AI Skill Assessments',
    description: 'Dynamic tests that adapt to your level and accurately gauge your current knowledge.',
    icon: ClipboardList,
    variant: 'primary'
  },
  {
    title: 'Career Recommendations',
    description: 'Discover your perfect career matches based on your unique skills and interests.',
    icon: Target,
    variant: 'secondary'
  },
  {
    title: 'Skill Gap Analysis',
    description: 'Instantly see what you need to learn to bridge the gap to your dream role.',
    icon: AlertTriangle,
    variant: 'info'
  },
  {
    title: 'Resume Analysis',
    description: 'Get actionable feedback on your resume to stand out to top recruiters.',
    icon: FileText,
    variant: 'success'
  },
  {
    title: 'Personalized Roadmaps',
    description: 'Follow a curated, step-by-step learning path designed exclusively for you.',
    icon: Map,
    variant: 'warning'
  },
  {
    title: '24/7 AI Chatbot',
    description: 'Never get stuck again. Your personal AI mentor is available around the clock.',
    icon: MessageCircle,
    variant: 'danger'
  }
];

export default function FeaturesGrid() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section id="features" className="py-24 px-6 sm:px-10 bg-bg-surface relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20 max-w-2xl mx-auto">
          <Badge variant="warning" className="mb-6 px-4 py-1.5 text-sm">Why ElevateU</Badge>
          <h2 className="text-4xl sm:text-5xl font-black text-text-primary tracking-tight mb-6">
            Everything you need to accelerate your career
          </h2>
          <p className="text-xl text-text-secondary">
            Our AI-powered platform provides a comprehensive suite of tools to help you navigate your professional journey.
          </p>
        </div>

        <motion.div 
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {FEATURES.map((feature, index) => {
            const Icon = feature.icon;
            const topBorders = {
              primary: 'border-t-primary',
              secondary: 'border-t-secondary',
              info: 'border-t-accent',
              success: 'border-t-success',
              warning: 'border-t-warning',
              danger: 'border-t-danger',
            };

            return (
              <motion.div key={index} variants={itemVariants}>
                <Card 
                  className={`p-8 h-full shadow-lg hover:shadow-2xl hover:shadow-primary/30 transition-all duration-300 hover:-translate-y-3 hover:scale-[1.04] bg-bg-page border-2 border-border border-t-4 ${topBorders[feature.variant]}`}
                >
                  <div className="mb-8 inline-flex">
                    <Badge variant={feature.variant} className="p-5 rounded-[2rem]">
                      <Icon className="w-10 h-10" />
                    </Badge>
                  </div>
                  <h3 className="text-2xl font-bold text-text-primary mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-lg text-text-secondary leading-relaxed">
                    {feature.description}
                  </p>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
