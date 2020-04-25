const fetch = require('node-fetch');
const { ApolloServer } = require('apollo-server');
const gql = require('graphql-tag');

const MY_REST_URL = 'https://pokeapi.co/api/v2'

const typeDefs = gql`

  type Pokemon {
    id:       String!
    name:     String!
    base_experience:  Int!
  }

  type Query {
    getPokemon(id: String!): Pokemon
  }
`;

const resolvers = {
    Query: {
        // hello: () => "world",
        getPokemon: async (_, { id }) => {
            
            const response = await fetch(MY_REST_URL + '/pokemon/' + id + '/');
            return response.json();
        },
    }
};

const schema = new ApolloServer({ typeDefs, resolvers });

schema.listen({ port: process.env.PORT}).then(({ url }) => {
    console.log(`schema ready at ${url}`);
});
