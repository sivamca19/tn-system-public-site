/// <reference types="vite/client" />

interface ImportMetaEnv {
  // Google Analytics
  readonly VITE_GA_MEASUREMENT_ID: string;

  // WordPress API
  readonly VITE_WORDPRESS_API_URL: string;

  // Contact Form 7 API
  readonly VITE_CONTACT_FORM_API_URL: string;

  // Site Configuration
  readonly VITE_SITE_URL: string;
  readonly VITE_SITE_NAME: string;

  // External Product Links
  readonly VITE_HOSPIFY_URL: string;

  // Company Information
  readonly VITE_COMPANY_NAME: string;
  readonly VITE_COMPANY_ADDRESS_LINE1: string;
  readonly VITE_COMPANY_ADDRESS_LINE2: string;
  readonly VITE_COMPANY_ADDRESS_COUNTRY: string;
  readonly VITE_COMPANY_PHONE_1: string;
  readonly VITE_COMPANY_PHONE_2: string;
  readonly VITE_COMPANY_EMAIL_1: string;
  readonly VITE_COMPANY_EMAIL_2: string;

  // Feature Flags
  readonly VITE_ENABLE_ANALYTICS?: string;
  readonly VITE_ENABLE_BLOG?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
