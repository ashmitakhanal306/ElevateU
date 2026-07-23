import React from 'react';
import SEO from '../../components/SEO';
import MarketingPageLayout from '../../components/layout/MarketingPageLayout';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import { Search, Play, CreditCard, Activity, Settings } from 'lucide-react';

const CATEGORIES = [
  { title: "Getting Started", icon: Play, desc: "Basics of setting up your profile and taking the first assessment." },
  { title: "Account & Billing", icon: CreditCard, desc: "Manage your subscription, payments, and account details." },
  { title: "Assessments & Results", icon: Activity, desc: "Understanding your skill gaps and roadmap recommendations." },
  { title: "Technical Issues", icon: Settings, desc: "Troubleshooting common errors and platform glitches." },
];

export default function HelpCenterPage() {
  return (
    <>
      <SEO title="Help Center" description="Find answers to frequently asked questions and get support for using ElevateU." />
      <MarketingPageLayout 
      title="How can we help?" 
      subtitle="Search our knowledge base or browse categories below."
    >
      <div className="max-w-4xl mx-auto">
        <div className="relative mb-16 max-w-2xl mx-auto">
          <Search className="absolute left-4 top-3.5 text-text-secondary w-5 h-5" />
          <Input 
            className="w-full pl-12 py-3 text-lg" 
            placeholder="Search for articles, guides, and FAQs..." 
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CATEGORIES.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <Card key={idx} className="p-6 hover:shadow-lg transition-shadow cursor-pointer border-border group">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-xl text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-text-primary mb-2 group-hover:text-primary transition-colors">{cat.title}</h3>
                    <p className="text-text-secondary">{cat.desc}</p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </MarketingPageLayout>
    </>
  );
}
