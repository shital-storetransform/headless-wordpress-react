<?php
/**
 * @package BuddyBoss Child
 * The parent theme functions are located at /buddyboss-theme/inc/theme/functions.php
 * Add your own functions at the bottom of this file.
 */


/****************************** THEME SETUP ******************************/

/**
 * Sets up theme for translation
 *
 * @since BuddyBoss Child 1.0.0
 */
function buddyboss_theme_child_languages()
{
  /**
   * Makes child theme available for translation.
   * Translations can be added into the /languages/ directory.
   */

  // Translate text from the PARENT theme.
  load_theme_textdomain( 'buddyboss-theme', get_stylesheet_directory() . '/languages' );

  // Translate text from the CHILD theme only.
  // Change 'buddyboss-theme' instances in all child theme files to 'buddyboss-theme-child'.
  // load_theme_textdomain( 'buddyboss-theme-child', get_stylesheet_directory() . '/languages' );

}
add_action( 'after_setup_theme', 'buddyboss_theme_child_languages' );

/**
 * Enqueues scripts and styles for child theme front-end.
 *
 * @since Boss Child Theme  1.0.0
 */
function buddyboss_theme_child_scripts_styles()
{
  /**
   * Scripts and Styles loaded by the parent theme can be unloaded if needed
   * using wp_deregister_script or wp_deregister_style.
   *
   * See the WordPress Codex for more information about those functions:
   * http://codex.wordpress.org/Function_Reference/wp_deregister_script
   * http://codex.wordpress.org/Function_Reference/wp_deregister_style
   **/

  // Styles
  wp_enqueue_style( 'buddyboss-child-css', get_stylesheet_directory_uri().'/assets/css/custom.css' );

  // Javascript
  wp_enqueue_script( 'buddyboss-child-js', get_stylesheet_directory_uri().'/assets/js/custom.js' );
}
add_action( 'wp_enqueue_scripts', 'buddyboss_theme_child_scripts_styles', 9999 );


/****************************** CUSTOM FUNCTIONS ******************************/

// Add your own custom functions here

function register_menus_for_rest_api() {
    // Register your menu locations to be available in the REST API
    register_nav_menus(
        array(
            'main_menu' => __( 'Main Menu' ),
        )
    );
}
add_action( 'after_setup_theme', 'register_menus_for_rest_api' );

// Add menu data to the REST API response
function add_menu_to_rest_api() {
    register_rest_route( 'wp/v2', '/menus', array(
        'methods' => 'GET',
        'callback' => 'get_menu_items',
    ));
}

function get_menu_items() {
    // Get the menu
    $menu_name = 'main_menu';  // Set the menu location name
    $locations = get_nav_menu_locations();
    $menu_id = $locations[$menu_name];

    // Get the menu items
    $menu_items = wp_get_nav_menu_items($menu_id);
    $menu_data = [];

    foreach ($menu_items as $menu_item) {
        $menu_data[] = [
            'ID' => $menu_item->ID,
            'title' => $menu_item->title,
            'url' => $menu_item->url
        ];
    }

    return $menu_data;
}
add_action( 'rest_api_init', 'add_menu_to_rest_api' );

// footer
function register_footer_menu_endpoint() {
  register_rest_route('wp/v2', '/footer-menu/', array(
      'methods' => 'GET',
      'callback' => 'get_footer_menu_items',
  ));
}

function get_footer_menu_items() {
  $menu_name = 'footer menu'; // Replace with your menu name or ID
  $menu = wp_get_nav_menu_items($menu_name);
  $items = [];

  foreach ($menu as $menu_item) {
      $items[] = [
          'title' => $menu_item->title,
          'url' => $menu_item->url,
      ];
  }

  return $items;
}

add_action('rest_api_init', 'register_footer_menu_endpoint');
// product
// 1. Enable Basic Authentication and Set CORS Headers
add_action('rest_api_init', function () {
    remove_filter('rest_pre_serve_request', 'rest_send_cors_headers');
    add_filter('rest_pre_serve_request', function ($value) {
        // Allow cross-origin requests. In production, replace '*' with your domain (e.g., 'http://yourdomain.com')
        header('Access-Control-Allow-Origin: *'); 
        header('Access-Control-Allow-Methods: GET, POST, OPTIONS, DELETE, PUT');
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Allow-Headers: Content-Type, Authorization');
        return $value;
    });
});

// 2. Allow Public Access to WooCommerce Products (Read-Only)
add_filter('woocommerce_rest_check_permissions', function ($permission, $context, $object_id, $post_type) {
    if ($context === 'read' && $post_type === 'product') {
        return true; // Allow anyone to read product data
    }
    return $permission;
}, 10, 4);

// 3. Bypass HTTPS Requirement for Local Development (Not Recommended for Production)
add_filter('woocommerce_rest_force_ssl', function ($value) {
    if ($_SERVER['REMOTE_ADDR'] === '127.0.0.1' || $_SERVER['REMOTE_ADDR'] === '::1') {
        return false; // Disable SSL enforcement for local development (e.g., localhost)
    }
    return true; // Enable SSL enforcement for production environments
});

// 4. Test REST API Functionality (Optional, for development/debugging)
add_action('rest_api_init', function () {
    register_rest_route('custom/v1', '/test', array(
        'methods' => 'GET',
        'callback' => function () {
            return rest_ensure_response(['message' => 'API is working']);
        },
    ));
});

// 5. Enable Authentication for WooCommerce REST API (Basic Authentication)
add_filter('woocommerce_rest_check_permissions', function ($permission, $context, $object_id, $post_type) {
    // You can add additional permissions or restrictions for other custom post types, or specific product types here
    return $permission;
}, 10, 4);

?>