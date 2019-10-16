const assert = require('assert');
const client = require('../../database/mongo/database');

const sessionsController = {};

/**
 * @description adds a hashed ssid cookie to the user's browser on successful login
 * @requirements : owner.id stored on res.locals
 * @optionals :
 * @body : { res.cookie: {ssid: ...} }
 */
sessionsController.createSession = (req, res, next) => {
  console.log('\n*********** sessionsController.createSession ****************', `\nMETHOD: ${req.method} \nENDPOINT: '${req.url}' \nBODY: ${JSON.stringify(req.body)} \nLOCALS: ${JSON.stringify(res.locals)} `);

  if (!res.locals.ssid) return next({ message: 'from sessionsController.createSession: no ssid on res.locals' });

  client.connect((error) => {
    if (error) console.log('you fucked up', error);
    assert.equal(null, error);
    const collection = client.db('petChart2').collection('sessions');
    collection.insertOne({ createdAt: new Date(), ssid: res.locals.ssid }, (err, result) => {
      if (err) console.log('error inside insertOne');
      assert.equal(null, err);
      assert.equal(1, result.insertedCount);
    });
    console.log('insertDone');
    client.close();
  });
  return next();
};

module.exports = sessionsController;
