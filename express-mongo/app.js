const express = require('express');
const app = express();
const mongoose = require('mongoose');
 
mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true});
const dbUser = require('./user-model');
dbUser.insertOne({username: "test"});

app.get('/', (req, res) => {
  res.send('Hello ExpressJS!');
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});