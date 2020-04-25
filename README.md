# pokemon-remote-schema

Converting the PokeAPI to GraphQL via a Hasura remote schema.

1. Schema:

```
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
```

2. Click on **Show** *Live* at the top of the Glitch UI to get the URL.

3. Add as Remote Schema in Hasura GraphQL Engine.

4. Go to GraphiQL tab, and try out:

``` gql
query {
  getPokemon(id: "pikachu"){
    id
    base_experience
  }
}
```
