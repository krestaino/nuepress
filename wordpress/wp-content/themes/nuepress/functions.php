<?php

// Remove 'Read More' from excerpts
function new_excerpt_more($more)
{
  return '';
}
add_filter('excerpt_more', 'new_excerpt_more');

// Increase max page limit
function increase_per_page_limit($params)
{
  if (isset($params['per_page'])) {
    $params['per_page']['maximum'] = 1000000;
  }
  return $params;
}

add_filter('rest_post_collection_params', 'increase_per_page_limit', 10, 2);
add_filter('rest_page_collection_params', 'increase_per_page_limit', 10, 2);
add_filter('rest_category_collection_params', 'increase_per_page_limit', 10, 2);
add_filter('rest_user_collection_params', 'increase_per_page_limit', 10, 2);

// Hide customize theme options
function remove_customize_theme_options($wp_customize)
{
  $wp_customize->remove_section('colors');
  $wp_customize->remove_section('header_image');
  $wp_customize->remove_section('background_image');
  $wp_customize->remove_panel('nav_menus');
  $wp_customize->remove_section('static_front_page');
  $wp_customize->remove_section('custom_css');
}
add_action('customize_register', 'remove_customize_theme_options', 50);

// Remove comments from admin
function my_remove_admin_menus()
{
  remove_menu_page('edit-comments.php');
}
add_action('admin_menu', 'my_remove_admin_menus');

// Removes comment from admin bar
function mytheme_admin_bar_render()
{
  global $wp_admin_bar;
  $wp_admin_bar->remove_menu('comments');
}
add_action('wp_before_admin_bar_render', 'mytheme_admin_bar_render');

// Custom endpoint for the homepage

function get_json_body($url)
{
  $request = wp_remote_get($url);
  if (is_wp_error($request)) {
    return false;
  }
  $body = wp_remote_retrieve_body($request);
  return json_decode($body);
}

function rest_homepage($data)
{
  // $posts = get_posts(array(
  //   'numberposts' => 10
  // ));

  // $featured = get_posts(array(
  //   'category' => 194,
  //   'numberposts' => 10
  // ));

  // $featured = array_map(function ($post) {
  //   return array(
  //     'post_title' => $post->post_title,
  //     'post_content' => $post->post_content,
  //     'categories' => get_the_category($post->ID),
  //     'featured_image' => get_the_post_thumbnail_url($post, 'medium')
  //   );
  // }, $posts);

  $posts = get_json_body(
    'https://wp.kmr.io/wp-json/wp/v2/posts?orderby=date&per_page=10&categories_exclude=194&_embed'
  );
  $featured = get_json_body(
    'https://wp.kmr.io/wp-json/wp/v2/posts?orderby=date&per_page=10&categories=194&_embed'
  );

  return array(
    'posts' => $posts,
    'featured' => $featured
  );
}

add_action('rest_api_init', function () {
  register_rest_route('nuepress/v1', '/homepage', array(
    'methods' => 'GET',
    'callback' => 'rest_homepage'
  ));
});

function wprc_add_acf_posts_endpoint($allowed_endpoints)
{
  if (
    !isset($allowed_endpoints['nuepress/v1']) ||
    !in_array('posts', $allowed_endpoints['nuepress/v1'])
  ) {
    $allowed_endpoints['nuepress/v1'][] = 'posts';
  }
  return $allowed_endpoints;
}
add_filter('wp_rest_cache/allowed_endpoints', 'wprc_add_acf_posts_endpoint', 10, 1);
