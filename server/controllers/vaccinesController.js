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

vaccinesController.getVaccines = (req, res, next) => {
  console.log('vacc hist controller hit')
  console.log('bod', req.body.pet_id)
  const petID = req.body.pet_id;
// via pet id
const vaccineQuery = {
  name: 'get vaccine',
  text: `SELECT * FROM vaccines WHERE pet_id=${petID}`,
}

db.connect((err, client, release) => {
  if (err) {
    error = {};
    error.message = 'Error in vaccinesController db.connect method';
    return next(error);
  }
  client.query(vaccineQuery, (error, success) => {
    // catch error
    if (error) {
      const { detail } = error;
      const errorObj = {};
      errorObj.message = detail;
      console.log('Error inside getVaccines query: ', error)
      return next(errorObj);
    }

    console.log('this is the success obj: ', success.rows);
    // returns query results to res object
    res.locals.vaccines = success.rows;

    // release the instance of the db connection from the db pool
    release();
    return next();

  });
});


}

module.exports = vaccinesController;
