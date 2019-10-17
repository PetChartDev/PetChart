const surgeryController = {};
const surgeryQuery = require('../../database/query/surgeryQuery');
const db = require('../../database/database');

/**
* @description adds a Surgery from a single user(owner) to the database
* (visit_id is optional, pet_id must be required)
* @requirements : a pet_id stored inside req.body
* @optionals : a visit_id stored inside req.body
*/
surgeryController.createSurgery = (req, res, next) => {
  console.log('\n*********** surgeryController.createSurgery ****************', `\nMETHOD: ${req.method} \nENDPOINT: '${req.url}' \nBODY: ${JSON.stringify(req.body)} \nLOCALS: ${JSON.stringify(res.locals)} `);

  const {
    name, date, petID, visitID,
  } = req.body.surgery;

  if (req.body.surgery) {
    // if visitID exist then we query normally otherwise we query without the visit_id column added
    const addSurgery = visitID ? surgeryQuery.createSurgery : surgeryQuery.createSurgeryWithoutVisitID;

    const surgeryData = visitID ? [name, date, petID, visitID] : [name, date, petID];
    db.connect((err, client, release) => {
      client.query(addSurgery, surgeryData)
        .then((newSurgery) => {
          release();
          // successful query
          const {
            surgery_id, name, date, pet_id,
          } = newSurgery.rows[0];
          res.locals.newSurgery = {
            id: surgery_id, pet_id, name, date,
          };
          return next();
        })
        .catch((surgeryQueryErr) => {
          console.log('\n*********** ERROR ***********', surgeryQueryErr);
          return next(surgeryQueryErr);
        });
    });
  }
};

/**
* @description gets all Surgeries for each pet
* @requirements : a pets array stored inside res.locals
*/
surgeryController.getSurgeries = (req, res, next) => {
  console.log('\n*********** surgeryController.getSurgeries ****************', `\nMETHOD: ${req.method} \nENDPOINT: '${req.url}' \nBODY: ${JSON.stringify(req.body)} \nHEADERS: ${JSON.stringify(res.headers)} \nLOCALS: ${JSON.stringify(res.locals)} `);
  const { passwordMatch, profileMatch, session } = res.locals;

  if ((profileMatch && passwordMatch) || session) {
    const { pets } = res.locals;
    if (pets) {
      // queries for visits for each pet, returning unresolved promises
      // combinedPromises = [<Promise>, <Promise>, ...]
      db.connect((err, client, release) => {
        const combinedPromises = pets.map((pet) => client.query(surgeryQuery.getSurgeries, [pet.id]));
        // release client after every query
        release();
        Promise.all(combinedPromises)
          .then((surgeryList) => {
            /**
             * @surgery is a single surgery object
             * @index is used to get a current pet to add a surgeries property with the
             * value being an array of surgery objects
             */
            surgeryList.forEach((surgery, index) => {
              // surgery.rows is an array of surgeries
              // [ {id: 1, date: '08/10/2019, name: 'stomach transplant'}, ...]
              pets[index].surgeries = surgery.rows;
            });
            return next();
          })
          .catch((err) => {
            console.log('CATCH ERROR ***********', err);
            return next(err);
          });
      });
    }
  }
};

module.exports = surgeryController;
