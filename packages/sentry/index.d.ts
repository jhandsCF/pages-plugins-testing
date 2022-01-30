import Toucan from "toucan-js";
import type * as Plugin from "./functions/_middleware";

type PagesFunctions = keyof typeof Plugin;
type PluginArgs = Parameters<typeof Plugin[PagesFunctions]>[0]["pluginArgs"];

export default function <
  Env = unknown,
  Params extends string = any,
  Data extends Record<string, unknown> = Record<string, unknown>
>(args: PluginArgs): PagesFunction<Env, Params, Data & { sentry: Toucan }>;
export const name: string;
export const assetsDirectory: string;
