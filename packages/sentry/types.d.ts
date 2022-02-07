import type { Options } from "toucan-js/dist/types";
import type Toucan from "toucan-js";

export type PluginArgs = Omit<Options, "context">;

export type SentryPagesPluginFunction<
  Env = unknown,
  Params extends string = any,
  Data extends Record<string, unknown> = Record<string, unknown>
> = PagesPluginFunction<
  Env,
  Params,
  Data & {
    sentry: Toucan;
  },
  PluginArgs
>;
