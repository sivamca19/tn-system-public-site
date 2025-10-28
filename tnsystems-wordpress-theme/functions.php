<?php
function tnsystems_theme_assets() {
    $theme_dir  = get_template_directory_uri() . '/assets';
    $theme_path = get_template_directory() . '/assets';

    // ----------------------
    // Enqueue CSS file
    // ----------------------
    $css_files = glob($theme_path . '/*.css');
    if (!empty($css_files)) {
        $css_file = basename($css_files[0]);
        wp_enqueue_style(
            'vite-style',
            $theme_dir . '/' . $css_file,
            [],
            filemtime($theme_path . '/' . $css_file)
        );
    }

    // ----------------------
    // Enqueue JS file
    // ----------------------
    $js_files = glob($theme_path . '/*.js');
    if (!empty($js_files)) {
        $js_file = basename($js_files[0]);
        wp_enqueue_script(
            'vite-script',
            $theme_dir . '/' . $js_file,
            [],
            filemtime($theme_path . '/' . $js_file),
            true
        );
    }

    // ----------------------
    // Add Favicon dynamically
    // ----------------------
    $favicon_files = glob($theme_path . '/favicon-*.ico'); // hashed favicon
    if (!empty($favicon_files)) {
        $favicon_file = basename($favicon_files[0]);
        echo '<link rel="icon" href="' . $theme_dir . '/' . $favicon_file . '" sizes="32x32" />';
    }
}
add_action('wp_enqueue_scripts', 'tnsystems_theme_assets', 20);

function tnsystems_add_meta_tags() {
    echo '<meta name="viewport" content="width=device-width, initial-scale=1.0" />' . "\n";
}
add_action('wp_head', 'tnsystems_add_meta_tags');
// add_filter('wpcf7_rest_allow_anonymous', '__return_true');

// Custom REST API endpoint to submit CF7 forms
add_action('rest_api_init', function () {
    register_rest_route('cf7-custom/v1', '/submit/(?P<form_id>\d+)', [
        'methods' => 'POST',
        'callback' => 'handle_cf7_rest_submission',
        'permission_callback' => '__return_true',
    ]);
});

function handle_cf7_rest_submission($request) {
    $form_id = (int) $request->get_param('form_id');

    if (!$form_id) {
        return new WP_Error('invalid_form_id', 'Form ID is required.', ['status' => 400]);
    }

    $form = WPCF7_ContactForm::get_instance($form_id);
    if (!$form) {
        return new WP_Error('form_not_found', 'Contact Form 7 form not found.', ['status' => 404]);
    }

    // Get JSON body first, then fallback
    $body = $request->get_json_params();
    if (empty($body)) {
        $body = $request->get_body_params();
    }
    if (empty($body)) {
        $raw = file_get_contents('php://input');
        $decoded = json_decode($raw, true);
        if (is_array($decoded)) {
            $body = $decoded;
        }
    }

    if (empty($body)) {
        return new WP_Error('no_data', 'No submission data provided.', ['status' => 400]);
    }

    // Add required hidden CF7 fields
    $posted_data = array_merge($body, [
        '_wpcf7' => $form_id,
        '_wpcf7_version' => WPCF7_VERSION,
        '_wpcf7_locale' => get_locale(),
        '_wpcf7_unit_tag' => 'rest-api-' . uniqid(),
        '_wpcf7_container_post' => 0,
    ]);

    error_log('CF7 Submission Data: ' . print_r($posted_data, true));

    /**
     * Instead of manually creating a submission,
     * use CF7's built-in submission process.
     */
    $_POST = $posted_data; // simulate a normal POST request
    $result = $form->submit();

    // ✅ Return CF7 response
    return rest_ensure_response($result);
}


/**
 * Job Openings REST API - List, View, Apply
 */

// ------------------------------
// 1. Register Job Openings CPT
// ------------------------------
function register_job_openings_cpt() {
    $labels = [
        'name' => 'Job Openings',
        'singular_name' => 'Job Opening',
        'menu_name' => 'Job Openings',
    ];

    $args = [
        'labels' => $labels,
        'public' => true,
        'has_archive' => true,
        'show_in_rest' => true,
        'supports' => ['title', 'editor', 'custom-fields'],
        'menu_icon' => 'dashicons-id-alt',
    ];

    register_post_type('job_opening', $args);
}
add_action('init', 'register_job_openings_cpt');


// ------------------------------
// 2. Register REST API Routes
// ------------------------------
add_action('rest_api_init', function () {

    // GET all jobs
    register_rest_route('jobs/v1', '/list', [
        'methods' => 'GET',
        'callback' => 'get_all_job_openings',
        'permission_callback' => '__return_true'
    ]);

    // GET single job
    register_rest_route('jobs/v1', '/detail/(?P<id>\d+)', [
        'methods' => 'GET',
        'callback' => 'get_single_job_opening',
        'permission_callback' => '__return_true'
    ]);

    // POST apply for a job
    register_rest_route('jobs/v1', '/apply/(?P<id>\d+)', [
        'methods' => 'POST',
        'callback' => 'apply_for_job',
        'permission_callback' => '__return_true'
    ]);
});


// ------------------------------
// 3. REST API Callbacks
// ------------------------------

// GET all jobs
function get_all_job_openings() {
    $jobs = get_posts([
        'post_type' => 'job_opening',
        'post_status' => 'publish',
        'numberposts' => -1,
    ]);

    $response = [];
    foreach ($jobs as $job) {
        $response[] = [
            'id' => $job->ID,
            'title' => $job->post_title,
            'description' => wp_strip_all_tags($job->post_content),
            'meta' => get_post_meta($job->ID)
        ];
    }

    return rest_ensure_response($response);
}

// GET single job
function get_single_job_opening($request) {
    $id = (int) $request['id'];
    $job = get_post($id);

    if (!$job || $job->post_type !== 'job_opening') {
        return new WP_Error('not_found', 'Job not found', ['status' => 404]);
    }

    $response = [
        'id' => $job->ID,
        'title' => $job->post_title,
        'description' => wpautop($job->post_content),
        'meta' => get_post_meta($job->ID)
    ];

    return rest_ensure_response($response);
}

// POST apply for a job
function apply_for_job($request) {
    $id = (int) $request['id'];
    $job = get_post($id);

    if (!$job || $job->post_type !== 'job_opening') {
        return new WP_Error('not_found', 'Job not found', ['status' => 404]);
    }

    $params = $request->get_json_params();

    // Required applicant fields
    if (empty($params['name']) || empty($params['email']) || empty($params['resume'])) {
        return new WP_Error('missing_fields', 'Name, Email, and Resume are required', ['status' => 400]);
    }

    // Send email to site admin
    $to = get_option('admin_email');
    $subject = "Job Application for: " . $job->post_title;
    $message = "Applicant Name: " . sanitize_text_field($params['name']) . "\n";
    $message .= "Email: " . sanitize_email($params['email']) . "\n";
    $message .= "Phone: " . sanitize_text_field($params['phone'] ?? '') . "\n";
    $message .= "Resume / Message: " . sanitize_textarea_field($params['resume']) . "\n";

    $headers = ['Content-Type: text/plain; charset=UTF-8'];

    $mail_sent = wp_mail($to, $subject, $message, $headers);

    if (!$mail_sent) {
        return new WP_Error('mail_failed', 'Failed to send application. Please try again.', ['status' => 500]);
    }

    return rest_ensure_response([
        'job_id' => $job->ID,
        'message' => 'Your application has been submitted successfully!'
    ]);
}

require_once get_template_directory() . '/job-api.php';