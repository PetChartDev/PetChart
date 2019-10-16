const router = require('express').Router();

const visitsController = require('../controllers/visitsController');

/**
 * @endpoint : '/visits/'
 * @method : POST
 * @returns -> a single visit object via JSON
 */
router.post('/', visitsController.createVisit, (req, res) => {
  const { newVisit } = res.locals;

  if (newVisit) {
    res.status(200).json(newVisit);
  }
});

module.exports = router;