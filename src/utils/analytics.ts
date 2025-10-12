// Google Analytics 4 with react-ga4
// Make sure to initialize in App.tsx with your actual GA4 Measurement ID

import ReactGA from 'react-ga4';

// Initialize Google Analytics
// Call this once in your App.tsx with your actual Measurement ID
export const initGA = (measurementId: string) => {
  ReactGA.initialize(measurementId, {
    gaOptions: {
      siteSpeedSampleRate: 100,
    },
    gtagOptions: {
      send_page_view: true,
    },
  });
};

// Track page views
export const trackPageView = (url: string, title?: string) => {
  ReactGA.send({ hitType: 'pageview', page: url, title: title || document.title });
};

// Track custom events
export const trackEvent = (
  category: string,
  action: string,
  label?: string,
  value?: number
) => {
  ReactGA.event({
    category,
    action,
    label,
    value,
  });
};

// Track button clicks
export const trackButtonClick = (buttonName: string, category: string = 'engagement') => {
  ReactGA.event({
    category,
    action: 'button_click',
    label: buttonName,
  });
};

// Track form submissions
export const trackFormSubmit = (formName: string, success: boolean = true) => {
  ReactGA.event({
    category: 'forms',
    action: 'form_submit',
    label: formName,
    value: success ? 1 : 0,
  });
};

// Track outbound links
export const trackOutboundLink = (url: string, label?: string) => {
  ReactGA.event({
    category: 'outbound',
    action: 'click',
    label: label || url,
    transport: 'beacon',
  });
};

// Track product views
export const trackProductView = (productName: string) => {
  ReactGA.event({
    category: 'products',
    action: 'view_item',
    label: productName,
  });
};

// Track contact attempts
export const trackContact = (method: string) => {
  ReactGA.event({
    category: 'engagement',
    action: 'contact',
    label: method,
  });
};

// Track scroll depth
export const trackScrollDepth = (depth: number) => {
  ReactGA.event({
    category: 'engagement',
    action: 'scroll_depth',
    value: depth,
  });
};

// Track time on page
export const trackTimeOnPage = (seconds: number) => {
  ReactGA.event({
    category: 'engagement',
    action: 'time_on_page',
    value: seconds,
  });
};

// Track downloads
export const trackDownload = (fileName: string) => {
  ReactGA.event({
    category: 'downloads',
    action: 'file_download',
    label: fileName,
  });
};

// Track video plays
export const trackVideoPlay = (videoName: string) => {
  ReactGA.event({
    category: 'engagement',
    action: 'video_play',
    label: videoName,
  });
};

// Track search queries
export const trackSearch = (searchTerm: string) => {
  ReactGA.event({
    category: 'search',
    action: 'search',
    label: searchTerm,
  });
};

// Track CTA clicks
export const trackCTAClick = (ctaName: string, location: string) => {
  ReactGA.event({
    category: 'cta',
    action: 'cta_click',
    label: ctaName,
    value: 1,
  });

  // Optional: Track additional context
  ReactGA.event({
    category: 'cta',
    action: 'location',
    label: location,
  });
};

// Track custom dimensions (if configured in GA4)
export const setUserProperties = (properties: Record<string, any>) => {
  ReactGA.set(properties);
};

// Track exceptions/errors
export const trackException = (description: string, fatal: boolean = false) => {
  ReactGA.event({
    category: 'error',
    action: 'exception',
    label: description,
    value: fatal ? 1 : 0,
  });
};
