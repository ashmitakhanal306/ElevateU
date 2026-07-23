import React from 'react';
import SEO from '../../components/SEO';
import MarketingPageLayout from '../../components/layout/MarketingPageLayout';
import Accordion from '../../components/ui/Accordion';

const FAQS = [
  {
    category: "Getting Started",
    items: [
      { question: "What is ElevateU?", answer: "ElevateU is an AI-powered career advisory platform that helps you assess your skills and find the right career path." },
      { question: "Is the basic tier really free?", answer: "Yes! Our core assessments and general career matching features are completely free to use." },
    ]
  },
  {
    category: "Assessments",
    items: [
      { question: "How long do assessments take?", answer: "Most skill assessments take between 15-20 minutes depending on the topic." },
      { question: "Can I retake an assessment?", answer: "Yes, you can retake an assessment after 30 days to measure your improvement." },
      { question: "How does the AI grade my answers?", answer: "Our AI evaluates your responses against thousands of industry benchmarks to provide a detailed proficiency score." }
    ]
  },
  {
    category: "Account & Privacy",
    items: [
      { question: "How do I delete my account?", answer: "You can delete your account permanently from the Account Settings page." },
      { question: "Is my data shared with recruiters?", answer: "Only if you explicitly opt-in to our Recruiter Connect program. Otherwise, your data is 100% private." }
    ]
  }
];

export default function FAQsPage() {
  return (
    <>
      <SEO title="FAQs" description="Frequently asked questions about ElevateU assessments, roadmaps, and plans." />
      <MarketingPageLayout 
      title="Frequently Asked Questions" 
      subtitle="Find answers to common questions about ElevateU."
    >
      <div className="max-w-3xl mx-auto space-y-12">
        {FAQS.map((group, idx) => (
          <div key={idx}>
            <h2 className="text-2xl font-bold text-text-primary mb-6">{group.category}</h2>
            <Accordion items={group.items} />
          </div>
        ))}
      </div>
    </MarketingPageLayout>
    </>
  );
}
