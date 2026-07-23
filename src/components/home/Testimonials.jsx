import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { Star, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

import arjunAvatar from '../../assets/arjun.png';
import snehaAvatar from '../../assets/sneha.png';
import rahulAvatar from '../../assets/rahul.png';
import priyaAvatar from '../../assets/priya.png';

const TESTIMONIALS = [
  {
    avatar: arjunAvatar,
    name: 'Arjun Kumar',
    careerMatch: 'Software Engineer',
    quote: 'ElevateU completely changed my trajectory. The skill gap analysis showed me exactly what I was missing, and the personalized roadmap helped me land my dream role in 6 months.',
    ringColor: 'ring-primary/40',
    rating: 5
  },
  {
    avatar: snehaAvatar,
    name: 'Sneha Mishra',
    careerMatch: 'Data Scientist',
    quote: 'I was lost after graduation. The AI career recommendations matched me with data science based on my math background. Now Im working at a top tech firm!',
    ringColor: 'ring-secondary/40',
    rating: 5
  },
  {
    avatar: rahulAvatar,
    name: 'Rahul Joshi',
    careerMatch: 'Product Manager',
    quote: 'The resume analysis feature alone is worth it. It helped me highlight the right soft skills for PM roles. I got 3 interviews in my first week of applying.',
    ringColor: 'ring-accent/40',
    rating: 4
  },
  {
    avatar: priyaAvatar,
    name: 'Priya Thakur',
    careerMatch: 'UX Designer',
    quote: 'I transitioned from marketing to UX design thanks to ElevateU. The 24/7 AI mentor answered all my late-night questions while I was building my portfolio.',
    ringColor: 'ring-warning/40',
    rating: 5
  }
];

export default function Testimonials() {
  const scrollRef = useRef(null);
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.2 });
  const shouldReduceMotion = useReducedMotion();

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      const scrollAmount = direction === 'left' ? -clientWidth / 1.2 : clientWidth / 1.2;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
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
    <section id="testimonials" ref={sectionRef} className="py-32 px-6 sm:px-10 bg-bg-surface overflow-hidden">
      <motion.div 
        className="max-w-7xl mx-auto relative"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-16 gap-6">
          <motion.div variants={itemVariants}>
            <h2 className="text-4xl sm:text-5xl font-black text-text-primary tracking-tight mb-4">
              Success Stories
            </h2>
            <p className="text-xl text-text-secondary">
              Hear from students who defined their future with ElevateU.
            </p>
          </motion.div>
          <motion.div variants={itemVariants} className="flex items-center gap-3">
            <Button 
              variant="outline"
              onClick={() => scroll('left')}
              className="p-4 rounded-full border-border bg-bg-page hover:bg-border/50 text-text-primary h-auto focus:ring-4 focus:ring-primary/20"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>
            <Button 
              variant="outline"
              onClick={() => scroll('right')}
              className="p-4 rounded-full border-border bg-bg-page hover:bg-border/50 text-text-primary h-auto focus:ring-4 focus:ring-primary/20"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-6 h-6" />
            </Button>
          </motion.div>
        </div>

        {/* Scroll Container with pure CSS scroll-snap */}
        <motion.div 
          ref={scrollRef}
          variants={itemVariants}
          className="flex overflow-x-auto gap-8 pb-8 snap-x snap-mandatory hide-scrollbar"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {TESTIMONIALS.map((testimonial, idx) => (
            <Card 
              key={idx}
              className="min-w-[320px] sm:min-w-[450px] max-w-[450px] flex-shrink-0 snap-start p-8 sm:p-10 flex flex-col justify-between hover:shadow-xl transition-shadow bg-bg-page border-border"
            >
              <div>
                <div className="flex gap-1.5 mb-8">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-5 h-5 ${i < testimonial.rating ? 'text-warning fill-warning' : 'text-border'}`} 
                    />
                  ))}
                </div>
                <p className="text-text-primary text-xl italic mb-10 leading-relaxed">
                  "{testimonial.quote}"
                </p>
              </div>

              <div className="flex items-center gap-5 mt-auto">
                <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden shrink-0 ring-4 ring-offset-4 ring-offset-bg-page ${testimonial.ringColor} shadow-md`}>
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="w-full h-full object-cover" 
                  />
                </div>
                <div>
                  <h4 className="font-bold text-text-primary text-lg">{testimonial.name}</h4>
                  <div className="flex items-center gap-2 text-text-secondary mt-1 font-medium">
                    <ArrowRight className="w-4 h-4 text-primary" />
                    <span>{testimonial.careerMatch}</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </motion.div>
      </motion.div>
      
      {/* CSS to hide webkit scrollbar */}
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}} />
    </section>
  );
}
