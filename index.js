const { ApolloServer, gql } = require("apollo-server");

require('utils/db')
const typeDefs = require('schema/typeDefs')
const resolvers = require('schema/resolvers')

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`Server is running at ${url}`);
});
