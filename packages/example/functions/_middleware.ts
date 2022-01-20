import * as sentryPlugin from "@pages-plugins/sentry";
import { loader } from "@pages-plugins/core";

export const onRequest = loader(sentryPlugin, {
  // dsn: "https://sentry.com/xyz"
});
