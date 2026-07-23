import React from 'react';
import SEO from '../../components/SEO';
import MarketingPageLayout from '../../components/layout/MarketingPageLayout';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';

const OPEN_ROLES = [
  { title: "Senior AI Engineer", location: "Gurugram, India", type: "Full-time" },
  { title: "Product Designer", location: "Remote", type: "Full-time" },
  { title: "Career Growth Strategist", location: "Bengaluru, India", type: "Full-time" },
  { title: "Frontend Developer (React)", location: "Remote", type: "Contract" },
];

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
          <div className="space-y-4">
            {OPEN_ROLES.map((role, idx) => (
              <Card key={idx} className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold text-text-primary mb-2">{role.title}</h3>
                  <div className="flex gap-3">
                    <Badge variant="primary">{role.location}</Badge>
                    <Badge variant="secondary">{role.type}</Badge>
                  </div>
                </div>
                <a 
                  href="mailto:careers@elevateu.in"
                  className="px-6 py-2 bg-primary text-white rounded-lg font-medium hover:bg-secondary transition-colors"
                >
                  Apply
                </a>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </MarketingPageLayout>
    </>
  );
}
