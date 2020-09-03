const router = require('express').Router();
let Mood = require('../models/mood.model');

router.route('/').get((req, res) => {
  Mood.find()
    .then(moods => res.json(moods))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const email = req.body.email;
  const rating = req.body.rating;
  const text = req.body.text;

  const newMood = new Mood({
    email,
    rating,
    text
  });

  newMood.save()
  .then(() => res.json('Mood added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Mood.findById(req.params.id)
      .then(mood => res.json(mood))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  router.route('/:id').delete((req, res) => {
    Mood.findByIdAndDelete(req.params.id)
      .then(() => res.json('Mood deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  router.route('/update/:id').post((req, res) => {
    Mood.findById(req.params.id)
      .then(mood => {
        mood.email = req.body.email;
        mood.rating = req.body.rating;
        mood.text = req.body.text;
  
        mood.save()
          .then(() => res.json('Mood updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });

module.exports = router;