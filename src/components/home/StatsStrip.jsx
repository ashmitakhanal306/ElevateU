import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { Brain, Route, BookOpen, Shield } from 'lucide-react';

const FEATURES = [
  { label: 'AI-Powered Assessments', description: 'Adaptive skill tests', icon: Brain },
  { label: 'Personalized Roadmaps', description: 'Step-by-step career paths', icon: Route },
  { label: 'Curated Learning', description: 'Courses & job matches', icon: BookOpen },
  { label: 'Resume Analysis', description: 'AI-driven feedback', icon: Shield },
];

export default function StatsStrip() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
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
    <section 
      ref={ref}
      className="bg-gradient-to-r from-primary to-secondary py-16 px-6 sm:px-10 overflow-hidden"
    >
      <motion.div 
        className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        {FEATURES.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <motion.div 
              key={index} 
              className="flex items-center gap-4 text-left"
              variants={itemVariants}
            >
              <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
                <Icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">
                  {feature.label}
                </h3>
                <p className="text-sm text-white/70">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
