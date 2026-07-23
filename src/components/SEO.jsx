import React from 'react';
import { Helmet } from 'react-helmet-async';

/**
 * SEO component.
 * Inject dynamic metadata (Page title, Meta descriptions, Open Graph, 
 * Twitter Cards, Crawler instructions) into the page <head> section.
 */
export default function SEO({ title, description, ogImage, noIndex }) {
  const fullTitle = title 
    ? `${title} | ElevateU` 
    : 'ElevateU | Career Guidance & Skills Platform';

  return (
    <Helmet>
      {/* Basic Page details */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      
      {/* Crawler Instructions (e.g. prevent indexing on dashboard pages) */}
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
      
      {/* Open Graph (Facebook/LinkedIn previews) */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      {ogImage && <meta property="og:image" content={ogImage} />}
      
      {/* Twitter Cards previews */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  );
}
