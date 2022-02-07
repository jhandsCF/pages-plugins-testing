import Toucan from "toucan-js";
import type { SentryPagesPluginFunction } from "../types";

export const onRequest: SentryPagesPluginFunction = async (context) => {
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
};
