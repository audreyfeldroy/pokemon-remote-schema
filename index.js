const { ApolloServer } = require('apollo-server');
const gql = require('graphql-tag');

const typeDefs = gql`
  type Query {
    hello:  String
  }

  type Pokemon {
    id:       String!
    name:     String!
    baseExperience:  Int!
  }

  type Query {
    getPokemon(id: String!): Pokemon
    pokemons(name: String): [Pokemon]
  }

  type Mutation {
    addPokemon(name: String!, balance: Int!): Pokemon
  }
`;

const resolvers = {
    Query: {
        hello: () => "world",
        getPokemon: async (_, { id }) => {
            return await getData(MY_REST_URL + '/pokemon/' + id);
        },

        pokemon: async (_, { name }) => {
            var nameParams = '';
            if (name) {
                nameParams = '?name=' + name;
            }
            return await getData(MY_REST_URL + '/pokemon' + nameParams);
        }
    },

    Mutation: {
        addPokemon: async (_, { name, balance } ) => {
          return await postData(MY_REST_URL + 'pokemon', { name, balance } );
        }
    }
};

const schema = new ApolloServer({ typeDefs, resolvers });

schema.listen({ port: process.env.PORT}).then(({ url }) => {
    console.log(`schema ready at ${url}`);
});

