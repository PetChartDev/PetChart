const db = require('../../database/database');

const vaccinesController = {};

/**
 * @description adds Vaccine data for the Pet
 * @requirements : a pet_id, name, date must provided in the req.body
 * @optionals :
 * @body : { vac: {...} }
 */
vaccinesController.createVaccines = (req, res, next) => {
  // incoming request will have all pet data
  // pull out the pet_id, name, date from req body
  const { name, date, pet_id } = req.body.vaccine;

  const vaccineQuery = {
    name: 'create vaccine',
    text: 'INSERT INTO vaccines (name, date, pet_id) VALUES ($1, $2, $3) RETURNING *',
    values: [name, date, pet_id]
  };

  db.connect((err, client, release) => {
    if (err) {
      error = {};
      error.message = 'Error in vaccinesController db.connect method';
      return next(error);
    }
    client.query(vaccineQuery)
      .then((newVaccine) => {
        console.log("VAX CONTROLLER LOG", newVaccine)
        release();
        // successful query
        res.locals.newVaccine = newVaccine.rows[0];
        return next();
      })
      .catch((vaccineQueryErr) => next(vaccineQueryErr));
    
    // (error, success) => {
    //   // catch error
    //   if (error) {
    //     const { detail } = error;
    //     const errorObj = {};
    //     errorObj.message = detail;
    //     console.log('Error inside query: ', error)
    //     return next(errorObj);
    //   }

    //   console.log('this is the success obj: ', success.rows);
    //   // returns newly created vaccine to res object
    //   res.locals.vaccines = success.rows;

    //   // release the instance of the db connection from the db pool
    //   release();
    //   return next();
    // })
  });
};

/**
* @description gets all Vaccines for each pet
* @requirements : a pets array stored inside res.locals
*/
vaccinesController.getVaccines = (req, res, next) => {
  console.log('\n*********** vaccineController.getVaccines ****************', `\nMETHOD: ${req.method} \nENDPOINT: '${req.url}' \nBODY: ${JSON.stringify(req.body)} \nHEADERS: ${JSON.stringify(res.headers)} \nLOCALS: ${JSON.stringify(res.locals)} `);
  const { passwordMatch, profileMatch, session } = res.locals;

  if ((profileMatch && passwordMatch) || session) {
    const { pets } = res.locals;
    if (pets) {
      // queries for visits for each pet, returning unresolved promises
      // combinedPromises = [<Promise>, <Promise>, ...]
      db.connect((err, client, release) => {
        if (err) return next({ message: "Vaccines Controller line 78" + err });
        const combinedPromises = pets.map((pet) => client.query(`SELECT * FROM vaccines WHERE pet_id=${pet.id}`));
        // release client after every query
        release();
        Promise.all(combinedPromises)
          .then((vaccineList) => {
            /**
             * @vaccine is a single vaccine object
             * @index is used to get a current pet to add a surgeries property with the
             * value being an array of vaccine objects
             */
            vaccineList.forEach((vaccine, index) => {
              // vaccine.rows is an array of surgeries
              // [ {id: 1, date: '08/10/2019, name: 'stomach transplant'}, ...]
              pets[index].vaccines = vaccine.rows;
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

module.exports = vaccinesController;
