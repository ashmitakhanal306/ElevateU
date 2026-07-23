import React from 'react';
import SEO from '../../components/SEO';
import MarketingPageLayout from '../../components/layout/MarketingPageLayout';

export default function CookiePolicyPage() {
  return (
    <>
      <SEO title="Cookie Policy" description="Read ElevateU's Cookie Policy." />
      <MarketingPageLayout 
      title="Cookie Policy" 
      subtitle="Last updated: October 1, 2026"
    >
      <div className="max-w-3xl mx-auto prose prose-slate dark:prose-invert">
        <div className="bg-warning/10 border-l-4 border-warning p-4 mb-8 text-warning-dark rounded-r-lg">
          <p className="font-semibold m-0 text-warning">
            Note: This is placeholder text for development purposes and has not been reviewed by legal counsel.
          </p>
        </div>

        <h2 className="text-2xl font-bold text-text-primary mt-8 mb-4">What Are Cookies</h2>
        <p className="text-text-secondary mb-6 leading-relaxed">
          As is common practice with almost all professional websites, this site uses cookies, which are tiny files 
          that are downloaded to your computer, to improve your experience. This page describes what information they 
          gather, how we use it, and why we sometimes need to store these cookies.
        </p>

        <h2 className="text-2xl font-bold text-text-primary mt-8 mb-4">How We Use Them</h2>
        <p className="text-text-secondary mb-6 leading-relaxed">
          We use cookies for a variety of reasons detailed below. Unfortunately, in most cases, there are no industry 
          standard options for disabling cookies without completely disabling the functionality and features they add to 
          this site. We use cookies for user authentication, remembering user preferences (like your dark/light theme choice), 
          and tracking usage patterns to improve our service.
        </p>

        <h2 className="text-2xl font-bold text-text-primary mt-8 mb-4">Managing Preferences</h2>
        <p className="text-text-secondary mb-6 leading-relaxed">
          You can prevent the setting of cookies by adjusting the settings on your browser (see your browser Help for how to do this). 
          Be aware that disabling cookies will affect the functionality of this and many other websites that you visit. 
          Disabling cookies will usually result in also disabling certain functionality and features of this site.
        </p>
      </div>
    </MarketingPageLayout>
    </>
  );
}
