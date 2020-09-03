const router = require('express').Router();
let Workout = require('../models/workout.model');

router.route('/').get((req, res) => {
  Workout.find()
    .then(workouts => res.json(workouts))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const email = req.body.email;
  const workout = req.body.workout;
  const reps = Number(req.body.reps);
  const weight = Number(req.body.weight);
  // TODO: img

  const newWorkout = new Workout({
    email,
    workout,
    reps,
    weight
  });

  newWorkout.save()
  .then(() => res.json('Workout added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Workout.findById(req.params.id)
      .then(workout => res.json(workout))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  router.route('/:id').delete((req, res) => {
    Workout.findByIdAndDelete(req.params.id)
      .then(() => res.json('Workout deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  router.route('/update/:id').post((req, res) => {
    Workout.findById(req.params.id)
      .then(workout => {
        workout.email = req.body.email;
        workout.workout = req.body.workout;
        workout.reps = Number(req.body.reps);
        workout.weight = Number(req.body.weight);
  
        workout.save()
          .then(() => res.json('Workout updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });

module.exports = router;