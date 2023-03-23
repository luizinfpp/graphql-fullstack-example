var express = require('express');
var { graphqlHTTP } = require('express-graphql');
const schema = require('./schema');
var cors = require('cors')

var corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

var app = express();

app.use(cors(corsOptions));

app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true,
}));

app.listen(4000);

console.log('Running a GraphQL API server at http://localhost:4000/graphql');
console.log('Special thanks to Game of Throne Quotes API: https://gameofthronesquotes.xyz/');