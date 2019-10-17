const db = require('../../database/database');

const vetsController = {};

/**
 * @description gets all Vets from the db
 * @requirements : res stored inside res.locals.vets with at minimum vetId
 * @stretch : incorporate owners info into vet query
 */
vetsController.searchVets = (req, res, next) => {
  // standard query obj that can be modified for additional features
  const query = {
    name: 'search vets',
    text: 'SELECT * FROM vets',
    /* text: 'SELECT * FROM vets WHERE column = ${params}' */
  };
  // query the db for all available vet info
  db.connect((err, client, release) => {
    if (err) {
      const error = {};
      error.message = 'error in vets search controller db.connect'
      return next(error);
    };
    client.query(query, (searchErr, vets) => {
      if (searchErr) {
        const err = {};
        err.status = 404;
        err.message = 'error in the vets controller search query';
        return next(err);
      };

      // NEED TO FINISH THIS FUNCTIONALITY!!!
      res.locals.vets = {};

      // release the instance of the db connection from the db pool
      release();
      return next();
    });
  })
};

///// query to obtain all current customers of the vet practice


vetsController.getAllCustomers = (req, res, next) => {
  // standard query obj that can be modified for additional features
  console.log("this hits")
  console.log("missing", req.body.vet)
  const {vetID} = req.body.vet;
  const query = {
    name: 'Return all customers of vet',
    text: `SELECT DISTINCT first_name, last_name
    FROM owners
    INNER JOIN pets
    ON owners.owner_id = pets.owner_id AND pets.vet_id = ${vetID}; 
    `,
    /* text: 'SELECT * FROM vets WHERE column = ${params}' */
  };
  // query the db for all available vet info
  db.connect((err, client, release) => {
    if (err) {
      const error = {};
      error.message = 'error in vets search controller db.connect'
      return next(error);
    };
    client.query(query, (searchErr, returnedClients) => {
      if (searchErr) {
        const err = {};
        err.status = 404;
        err.message = 'error in the vets controller search query';
        return next(err);
      };

      res.locals.allCustomers = {returnedClients};

      // release the instance of the db connection from the db pool
      release();
      return next();
    });
  })
};


module.exports = vetsController;
