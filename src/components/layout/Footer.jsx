import React from 'react';
import { Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import logoSrc from '../../assets/logo.png';



export default function Footer() {
  return (
    <footer className="bg-brand border-t border-white/20 pt-16 pb-8 px-6 sm:px-10">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Section: 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          
          {/* Column 1: Brand (wider) */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img src={logoSrc} alt="ElevateU Logo" className="h-10 w-auto object-contain" loading="lazy" width="160" height="40" />
            </div>
            <p className="text-slate-50 font-bold mb-2">Elevate Your Skills. Define Your Future.</p>
            <p className="text-blue-200 mb-6 max-w-sm leading-relaxed">
              ElevateU bridges the gap between learning and your dream career with AI-powered skill assessments and personalized roadmaps.
            </p>
            {/* Social icons hidden until real accounts exist */}
          </div>

          {/* Column 2: Product */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-sm mb-5">Product</h4>
            <ul className="space-y-3">
              <FooterLink to="/#features">Features</FooterLink>
              <FooterLink to="/#how-it-works">How it works</FooterLink>
              <FooterLink to="/signup">Skill Assessments</FooterLink>
              <FooterLink to="/signup">Career Recommendations</FooterLink>
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
            </ul>
          </div>
        </div>

        {/* Middle Section: Contact */}
        <div className="border-t border-white/20 py-10">
          <div className="flex items-center justify-between gap-10">
            
            {/* Contact Strip */}
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 text-blue-200 w-full">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-accent" />
                <span>hello@elevateu.in</span>
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
