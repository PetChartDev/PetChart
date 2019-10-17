const router = require('express').Router();

const vaccinesController = require('../controllers/vaccinesController');

router.post('/', vaccinesController.createVaccines, (req, res, next) => {
  const {newVaccine} = res.locals;
  res.status(200).json(newVaccine);
});

router.get('/',vaccinesController.getVaccines, (req,res,next)=>{
  const {vaccines} = res.locals;
  res.status(200).json(vaccines);
});

module.exports = router;
