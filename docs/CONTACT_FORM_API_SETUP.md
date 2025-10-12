# Contact Form 7 API Integration

This document explains how the Contact Form 7 (CF7) custom REST API is integrated into the contact form.

## Overview

The contact form on your website now submits directly to a custom Contact Form 7 REST API endpoint instead of using the standard CF7 AJAX submission.

## Custom REST API Endpoint

### Endpoint URL
```
https://tnsystems.in/wp-json/cf7-custom/v1/submit/535
```

- **Method**: POST
- **Content-Type**: application/json
- **Form ID**: 535 (configurable in `.env`)

### WordPress PHP Code

Add this code to your WordPress theme's `functions.php` or a custom plugin:

```php
// Register the custom REST route
add_action('rest_api_init', function () {
    register_rest_route('cf7-custom/v1', '/submit/(?P<form_id>\d+)', [
        'methods' => 'POST',
        'callback' => 'handle_cf7_rest_submission',
        'permission_callback' => '__return_true', // Allow public access
    ]);
});

/**
 * Handle CF7 form submission via REST API.
 *
 * @param WP_REST_Request $request
 * @return WP_REST_Response|WP_Error
 */
function handle_cf7_rest_submission($request) {
    $form_id = (int) $request->get_param('form_id');

    // Validate form ID
    if (!$form_id) {
        return new WP_Error('invalid_form_id', 'Form ID is required.', ['status' => 400]);
    }

    // Get CF7 form instance
    $form = WPCF7_ContactForm::get_instance($form_id);
    if (!$form) {
        return new WP_Error('form_not_found', 'Contact Form 7 form not found.', ['status' => 404]);
    }

    // Try to get JSON data first
    $body = $request->get_json_params();

    // Fallback to form-encoded data
    if (empty($body)) {
        $body = $request->get_body_params();
    }

    // If still empty, try raw input (for edge cases)
    if (empty($body)) {
        $raw_input = file_get_contents('php://input');
        if (!empty($raw_input)) {
            $decoded = json_decode($raw_input, true);
            if (is_array($decoded)) {
                $body = $decoded;
            }
        }
    }

    if (empty($body)) {
        return new WP_Error('no_data', 'No submission data provided.', ['status' => 400]);
    }

    // Add required hidden fields for CF7 validation
    $posted_data = array_merge($body, [
        '_wpcf7' => $form_id,
        '_wpcf7_version' => WPCF7_VERSION,
        '_wpcf7_locale' => get_locale(),
        '_wpcf7_unit_tag' => 'rest-api-' . uniqid(),
        '_wpcf7_container_post' => 0,
    ]);

    // Submit the form (CF7 handles validation, hooks, and email)
    $result = $form->submit($posted_data);

    return rest_ensure_response($result);
}
```

## Field Mapping

The React form fields are mapped to Contact Form 7 field names:

| React Form Field | CF7 Field Name | Required |
|-----------------|----------------|----------|
| name | your-name | Yes |
| email | your-email | Yes |
| phone | your-phone-number | No |
| company | your-company-name | No |
| service | your-service-interest | Yes |
| message | your-message | Yes |

## Request Format

### Example cURL Request
```bash
curl -X POST https://tnsystems.in/wp-json/cf7-custom/v1/submit/535 \
  -H "Content-Type: application/json" \
  -d '{
    "your-name": "John Doe",
    "your-email": "john@example.com",
    "your-phone-number": "9876543210",
    "your-company-name": "TopNotch Systems",
    "your-service-interest": "Web Development",
    "your-message": "I would like to know more about your services."
  }'
```

### Example JavaScript/Fetch Request
```javascript
const response = await fetch('https://tnsystems.in/wp-json/cf7-custom/v1/submit/535', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    'your-name': 'John Doe',
    'your-email': 'john@example.com',
    'your-phone-number': '9876543210',
    'your-company-name': 'TopNotch Systems',
    'your-service-interest': 'Web Development',
    'your-message': 'I would like to know more about your services.'
  }),
});

const result = await response.json();
```

## Response Format

### Success Response (200 OK)
```json
{
  "status": "mail_sent",
  "message": "Thank you for your message. It has been sent.",
  "posted_data_hash": "abc123def456",
  "into": "#wpcf7-f535-rest-api-xyz"
}
```

### Validation Error Response (200 OK with validation errors)
```json
{
  "status": "validation_failed",
  "message": "One or more fields have an error. Please check and try again.",
  "invalid_fields": [
    {
      "field": "your-email",
      "message": "The e-mail address entered is invalid.",
      "idref": "your-email",
      "error_id": "abc123"
    }
  ],
  "posted_data_hash": "abc123def456"
}
```

### Error Response (404 Not Found)
```json
{
  "code": "form_not_found",
  "message": "Contact Form 7 form not found.",
  "data": {
    "status": 404
  }
}
```

## Environment Configuration

The API endpoint is configured in `.env`:

```bash
VITE_CONTACT_FORM_API_URL=https://tnsystems.in/wp-json/cf7-custom/v1/submit/535
```

### To Change the Form ID:
1. Find your CF7 form ID in WordPress Admin → Contact → Contact Forms
2. Update `.env`:
   ```bash
   VITE_CONTACT_FORM_API_URL=https://tnsystems.in/wp-json/cf7-custom/v1/submit/YOUR_FORM_ID
   ```
3. Restart your dev server: `npm run dev`

## Frontend Implementation

### Location
`src/components/Contact.tsx`

### Key Features

✅ **Real API Submission** - Actually sends data to WordPress
✅ **Loading State** - Shows spinner while submitting
✅ **Success Message** - Shows confirmation when email sent
✅ **Error Handling** - Displays validation and network errors
✅ **Analytics Tracking** - Tracks successful and failed submissions
✅ **Form Reset** - Clears form after successful submission

### Code Structure

```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);
  setSubmitError(null);

  try {
    // Map form fields to CF7 field names
    const cf7Data = {
      'your-name': formData.name,
      'your-email': formData.email,
      'your-phone-number': formData.phone,
      'your-company-name': formData.company,
      'your-service-interest': formData.service,
      'your-message': formData.message
    };

    // Submit to CF7 API
    const response = await fetch(CONTACT_FORM_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cf7Data),
    });

    const result = await response.json();

    if (response.ok && result.status === 'mail_sent') {
      // Success - show confirmation
      setIsSubmitted(true);
      setFormData({ /* reset */ });
    } else {
      // Error - show error message
      setSubmitError(result.message);
    }
  } catch (error) {
    // Network error
    setSubmitError('Network error. Please try again.');
  } finally {
    setIsSubmitting(false);
  }
};
```

## Testing the Integration

### Test in Development

1. **Start dev server:**
   ```bash
   npm run dev
   ```

2. **Navigate to contact form:**
   http://localhost:5173/#contact

3. **Fill out and submit the form**

4. **Check browser console** for:
   - API request details
   - Response data
   - Any errors

### Test with cURL

```bash
# Test with valid data
curl -X POST https://tnsystems.in/wp-json/cf7-custom/v1/submit/535 \
  -H "Content-Type: application/json" \
  -d '{
    "your-name": "Test User",
    "your-email": "test@example.com",
    "your-service-interest": "Web Development",
    "your-message": "This is a test message."
  }'

# Test with invalid email
curl -X POST https://tnsystems.in/wp-json/cf7-custom/v1/submit/535 \
  -H "Content-Type: application/json" \
  -d '{
    "your-name": "Test User",
    "your-email": "invalid-email",
    "your-service-interest": "Web Development",
    "your-message": "This is a test message."
  }'
```

### Expected Behavior

**When form is valid:**
1. Submit button shows "Sending..." with spinner
2. Form becomes disabled
3. Success message appears in green box
4. Form fields are cleared
5. Google Analytics tracks successful submission

**When form has errors:**
1. Submit button shows "Sending..." briefly
2. Error message appears in red box
3. Form remains filled
4. User can correct and resubmit

**On network error:**
1. Shows "Network error" message
2. Form remains filled
3. User can retry

## Security Considerations

### WordPress Side

✅ **CF7 handles validation** - Uses built-in CF7 validation
✅ **CF7 handles spam protection** - Supports reCAPTCHA, Akismet
✅ **Rate limiting** - WordPress plugins available
✅ **CORS** - Configure in WordPress if needed

### Frontend Side

✅ **Client-side validation** - HTML5 required fields
✅ **No sensitive data exposure** - API URL is public
✅ **Error messages sanitized** - No raw error exposure
✅ **HTTPS only** - All requests over SSL

## Troubleshooting

### Issue: Form submits but no email received

**Solutions:**
1. ✅ Check WordPress email settings
2. ✅ Verify CF7 email configuration
3. ✅ Check spam folder
4. ✅ Test with SMTP plugin (WP Mail SMTP)
5. ✅ Check server email logs

### Issue: CORS error in browser

**Solution:** Add CORS headers to WordPress:

```php
add_action('rest_api_init', function () {
    remove_filter('rest_pre_serve_request', 'rest_send_cors_headers');
    add_filter('rest_pre_serve_request', function ($value) {
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Allow-Headers: Content-Type');
        return $value;
    });
}, 15);
```

### Issue: 404 Not Found error

**Solutions:**
1. ✅ Verify CF7 plugin is installed and active
2. ✅ Check form ID is correct (535)
3. ✅ Flush WordPress permalinks (Settings → Permalinks → Save)
4. ✅ Verify PHP code is in functions.php

### Issue: Validation errors not showing

**Solutions:**
1. ✅ Check browser console for API response
2. ✅ Verify CF7 form has validation rules set
3. ✅ Check field names match exactly
4. ✅ Ensure required fields are marked in CF7

## Contact Form 7 Setup in WordPress

### Required CF7 Form Fields

Your CF7 form should have these fields:

```
[text* your-name placeholder "Your Name"]
[email* your-email placeholder "Your Email"]
[tel your-phone-number placeholder "Phone Number"]
[text your-company-name placeholder "Company Name"]
[select* your-service-interest "Select a service" "SAP Solutions" "Full-Stack Development" "IT Staffing" "IT Consulting" "Cloud Services" "Security & Support" "Other"]
[textarea* your-message placeholder "Your Message"]
[submit "Send Message"]
```

### Email Template

**To:**
```
operations@tnsystems.in
```

**Subject:**
```
New Contact Form Submission from [your-name]
```

**Message Body:**
```
Name: [your-name]
Email: [your-email]
Phone: [your-phone-number]
Company: [your-company-name]
Service Interest: [your-service-interest]

Message:
[your-message]
```

## Benefits of This Integration

✅ **Modern API approach** - RESTful JSON API
✅ **Better UX** - Stays on same page, no reload
✅ **Error handling** - Proper error messages
✅ **Loading states** - Visual feedback
✅ **Analytics tracking** - Track form performance
✅ **Environment config** - Easy to change endpoints
✅ **Type safety** - TypeScript interfaces

## Related Documentation

- **ENV_SETUP.md** - Environment variable configuration
- **GOOGLE_ANALYTICS_SETUP.md** - Analytics tracking setup
- **Contact Form 7 Docs** - https://contactform7.com/

## Support

For issues with:
- **WordPress/CF7**: Check WordPress admin logs
- **API endpoint**: Test with cURL
- **Frontend form**: Check browser console
- **Email delivery**: Check WordPress email settings

---

**Last Updated**: January 2025
**Form ID**: 535
**API Version**: cf7-custom/v1
