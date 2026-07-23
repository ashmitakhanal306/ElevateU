import React, { useState } from 'react';
import SEO from '../../components/SEO';
import MarketingPageLayout from '../../components/layout/MarketingPageLayout';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import { Check, X } from 'lucide-react';

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false);

  const tiers = [
    {
      name: "Free",
      priceMonthly: 0,
      priceYearly: 0,
      description: "Basic access to get you started.",
      features: [
        { name: "Basic skill assessments", included: true },
        { name: "General career matches", included: true },
        { name: "Community access", included: true },
        { name: "Personalized roadmaps", included: false },
        { name: "AI Chatbot mentoring", included: false },
        { name: "Resume analysis", included: false }
      ]
    },
    {
      name: "Pro",
      priceMonthly: 499,
      priceYearly: 399,
      description: "Full power of AI to accelerate your career.",
      popular: true,
      features: [
        { name: "Advanced skill assessments", included: true },
        { name: "Detailed career matches", included: true },
        { name: "Community access", included: true },
        { name: "Personalized roadmaps", included: true },
        { name: "24/7 AI Chatbot mentoring", included: true },
        { name: "Resume analysis", included: true }
      ]
    },
    {
      name: "Institution",
      priceMonthly: 9999,
      priceYearly: 7999,
      description: "For universities and coding bootcamps.",
      features: [
        { name: "Everything in Pro", included: true },
        { name: "Bulk student accounts", included: true },
        { name: "Admin analytics dashboard", included: true },
        { name: "Custom learning paths", included: true },
        { name: "Dedicated support rep", included: true },
        { name: "API access", included: true }
      ]
    }
  ];

  return (
    <>
      <SEO title="Pricing" description="Choose the perfect ElevateU plan to accelerate your learning and career growth." />
      <MarketingPageLayout 
      title="Simple, transparent pricing" 
      subtitle="Invest in your future with plans designed for every stage of your journey."
    >
      <div className="max-w-6xl mx-auto">
        {/* Toggle */}
        <div className="flex justify-center items-center gap-3 mb-16">
          <span className={`text-sm font-semibold ${!isYearly ? 'text-text-primary' : 'text-text-secondary'}`}>Monthly</span>
          <button 
            onClick={() => setIsYearly(!isYearly)}
            className="w-14 h-7 bg-primary rounded-full relative p-1 transition-colors"
          >
            <div className={`w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-300 ${isYearly ? 'translate-x-7' : 'translate-x-0'}`} />
          </button>
          <span className={`text-sm font-semibold ${isYearly ? 'text-text-primary' : 'text-text-secondary'}`}>
            Yearly <span className="text-success text-xs ml-1">(Save 20%)</span>
          </span>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tiers.map((tier, idx) => (
            <Card key={idx} className={`p-8 relative ${tier.popular ? 'border-2 border-primary shadow-xl scale-105 z-10' : 'border border-border'}`}>
              {tier.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <Badge variant="warning" className="px-3 py-1 font-bold">MOST POPULAR</Badge>
                </div>
              )}
              
              <h3 className="text-2xl font-bold text-text-primary mb-2">{tier.name}</h3>
              <p className="text-text-secondary mb-6 h-12">{tier.description}</p>
              
              <div className="mb-8">
                <span className="text-4xl font-black text-text-primary">₹{isYearly ? tier.priceYearly : tier.priceMonthly}</span>
                <span className="text-text-secondary">/mo</span>
                {isYearly && tier.priceYearly > 0 && (
                  <p className="text-sm text-success mt-1">Billed annually</p>
                )}
              </div>

              <Button variant={tier.popular ? 'primary' : 'outline'} className="w-full mb-8">
                Get Started
              </Button>

              <ul className="space-y-4">
                {tier.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-start gap-3">
                    {feature.included ? (
                      <Check className="w-5 h-5 text-success shrink-0 mt-0.5" />
                    ) : (
                      <X className="w-5 h-5 text-text-secondary/50 shrink-0 mt-0.5" />
                    )}
                    <span className={feature.included ? 'text-text-primary' : 'text-text-secondary line-through opacity-60'}>
                      {feature.name}
                    </span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </div>
    </MarketingPageLayout>
    </>
  );
}
