import type * as Plugin from "./functions/_middleware";

type PagesFunctions = keyof typeof Plugin;
type PluginArgs = Parameters<typeof Plugin[PagesFunctions]>[0]["pluginArgs"];

export default function (args: PluginArgs): PagesFunction;
export const name: string;
export const assetsDirectory: string;
