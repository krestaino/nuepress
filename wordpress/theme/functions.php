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
