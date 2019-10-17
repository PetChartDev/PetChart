const router = require('express').Router();

const petsController = require('../controllers/petsController');

/**
 * @endpoint : '/pets/'
 * @method : GET
 * @returns -> an array of all pets via JSON
 * 
 */

router.delete('/', petsController.deletePet, (req,res)=>{
    const {deletedPet} = res.locals;
    res.status(200).json(deletedPet)
});

router.get('/', petsController.getPets, (req, res) => {
  const { pets } = res.locals;
  res.status(200).json(pets);
});



/**
 * @endpoint : '/pets/'
 * @method : POST
 * @returns -> a single pet object via JSON
 */
router.post('/', petsController.addPet, (req, res) => {
  const { newPet } = res.locals;
  res.status(200).json(newPet);
});

/**
 * @endpoint : '/pets/'
 * @method : PATCH
 * @returns -> a single pet object via JSON
 */
router.patch('/', petsController.updatePet, (req, res) => {
  const { updatedPet } = res.locals;
  res.status(200).json(updatedPet);
});

module.exports = router;
