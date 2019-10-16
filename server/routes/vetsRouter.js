const router = require('express').Router();

const vetsController = require('../controllers/vetsController');

/**
 * @endpoint : '/vets'
 * @method : GET
 * @returns -> an array of all vets via JSON
 */
router.get('/', vetsController.searchVets, (req, res) => {
  const{vets} = res.locals;
  res.status(200).json(vets);
})

module.exports = router;
