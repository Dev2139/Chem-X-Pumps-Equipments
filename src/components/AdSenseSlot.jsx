import React, { useEffect, useRef } from 'react';

/**
 * AdSenseSlot component - Renders a Google AdSense ad unit.
 * Safely loads the Google AdSense script only on pages where this component is mounted.
 * 
 * @param {string} adSlot - Google AdSense ad slot ID (from AdSense Dashboard)
 * @param {string} [adClient] - Google AdSense Publisher ID (defaults to VITE_ADSENSE_CLIENT_ID env var)
 * @param {string} [adFormat='auto'] - Ad format ('auto', 'rectangle', 'horizontal', 'vertical')
 * @param {boolean} [fullWidthResponsive=true] - Responsive full width setting
 * @param {string} [className=''] - Additional CSS classes
 * @param {string} [label='Advertisement'] - Optional label above ad slot
 */
export default function AdSenseSlot({
  adSlot = '1234567890',
  adClient,
  adFormat = 'auto',
  fullWidthResponsive = true,
  className = '',
  label = 'Advertisement'
}) {
  const adRef = useRef(null);
  const publisherId = adClient || import.meta.env.VITE_ADSENSE_CLIENT_ID || '';
  const isDevOrUnconfigured = !publisherId || publisherId === 'ca-pub-XXXXXXXXXXXXXXXX';

  useEffect(() => {
    if (isDevOrUnconfigured) return;

    // Load Google AdSense script dynamically if not already present on page
    const scriptId = 'google-adsense-js';
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${publisherId}`;
      script.async = true;
      script.crossOrigin = 'anonymous';
      document.head.appendChild(script);
    }

    // Push ad request safely after mount
    try {
      if (typeof window !== 'undefined') {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (e) {
      console.error('AdSense script push error:', e);
    }
  }, [publisherId, adSlot]);

  return (
    <div className={`my-8 text-center overflow-hidden ${className}`}>
      {label && (
        <div className="text-[11px] font-semibold tracking-wider uppercase text-slate-400 mb-1.5 flex items-center justify-center gap-2">
          <span className="h-[1px] w-8 bg-slate-200"></span>
          <span>{label}</span>
          <span className="h-[1px] w-8 bg-slate-200"></span>
        </div>
      )}

      {isDevOrUnconfigured ? (
        // Preview Placeholder when Publisher ID is not set
        <div className="bg-slate-50 border-2 border-dashed border-slate-300 rounded-lg p-6 max-w-full mx-auto flex flex-col items-center justify-center min-h-[140px] text-slate-500 shadow-inner">
          <div className="flex items-center gap-2 text-brand-blue font-bold text-sm mb-1">
            <svg className="w-5 h-5 text-brand-orange" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
            </svg>
            <span>Google AdSense Ad Unit</span>
          </div>
          <p className="text-xs text-slate-600 max-w-md">
            Ad Slot ID: <code className="bg-slate-200 text-slate-800 px-1.5 py-0.5 rounded font-mono">{adSlot}</code>
          </p>
          <span className="text-[11px] text-slate-400 mt-2 italic">
            (Live ads will display here once your Publisher ID <code className="font-mono text-slate-500">VITE_ADSENSE_CLIENT_ID</code> is set in <code className="font-mono text-slate-500">.env</code>)
          </span>
        </div>
      ) : (
        // Real Google AdSense <ins> tag
        <div ref={adRef} className="w-full flex justify-center">
          <ins
            className="adsbygoogle"
            style={{ display: 'block', width: '100%' }}
            data-ad-client={publisherId}
            data-ad-slot={adSlot}
            data-ad-format={adFormat}
            data-full-width-responsive={fullWidthResponsive ? 'true' : 'false'}
          ></ins>
        </div>
      )}
    </div>
  );
}
