const petsController = {};
const petQuery = require('../../database/query/petQuery.js');
const db = require('../../database/database');

/**
 * @description gets all Pets from a single user(owner)
 * @requirements : a owner_id(id) stored inside res.locals
 */
petsController.getPets = (req, res, next) => {
  console.log('\n*********** petsController.getPets ****************', `\nMETHOD: ${req.method} \nENDPOINT: '${req.url}' \nBODY: ${JSON.stringify(req.body)} \nHEADERS: ${JSON.stringify(res.headers)} \nLOCALS: ${JSON.stringify(res.locals)} `);

  const { passwordMatch, profileMatch, session } = res.locals;

  if ((profileMatch && passwordMatch) || session) {
    // NOTES: id will be retrieved from a user logging in
    console.log('res.locals: ', res.locals);
    let id = '';
    if (!res.locals.owner) id = res.locals.ssid;
    else id = res.locals.owner.id;
    console.log(id);
    db.connect((err, client, release) => {
      client.query(petQuery.getPetsFromOwner, [id])
        .then((petList) => {
          release();
          // successful query
          const newPetList = petList.rows.map((pet) => {
          // switching keys for each pet from snake_case to camelCase
            const {
              pet_id, name, type, gender, spayed, birth_year, vet_id,
            } = pet;
            return {
              id: pet_id, name, type, gender, spayed, birthYear: birth_year, vetID: vet_id,
            };
          });
          res.locals.pets = newPetList;
          return next();
        })
        .catch((petQueryErr) => next(petQueryErr));
    });
  } else {
    return next();
  }
};

/**
 * @description adds a Pet from a single user(owner) to the database
 * (vet_id is optional, owner_id must be required)
 * @requirements : a owner_id stored inside req.body
 * @optionals : a vet_id stored inside req.body
 * @body : { pet: {...} }
 */
petsController.addPet = (req, res, next) => {
  console.log('\n*********** petsController.addPet ****************', `\nMETHOD: ${req.method} \nENDPOINT: '${req.url}' \nBODY: ${JSON.stringify(req.body)} \nLOCALS: ${JSON.stringify(res.locals)} `);

  // NOTES: check with frontend to see the structure of how they send a pet data to server
  // eslint-disable-next-line object-curly-newline
  if (!req.body.pet) {
    const err = { message: 'Error: petsController.addPet: Undefined pet keys' };
    return next(err);
  }
  const {
    name, type, gender, spayed, birthYear, ownerID, vetID, profilePic,
  } = req.body.pet;

  // const { vetID } = res.locals;

  if (req.body.pet) {
    // if vetID exist then we query normally otherwise we query without the vet_id column added
    const addPet = vetID ? petQuery.addPet : petQuery.addPetWithoutVet;
    const petData = vetID ? [name, type, gender, spayed, birthYear, ownerID, vetID, profilePic] : [name, type, gender, spayed, birthYear, ownerID, profilePic];
    db.connect((err, client, release) => {
      if (err) console.log('ERROR: ', err);
      client.query(addPet, petData)
        .then((newPet) => {
          release();

          // successful query
          const {
            pet_id, name, type, gender, spayed, birth_year, owner_id, vet_id, profile_pic,
          } = newPet.rows[0];
          res.locals.newPet = {
            id: pet_id, name, type, gender, spayed, birthYear: birth_year, ownerID: owner_id, vetID: vet_id, profilePic: profile_pic,
          };
          return next();
        })
        .catch((petQueryErr) => {
          console.log('petERROR: ', petQueryErr);
          next(petQueryErr);
        });
    });
  }
};

/**
 * @description updates an existing Pet in the database
 * (vet_id is optional, owner_id must be required)
 * @requirements : a owner_id stored inside req.body
 * @optionals : a vet_id stored inside req.body
 * @body : { pet: {...} }
 */
petsController.updatePet = (req, res, next) => {
  console.log('\n*********** petsController.updatePet ****************', `\nMETHOD: ${req.method} \nENDPOINT: '${req.url}' \nBODY: ${JSON.stringify(req.body)} \nLOCALS: ${JSON.stringify(res.locals)} `);
  // handle error if no pet key on request body
  if (!req.body.pet) {
    const err = { message: 'Error: petsController.addPet: Undefined pet keys' };
    return next(err);
  }
  // destructure request body
  const {
    name, type, gender, spayed, birthYear, petID, vetID,
  } = req.body.pet;

  const updatePet = vetID ? petQuery.updatePet : petQuery.updatePetWithoutVet;
  const petData = vetID ? [name, type, gender, spayed, birthYear, petID] : [name, type, gender, spayed, birthYear, petID];

  db.connect((err, client, release) => {
    if (err) return next({ message: `from petController.updatePet: ${err}` });
    client.query(updatePet, petData)
      .then((updatedPet) => {
        release();

        // successful query
        const {
          pet_id, name, type, gender, spayed, birth_year, owner_id, vet_id, profile_pic,
        } = updatedPet.rows[0];
        res.locals.updatedPet = {
          id: pet_id, name, type, gender, spayed, birthYear: birth_year, ownerID: owner_id, vetID: vet_id, profilePic: profile_pic,
        };
        return next();
      })
      .catch((petQueryErr) => {
        console.log('petERROR: ', petQueryErr);
        next(petQueryErr);
      });
  });
};

petsController.deletePet = (req, res, next) => {
  console.log('\n*********** petsController.deletePet ****************', `\nMETHOD: ${req.method} \nENDPOINT: '${req.url}' \nBODY: ${JSON.stringify(req.body)} \nLOCALS: ${JSON.stringify(res.locals)} `);
  // handle error if no pet key on request body
  if (!req.body) {
    const err = { message: 'Error: petsController.deletePet: Undefined pet keys' };
    return next(err);
  }
  // destructure request body
  const {petID} = req.body;
  petDeleteCommand = `DELETE FROM pets WHERE pet_id=${petID}`;

  db.connect((err, client, release) => {
    if (err) return next({ message: `from petController.deletePet: ${err}` });
    client.query(petDeleteCommand)
      .then((deletedPet) => {
        release();
        res.locals.deletedPet = petID
        console.log(`Pet #${petID} successfully removed from database`);
        return next();
      })
      .catch((petQueryErr) => {
        console.log('petERROR in Delete path: ', petQueryErr);
        next(petQueryErr);
      });
  });
};


module.exports = petsController;
