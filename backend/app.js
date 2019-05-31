const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
const graphQLHttp = require('express-graphql');
const isAuth = require('./middleware/is-auth');

const allSchemas = require('./schema/schema');
const allResolvers = require('./resolvers/allResolvers');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', '*');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.use(isAuth);

app.use('/graphql', graphQLHttp({
  schema: allSchemas,
  rootValue: allResolvers,
  graphiql: true
}));

mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster1-tmn4p.mongodb.net/${process.env.MONGO_DATABASE}`).then(res => {
  console.log('connected');
})
.catch(err => {
  console.log(err);
  throw new Error(err);
});

module.exports = app;
