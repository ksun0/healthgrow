const router = require('express').Router();
let Meal = require('../models/meal.model');

router.route('/').get((req, res) => {
  Meal.find()
    .then(meals => res.json(meals))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const email = req.body.email;
  const type = req.body.type;

  const newMeal = new Meal({
    email,
    type
  });

  newMeal.save()
  .then(() => res.json('Meal added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Meal.findById(req.params.id)
      .then(meal => res.json(meal))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  router.route('/:id').delete((req, res) => {
    Meal.findByIdAndDelete(req.params.id)
      .then(() => res.json('Meal deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  router.route('/update/:id').post((req, res) => {
    Meal.findById(req.params.id)
      .then(meal => {
        meal.email = req.body.email;
        meal.type = req.body.type;
  
        meal.save()
          .then(() => res.json('Meal updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });

module.exports = router;