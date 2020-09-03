const router = require('express').Router();
let Challenge = require('../models/challenge.model');


router.route('/').get((req, res) => {
  Challenge.find()
    .then(challenges => res.json(challenges))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  // const content = req.body.content;
  // const pointValue = req.body.pointValue;
  // const timeBegin = req.body.timeBegin;
  // const timeExpire = req.body.timeExpire;

  const newChallenge = new Challenge (req.body);

  newChallenge.save( (err) => {
    if (err) {
      res.type('html').status(200);
        res.write('uh oh: ' + err);
        console.log(err);
        res.end();
    }
    console.log("Done!");
    res.status(200).end();
  });
});

router.route('/:id').get((req, res) => {
    Challenge.findById(req.params.id)
      .then(challenge => res.json(challenge))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  router.route('/:id').delete((req, res) => {
    Challenge.findByIdAndDelete(req.params.id)
      .then(() => res.json('Challenge deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  router.route('/update/:id').post((req, res) => {
    Challenge.findById(req.params.id)
      .then(challenge => {
        achivement.model = req.body.model;
        achivement.field = req.body.field;
        achivement.operator = req.body.operator;
        achivement.condition = Number(req.body.condition);
        challenge.pointValue = req.body.pointValue;
        challenge.timeBegin = req.body.timeBegin;
        challenge.timeExpire = req.body.timeExpire;

        challenge.save()
          .then(() => res.json('Challenge updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });

module.exports = router;
