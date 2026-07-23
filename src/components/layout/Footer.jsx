import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { SiX, SiInstagram, SiYoutube } from '@icons-pack/react-simple-icons';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';
import Input from '../ui/Input';
import logoSrc from '../../assets/logo.png';

// Inline custom LinkedIn icon workaround
function LinkedInIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="bg-primary border-t border-white/20 pt-16 pb-8 px-6 sm:px-10">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Section: 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          
          {/* Column 1: Brand (wider) */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img src={logoSrc} alt="ElevateU Logo" className="h-10 w-auto object-contain" />
            </div>
            <p className="text-slate-50 font-bold mb-2">Elevate Your Skills. Define Your Future.</p>
            <p className="text-blue-200 mb-6 max-w-sm leading-relaxed">
              ElevateU bridges the gap between learning and your dream career with AI-powered skill assessments and personalized roadmaps.
            </p>
            <div className="flex items-center gap-3">
              <SocialIcon icon={LinkedInIcon} href="#" />
              <SocialIcon icon={SiX} href="#" />
              <SocialIcon icon={SiInstagram} href="#" />
              <SocialIcon icon={SiYoutube} href="#" />
            </div>
          </div>

          {/* Column 2: Product */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-sm mb-5">Product</h4>
            <ul className="space-y-3">
              <FooterLink to="/#features">Features</FooterLink>
              <FooterLink to="/#how-it-works">How it works</FooterLink>
              <FooterLink to="/assessment">Skill Assessments</FooterLink>
              <FooterLink to="/career-recommendations">Career Recommendations</FooterLink>
              <FooterLink to="/pricing">Pricing</FooterLink>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-sm mb-5">Company</h4>
            <ul className="space-y-3">
              <FooterLink to="/about">About us</FooterLink>
              <FooterLink to="/careers">Careers</FooterLink>
              <FooterLink to="/blog">Blog</FooterLink>
              <FooterLink to="/contact">Contact us</FooterLink>
              <FooterLink to="/about">Press</FooterLink>
            </ul>
          </div>

          {/* Column 4: Resources */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-sm mb-5">Resources</h4>
            <ul className="space-y-3">
              <FooterLink to="/career-guide">Career Guide</FooterLink>
              <FooterLink to="/help-center">Help Center</FooterLink>
              <FooterLink to="/community">Student Community</FooterLink>
              <FooterLink to="/faqs">FAQs</FooterLink>
              <FooterLink to="/#testimonials">Success Stories</FooterLink>
            </ul>
          </div>
        </div>

        {/* Middle Section: Contact & Newsletter */}
        <div className="border-t border-white/20 py-10">
          <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-10">
            
            {/* Contact Strip */}
            <div className="flex flex-col gap-4 text-blue-200">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-accent" />
                <span>support@elevateu.in</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-accent" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-accent mt-1" />
                <span className="max-w-xs">4th Floor, Cyber Hub, DLF Phase 2, Gurugram, Haryana 122002</span>
              </div>
            </div>

            {/* Newsletter */}
            <div className="w-full lg:w-auto bg-white/10 p-6 rounded-2xl border border-white/20 shadow-lg">
              <h4 className="text-slate-50 font-bold mb-2">Get career tips in your inbox</h4>
              <p className="text-sm text-blue-200 mb-4">Stay updated with the latest in tech and hiring.</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Input type="email" placeholder="Enter your email" className="w-full sm:w-64 bg-white/10 border-white/20 text-white placeholder-white/50" />
                <Button variant="primary" onClick={() => {}} className="whitespace-nowrap">Subscribe</Button>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom Section: Legal */}
        <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-blue-200">
          <p>© 2026 ElevateU Career Advisory Pvt. Ltd. All rights reserved.</p>
          <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4">
            <Link to="/terms" className="hover:text-accent transition-colors">Terms of Service</Link>
            <span className="hidden sm:inline text-white/20">|</span>
            <Link to="/privacy" className="hover:text-accent transition-colors">Privacy Policy</Link>
            <span className="hidden sm:inline text-white/20">|</span>
            <Link to="/cookies" className="hover:text-accent transition-colors">Cookie Policy</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}

// Sub-components for cleaner code
function SocialIcon({ icon: Icon, href }) {
  return (
    <a 
      href={href} 
      className="w-10 h-10 rounded-full flex items-center justify-center bg-white/10 border border-white/20 text-blue-200 hover:bg-accent/20 hover:text-accent hover:border-accent/40 transition-all duration-300"
      aria-label="Social Link"
    >
      <Icon className="w-4 h-4" />
    </a>
  );
}

function FooterLink({ to, children }) {
  return (
    <li>
      <Link 
        to={to} 
        className="text-blue-200 hover:text-accent transition-colors duration-200"
      >
        {children}
      </Link>
    </li>
  );
}
