import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { User, ClipboardList, Target, Compass } from 'lucide-react';

const STEPS = [
  {
    num: '01',
    title: 'Build your profile',
    description: 'Add your education, interests, and current skills to tailor the platform to you.',
    icon: User
  },
  {
    num: '02',
    title: 'Take skill assessments',
    description: 'Test your knowledge across various technical and soft skills to identify gaps.',
    icon: ClipboardList
  },
  {
    num: '03',
    title: 'Get career matches',
    description: 'Our engine matches your profile with high-growth career paths just for you.',
    icon: Target
  },
  {
    num: '04',
    title: 'Follow your roadmap',
    description: 'Complete targeted milestones and recommended courses to land your dream job.',
    icon: Compass
  }
];

export default function HowItWorks() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
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
    <section id="how-it-works" className="py-32 px-6 sm:px-10 bg-bg-page border-y border-border overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24 max-w-3xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-black text-text-primary tracking-tight mb-6">
            How it works
          </h2>
          <p className="text-xl text-text-secondary">
            Your journey from student to professional in 4 simple steps.
          </p>
        </div>

        <div ref={ref} className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-14 left-[10%] right-[10%] h-1.5 bg-border rounded-full z-0 overflow-hidden">
            <motion.div 
              className="h-full bg-primary rounded-full origin-left"
              initial={{ scaleX: 0 }}
              animate={inView || shouldReduceMotion ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
            />
          </div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-4 gap-16 md:gap-8 relative z-10"
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            {STEPS.map((step, index) => {
              const Icon = step.icon;
              
              return (
                <motion.div 
                  key={index} 
                  className="flex flex-col items-center text-center group"
                  variants={itemVariants}
                >
                  <div className="relative mb-10 flex justify-center items-center">
                    {/* Icon Container */}
                    <div className="relative z-10 w-20 h-20 bg-primary border-[3px] border-primary/80 rounded-3xl flex items-center justify-center group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-primary/40 transition-all duration-300">
                      <Icon className="w-8 h-8 text-bg-surface" />
                      {/* Step Number Badge */}
                      <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary text-white text-xs font-black flex items-center justify-center border-2 border-bg-page shadow-md">
                        {step.num}
                      </span>
                    </div>
                  </div>
                  
                  <h3 className="font-bold text-text-primary text-2xl mb-4">
                    {step.title}
                  </h3>
                  <p className="text-lg text-text-secondary leading-relaxed">
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
          
          {/* Mobile connecting line (Vertical) */}
          <div className="md:hidden absolute top-[10%] bottom-[10%] left-1/2 w-1.5 -translate-x-1/2 bg-border rounded-full z-0 overflow-hidden">
            <motion.div 
              className="w-full h-full bg-primary rounded-full origin-top"
              initial={{ scaleY: 0 }}
              animate={inView || shouldReduceMotion ? { scaleY: 1 } : { scaleY: 0 }}
              transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
