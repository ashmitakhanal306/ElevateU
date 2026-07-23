import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import Card from '../ui/Card';
import { Check, Target, TrendingUp, BookOpen, Star } from 'lucide-react';

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

  const floatVariants1 = {
    animate: shouldReduceMotion ? {} : {
      y: [0, -25, 0],
      transition: {
        duration: 4,
        ease: "easeInOut",
        repeat: Infinity,
      }
    }
  };

  const floatVariants2 = {
    animate: shouldReduceMotion ? {} : {
      y: [0, -35, 0],
      transition: {
        duration: 5.5,
        ease: "easeInOut",
        repeat: Infinity,
        delay: 0.5
      }
    }
  };

  const floatVariants3 = {
    animate: shouldReduceMotion ? {} : {
      y: [0, -20, 0],
      transition: {
        duration: 4.5,
        ease: "easeInOut",
        repeat: Infinity,
        delay: 1.2
      }
    }
  };

  return (
    <section className="relative flex flex-col lg:flex-row items-center justify-between px-6 sm:px-10 py-20 lg:py-32 max-w-7xl mx-auto overflow-hidden min-h-[calc(100vh-80px)] bg-bg-page">
      {/* Background Gradients (Decorative) */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Left Column: Text Content */}
      <motion.div 
        className="lg:w-1/2 flex flex-col items-start text-left z-10 w-full mb-20 lg:mb-0"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <Badge variant="info" className="mb-8 px-4 py-1.5 text-sm">
            <SparklesIcon className="w-4 h-4 mr-2" /> ElevateU 2.0 is Here
          </Badge>
        </motion.div>

        <motion.h1 
          className="text-6xl sm:text-7xl lg:text-8xl font-black tracking-tight text-text-primary leading-[1.05] mb-8"
          variants={itemVariants}
        >
          Elevate Your Skills.<br />
          <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent drop-shadow-sm">
            Define Your Future.
          </span>
        </motion.h1>
        
        <motion.p 
          className="text-xl text-text-secondary mb-10 max-w-xl leading-relaxed"
          variants={itemVariants}
        >
          ElevateU bridges the gap between learning and your dream career. Assess your skills, get AI-powered career recommendations, and follow personalized roadmaps designed for your success.
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
          className="flex items-center gap-8 text-base text-text-secondary"
          variants={itemVariants}
        >
          <div className="flex items-center gap-2">
            <span className="text-xl font-black text-text-primary">10k+</span>
            <span className="font-medium">Students</span>
          </div>
          <div className="w-1.5 h-1.5 rounded-full bg-border" />
          <div className="flex items-center gap-2">
            <span className="text-xl font-black text-text-primary">4.9</span>
            <Star className="w-5 h-5 text-warning fill-warning" />
            <span className="font-medium">Rating</span>
          </div>
          <div className="w-1.5 h-1.5 rounded-full bg-border" />
          <div className="flex items-center gap-2">
            <span className="text-xl font-black text-text-primary">24/7</span>
            <span className="font-medium">AI Support</span>
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
          {/* Main Browser Mockup */}
          <motion.div variants={floatVariants1} animate="animate">
            <Card className="w-full bg-bg-surface border-border p-5 shadow-2xl shadow-primary/30 relative z-10">
              {/* Browser Header */}
              <div className="flex items-center gap-2 mb-6 pb-4 border-b border-border">
                <div className="w-3 h-3 rounded-full bg-danger/80" />
                <div className="w-3 h-3 rounded-full bg-warning/80" />
                <div className="w-3 h-3 rounded-full bg-success/80" />
              </div>

              {/* Dashboard Content Mockup */}
              <div className="space-y-5">
                <div className="flex justify-between items-center mb-2">
                  <div className="w-1/2 h-7 rounded-md bg-text-secondary/10" />
                  <Badge variant="success" className="px-3 py-1">On Track</Badge>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-primary/5 border border-primary/10">
                    <BookOpen className="w-6 h-6 text-primary mb-3" />
                    <div className="w-3/4 h-3.5 rounded bg-text-secondary/20 mb-2" />
                    <div className="w-1/2 h-5 rounded bg-text-primary/70" />
                  </div>
                  <div className="p-4 rounded-2xl bg-secondary/5 border border-secondary/10">
                    <Target className="w-6 h-6 text-secondary mb-3" />
                    <div className="w-3/4 h-3.5 rounded bg-text-secondary/20 mb-2" />
                    <div className="w-1/2 h-5 rounded bg-text-primary/70" />
                  </div>
                </div>

                <div className="p-5 rounded-2xl border border-border bg-bg-page mt-4">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <div className="w-24 h-3.5 rounded bg-text-secondary/20 mb-2" />
                      <div className="w-32 h-5 rounded bg-text-primary/70" />
                    </div>
                  </div>
                  {/* Fake Chart bars */}
                  <div className="flex items-end gap-3 h-20 mt-4 pt-4 border-t border-border/50">
                    <div className="w-full bg-primary/20 h-[30%] rounded-t-md" />
                    <div className="w-full bg-primary/40 h-[50%] rounded-t-md" />
                    <div className="w-full bg-primary/60 h-[75%] rounded-t-md" />
                    <div className="w-full bg-primary h-[100%] rounded-t-md" />
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Floating Accent Card 1 */}
          <motion.div 
            className="absolute -left-10 top-12 z-20"
            variants={floatVariants2} 
            animate="animate"
          >
            <Card className="p-4 shadow-2xl shadow-black/25 flex items-center gap-4 bg-bg-surface border-border">
              <div className="w-10 h-10 rounded-full bg-success/15 flex items-center justify-center text-success">
                <Check className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-text-secondary font-medium">Skill Level</p>
                <p className="text-base font-black text-text-primary">Advanced</p>
              </div>
            </Card>
          </motion.div>

          {/* Floating Accent Card 2 */}
          <motion.div 
            className="absolute -right-12 bottom-20 z-20"
            variants={floatVariants3} 
            animate="animate"
          >
            <Card className="p-4 shadow-2xl shadow-black/25 flex flex-col gap-3 bg-bg-surface border-border">
              <p className="text-sm font-bold text-text-primary">Course Progress</p>
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full border-[5px] border-border flex items-center justify-center border-t-primary border-r-primary">
                  <span className="text-xs font-black">75%</span>
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
