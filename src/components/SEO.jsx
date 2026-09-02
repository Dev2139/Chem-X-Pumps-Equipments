import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

const SITE_DOMAIN = 'https://www.chemxpumps.com';
const DEFAULT_OG_IMAGE = `${SITE_DOMAIN}/images/chemx-og.jpg`;

export default function SEO({ 
  title, 
  description, 
  keywords,
  ogTitle, 
  ogDescription, 
  ogImage, 
  ogType = 'website',
  canonicalUrl,
  noindex = false,
  schemaOrgJSONLD
}) {
  const location = useLocation();
  const currentPath = location ? location.pathname : '';
  const fullCanonicalUrl = canonicalUrl || `${SITE_DOMAIN}${currentPath}`;
  
  const siteTitle = title ? `${title} | Chem-X Pumps & Equipment` : 'Chem-X Pumps & Equipment | Industrial Pump Manufacturer & Repair Solutions';
  const siteDescription = description || 'Chem-X Pumps & Equipment - ISO certified leading manufacturer, supplier, repairer, and spare parts provider of high-performance chemical process & industrial pumps.';
  const siteKeywords = keywords || 'industrial pump manufacturer, chemical process pump, polypropylene monoblock pump, hot oil pump, AODD pump, slurry pump, pump repair services, pump spare parts, Chem-X pumps';
  
  let formattedOgImage = DEFAULT_OG_IMAGE;
  if (ogImage) {
    formattedOgImage = ogImage.startsWith('http') ? ogImage : `${SITE_DOMAIN}${ogImage.startsWith('/') ? '' : '/'}${ogImage}`;
  }

  // Handle single or array of JSON-LD schemas
  const schemas = Array.isArray(schemaOrgJSONLD) 
    ? schemaOrgJSONLD 
    : (schemaOrgJSONLD ? [schemaOrgJSONLD] : []);

  return (
    <Helmet>
      {/* Standard Meta Tags */}
      <title>{siteTitle}</title>
      <meta name="description" content={siteDescription} />
      {siteKeywords && <meta name="keywords" content={siteKeywords} />}
      <link rel="canonical" href={fullCanonicalUrl} />
      
      {/* Robots Directive */}
      <meta 
        name="robots" 
        content={noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"} 
      />

      {/* Open Graph / Facebook / LinkedIn */}
      <meta property="og:site_name" content="Chem-X Pumps & Equipment" />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={fullCanonicalUrl} />
      <meta property="og:title" content={ogTitle || siteTitle} />
      <meta property="og:description" content={ogDescription || siteDescription} />
      <meta property="og:image" content={formattedOgImage} />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter Metadata */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullCanonicalUrl} />
      <meta name="twitter:title" content={ogTitle || siteTitle} />
      <meta name="twitter:description" content={ogDescription || siteDescription} />
      <meta name="twitter:image" content={formattedOgImage} />
      <meta name="twitter:site" content="@chemxpumps" />

      {/* Schema.org Structured Data */}
      {schemas.map((schema, index) => (
        <script key={`schema-${index}`} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
}

