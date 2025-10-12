# Environment Variables Setup Guide

This project uses environment variables to manage configuration. All configurable values are centralized in the `.env` file for easy management across different environments.

## Quick Start

1. Copy `.env.example` to create your `.env` file:
   ```bash
   cp .env.example .env
   ```

2. Update the values in `.env` with your actual configuration

3. Restart your development server:
   ```bash
   npm run dev
   ```

## Environment Variables

### Google Analytics

```bash
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

**How to get your Measurement ID:**
1. Go to [Google Analytics](https://analytics.google.com/)
2. Navigate to **Admin** → **Data Streams**
3. Click on your web data stream
4. Copy the **Measurement ID** (format: G-XXXXXXXXXX)

**See also:** `GOOGLE_ANALYTICS_SETUP.md` for detailed instructions

### WordPress API

```bash
VITE_WORDPRESS_API_URL=https://tnsystems.in/wp-json/wp/v2
```

This is the base URL for your WordPress REST API. The app will automatically append `/posts` and other endpoints.

**Example:**
- If your WordPress site is at `https://example.com`
- Set this to: `https://example.com/wp-json/wp/v2`

### Contact Form 7 API

```bash
VITE_CONTACT_FORM_API_URL=https://tnsystems.in/wp-json/contact-form-7/v1/contact-forms/535/feedback
```

This is the full URL to your Contact Form 7 API endpoint including the form ID.

**How to find your Contact Form ID:**
1. Log in to WordPress Admin
2. Go to **Contact** → **Contact Forms**
3. Click on your form
4. Look at the URL - it will contain the form ID (e.g., `/post.php?post=535`)
5. Replace `535` in the env variable with your actual form ID

### Site Configuration

```bash
VITE_SITE_URL=https://tnsystems.in
VITE_SITE_NAME=TNSystems
```

- **VITE_SITE_URL**: Your production website URL (used for SEO and canonical URLs)
- **VITE_SITE_NAME**: Your site/company name

### External Product Links

```bash
VITE_HOSPIFY_URL=https://www.hospify.online/
```

URLs to external products or services. Add more as needed.

### Company Information

```bash
VITE_COMPANY_NAME=TopNotch Systems
VITE_COMPANY_ADDRESS_LINE1=2A Kalaimagal nagar, 3nd cross street
VITE_COMPANY_ADDRESS_LINE2=Ekkaduthangal, Chennai, Tamil Nadu 600032
VITE_COMPANY_ADDRESS_COUNTRY=India
VITE_COMPANY_PHONE_1=+91 44 4586 2134
VITE_COMPANY_PHONE_2=+91 63806 11236
VITE_COMPANY_EMAIL_1=hr@tnsystems.in
VITE_COMPANY_EMAIL_2=operations@tnsystems.in
```

These are used in the Contact section of your website. Update with your actual company details.

### Feature Flags (Optional)

```bash
# VITE_ENABLE_ANALYTICS=true
# VITE_ENABLE_BLOG=true
```

Enable or disable features:
- Set to `false` to disable
- Omit or set to `true` to enable (default)

## How Environment Variables Work

### Vite Prefix Requirement

⚠️ **Important:** All environment variables must start with `VITE_` prefix to be exposed to your application.

```bash
# ✅ Good - Will work
VITE_GA_MEASUREMENT_ID=G-ABC123

# ❌ Bad - Will NOT work
GA_MEASUREMENT_ID=G-ABC123
```

### Accessing in Code

Environment variables are available via `import.meta.env`:

```typescript
// Direct access
const gaId = import.meta.env.VITE_GA_MEASUREMENT_ID;

// Using the config file (recommended)
import { GA_MEASUREMENT_ID } from './config/env';
```

### Centralized Configuration

For better organization, all environment variables are imported and exported from `src/config/env.ts`:

```typescript
import {
  GA_MEASUREMENT_ID,
  WORDPRESS_API_URL,
  SITE_URL,
  COMPANY,
  FEATURES
} from './config/env';
```

**Benefits:**
- Type safety and autocomplete
- Default fallback values
- Easy to refactor
- Single source of truth

## File Structure

```
web/
├── .env                    # Your actual config (not in git)
├── .env.example            # Template with placeholders
├── .gitignore              # Ensures .env is not committed
├── src/
│   ├── config/
│   │   └── env.ts         # Centralized config exports
│   └── vite-env.d.ts      # TypeScript definitions
└── ENV_SETUP.md            # This file
```

## Where Variables Are Used

### Google Analytics (`VITE_GA_MEASUREMENT_ID`)
- **File:** `src/App.tsx`
- **Usage:** Initialize analytics tracking
- **Can be changed:** Yes, anytime

### WordPress API (`VITE_WORDPRESS_API_URL`)
- **Files:**
  - `src/components/BlogPage.tsx`
  - `src/components/SinglePostPage.tsx`
  - `src/components/Blogs.tsx`
- **Usage:** Fetch blog posts
- **Can be changed:** Yes, if you move your WordPress installation

### Company Information (`VITE_COMPANY_*`)
- **File:** Contact.tsx (currently uses hardcoded values, can be migrated)
- **Usage:** Display contact information
- **Can be changed:** Yes, when company details change

## Different Environments

### Development

Create `.env.development`:
```bash
VITE_GA_MEASUREMENT_ID=G-DEV123456
VITE_WORDPRESS_API_URL=http://localhost:8000/wp-json/wp/v2
```

### Production

Create `.env.production`:
```bash
VITE_GA_MEASUREMENT_ID=G-PROD123456
VITE_WORDPRESS_API_URL=https://tnsystems.in/wp-json/wp/v2
```

Vite automatically loads the correct file based on the mode:
```bash
npm run dev        # Uses .env.development
npm run build      # Uses .env.production
```

## Security Best Practices

### ✅ Do's

- ✅ Keep `.env` in `.gitignore`
- ✅ Use `.env.example` as a template
- ✅ Store sensitive keys in environment variables
- ✅ Use different values for dev/staging/production
- ✅ Document all required variables in `.env.example`

### ❌ Don'ts

- ❌ Never commit `.env` to git
- ❌ Never hardcode sensitive values in code
- ❌ Don't share `.env` files via email or chat
- ❌ Don't use production keys in development

## Troubleshooting

### Issue: Environment variables not working

**Solutions:**
1. ✅ Ensure the variable starts with `VITE_` prefix
2. ✅ Restart your dev server after changing `.env`
3. ✅ Check the variable exists in `.env` file
4. ✅ Verify no typos in variable names

### Issue: Getting "undefined" values

**Solutions:**
1. ✅ Check `src/vite-env.d.ts` has the type definition
2. ✅ Verify the variable is in `.env` file
3. ✅ Rebuild if you've added new variables
4. ✅ Use fallback values in `src/config/env.ts`

### Issue: Different values in development vs production

**Solutions:**
1. ✅ Create separate `.env.development` and `.env.production` files
2. ✅ Or use different values based on `import.meta.env.MODE`

## Adding New Variables

1. **Add to `.env` and `.env.example`:**
   ```bash
   VITE_NEW_FEATURE_URL=https://example.com
   ```

2. **Add TypeScript type in `src/vite-env.d.ts`:**
   ```typescript
   interface ImportMetaEnv {
     readonly VITE_NEW_FEATURE_URL: string;
   }
   ```

3. **Export from `src/config/env.ts`:**
   ```typescript
   export const NEW_FEATURE_URL = import.meta.env.VITE_NEW_FEATURE_URL || 'https://default.com';
   ```

4. **Use in your code:**
   ```typescript
   import { NEW_FEATURE_URL } from './config/env';
   ```

5. **Restart dev server**

## Deployment

### Vercel, Netlify, or similar

1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add each variable from `.env` with actual production values
4. Redeploy

### Docker

Add to your `docker-compose.yml`:
```yaml
services:
  web:
    environment:
      - VITE_GA_MEASUREMENT_ID=${GA_MEASUREMENT_ID}
      - VITE_WORDPRESS_API_URL=${WORDPRESS_API_URL}
```

### Traditional Server

1. Copy `.env.example` to `.env` on the server
2. Update with production values
3. Build: `npm run build`
4. The built files in `dist/` will have the env vars baked in

## Environment Variable Checklist

Before deploying, verify:

- [ ] `.env` file exists and has all required variables
- [ ] All `VITE_` prefixed variables are set
- [ ] Google Analytics ID is correct (if using analytics)
- [ ] WordPress API URL is correct
- [ ] Company information is accurate
- [ ] External product links are valid
- [ ] Feature flags are set correctly
- [ ] `.env` is in `.gitignore`
- [ ] Production has different values than development

## Getting Help

**For more information:**
- Vite Env Docs: https://vitejs.dev/guide/env-and-mode.html
- Project issues: https://github.com/yourrepo/issues

**Related Documentation:**
- `GOOGLE_ANALYTICS_SETUP.md` - GA4 setup with react-ga4
- `REACT_GA4_MIGRATION.md` - Migration to react-ga4
- `README.md` - General project documentation
