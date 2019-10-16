const petQuery = {};

// adding pet to pets table
petQuery.addPetWithoutVet = 'INSERT INTO pets (name, type, gender, spayed, birth_year, owner_id, profile_pic) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *';// tested
petQuery.addPet = 'INSERT INTO pets (name, type, gender, spayed, birth_year, owner_id, vet_id, profile_pic) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *';// tested

// getting all pets from pets table for a particular owner
petQuery.getPetsFromOwner = 'SELECT * FROM pets WHERE owner_id = $1'; // tested

// updating pet in pets table
petQuery.updatePetWithoutVet = 'UPDATE pets SET (name, type, gender, spayed, birth_year) = ($1, $2, $3, $4, $5) WHERE pet_id=$6 RETURNING *';
petQuery.updatePet = 'UPDATE pets SET (name, type, gender, spayed, birth_year) = ($1, $2, $3, $4, $5) WHERE pet_id=$6 RETURNING *';

module.exports = petQuery;
