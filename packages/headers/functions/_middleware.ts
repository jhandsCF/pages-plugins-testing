export const onRequest: PagesPluginFunction<
  unknown,
  any,
  Record<string, unknown>,
  HeadersInit
>[] = [
  async ({ next, pluginArgs }) => {
    const headers = new Headers(pluginArgs);
    console.log("headers");

    let response = await next();
    response = new Response(
      [101, 204, 205, 304].includes(response.status) ? null : response.body,
      response
    );

    for (const [name, value] of headers.entries()) {
      response.headers.set(name, value);
    }

    return response;
  },
];
