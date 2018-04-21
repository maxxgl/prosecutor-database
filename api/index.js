var express = require('express');
var graphqlHTTP = require('express-graphql');
const MongoClient = require('mongodb').MongoClient;
const {
  schema,
  global
} = require('./src/schema.js');
const PORT = process.env.PORT || 5000
const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/pdb';

MongoClient.connect(url, (err, client) => {
  if (err !== null) {
    console.error("DB CONN FAIL", err)
    return
  }
  console.log("Connected successfully to DB");
  var app = express();
  app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: global,
    graphiql: true,
    context: { db: client.db() },
  }));
  app.use('/', (req, res) =>{
    res.send(message)
  })
  app.listen(PORT, () => console.log(`Running a GraphQL API on port ${PORT}`));
});

const message = `
<style>
  body {padding-top: 40%;font-family: Roboto, sans-serif;text-align: center;}
  h1, h3 {margin: .25em;} a {text-decoration: none;}
  h1 {font-weight: normal;letter-spacing: 1px;} h3 {font-weight: lighter;}
</style>
<h1><a href="https://github.com/billimarie/prosecutor-database">
  Prosecutor Database</a></h1>
<h3>GraphQL API running on <a href="/graphql">/graphql</a></h3>
`
