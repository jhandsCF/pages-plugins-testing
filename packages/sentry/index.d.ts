import type Toucan from "toucan-js";
import type { PluginArgs } from "./types";

export default function (
  args: PluginArgs
): PagesFunction<unknown, any, { sentry: Toucan }>;
