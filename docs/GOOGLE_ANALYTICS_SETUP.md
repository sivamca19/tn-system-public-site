# Google Analytics 4 (GA4) Setup Guide with react-ga4

Google Analytics 4 has been integrated into this website using the `react-ga4` package. Follow these simple steps to activate it with your own Google Analytics account.

## Prerequisites

1. A Google Analytics account
2. Admin access to your Google Analytics property

## Step 1: Create a GA4 Property

1. Go to [Google Analytics](https://analytics.google.com/)
2. Click on **Admin** (gear icon at the bottom left)
3. In the **Property** column, click **Create Property**
4. Enter your property name (e.g., "TNSystems Website")
5. Set your timezone and currency
6. Click **Next**
7. Fill in your business information
8. Click **Create**
9. Accept the Terms of Service

## Step 2: Get Your Measurement ID

1. In your new GA4 property, go to **Admin** → **Data Streams**
2. Click on your web data stream (or create one if it doesn't exist)
3. You'll see your **Measurement ID** (format: `G-XXXXXXXXXX`)
4. Copy this Measurement ID

## Step 3: Update Your Website Code

Replace the placeholder `G-XXXXXXXXXX` with your actual Measurement ID in **ONE file only**:

### Update src/App.tsx

Open `/src/App.tsx` and find line 45:

```typescript
// Before
initGA('G-XXXXXXXXXX');

// After (replace with your actual Measurement ID)
initGA('G-ABC123XYZ4');
```

**That's it!** react-ga4 handles everything else automatically.

## Step 4: Build and Deploy

After updating the Measurement ID:

```bash
npm run build
```

Deploy your updated website to production.

## Step 5: Verify Installation

1. Go to your Google Analytics property
2. Navigate to **Reports** → **Realtime**
3. Visit your website in a browser
4. You should see your visit appear in the Realtime report within a few seconds

## Features Already Implemented

The following Google Analytics tracking is already integrated using react-ga4:

### ✅ Automatic Page View Tracking
- All route changes are automatically tracked via `usePageTracking` hook
- Works seamlessly with React Router navigation
- No manual intervention needed

### ✅ Custom Event Tracking

**Hero Section:**
- "Get Started" button clicks
- "Explore Services" button clicks

**Contact Form:**
- Form submissions
- Contact attempts

### ✅ Available Tracking Functions

All functions are located in `src/utils/analytics.ts`:

```typescript
// Initialize GA (already done in App.tsx)
initGA(measurementId)

// Track page views (automatically handled by usePageTracking hook)
trackPageView(url, title)

// Track custom events
trackEvent(category, action, label, value)

// Track button clicks
trackButtonClick(buttonName, category)

// Track form submissions
trackFormSubmit(formName, success)

// Track outbound links
trackOutboundLink(url, label)

// Track product views
trackProductView(productName)

// Track contact attempts
trackContact(method)

// Track CTA clicks
trackCTAClick(ctaName, location)

// Track scroll depth
trackScrollDepth(depth)

// Track downloads
trackDownload(fileName)

// Track video plays
trackVideoPlay(videoName)

// Track search queries
trackSearch(searchTerm)

// Track exceptions/errors
trackException(description, fatal)

// Set user properties
setUserProperties(properties)
```

## Adding More Tracking

### Example 1: Track Product Page Visits

Add tracking to product pages:

```typescript
// In HospifyPage.tsx, MaidzyPage.tsx, TaskNexPage.tsx
import { useEffect } from 'react';
import { trackProductView } from '../utils/analytics';

export default function HospifyPage() {
  useEffect(() => {
    trackProductView('Hospify');
  }, []);

  return (
    // ... your component
  );
}
```

### Example 2: Track Button Clicks

```typescript
import { trackButtonClick } from '../utils/analytics';

<button
  onClick={() => {
    trackButtonClick('Download Brochure', 'Product Page');
    // ... rest of your onClick logic
  }}
>
  Download Brochure
</button>
```

### Example 3: Track Outbound Links

```typescript
import { trackOutboundLink } from '../utils/analytics';

<a
  href="https://external-site.com"
  onClick={() => trackOutboundLink('https://external-site.com', 'Partner Site')}
  target="_blank"
  rel="noopener noreferrer"
>
  Visit Partner Site
</a>
```

### Example 4: Track Custom Events

```typescript
import { trackEvent } from '../utils/analytics';

const handleCustomAction = () => {
  trackEvent('newsletter', 'subscribe', 'footer', 1);
  // ... rest of your logic
};
```

## Benefits of react-ga4

✅ **Clean React API** - React-friendly syntax
✅ **TypeScript Support** - Full type definitions included
✅ **Zero HTML Configuration** - No need to edit index.html
✅ **Easy Testing** - Simpler to mock in tests
✅ **Popular Package** - 200k+ weekly downloads on npm
✅ **Active Maintenance** - Regularly updated

## Viewing Your Data

### Realtime Reports
- **Reports** → **Realtime**: See current visitors in real-time

### Events
- **Reports** → **Engagement** → **Events**: See all tracked events
- Events include: page_view, button_click, form_submit, cta_click, etc.

### Traffic Sources
- **Reports** → **Acquisition** → **Traffic acquisition**: See where visitors come from

### User Behavior
- **Reports** → **Engagement** → **Pages and screens**: See most visited pages

### Conversions
- **Admin** → **Events**: Mark important events as conversions
- Example: Mark "form_submit" as a conversion to track contact form submissions
- Go to **Admin** → **Events** → Find "form_submit" → Toggle "Mark as conversion"

## Common Issues & Solutions

### Issue: No data appearing in reports

**Solutions:**
1. ✅ Verify you replaced `G-XXXXXXXXXX` with your actual Measurement ID in `App.tsx`
2. ✅ Check browser console for errors (press F12)
3. ✅ Disable ad blockers when testing (they block GA)
4. ✅ Test in incognito/private mode to avoid browser extensions
5. ✅ Clear your browser cache and hard reload (Ctrl+Shift+R / Cmd+Shift+R)
6. ✅ Wait 24-48 hours for data to appear in standard reports (Realtime shows data immediately)

### Issue: Events not tracking

**Solutions:**
1. ✅ Open browser console and look for GA errors
2. ✅ Verify the tracking functions are properly imported
3. ✅ Check that react-ga4 is initialized before tracking events
4. ✅ Test in an incognito window

### Issue: "ReactGA is not initialized" error

**Solution:**
- Ensure `initGA()` is called in `App.tsx` before any tracking functions
- The initialization happens in a `useEffect` hook at the top of App component

### Issue: Duplicate page views

**Solution:**
- Make sure you only have ONE initialization of react-ga4 (in App.tsx)
- Don't manually track page views if using the `usePageTracking` hook

## Privacy & GDPR Compliance

If you operate in regions with strict privacy laws (EU, California, etc.), consider adding a cookie consent banner.

### Popular Cookie Consent Solutions:
- [CookieYes](https://www.cookieyes.com/) - Free tier available
- [OneTrust](https://www.onetrust.com/) - Enterprise solution
- [Cookiebot](https://www.cookiebot.com/) - GDPR compliant

### Integration with react-ga4:

```typescript
// Only initialize GA after user consent
const handleCookieConsent = (consent: boolean) => {
  if (consent) {
    initGA('G-XXXXXXXXXX');
  }
};
```

## Testing Your Analytics

### Development Mode
In development, you can see GA events in the browser console:

```typescript
// Add this to your analytics.ts for debugging
if (process.env.NODE_ENV === 'development') {
  console.log('GA Event:', { category, action, label, value });
}
```

### Preview Mode in GA4
1. Go to **Admin** → **DebugView**
2. Enable debug mode in your browser:
   ```javascript
   // Add to browser console
   localStorage.setItem('debug_mode', 'true');
   ```
3. See events in real-time with detailed information

## Package Information

- **Package**: `react-ga4`
- **Version**: Latest
- **Documentation**: [react-ga4 on npm](https://www.npmjs.com/package/react-ga4)
- **GitHub**: [react-ga4 repository](https://github.com/codler/react-ga4)

## Support Resources

### Google Analytics Support
- [GA4 Documentation](https://support.google.com/analytics/answer/10089681)
- [GA4 Setup Guide](https://support.google.com/analytics/answer/9304153)
- [GA4 Events Guide](https://support.google.com/analytics/answer/9267735)

### react-ga4 Support
- [npm Package](https://www.npmjs.com/package/react-ga4)
- [GitHub Issues](https://github.com/codler/react-ga4/issues)

For website-specific analytics questions, contact your development team.

## Quick Reference

### Where is GA initialized?
`src/App.tsx` - Line 45

### Where are tracking functions defined?
`src/utils/analytics.ts`

### Where is automatic page tracking?
`src/hooks/usePageTracking.ts`

### Where are events currently tracked?
- `src/components/Hero.tsx` - CTA button clicks
- `src/components/Contact.tsx` - Form submissions

### What needs to be replaced?
**Only 1 place:** `src/App.tsx` line 45 - Replace `G-XXXXXXXXXX` with your actual Measurement ID

---

**That's all you need!** The react-ga4 implementation is much simpler and more maintainable than manual gtag.js. 🎉
