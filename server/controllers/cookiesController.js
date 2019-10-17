const hash = require('../constants/hash');

const cookiesController = {};

/**
 * @description adds a hashed ssid cookie to the user's browser on successful login
 * @requirements : owner.id stored on res.locals
 * @optionals :
 * @body : { res.cookie: {ssid: ...} }
 */
cookiesController.setSSIDCookie = (req, res, next) => {
  console.log('\n*********** cookiesController.setSSIDCookie ****************', `\nMETHOD: ${req.method} \nENDPOINT: '${req.url}' \nBODY: ${JSON.stringify(req.body)} \nLOCALS: ${JSON.stringify(res.locals)} `);

  if (!res.locals.owner && !res.locals.vet) return next({ message: 'from cookieController.setSSIDCookie: no owner or vet on res.locals' });
  // console.log('owner id: ', res.locals.owner.id);
  const ssid = res.locals.owner ? `o${res.locals.owner.id}` : `v${res.locals.vet.id}`;
  console.log('ssid: ', ssid);
  res.cookie('ssid', JSON.stringify(ssid), { encode: String, httpOnly: true });
  res.locals.ssid = ssid;
  return next();
};

module.exports = cookiesController;
