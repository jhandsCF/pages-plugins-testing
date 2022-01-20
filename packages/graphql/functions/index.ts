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
  Record<string, unknown>,
  { schema: GraphQLSchema }
> = async ({ request, pluginArgs }) => {
  const { schema } = pluginArgs;

  const result = await graphql({
    schema,
    ...(await extractGraphQLQueryFromRequest(request)),
  });

  return new Response(JSON.stringify(result), {
    headers: { "Content-Type": "application/json" },
  });
};
