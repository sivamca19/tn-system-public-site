<?php
/**
 * Custom REST API for WP Job Openings
 * Endpoints:
 *  GET  /wp-json/jobs/v1/listings         → List all published jobs
 *  GET  /wp-json/jobs/v1/listings/{id}    → View job details
 *  POST /wp-json/jobs/v1/apply/{id}       → Apply for a job
 */

if ( ! defined( 'ABSPATH' ) ) exit;

/**
 * Register custom REST API routes
 */
add_action( 'rest_api_init', function() {

    // List all job openings
    register_rest_route( 'jobs/v1', '/listings', [
        'methods'             => 'GET',
        'callback'            => 'tns_get_all_jobs',
        'permission_callback' => '__return_true',
    ]);

    // Get a single job by ID
    register_rest_route( 'jobs/v1', '/listings/(?P<id>\d+)', [
        'methods'             => 'GET',
        'callback'            => 'tns_get_single_job',
        'permission_callback' => '__return_true',
    ]);

    // Apply for a job
    register_rest_route( 'jobs/v1', '/apply_job/(?P<id>\d+)', [
        'methods'             => 'POST',
        'callback'            => 'tns_apply_for_job',
        'permission_callback' => '__return_true',
        'args' => [
            'name'         => [ 'required' => true, 'type' => 'string' ],
            'email'        => [ 'required' => true, 'type' => 'string', 'format' => 'email' ],
            'phone'        => [ 'required' => false, 'type' => 'string' ],
            'cover_letter' => [ 'required' => false, 'type' => 'string' ],
            'resume_url'   => [ 'required' => false, 'type' => 'string', 'format' => 'uri' ],
        ],
    ]);

});

/**
 * Format job details into a clean array
 */
function tns_format_job( $post ) {
    $logo_id = get_post_meta( $post->ID, '_awsm_company_logo', true );
    $logo_url = $logo_id ? wp_get_attachment_url( $logo_id ) : '';

    return [
        'id'          => (int) $post->ID,
        'title'       => $post->post_title,
        'description' => apply_filters( 'the_content', $post->post_content ),
        'excerpt'     => wp_trim_words( wp_strip_all_tags( $post->post_content ), 30, '...' ),
        'location'    => get_post_meta( $post->ID, '_awsm_job_location', true ),
        'job_type'    => get_post_meta( $post->ID, '_awsm_job_type', true ),
        'salary'      => get_post_meta( $post->ID, '_awsm_job_salary', true ),
        'company'     => [
            'name'    => get_post_meta( $post->ID, '_awsm_company_name', true ),
            'website' => get_post_meta( $post->ID, '_awsm_company_website', true ),
            'logo'    => $logo_url,
        ],
        'application_email' => get_post_meta( $post->ID, '_awsm_application_email', true ),
        'application_url'   => get_post_meta( $post->ID, '_awsm_application_url', true ),
        'permalink'   => get_permalink( $post->ID ),
        'posted_on'   => get_the_date( 'Y-m-d', $post ),
    ];
}

/**
 * Get all published jobs
 */
function tns_get_all_jobs( $request ) {
    $page     = (int) ( $request->get_param( 'page' ) ?: 1 );
    $per_page = min( (int) ( $request->get_param( 'per_page' ) ?: 20 ), 100 );

    $query = new WP_Query([
        'post_type'      => 'awsm_job_openings',
        'post_status'    => 'publish',
        'posts_per_page' => $per_page,
        'paged'          => $page,
        'orderby'        => 'date',
        'order'          => 'DESC',
    ]);

    $jobs = array_map( 'tns_format_job', $query->posts );

    return new WP_REST_Response([
        'jobs'         => $jobs,
        'total'        => (int) $query->found_posts,
        'total_pages'  => (int) $query->max_num_pages,
        'current_page' => $page,
    ], 200);
}

/**
 * Get a single job
 */
function tns_get_single_job( $request ) {
    $id   = (int) $request['id'];
    $post = get_post( $id );

    if ( ! $post || $post->post_type !== 'awsm_job_openings' || $post->post_status !== 'publish' ) {
        return new WP_REST_Response([ 'error' => 'Job not found.' ], 404);
    }

    return new WP_REST_Response( tns_format_job( $post ), 200 );
}

/**
 * Apply for a job
 */

function tns_apply_for_job( $request ) {
    $job_id = (int) $request['id'];
    $job_post = get_post( $job_id );

    // Validate job
    if ( ! $job_post || $job_post->post_type !== 'awsm_job_openings' || $job_post->post_status !== 'publish' ) {
        return new WP_REST_Response([ 'error' => 'Invalid or unpublished job.' ], 404);
    }

    // Sanitize input
    $name         = sanitize_text_field( $request['name'] );
    $email        = sanitize_email( $request['email'] );
    $phone        = sanitize_text_field( $request['phone'] );
    $cover_letter = sanitize_textarea_field( $request['cover_letter'] );
    $resume_url   = esc_url_raw( $request['resume_url'] );

    if ( empty( $name ) || ! is_email( $email ) ) {
        return new WP_REST_Response([ 'error' => 'Name and valid email required.' ], 400);
    }

    // Create application post
    $application_id = wp_insert_post([
        'post_title'   => $name,
        'post_type'    => 'awsm_job_application',
        'post_status'  => 'publish',
        'post_content' => $cover_letter,
    ]);

    if ( is_wp_error( $application_id ) ) {
        return new WP_REST_Response([
            'error' => 'Failed to create application.',
            'details' => $application_id->get_error_message(),
        ], 500);
    }

    // --- ✅ Plugin-compatible meta keys ---
    update_post_meta( $application_id, 'awsm_job_id', $job_id );
    update_post_meta( $application_id, 'awsm_apply_for', $job_post->post_title );
    update_post_meta( $application_id, 'awsm_applicant_ip', $_SERVER['REMOTE_ADDR'] ?? 'API' );
    update_post_meta( $application_id, 'awsm_applicant_name', $name );
    update_post_meta( $application_id, 'awsm_applicant_email', $email );
    update_post_meta( $application_id, 'awsm_applicant_phone', $phone );
    update_post_meta( $application_id, 'awsm_applicant_letter', $cover_letter );
    update_post_meta( $application_id, 'awsm_agree_privacy_policy', 'yes' );

    // Resume attachment simulation (optional)
    if ( ! empty( $resume_url ) ) {
        // Create a minimal attachment entry so UI displays resume correctly
        $attachment_id = wp_insert_attachment([
            'post_mime_type' => 'application/pdf',
            'post_title'     => basename( $resume_url ),
            'post_content'   => '',
            'post_status'    => 'inherit',
            'guid'           => $resume_url,
        ]);

        update_post_meta( $application_id, 'awsm_attachment_id', $attachment_id );
    }

    update_post_meta( $application_id, 'awsm_application_status', 'pending' );
    update_post_meta( $application_id, 'awsm_application_date', current_time( 'mysql' ) );

    // Default empty mail log (prevents plugin errors)
    update_post_meta( $application_id, 'awsm_application_mails', serialize([]) );

    // Trigger plugin hook
    do_action( 'awsm_application_submitted', $application_id, $job_id );

    return new WP_REST_Response([
        'success' => true,
        'message' => 'Application submitted successfully!',
        'application_id' => $application_id,
        'job_id' => $job_id,
    ], 200);
}