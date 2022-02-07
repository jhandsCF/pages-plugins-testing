import type { graphql, GraphQLSchema } from "graphql";

export type PluginArgs = { schema: GraphQLSchema; graphql: typeof graphql };

export type GraphQLPagesPluginFunction<
  Env = unknown,
  Params extends string = any,
  Data extends Record<string, unknown> = Record<string, unknown>
> = PagesPluginFunction<Env, Params, Data, PluginArgs>;
