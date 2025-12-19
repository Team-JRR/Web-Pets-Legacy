const express = require('express');
const { Pet } = require('../db');

const router = express.Router();

// GET all skill data for the pet belonging to the current user
router.get('/', (req, res) => {
  const userId = req.session.passport?.user?.id;

  if (userId === undefined) {
    res.sendStatus(401);
    return;
  }

  return Pet.find({ userId })
    .then((pets) => {
      if (!pets.length) {
        res.sendStatus(404);
        return;
      }
      res.status(200).send(pets[0].training);
    })
    .catch((err) => {
      console.error('Failed to retrieve pet data:', err);
      res.sendStatus(500);
    });
});

// GET data for the specified skill for the pet belonging to the current user
router.get('/:id', (req, res) => {
  const userId = req.session.passport?.user?.id;

  if (userId === undefined) {
    res.sendStatus(401);
    return;
  }

  const skillId = req.params.id;
  res.send('get id');
});

// PATCH data to update the specified skill by the delta amount for the pet belonging to the current user
router.patch('/:id', (req, res)=> {
  const userId = req.session.passport?.user?.id;

  if (userId === undefined) {
    res.sendStatus(401);
    return;
  }

  const skillId = req.params.id;

  const skillDelta = req.body.delta;

  res.send('patch id');
});

module.exports = router;
