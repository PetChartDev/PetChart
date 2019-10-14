const visitQuery = {};

visitQuery.createVisitWithoutVet = 'INSERT INTO visits (date, notes, pet_id) VALUES ($1, $2, $3) RETURNING *';
visitQuery.createVisit = 'INSERT INTO visits (date, notes, pet_id, vet_id) VALUES ($1, $2, $3, $4) RETURNING *';

module.exports = visitQuery;
