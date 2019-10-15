const { Pool } = require('pg');

const uri = 'postgres://rtxaxisp:RS_4myh4r5YQfUmK9SkYA28RqEc09tZE@salt.db.elephantsql.com:5432/rtxaxisp';


const pool = new Pool({
  connectionString: uri,
});

module.exports = pool;
