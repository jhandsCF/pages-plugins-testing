import sentryPlugin from "@pages-plugins/sentry/";
import headersPlugin from "@pages-plugins/headers";

export const onRequest: PagesFunction[] = [
  sentryPlugin({
    // dsn: "https://sentry.io/xyz",
  }),
  headersPlugin({
    "Access-Control-Allow-Origin": "*",
  }),
];
