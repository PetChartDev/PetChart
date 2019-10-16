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
    values: [name, date, pet_id],
    rowMode: 'array'
  };

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
        console.log('Error inside query: ', error)
        return next(errorObj);
      }

      console.log('this is the success obj: ', success.rows);

      // release the instance of the db connection from the db pool
      release();
      return next();

    });
  });
};

vaccinesController.getVaccines = (req, res, next) => {

}

module.exports = vaccinesController;
