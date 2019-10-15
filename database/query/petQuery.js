const petQuery = {};

petQuery.addPetWithoutVet = 'INSERT INTO pets (name, type, gender, spayed, birth_year, owner_id, profile_pic) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *';// tested
petQuery.addPet = 'INSERT INTO pets (name, type, gender, spayed, birth_year, owner_id, vet_id, profile_pic) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *';// tested
petQuery.getPetsFromOwner = 'SELECT * FROM pets WHERE owner_id = $1'; // tested

module.exports = petQuery;
