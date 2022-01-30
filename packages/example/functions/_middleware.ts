import sentryPlugin from "@pages-plugins/sentry/";
import headersPlugin from "@pages-plugins/headers";

export const onRequest: PagesFunction[] = [
  sentryPlugin({
    // dsn: "https://sentry.com/xyz",
  }),
  headersPlugin({
    "Access-Control-Allow-Origin": "*",
  }),
];
