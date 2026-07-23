import React from 'react';
import SEO from '../../components/SEO';
import MarketingPageLayout from '../../components/layout/MarketingPageLayout';
import ArticleCard from '../../components/marketing/ArticleCard';

const POSTS = [
  { category: "Interviews", title: "Top 10 technical interview questions for 2026", excerpt: "Prepare for your next software engineering interview with these frequently asked questions.", readTime: "5 min read", date: "Oct 12, 2026" },
  { category: "Resume Tips", title: "How to make your resume ATS-friendly", excerpt: "Ensure your resume actually reaches a human recruiter by following these formatting rules.", readTime: "4 min read", date: "Oct 08, 2026" },
  { category: "Industry Trends", title: "The rise of AI-assisted development", excerpt: "What the shift towards AI copilots means for junior developers entering the market.", readTime: "7 min read", date: "Sep 29, 2026" },
  { category: "Soft Skills", title: "Mastering workplace communication", excerpt: "Why soft skills are just as important as technical chops, and how to improve yours.", readTime: "6 min read", date: "Sep 15, 2026" },
  { category: "Career Path", title: "Product Management vs Project Management", excerpt: "Understanding the difference between these two popular tech roles.", readTime: "5 min read", date: "Sep 02, 2026" },
  { category: "Productivity", title: "Combating tutorial hell", excerpt: "How to transition from following tutorials to building your own projects from scratch.", readTime: "4 min read", date: "Aug 20, 2026" },
];

export default function BlogPage() {
  return (
    <>
      <SEO title="Blog" description="Read the latest articles on tech careers, skill development, and industry trends." />
      <MarketingPageLayout 
      title="The ElevateU Blog" 
      subtitle="Insights, tips, and strategies to accelerate your career growth."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {POSTS.map((post, idx) => (
          <ArticleCard key={idx} {...post} />
        ))}
      </div>
    </MarketingPageLayout>
    </>
  );
}
