const express = require('express');

const router = express.Router();

// GET all skill data for the pet belonging to the current user
router.get('/', (req, res) => {
  const userId = req.session.passport?.user.id;
  res.send('ultimately, this should return all of the pet\'s skill levels');
});

// GET data for the specified skill for the pet belonging to the current user
router.get('/:id', (req, res) => {
  const skillId = req.params.id;
  const userId = req.session.passport?.user.id;
  res.send('get id');
});

// PATCH data to update the specified skill by the delta amount for the pet belonging to the current user
router.patch('/:id', (req, res)=> {
  const skillId = req.params.id;
  const userId = req.session.passport?.user.id;

  const skillDelta = req.body.delta;

  res.send('patch id');
});

module.exports = router;
