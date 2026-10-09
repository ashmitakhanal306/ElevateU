import React from 'react';
import SEO from '../../components/SEO';
import MarketingPageLayout from '../../components/layout/MarketingPageLayout';
import Card from '../../components/ui/Card';



export default function CareersPage() {
  return (
    <>
      <SEO title="Careers" description="Explore open roles and career opportunities at ElevateU." />
      <MarketingPageLayout 
      title="Join the ElevateU Team" 
      subtitle="Help us shape the future of career guidance and ed-tech."
    >
      <div className="max-w-4xl mx-auto space-y-12">
        <p className="text-lg text-text-secondary leading-relaxed text-center">
          We are a fast-growing team of educators, engineers, and designers passionate about unlocking human potential. 
          If you want to build products that make a real difference in people's lives, we'd love to hear from you.
        </p>

        <div>
          <h2 className="text-2xl font-bold text-text-primary mb-6">Open Roles</h2>
          <Card className="p-8 text-center border-dashed border-border bg-bg-surface">
            <h3 className="text-xl font-bold text-text-primary mb-2">No open positions right now</h3>
            <p className="text-text-secondary">Please check back later.</p>
          </Card>
        </div>
      </div>
    </MarketingPageLayout>
    </>
  );
}
