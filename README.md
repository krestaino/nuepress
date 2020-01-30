<p align="left">
  <a href="https://travis-ci.org/krestaino/nuepress"><img src="https://travis-ci.org/krestaino/nuepress.svg?branch=master" alt="Build Status"></a>
</p>

## NuePress

[Nuxt.js](https://github.com/nuxt/nuxt.js) + [WordPress REST API](https://developer.wordpress.org/rest-api/)

![Screenshot](wordpress/wp-content/themes/nuepress/screenshot.png)

## Demo

[https://nuepress.kmr.io](https://nuepress.kmr.io/)

## Development

```bash
# install dependencies and create .env file
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project (not working right now)
$ yarn generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

## Wordpress Setup

Install the [wordpress/wp-content/themes/nuepress](wordpress/wp-content/themes/nuepress) theme in WordPress.

This theme is required to generate the sitemaps. It extends the `per_page_limit` REST API limitation. There are a few other non-critical changes included too. See the [functions.php](wordpress/wp-content/themes/nuepress/functions.php) for more.
