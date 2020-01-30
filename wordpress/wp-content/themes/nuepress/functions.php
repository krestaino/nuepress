<?php

// Addded to end of the post excerpt if longer than 55 words
function new_excerpt_more($more)
{
  return '…';
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

// https://github.com/WordPress/gutenberg/issues/1761#issuecomment-412876340
add_filter('rest_url', function ($url) {
  $url = str_replace(home_url(), site_url(), $url);
  return $url;
});
