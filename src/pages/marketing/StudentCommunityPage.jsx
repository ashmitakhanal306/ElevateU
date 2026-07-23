import React from 'react';
import SEO from '../../components/SEO';
import MarketingPageLayout from '../../components/layout/MarketingPageLayout';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { MessageSquare, ThumbsUp, Users } from 'lucide-react';

const DISCUSSIONS = [
  { title: "Best resources for learning System Design?", author: "Rahul M.", replies: 42, likes: 128 },
  { title: "Has anyone transitioned from QA to DevOps?", author: "Priya S.", replies: 15, likes: 56 },
  { title: "Review my portfolio please! (Frontend Dev)", author: "Amit K.", replies: 28, likes: 89 },
];

export default function StudentCommunityPage() {
  return (
    <>
      <SEO title="Student Community" description="Join the ElevateU student community to collaborate, share insights, and grow together." />
      <MarketingPageLayout 
      title="Join the ElevateU Community" 
      subtitle="Connect with peers, share resources, and grow together."
    >
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between bg-bg-page border border-border p-8 rounded-2xl mb-12">
          <div className="flex gap-12 mb-6 md:mb-0">
            <div className="text-center">
              <div className="text-3xl font-black text-primary mb-1">12,000+</div>
              <div className="text-text-secondary">Active Members</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-secondary mb-1">500+</div>
              <div className="text-text-secondary">Discussions this month</div>
            </div>
          </div>
          <Button variant="primary" size="lg" className="px-10">
            Join the Community
          </Button>
        </div>

        <h3 className="text-2xl font-bold text-text-primary mb-6">Trending Discussions</h3>
        <div className="space-y-4">
          {DISCUSSIONS.map((disc, idx) => (
            <Card key={idx} className="p-6 hover:border-primary/30 transition-colors cursor-pointer">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-lg font-bold text-text-primary mb-2">{disc.title}</h4>
                  <div className="flex items-center gap-2 text-sm text-text-secondary">
                    <Users className="w-4 h-4" />
                    <span>Posted by {disc.author}</span>
                  </div>
                </div>
                <div className="flex items-center gap-6 text-text-secondary">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-5 h-5" />
                    <span>{disc.replies}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ThumbsUp className="w-5 h-5" />
                    <span>{disc.likes}</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </MarketingPageLayout>
    </>
  );
}
