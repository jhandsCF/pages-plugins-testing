# Pages Plugins

## Features

- 🥞 **Completely composable**

  You can include multiple plugins, plugins can rely on other plugins, and they all share the same loading interface.

- ✍️ **Author a plugin as a folder of Functions**

  The super cool syntax and intuitive file-based routing we've developed can be used to write plugins.

- 📥 **Simple loader mechanism for including plugins in projects**

  One simple core package which you use to load every plugin and optionally pass it data.

- ⚡️ **Plugins can bring static assets**

  We hide them behind an inaccessible URL (`/cdn-cgi/`) so they'll never be available in userland unless the plugin exposes them. And everything gracefully-ish falls back to the origin if deploying a regular Worker instead of a Pages project.

## Usage

### Including a plugin

Check out [the example application](./packages/example/README.md) which includes all the plugins.

If you want to run it with wrangler2, run this:

```sh
npm install
npm start
```

### Authoring a plugin

Check out these examples:

- [Sentry](./packages/sentry/src/_middleware.ts)
- [GraphQL](./packages/graphql/src/index.ts)

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

### Added `data.plugins`

The `basePath` is the previously discussed `functionPath`.

The `data` is an object passed directly to the plugin from the loader.

```ts
declare type PagesFunction<
  Env = unknown,
  P extends string = string,
  Data extends Record<string, unknown> = Record<string, unknown> & {
    plugins: Record<
      string,
      {
        basePath: string;
        data: Record<string, unknown>;
      }
    >;
  }
> = (context: EventContext<Env, P, Data>) => Response | Promise<Response>;
```

### Added `PagesPluginFunction`

`_next` is a breakout: where `next` returns the next Function in the plugin's chain, eventually falling to the plugin's static assets if defined (else the application's `next`); `_next` immediately returns the application's `next`.

```ts
declare type PagesPluginFunction<
  Env = unknown,
  Params extends string = any,
  Data extends Record<string, unknown> = Record<string, unknown>
> = (
  context: EventContext<Env, Params, Data> & {
    _next: EventContext<Env, Params, Data>["next"];
  }
) => ReturnType<PagesFunction<Env, Params, Data>>;
```

## Future Work

- `onError` Pages Function? Might be nice to have an easy way to try/catch your Function and return an error page when something is thrown.

- Write a bunch of these plugins

- Test plugins including other plugins

- Test a plugin loaded at `/[path].ts`

- Let a plugin demand requirements

  - Provisioned Cloudflare stuff (e.g. a KV namespace must exist)

    - Automatically deploy DOs, create KVs etc.

  - User-set stuff (e.g. an env var must have a value of X)

  - Third-party stuff (e.g. let's do an OAuth dance and save to a DO)

- Fix `next` and `_next` fetching some given parameters (https://github.com/cloudflare/wrangler2/issues/232)
