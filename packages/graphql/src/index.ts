import { graphql, GraphQLSchema } from "graphql";

const extractGraphQLQueryFromRequest = async (request: Request) => {
  if (/application\/graphql/i.test(request.headers.get("Content-Type"))) {
    return { source: await request.text() };
  }

  const { query, variables, operationName } = await request.json();

  return {
    source: query,
    variableValues: variables,
    operationName,
  };
};

export const onRequestPost: PagesPluginFunction<
  unknown,
  any,
  {
    plugins: {
      "@pages-plugins/graphql": { data: { schema: GraphQLSchema } };
    };
  }
> = async ({ request, data }) => {
  const { schema } = data.plugins["@pages-plugins/graphql"].data;

  const result = await graphql({
    schema,
    ...(await extractGraphQLQueryFromRequest(request)),
  });

  return new Response(JSON.stringify(result), {
    headers: { "Content-Type": "application/json" },
  });
};
