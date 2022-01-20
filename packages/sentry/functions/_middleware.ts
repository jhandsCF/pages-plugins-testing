import Toucan from "toucan-js";
import type { Options } from "toucan-js/dist/types";

export const onRequest: PagesPluginFunction<
  unknown,
  any,
  {
    sentry: Toucan;
  },
  Options
>[] = [
  async (context) => {
    context.data.sentry = new Toucan({
      context,
      ...context.pluginArgs,
    });

    try {
      return await context.next();
    } catch (thrown) {
      context.data.sentry.captureException(thrown);
      throw thrown;
    }
  },
];
