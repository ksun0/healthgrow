const router = require('express').Router();
let Achievement = require('../models/achievement.model');

router.route('/').get((req, res) => {
  Achievement.find()
    .then(achievements => res.json(achievements))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const model = req.body.model;
  const field = req.body.field;
  const operator = req.body.operator;
  const condition = Number(req.body.condition);

  const newAchievement = new Achievement({
    model,
    field,
    operator,
    condition
  });

  newAchievement.save()
  .then(() => res.json('Achievement added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Achievement.findById(req.params.id)
      .then(achievement => res.json(achievement))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  router.route('/:id').delete((req, res) => {
    Achievement.findByIdAndDelete(req.params.id)
      .then(() => res.json('Achievement deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  router.route('/update/:id').post((req, res) => {
    Achievement.findById(req.params.id)
      .then(achivement => {
        achivement.model = req.body.model;
        achivement.field = req.body.field;
        achivement.operator = req.body.operator;
        achivement.condition = Number(req.body.condition);
  
        achivement.save()
          .then(() => res.json('Achivement updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });

module.exports = router;