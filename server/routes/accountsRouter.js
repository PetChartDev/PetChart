const router = require('express').Router();

const accountsController = require('../controllers/accountsController');
const petsController = require('../controllers/petsController');
const visitsController = require('../controllers/visitsController');
const surgeryController = require('../controllers/surgeryController');

router.post('/register', accountsController.createAccount, (req, res) => {
  res.status(200).send('Thanks for the request!');
});

/**
 * @endpoint : 'accounts/login'
 * @method : GET
 * @locals : profileMatch, passwordMatch. owner, pets
 * @returns -> a owner object with the owner's data, array of pets, surgeries & vaccines
 * @JSONstructure : { owner: ..., pets: [...], surgeries: [...], vaccines: [...] }
 */
router.post('/login',
  accountsController.login,
  petsController.getPets,
  visitsController.getVisits,
  surgeryController.getSurgeries,
  (req, res) => {
    if (res.locals.profileMatch) {
      if (res.locals.passwordMatch) {
        const { owner, pets, role } = res.locals;
        res.status(200).json({ owner, pets, role });
      } else {
        const { passwordMatch } = res.locals;
        res.status(401).json({ passwordMatch });
      }
    } else {
      const { profileMatch } = res.locals;
      res.status(401).json({ profileMatch });
    }
  }
); 

module.exports = router;
