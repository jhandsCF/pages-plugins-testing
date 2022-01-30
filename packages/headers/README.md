## Pages Plugins

# Headers

This headers plugin adds headers to all responses which occur below it in the execution chain.

## Installation

```sh
npm install --save @pages-plugins/headers
```

## Usage

```typescript
// ./functions/api/_middleware.ts

import headersPlugin from "@pages-plugins/headers";

export const onRequest: PagesFunction = headersPlugin({
  "Access-Control-Allow-Origin": "*",
});
```

The plugin takes [the same argument as the `new Headers()` constructor](https://developer.mozilla.org/en-US/docs/Web/API/Headers/Headers#parameters):

- a [`Headers`](https://developer.mozilla.org/en-US/docs/Web/API/Headers) instance,
- an object of header names mapping to header values (i.e. `Record<string, string>`), or
- an array of header name, header value pairs (i.e. `[string, string][]`).
