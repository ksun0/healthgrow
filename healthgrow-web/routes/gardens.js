const router = require('express').Router();
let Garden = require('../models/garden.model');

router.route('/').get((req, res) => {
  Garden.find()
    .then(gardens => res.json(gardens))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const title = req.body.title;
  const img = req.body.img;
  const level = req.body.level;

  const newGarden = new Garden({
    title,
    img,
    level
  });

  newGarden.save()
  .then(() => res.json('Garden added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Garden.findById(req.params.id)
      .then(garden => res.json(garden))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  router.route('/:id').delete((req, res) => {
    Garden.findByIdAndDelete(req.params.id)
      .then(() => res.json('Garden deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  router.route('/update/:id').post((req, res) => {
    Garden.findById(req.params.id)
      .then(garden => {
        garden.title = req.body.title;
        garden.img = req.body.img;
        garden.level = req.body.level;
  
        garden.save()
          .then(() => res.json('Garden updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });

module.exports = router;