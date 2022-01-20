# Example App

This example application uses the following plugins:

- `@pages-plugins/sentry`

  In [`functions/_middleware.ts`](./functions/_middleware.ts), we import the `@pages-plugins/sentry` plugin and load it with a Sentry DSN. This will run in front of all other Functions in our project. [`/throw`](http://localhost:8788/throw) is an example of a Function which throws an error.

- `@pages-plugins/headers`

  In [`functions/_middleware.ts`](./functions/_middleware.ts), we import the `@pages-plugins/headers` plugin and use it to apply CORS headers to all every response.

- `@pages-plugins/graphql`

  In [`functions/graphql.ts`](./functions/graphql.ts), we import the `@pages-plugins/graphql` plugin and load it with a GraphQL schema. This is available at [`/graphql`](http://localhost:8788/graphql).

## Installation

1. Install the installer. This is used for installing static assets until we get something a bit more magical in place ✨

   ```
   npm install --save-dev @cfpreview/pages-plugins-installer
   ```

1. Add the installer to your build step. This could either be with a `prebuild` npm script, or directly in your Pages project on the Cloudflare dashboard ⛅️

   ```sh
   npx @cfpreview/pages-plugin-installer [directory]
   ```

   The directory should be the directory of your static assets.

1. Use this custom build of wrangler until we get these changes merged in 🤠

   ```sh
   npm install https://
   ```

1. Install any plugins you want to use and mount as shown in your `functions` directory 📥
