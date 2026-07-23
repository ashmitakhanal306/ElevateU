import React from 'react';
import SEO from '../../components/SEO';
import MarketingPageLayout from '../../components/layout/MarketingPageLayout';

export default function PrivacyPage() {
  return (
    <>
      <SEO title="Privacy Policy" description="Read ElevateU's Privacy Policy." />
      <MarketingPageLayout 
      title="Privacy Policy" 
      subtitle="Last updated: October 1, 2026"
    >
      <div className="max-w-3xl mx-auto prose prose-slate dark:prose-invert">
        <div className="bg-warning/10 border-l-4 border-warning p-4 mb-8 text-warning-dark rounded-r-lg">
          <p className="font-semibold m-0 text-warning">
            Note: This is placeholder text for development purposes and has not been reviewed by legal counsel.
          </p>
        </div>

        <h2 className="text-2xl font-bold text-text-primary mt-8 mb-4">1. Information We Collect</h2>
        <p className="text-text-secondary mb-6 leading-relaxed">
          We collect information you provide directly to us, such as when you create or modify your account, 
          request on-demand services, contact customer support, or otherwise communicate with us. This information 
          may include: name, email, phone number, postal address, profile picture, and other information you choose to provide.
        </p>

        <h2 className="text-2xl font-bold text-text-primary mt-8 mb-4">2. How We Use It</h2>
        <p className="text-text-secondary mb-6 leading-relaxed">
          We may use the information we collect about you to provide, maintain, and improve our services, 
          including to facilitate payments, send receipts, provide products and services you request, develop new features, 
          provide customer support, and send updates and administrative messages.
        </p>

        <h2 className="text-2xl font-bold text-text-primary mt-8 mb-4">3. Data Sharing</h2>
        <p className="text-text-secondary mb-6 leading-relaxed">
          We do not share your personal information with third parties except as described in this privacy policy. 
          We may share your information with our third-party service providers who perform services on our behalf. 
          We require these service providers to use your information only as necessary to perform the services we have requested.
        </p>

        <h2 className="text-2xl font-bold text-text-primary mt-8 mb-4">4. Your Rights</h2>
        <p className="text-text-secondary mb-6 leading-relaxed">
          You have the right to access, correct, or delete your personal data. You may also have the right to restrict or 
          object to our processing of your data. To exercise these rights, please contact us using the information provided below.
        </p>

        <h2 className="text-2xl font-bold text-text-primary mt-8 mb-4">5. Cookies</h2>
        <p className="text-text-secondary mb-6 leading-relaxed">
          We use cookies and similar tracking technologies to track the activity on our service and hold certain information. 
          Cookies are files with small amount of data which may include an anonymous unique identifier. Please refer to our 
          Cookie Policy for more detailed information.
        </p>

        <h2 className="text-2xl font-bold text-text-primary mt-8 mb-4">6. Contact Us</h2>
        <p className="text-text-secondary mb-6 leading-relaxed">
          If you have any questions about this Privacy Policy, please contact our Data Protection Officer at privacy@elevateu.in.
        </p>
      </div>
    </MarketingPageLayout>
    </>
  );
}
