const { ApolloServer } = require('apollo-server');
const gql = require('graphql-tag');

const typeDefs = gql`
  type Query {
    hello:  String
  }

  type User {
    id:       String!
    name:     String!
    balance:  Int!
  }

  type Query {
    getUser(id: String!): User
    users(name: String): [User]
  }

  type Mutation {
    addUser(name: String!, balance: Int!): User
  }
`;

const resolvers = {
    Query: {
        hello: () => "world",
        getUser: async (_, { id }) => {
            return await getData(MY_REST_URL + '/users/' + id);
        },

        users: async (_, { name }) => {
            var nameParams = '';
            if (name) {
                nameParams = '?name=' + name;
            }
            return await getData(MY_REST_URL + '/users' + nameParams);
        }
    },

    Mutation: {
        addUser: async (_, { name, balance } ) => {
          return await postData(MY_REST_URL + 'users', { name, balance } );
        }
    }
};

const schema = new ApolloServer({ typeDefs, resolvers });

schema.listen({ port: process.env.PORT}).then(({ url }) => {
    console.log(`schema ready at ${url}`);
});

