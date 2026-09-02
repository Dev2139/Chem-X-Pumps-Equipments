import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

const SITE_DOMAIN = 'https://www.chemxpumps.com';
const DEFAULT_OG_IMAGE = 'https://res.cloudinary.com/dsddldquo/image/upload/w_1200,h_630,c_pad,b_white,f_jpg,q_auto/v1788357362/imxgedkr5q3camyukp6v.png';

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

  // Global WebSite Schema for Sitelinks Searchbox
  const defaultWebsiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Chem-X Pumps & Equipment",
    "alternateName": "Chem-X Pumps",
    "url": SITE_DOMAIN,
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${SITE_DOMAIN}/products?search={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };

  // Handle single or array of JSON-LD schemas
  const schemas = Array.isArray(schemaOrgJSONLD) 
    ? [defaultWebsiteSchema, ...schemaOrgJSONLD] 
    : (schemaOrgJSONLD ? [defaultWebsiteSchema, schemaOrgJSONLD] : [defaultWebsiteSchema]);

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

      {/* Geo Location Tags for B2B Search Engines */}
      <meta name="geo.region" content="IN-GJ" />
      <meta name="geo.placename" content="Ahmedabad" />
      <meta name="geo.position" content="22.9554;72.6300" />
      <meta name="ICBM" content="22.9554, 72.6300" />

      {/* Open Graph / Facebook / LinkedIn / WhatsApp */}
      <meta property="og:site_name" content="Chem-X Pumps & Equipment" />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={fullCanonicalUrl} />
      <meta property="og:title" content={ogTitle || siteTitle} />
      <meta property="og:description" content={ogDescription || siteDescription} />
      <meta property="og:image" content={formattedOgImage} />
      <meta property="og:image:secure_url" content={formattedOgImage} />
      <meta property="og:image:type" content="image/jpeg" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
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

