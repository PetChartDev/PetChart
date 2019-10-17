const path = require('path');
const Session = require('../../database/mongo/models/sessionModel');

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

  Session.create({ ssid: res.locals.ssid }, (err, session) => {
    if (err) return next({ message: err });
    console.log('SESSSSSSSIONNNNNNNN: ', session);
    return next();
  });
};

sessionsController.findSession = (req, res, next) => {
  console.log('\n*********** sessionsController.findSession ****************', `\nMETHOD: ${req.method} \nENDPOINT: '${req.url}' \nBODY: ${JSON.stringify(req.body)} \REQCOOKIES: ${JSON.stringify(req.cookies)} `);

  res.locals.session = false;

  if (!req.cookies || !req.cookies.ssid) {
    console.log('no cookies!');
    return next();
  }

  const ssidVal = req.cookies.ssid;
  Session.findOne({ ssid: ssidVal }, (err, session) => {
    if (session) {
      res.headers = {
        session: true,
      };
      res.locals.session = true;
      res.locals.ssid = session.ssid;
      return next();
    }
    return res.sendFile(path.resolve(__dirname, '../../client/index.html'), {
      headers: {
        session: res.locals.session,
      },
    });
  });
};

module.exports = sessionsController;
