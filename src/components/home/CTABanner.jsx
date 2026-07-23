import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useInView, useReducedMotion } from 'framer-motion';

export default function CTABanner() {
  const navigate = useNavigate();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section className="py-32 px-6 sm:px-10 bg-bg-page">
      <motion.div 
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="max-w-5xl mx-auto rounded-3xl bg-gradient-to-r from-primary to-secondary p-12 sm:p-20 text-center shadow-2xl shadow-primary/20 overflow-hidden relative"
      >
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-black/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 pointer-events-none" />
        
        <div className="relative z-10 flex flex-col items-center">
          <h2 className="text-4xl sm:text-6xl font-black text-white tracking-tight mb-8 drop-shadow-md">
            Start your career journey today
          </h2>
          <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto font-medium">
            Join thousands of students who have discovered their perfect career path and acquired the skills to get there.
          </p>
          <button 
            onClick={() => navigate('/signup')}
            className="bg-bg-surface text-text-primary px-10 py-5 rounded-xl font-black text-xl hover:scale-[1.03] hover:shadow-2xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-white/40 active:scale-95"
          >
            Get started free
          </button>
        </div>
      </motion.div>
    </section>
  );
}
