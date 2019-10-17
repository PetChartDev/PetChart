const visitsController = {};
const visitQuery = require('../../database/query/visitQuery');
const db = require('../../database/database');

/**
* @description adds a Visit from a single user(owner) to the database
* (vet_id is optional, pet_id must be required)
* @requirements : a pet_id stored inside req.body
* @optionals : a vet_id stored inside req.body
*/
visitsController.createVisit = (req, res, next) => {
  console.log('\n*********** visitsController.createVisit ****************', `\nMETHOD: ${req.method} \nENDPOINT: '${req.url}' \nBODY: ${JSON.stringify(req.body)} \nLOCALS: ${JSON.stringify(res.locals)} `);
  // Might add a file key later
  if (!req.body.visit) {
    const err = { message: 'Error: visitsController.createVisit: Undefined visit keys' };
    return next(err);
  }
  const {
    date, notes, petID, vetID,
  } = req.body.visit;

  if (req.body.visit) {
    // if vetID exist then we query normally otherwise we query without the vet_id column added
    const addVisit = vetID ? visitQuery.createVisit : visitQuery.createVisitWithoutVet;

    const visitData = vetID ? [date, notes, petID, vetID] : [date, notes, petID];
    db.connect((err, client, release) => {
      client.query(addVisit, visitData)
        .then((newVisit) => {
          release();
          // successful query
          res.locals.newVisit = newVisit.rows[0];
          return next();
        })
        .catch((visitQueryErr) => next(visitQueryErr));
    });
  }
};

/**
* @description gets all Visits for each pet
* @requirements : a pets array stored inside res.locals
*/
visitsController.getVisits = (req, res, next) => {
  console.log('\n*********** visitsController.getVisits ****************', `\nMETHOD: ${req.method} \nENDPOINT: '${req.url}' \nBODY: ${JSON.stringify(req.body)} \nHEADERS: ${JSON.stringify(res.headers)} \nLOCALS: ${JSON.stringify(res.locals)} `);

  const { role, ssid } = res.locals;
  if (role === 'Vet' || ssid[0] === 'v') return next();

  const { passwordMatch, profileMatch, session } = res.locals;

  if ((profileMatch && passwordMatch) || session) {
    const { pets } = res.locals;
    if (pets) {
      // queries for visits for each pet, returning unresolved promises
      // combinedPromises = [<Promise>, <Promise>, ...]
      db.connect((err, client, release) => {
        const combinedPromises = pets.map((pet) => client.query(visitQuery.getVisit, [pet.id]));
        // release client after every query
        release();
        Promise.all(combinedPromises)
          .then((visitList) => {
            /**
             * @visit is a single visit object
             * @index is used to get a current pet to add a visits property with the
             * value being an array of visit objects
             */
            visitList.forEach((visit, index) => {
              // visit.rows is an array of visits
              // [ {id: 1, date: '08/10/2019, notes: 'stomach issue'}, ...]
              pets[index].visits = visit.rows;
            });
            return next();
          })
          .catch((err) => {
            console.log('CATCH ERROR ***********', err);
            return next(err);
          });
      });
    } else {
      // this return is for no pets inside res.locals
      return next();
    }
  } else {
    // this return is if profile & password match fails
    return next();
  }
};

module.exports = visitsController;
