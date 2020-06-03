const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const path = require('path');
const scrape = require('./scrape');
// Construct a schema, using GraphQL schema language

const typeDefs = gql`
  type TriviaQuestion {
    quein: String
    ansin: String
    headerin: String

    }
  type TriviaSet {
    header: String
    }
  type Query {
    outputQA: [TriviaQuestion]
    outputSet : [TriviaSet]
  }
`;

let outputSet = null;
let outputQA = null;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    outputQA: async () => {
      if (outputQA) {
        return outputQA;
      }
      outputQA = await scrape.getTriviaQandA();
      return outputQA;
    },
    outputSet: async () => {
      if (outputSet) {
        return outputSet;
      }
      outputSet = await scrape.getTriviaHeader();
      return outputSet;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true,
});

const app = express();
server.applyMiddleware({ app });

// Step 3
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/dist'));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html')); // relative path
  });
}

app.listen({ port: process.env.PORT || 4000 }, () => console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`));
