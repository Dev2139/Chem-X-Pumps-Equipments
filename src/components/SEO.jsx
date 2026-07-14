import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function SEO({ 
  title, 
  description, 
  ogTitle, 
  ogDescription, 
  ogImage = '/images/chemx-og.jpg', 
  ogType = 'website',
  schemaOrgJSONLD
}) {
  const siteTitle = title ? `${title} | Chem-X Pumps & Equipment` : 'Chem-X Pumps & Equipment | Engineered for Performance. Built to Last.';
  const siteDescription = description || 'Chem-X Pumps & Equipment - Leading manufacturer, repairer, and spare parts provider of high-performance industrial pumps. ISO certified engineering solutions.';
  
  return (
    <Helmet>
      <title>{siteTitle}</title>
      <meta name="description" content={siteDescription} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={ogTitle || siteTitle} />
      <meta property="og:description" content={ogDescription || siteDescription} />
      <meta property="og:image" content={ogImage} />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:title" content={ogTitle || siteTitle} />
      <meta property="twitter:description" content={ogDescription || siteDescription} />
      <meta property="twitter:image" content={ogImage} />

      {/* Schema.org Structured Data */}
      {schemaOrgJSONLD && (
        <script type="application/ld+json">
          {JSON.stringify(schemaOrgJSONLD)}
        </script>
      )}
    </Helmet>
  );
}
