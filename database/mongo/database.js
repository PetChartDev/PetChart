const { MongoClient } = require('mongodb');
const assert = require('assert');

const uri = 'mongodb+srv://teamUGG:uggly@petchart2-nvjty.mongodb.net/test?retryWrites=true&w=majority';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect((error) => {
//   assert.equal(null, error);
//   const collection = client.db('petChart2').collection('playground');
//   collection.insertOne({ a: 1 }, (err, result) => {
//     assert.equal(null, err);
//     assert.equal(1, result.insertedCount);
//   });
//   client.close();
// });

module.exports = client;
