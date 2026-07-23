import React from 'react';
import SEO from '../../components/SEO';
import MarketingPageLayout from '../../components/layout/MarketingPageLayout';
import ArticleCard from '../../components/marketing/ArticleCard';

const GUIDES = [
  { category: "Career Path", title: "The ultimate guide to becoming a Data Scientist", excerpt: "Everything you need to know about the skills, tools, and mindset required.", readTime: "12 min read", date: "Oct 15, 2026" },
  { category: "Interviews", title: "Acing the technical system design interview", excerpt: "A structured approach to tackling complex architecture questions.", readTime: "15 min read", date: "Sep 22, 2026" },
  { category: "Salary", title: "How to negotiate your first tech salary", excerpt: "Don't leave money on the table. Learn the scripts and strategies to advocate for yourself.", readTime: "8 min read", date: "Aug 05, 2026" },
  { category: "Networking", title: "Building a professional network from scratch", excerpt: "Introvert-friendly tips for connecting with mentors and peers.", readTime: "10 min read", date: "Jul 19, 2026" },
];

export default function CareerGuidePage() {
  return (
    <>
      <SEO title="Career Guide" description="Browse comprehensive guides and tips for navigating your professional journey." />
      <MarketingPageLayout 
      title="Career Guide" 
      subtitle="In-depth resources and guides to help you navigate your professional journey."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {GUIDES.map((guide, idx) => (
          <ArticleCard key={idx} {...guide} />
        ))}
      </div>
    </MarketingPageLayout>
    </>
  );
}
