const { ApolloServer } = require("apollo-server");
const { typeDefs } = require("./schema");
const { resolvers } = require("./resolvers");

async function startApolloServer() {
  const server = new ApolloServer({ typeDefs, resolvers });

  const { url } = await server.listen();
  console.log(`Server running at ${url}`);
}

startApolloServer().catch((err) => {
  console.error(err);
  process.exit(1);
});
