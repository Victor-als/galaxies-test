const { ApolloServer, gql } = require("apollo-server");
const { galaxyData } = require("./MOCK");
const typeDefs = gql`
  type Item {
    id: ID!
    name: String!
    image: String!
    description: String!
    details: String!
    stars: [String]
  }

  type Query {
    items(search: String, offset: Int, limit: Int): [Item!]!
    item(id: ID!): Item
  }
`;

const items = galaxyData.map((galaxy) => ({
  id: galaxy.id,
  name: galaxy.name,
  image: galaxy.image,
  description: galaxy.description,
  details: galaxy.details,
  stars: galaxy.stars,
}));

const resolvers = {
  Query: {
    items: (_, { search = "", offset, limit }) => {
      const filtered = items.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
      return filtered.slice(offset, offset + limit);
    },
    item: (_, { id }) => items.find((item) => item.id === id),
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen({ port: 4000 }).then(({ url }) => {
  console.log(`🚀  Mock GraphQL server ready at ${url}`);
});
