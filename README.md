# Pages Plugins

## Features

- 🥞 **Completely composable**

  You can include multiple plugins, plugins can rely on other plugins, and they all share the same loading interface.

- ✍️ **Author a plugin as a folder of Functions**

  The straight-forward syntax and intuitive file-based routing we've developed for Functions can be used to write plugins.

- 📥 **Simple loading mechanism for including plugins in projects**

  Mount the plugin wherever you want and optionally pass it data.

- ⚡️ **Plugins can bring static assets**

  We hide static assets behind an inaccessible URL (`/cdn-cgi/`) so they'll only be available in user-land where the plugin exposes them. And everything gracefully-ish falls back to the origin if deploying a regular Worker instead of a Pages project.

## Usage

### Including a plugin

Check out [the example application](./packages/example/README.md) which includes all the plugins.

If you want to run it with wrangler2, run this:

```sh
git clone git@github.com:GregBrimble/pages-plugins.git;
cd pages-plugins;
npm install;
npm start;
```

### Authoring a plugin

Check out these examples:

- [Sentry](./packages/sentry)
- [Headers](./packages/headers)
- [GraphQL](./packages/graphql)
- [Google Chat](./packages/google-chat)

## Changes

### Added `functionPath`

This is the bit of the path that we matched on when deciding which Function to execute. (e.g. `_middleware.ts` on root would be `/`, a `date.ts` would be `/date`, and an `[path].ts` would be `/foo`).

The plugin needs to know where it's mounted in order to figure out its relative routing.

```ts
type EventContext<Env, P extends string, Data> = {
  request: Request;
  functionPath: string;
  waitUntil: (promise: Promise<unknown>) => void;
  next: (input?: Request | string, init?: RequestInit) => Promise<Response>;
  env: Env & { ASSETS: { fetch: typeof fetch } };
  params: Params<P>;
  data: Data;
};
```

### Added `PagesPluginFunction`

`_next` is a breakout: where `next` returns the next Function in the plugin's chain, eventually falling to the plugin's static assets if defined (else the application's `next`); `_next` immediately returns the application's `next`.

`pluginArgs` is the argument given to the plugin factory.

```ts
declare type PagesPluginFunction<
  Env = unknown,
  Params extends string = any,
  Data extends Record<string, unknown> = Record<string, unknown>,
  PluginArgs = unknown
> = (
  context: EventContext<Env, Params, Data> & {
    _next: EventContext<Env, Params, Data>["next"];
    pluginArgs: PluginArgs;
  }
) => ReturnType<PagesFunction<Env, Params, Data>>;
```

## Future Work

- Write a bunch of these plugins

- Test plugins including other plugins

- Test a plugin loaded at `/[path].ts`

- Let a plugin demand requirements

  - Provisioned Cloudflare stuff (e.g. a KV namespace must exist)

    - Automatically deploy DOs, create KVs etc.

  - User-set stuff (e.g. an env var must have a value of X)

  - Third-party stuff (e.g. let's do an OAuth dance and save to a DO)

- Fix `next` and `_next` fetching some given parameters (https://github.com/cloudflare/wrangler2/issues/232)
