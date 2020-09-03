const router = require('express').Router();
let Journal = require('../models/journal.model');

router.route('/').get((req, res) => {
  Journal.find()
    .then(journals => res.json(journals))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const email = req.body.email;
  const title = req.body.title;
  const text = req.body.text;

  const newJournal = new Journal({
    email,
    title,
    text
  });

  newJournal.save()
  .then(() => res.json('Journal added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Journal.findById(req.params.id)
      .then(journal => res.json(journal))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  router.route('/:id').delete((req, res) => {
    Journal.findByIdAndDelete(req.params.id)
      .then(() => res.json('Journal deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  router.route('/update/:id').post((req, res) => {
    Journal.findById(req.params.id)
      .then(journal => {
        journal.email = req.body.email;
        journal.title = req.body.title;
        journal.text = req.body.text;
  
        journal.save()
          .then(() => res.json('Journal updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });

module.exports = router;