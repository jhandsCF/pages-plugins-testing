import type { GraphQLPagesPluginFunction } from "../types";

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

export const onRequestPost: GraphQLPagesPluginFunction = async ({
  request,
  pluginArgs,
}) => {
  const { schema, graphql } = pluginArgs;

  const result = await graphql({
    schema,
    ...(await extractGraphQLQueryFromRequest(request)),
  });

  return new Response(JSON.stringify(result), {
    headers: { "Content-Type": "application/json" },
  });
};
