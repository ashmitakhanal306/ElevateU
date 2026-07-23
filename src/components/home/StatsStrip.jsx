import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView, useReducedMotion, animate } from 'framer-motion';

const STATS = [
  { label: 'Students Guided', value: 10000, prefix: '', suffix: '+' },
  { label: 'Career Paths Mapped', value: 500, prefix: '', suffix: '+' },
  { label: 'Courses Curated', value: 1200, prefix: '', suffix: '+' },
  { label: 'Assessment Accuracy', value: 95, prefix: '', suffix: '%' },
];

function CountUp({ target, inView }) {
  const [count, setCount] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) {
      setCount(target);
      return;
    }

    if (inView) {
      const controls = animate(0, target, {
        duration: 2,
        ease: "easeOut",
        onUpdate(value) {
          setCount(Math.floor(value));
        }
      });
      return () => controls.stop();
    }
  }, [inView, target, shouldReduceMotion]);

  return <>{count.toLocaleString()}</>;
}

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
        className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 divide-y sm:divide-y-0 sm:divide-x divide-bg-page/20"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        {STATS.map((stat, index) => (
          <motion.div 
            key={index} 
            className="flex flex-col items-center justify-center text-center pt-8 sm:pt-0 first:pt-0"
            variants={itemVariants}
          >
            <h3 className="text-4xl sm:text-5xl lg:text-6xl font-black text-warning mb-3 tracking-tight">
              {stat.prefix}
              <CountUp target={stat.value} inView={inView} />
              {stat.suffix}
            </h3>
            <p className="text-base font-bold text-bg-page uppercase tracking-widest drop-shadow-sm">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
