const bcrypt = require('bcrypt');
const db = require('../../database/database');

const accountsController = {};

const SALT_WORK_FACTOR = 10;

accountsController.createAccount = (req, res, next) => {
  console.log('\n*********** accountsController.createAccount ****************', `\nMETHOD: ${req.method} \nENDPOINT: '${req.url}' \nBODY: ${JSON.stringify(req.body)} \nLOCALS: ${JSON.stringify(res.locals)} `);
  const { firstName, lastName, role, email, practice } = req.body;
  bcrypt.hash(req.body.password, SALT_WORK_FACTOR)
    .then((hash) => {
      // This logic block looks at the role property and determines whether or not client is a Vet or pet Owner.
      // Changes the target of the query
      // new account values contains the necessary data schema to add to either vets or owners table. 
      let queryTargetCommand = null;
      let newAccountValues = null;
      if(role === 'Owner'){
        newAccountValues = [firstName, lastName, email, hash];
        queryTargetCommand = 'INSERT INTO owners (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING *'
      }else if(role === 'Vet') {
        newAccountValues = [practice,firstName, lastName, email, hash]
        queryTargetCommand = 'INSERT INTO vets (practice_name,first_name, last_name, email, password) VALUES ($1, $2, $3, $4, $5) RETURNING *'
      }else {
        const err = {message:'Role property must be "Owner" or "Vet".'}
         return next(err)}
      /////////////////////////////////////////////////
      const query = {
        name: 'add-user',
        text: queryTargetCommand,
        values: newAccountValues,
        rowMode: 'array',
      };

      db.connect((err, client, release) => {
        if (err) {
          console.log(err)
          const error = {message: 'ERROR inside createAccount db.connect: '};
          return next(error)
        }
        client.query(query, (err, success) => {
          release()
          if (err) {
            const { detail } = err;
            const errorObj = {};
            errorObj.message = detail;
            return next(errorObj);
          }
  
          console.log('create account success: ', success);
          return next();
        });
      })
    });
};

accountsController.login = (req, res, next) => {
  console.log('\n*********** accountsController.login ****************', `\nMETHOD: ${req.method} \nENDPOINT: '${req.url}' \nBODY: ${JSON.stringify(req.body)} \nLOCALS: ${JSON.stringify(res.locals)} `);
  const { email, password, role } = req.body;

  const profileQuery = {
    name: 'retrieve hash password',
    text: `SELECT * FROM owners WHERE email = '${email}'`,
  };

  // console.log('this is the hash query obj: ', hashQuery);
  db.connect((err, client, release) => {
    client.query(profileQuery, (profileQueryErr, profile) => {
      release();
      if (profileQueryErr) {
        console.log('error from password retrievel query: ', profileQueryErr);
        return next(profileQueryErr);
      }
      // test if the profile query returned a saved profile
      // query always returns an array
      // if profile doesn't exist, the array will be empty
      // query response comes in profile.rows array -> values of array are objs
      if (profile.rows[0]) {
        // this is the response obj if the profile exists
        res.locals.profileMatch = true;
  
        // run a bcrypt comparison of req.body.password with encrypted password
        bcrypt.compare(password, profile.rows[0].password, (bcryptErr, passwordMatch) => {
  
          if (bcryptErr) {
            console.log('error from bcrypt compare: ', bcryptErr);
            return next(bcryptErr);
          }
  
          // bcrypt compare returns a boolean, save it as a property on the res.locals obj
          res.locals.passwordMatch = passwordMatch;
  
          // if bcrypt.compare returns false, we don't want to save any profile info
          // and move to the next middleware
          if (!passwordMatch) {
            return next();
          }
          // if bcrypt.compare returns true
          // save all of the query profile data into res.locals obj
          res.locals.owner = {
            id: profile.rows[0].owner_id,
            firstName: profile.rows[0].first_name,
            lastName: profile.rows[0].last_name,
            email: profile.rows[0].email,
          };
          res.locals.role = role;
          return next();
        });
      } else {
        // this is the response obj if the profile query returned an empty obj -> profile doesn't exist
        res.locals.profileMatch = false;
        return next();
      }
    });

  });
};

module.exports = accountsController;
