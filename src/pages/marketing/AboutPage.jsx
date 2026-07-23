import React from 'react';
import SEO from '../../components/SEO';
import MarketingPageLayout from '../../components/layout/MarketingPageLayout';
import { Users, BarChart, Globe } from 'lucide-react';
import Card from '../../components/ui/Card';

export default function AboutPage() {
  return (
    <>
      <SEO title="About Us" description="Learn about ElevateU's mission to bridge the gap between learning and your dream career." />
      <MarketingPageLayout 
      title="About ElevateU" 
      subtitle="We believe everyone deserves a clear path to their dream career."
    >
      <div className="max-w-4xl mx-auto space-y-16">
        <section>
          <h2 className="text-3xl font-bold text-text-primary mb-6">Why we exist</h2>
          <p className="text-lg text-text-secondary leading-relaxed">
            The transition from education to the professional world is often confusing and overwhelming. 
            ElevateU was founded to bridge this gap. We combine AI-driven insights with practical, actionable 
            roadmaps to help students and early-career professionals understand their strengths, identify skill 
            gaps, and take confident steps toward their ideal roles.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-text-primary mb-8 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6 text-center">
              <Users className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold text-text-primary mb-2">Student-first</h3>
              <p className="text-text-secondary">Every feature we build is designed to empower learners and simplify their journey.</p>
            </Card>
            
            <Card className="p-6 text-center">
              <BarChart className="w-12 h-12 text-accent mx-auto mb-4" />
              <h3 className="text-xl font-bold text-text-primary mb-2">Data-driven guidance</h3>
              <p className="text-text-secondary">We rely on real industry data and skill requirements to provide accurate recommendations.</p>
            </Card>

            <Card className="p-6 text-center">
              <Globe className="w-12 h-12 text-success mx-auto mb-4" />
              <h3 className="text-xl font-bold text-text-primary mb-2">Accessible to everyone</h3>
              <p className="text-text-secondary">Quality career guidance should not be a luxury. We strive to keep our platform open and accessible.</p>
            </Card>
          </div>
        </section>
      </div>
    </MarketingPageLayout>
    </>
  );
}
