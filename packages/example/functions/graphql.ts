import * as graphQLPlugin from "@pages-plugins/graphql";
import { loader } from "@pages-plugins/core";
import { GraphQLSchema, GraphQLObjectType, GraphQLString } from "graphql";

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
      hello: {
        type: GraphQLString,
        resolve() {
          return "Hello, world!";
        },
      },
    },
  }),
});

export const onRequest = loader(graphQLPlugin, { schema });
