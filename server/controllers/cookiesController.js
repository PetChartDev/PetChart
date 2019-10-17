const hash = require('../constants/hash');

const cookiesController = {};

/**
 * @description adds a hashed ssid cookie to the user's browser on successful login
 * @requirements : owner.id stored on res.locals
 * @optionals :
 * @body : { res.cookie: {ssid: ...} }
 */
cookiesController.setSSIDCookie = (req, res, next) => {
  console.log('\n*********** cookiesController.createAccount ****************', `\nMETHOD: ${req.method} \nENDPOINT: '${req.url}' \nBODY: ${JSON.stringify(req.body)} \nLOCALS: ${JSON.stringify(res.locals)} `);

  if (!res.locals.owner.id) return next({ message: 'from cookieController.setSSIDCookie: no owner id on res.locals' });
  console.log('owner id: ', res.locals.owner.id);
  const ssid = res.locals.owner.id;
  console.log('ssid: ', ssid);
  res.cookie('ssid', JSON.stringify(ssid), { encode: String, httpOnly: true });
  res.locals.ssid = ssid;
  return next();
};

module.exports = cookiesController;
