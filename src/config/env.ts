/**
 * Environment Variables Configuration
 *
 * All environment variables are defined in .env file
 * Vite exposes env variables that start with VITE_ prefix
 *
 * @see .env.example for all available variables
 */

// Google Analytics
export const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || 'G-XXXXXXXXXX';

// WordPress API
export const WORDPRESS_API_URL = import.meta.env.VITE_WORDPRESS_API_URL || 'https://tnsystems.in/wp-json/wp/v2';

// Jobs/Careers API
export const JOBS_API_URL = import.meta.env.VITE_JOBS_API_URL || 'https://tnsystems.in/wp-json/jobs/v1/listings';

// Contact Form 7 API
export const CONTACT_FORM_API_URL = import.meta.env.VITE_CONTACT_FORM_API_URL || 'https://tnsystems.in/wp-json/contact-form-7/v1/contact-forms/535/feedback';

// Site Configuration
export const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://tnsystems.in';
export const SITE_NAME = import.meta.env.VITE_SITE_NAME || 'TNSystems';

// External Product Links
export const HOSPIFY_URL = import.meta.env.VITE_HOSPIFY_URL || 'https://www.hospify.online/';

// Company Information
export const COMPANY = {
  name: import.meta.env.VITE_COMPANY_NAME || 'TopNotch Systems',
  address: {
    line1: import.meta.env.VITE_COMPANY_ADDRESS_LINE1 || '2A Kalaimagal nagar, 3nd cross street',
    line2: import.meta.env.VITE_COMPANY_ADDRESS_LINE2 || 'Ekkaduthangal, Chennai, Tamil Nadu 600032',
    country: import.meta.env.VITE_COMPANY_ADDRESS_COUNTRY || 'India',
  },
  phone: {
    primary: import.meta.env.VITE_COMPANY_PHONE_1 || '+91 44 4586 2134',
    secondary: import.meta.env.VITE_COMPANY_PHONE_2 || '+91 63806 11236',
  },
  email: {
    hr: import.meta.env.VITE_COMPANY_EMAIL_1 || 'hr@tnsystems.in',
    operations: import.meta.env.VITE_COMPANY_EMAIL_2 || 'operations@tnsystems.in',
  },
};

// Feature Flags
export const FEATURES = {
  analytics: import.meta.env.VITE_ENABLE_ANALYTICS !== 'false', // Enabled by default
  blog: import.meta.env.VITE_ENABLE_BLOG !== 'false', // Enabled by default
};

// Development mode check
export const isDevelopment = import.meta.env.DEV;
export const isProduction = import.meta.env.PROD;

// Log configuration in development
if (isDevelopment) {
  console.log('Environment Configuration:', {
    GA_MEASUREMENT_ID,
    WORDPRESS_API_URL,
    SITE_URL,
    FEATURES,
  });
}
