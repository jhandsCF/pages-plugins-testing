# Example App

This example application uses the following plugins:

- `@pages-plugins/sentry`

  In [`functions/_middleware.ts`](./functions/_middleware.ts), we import the `@pages-plugins/sentry` plugin and load it with a Sentry DSN. This will run in front of all other Functions in our project. [`/throw`](http://localhost:8788/throw) is an example of a Function which throws an error.

- `@pages-plugins/graphql`

  In [`functions/graphql.ts`](./functions/graphql.ts), we import the `@pages-plugins/graphql` plugin and load it with a GraphQL schema. This is available at [`/graphql`](http://localhost:8788/graphql).
