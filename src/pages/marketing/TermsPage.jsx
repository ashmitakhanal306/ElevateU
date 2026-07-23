import React from 'react';
import SEO from '../../components/SEO';
import MarketingPageLayout from '../../components/layout/MarketingPageLayout';

export default function TermsPage() {
  return (
    <>
      <SEO title="Terms of Service" description="Read ElevateU's Terms of Service." />
      <MarketingPageLayout 
      title="Terms of Service" 
      subtitle="Last updated: October 1, 2026"
    >
      <div className="max-w-3xl mx-auto prose prose-slate dark:prose-invert">
        <div className="bg-warning/10 border-l-4 border-warning p-4 mb-8 text-warning-dark rounded-r-lg">
          <p className="font-semibold m-0 text-warning">
            Note: This is placeholder text for development purposes and has not been reviewed by legal counsel.
          </p>
        </div>

        <h2 className="text-2xl font-bold text-text-primary mt-8 mb-4">1. Acceptance of Terms</h2>
        <p className="text-text-secondary mb-6 leading-relaxed">
          By accessing and using ElevateU, you accept and agree to be bound by the terms and provision of this agreement. 
          In addition, when using these particular services, you shall be subject to any posted guidelines or rules applicable to such services.
        </p>

        <h2 className="text-2xl font-bold text-text-primary mt-8 mb-4">2. User Accounts</h2>
        <p className="text-text-secondary mb-6 leading-relaxed">
          To use certain features of the platform, you must register for an account. You are responsible for maintaining 
          the confidentiality of your account password and for all activities that occur under your account. You agree to 
          notify us immediately of any unauthorized use of your account.
        </p>

        <h2 className="text-2xl font-bold text-text-primary mt-8 mb-4">3. Prohibited Uses</h2>
        <p className="text-text-secondary mb-6 leading-relaxed">
          You may not use the site for any purpose that is unlawful or prohibited by these Terms. You may not use the site 
          in any manner that could damage, disable, overburden, or impair the server, or the network(s) connected to any server.
        </p>

        <h2 className="text-2xl font-bold text-text-primary mt-8 mb-4">4. Intellectual Property</h2>
        <p className="text-text-secondary mb-6 leading-relaxed">
          The site and its original content, features, and functionality are owned by ElevateU and are protected by 
          international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
        </p>

        <h2 className="text-2xl font-bold text-text-primary mt-8 mb-4">5. Limitation of Liability</h2>
        <p className="text-text-secondary mb-6 leading-relaxed">
          In no event shall ElevateU, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable 
          for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, 
          data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
        </p>

        <h2 className="text-2xl font-bold text-text-primary mt-8 mb-4">6. Changes to Terms</h2>
        <p className="text-text-secondary mb-6 leading-relaxed">
          We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material 
          we will try to provide at least 30 days notice prior to any new terms taking effect. What constitutes a material change 
          will be determined at our sole discretion.
        </p>

        <h2 className="text-2xl font-bold text-text-primary mt-8 mb-4">7. Contact Information</h2>
        <p className="text-text-secondary mb-6 leading-relaxed">
          If you have any questions about these Terms, please contact us at legal@elevateu.in.
        </p>
      </div>
    </MarketingPageLayout>
    </>
  );
}
