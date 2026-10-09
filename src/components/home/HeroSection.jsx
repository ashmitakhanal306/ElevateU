import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import Card from '../ui/Card';
import { Check, Target, TrendingUp, BookOpen } from 'lucide-react';

export default function HeroSection() {
  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();

  const scrollToHowItWorks = () => {
    const section = document.getElementById('how-it-works');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
    <section className="relative flex flex-col lg:flex-row items-center justify-between px-6 sm:px-10 py-20 lg:py-32 max-w-7xl mx-auto overflow-hidden min-h-[calc(100vh-80px)] bg-bg-page">
      {/* Background Gradients (Decorative) */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary-soft rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Left Column: Text Content */}
      <motion.div 
        className="lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left z-10 w-full mb-12 lg:mb-0"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <Badge variant="info" className="mb-8 px-4 py-1.5 text-sm">
            <SparklesIcon className="w-4 h-4 mr-2" /> AI-Powered Career Platform
          </Badge>
        </motion.div>

        <motion.h1 
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-text-primary leading-[1.1] mb-6 sm:mb-8 text-center lg:text-left w-full"
          variants={itemVariants}
        >
          Elevate Your Skills.<br />
          <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent drop-shadow-sm">
            Define Your Future.
          </span>
        </motion.h1>
        
        <motion.p 
          className="text-lg sm:text-xl text-text-secondary mb-10 max-w-xl leading-relaxed text-center lg:text-left"
          variants={itemVariants}
        >
          Assess your skills, get AI-powered career matches, and follow a personalized roadmap to your dream role.
        </motion.p>
        
        <motion.div 
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-12"
          variants={itemVariants}
        >
          <Button variant="primary" size="lg" className="w-full sm:w-auto px-10 py-4 text-lg shadow-xl shadow-primary/20 hover:shadow-2xl hover:shadow-primary/30 transition-shadow" onClick={() => navigate('/signup')}>
            Get started free
          </Button>
          <Button variant="outline" size="lg" className="w-full sm:w-auto px-10 py-4 text-lg border-2" onClick={scrollToHowItWorks}>
            See how it works
          </Button>
        </motion.div>

        {/* Inline Stats */}
        <motion.div 
          className="flex flex-wrap justify-center lg:justify-start items-center gap-4 sm:gap-8 text-sm sm:text-base text-text-secondary w-full"
          variants={itemVariants}
        >
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-text-primary">AI-Powered</span>
            <span className="font-medium">Assessments</span>
          </div>
          <div className="w-1.5 h-1.5 rounded-full bg-border" />
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-text-primary">Free</span>
            <span className="font-medium">to Start</span>
          </div>
          <div className="w-1.5 h-1.5 rounded-full bg-border" />
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-text-primary">24/7</span>
            <span className="font-medium">AI Mentor</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Right Column: Visual Mockup */}
      <motion.div 
        className="lg:w-1/2 relative flex justify-center lg:justify-end w-full"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="relative w-full max-w-lg">
          {/* 
            TODO: Swap in the actual image once it is ready:
            <img src="/src/assets/dashboard-preview.png" alt="Dashboard Preview" className="w-full h-auto rounded-xl shadow-2xl" />
          */}
          {/* Main Browser Mockup — Polished Dashboard Preview */}
          <div>
            <Card className="w-full bg-bg-surface border-border p-5 shadow-2xl shadow-primary/20 relative z-10">
              {/* Browser Header */}
              <div className="flex items-center gap-2 mb-5 pb-3 border-b border-border">
                <div className="w-3 h-3 rounded-full bg-danger/80" />
                <div className="w-3 h-3 rounded-full bg-warning/80" />
                <div className="w-3 h-3 rounded-full bg-success/80" />
                <span className="ml-3 text-xs text-text-secondary font-medium">ElevateU Dashboard</span>
              </div>

              {/* Dashboard Content */}
              <div className="space-y-4">
                {/* Header Row */}
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-xs text-text-secondary font-medium">Welcome back</p>
                    <p className="text-sm font-bold text-text-primary">Your Career Overview</p>
                  </div>
                  <Badge variant="success" className="px-2.5 py-1 text-xs">On Track</Badge>
                </div>

                {/* Stat Cards Row */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="p-3 rounded-xl bg-primary/5 border border-primary/10 text-center">
                    <BookOpen className="w-4 h-4 text-primary mx-auto mb-1.5" />
                    <p className="text-lg font-bold text-text-primary leading-none">12</p>
                    <p className="text-xs text-text-secondary mt-1">Skills</p>
                  </div>
                  <div className="p-3 rounded-xl bg-secondary/5 border border-secondary/10 text-center">
                    <Target className="w-4 h-4 text-secondary mx-auto mb-1.5" />
                    <p className="text-lg font-bold text-text-primary leading-none">3</p>
                    <p className="text-xs text-text-secondary mt-1">Career Matches</p>
                  </div>
                  <div className="p-3 rounded-xl bg-accent/5 border border-accent/10 text-center">
                    <TrendingUp className="w-4 h-4 text-accent mx-auto mb-1.5" />
                    <p className="text-lg font-bold text-text-primary leading-none">78%</p>
                    <p className="text-xs text-text-secondary mt-1">Readiness</p>
                  </div>
                </div>

                {/* Skill Progress Bars */}
                <div className="p-4 rounded-xl border border-border bg-bg-page">
                  <p className="text-xs font-bold text-text-primary mb-3">Skill Progress</p>
                  <div className="space-y-2.5">
                    {[
                      { name: 'React', pct: 85, color: 'bg-primary' },
                      { name: 'Python', pct: 72, color: 'bg-secondary' },
                      { name: 'System Design', pct: 45, color: 'bg-accent' },
                    ].map((skill) => (
                      <div key={skill.name}>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-text-secondary font-medium">{skill.name}</span>
                          <span className="text-text-primary font-bold">{skill.pct}%</span>
                        </div>
                        <div className="h-1.5 rounded-full bg-border overflow-hidden">
                          <div className={`h-full rounded-full ${skill.color} transition-all duration-1000`} style={{ width: `${skill.pct}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Mini Bar Chart */}
                <div className="flex items-end gap-2 h-16 px-2">
                  {[35, 52, 68, 45, 78, 62, 90].map((h, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                      <div
                        className="w-full rounded-t-sm bg-gradient-to-t from-primary/40 to-primary transition-all duration-500"
                        style={{ height: `${h}%` }}
                      />
                      <span className="text-[8px] text-text-secondary">
                        {['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          {/* Floating Accent Card 1 */}
          <motion.div 
            className="absolute -left-2 sm:-left-10 top-12 z-20 hidden sm:flex"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <Card className="p-4 shadow-2xl shadow-black/25 flex items-center gap-4 bg-bg-surface border-border">
              <div className="w-10 h-10 rounded-full bg-success/15 flex items-center justify-center text-success">
                <Check className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-text-secondary font-medium">Skill Level</p>
                <p className="text-base font-bold text-text-primary">Advanced</p>
              </div>
            </Card>
          </motion.div>

          {/* Floating Accent Card 2 */}
          <motion.div 
            className="absolute -right-2 sm:-right-12 bottom-20 z-20 hidden sm:flex"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
          >
            <Card className="p-4 shadow-2xl shadow-black/25 flex flex-col gap-3 bg-bg-surface border-border">
              <p className="text-sm font-bold text-text-primary">Course Progress</p>
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full border-[5px] border-border flex items-center justify-center border-t-primary border-r-primary">
                  <span className="text-xs font-bold">75%</span>
                </div>
                <p className="text-sm text-text-secondary font-medium">Almost there!</p>
              </div>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

function SparklesIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
    </svg>
  );
}
