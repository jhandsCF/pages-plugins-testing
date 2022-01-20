import Toucan from "toucan-js";
import type { Options } from "toucan-js/dist/types";

export const onRequest: PagesPluginFunction<
  unknown,
  any,
  {
    sentry: Toucan;
    plugins: {
      "@pages-plugins/sentry": {
        data: Options & { exceptionHandler: PagesFunction };
      };
    };
  }
> = async (context) => {
  const { exceptionHandler, ...sentryArgs } =
    context.data.plugins["@pages-plugins/sentry"].data;

  context.data.sentry = new Toucan({
    context,
    ...sentryArgs,
  });

  try {
    return await context.next();
  } catch (thrown) {
    context.data.sentry.captureException(thrown);
    throw thrown;
  }
};
