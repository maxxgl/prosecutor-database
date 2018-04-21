var express = require('express');
var graphqlHTTP = require('express-graphql');
const MongoClient = require('mongodb').MongoClient;
const {
  schema,
  global
} = require('./src/schema.js');
const PORT = process.env.PORT || 5000
const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/pdb';
var db

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: global,
  graphiql: true,
}));

MongoClient.connect(url, (err, client) => {
  if (err !== null) {
    throw new Error(err)
  }
  console.log("Connected successfully to DB");
  db = client.db()
  app.listen(PORT, () => console.log(`Running a GraphQL API on port ${PORT}`));
});
