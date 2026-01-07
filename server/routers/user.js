const express = require("express");
const router = express.Router();
const { User } = require("../db");

router.patch("/device-color/:id", async (req, res) => {
  const { passport } = req.session;
  const { id } = req.params;
  const { deviceColor } = req.body;
  // need to authenticate, but need to do that later once api is available

  // Once auth is available change _id to the passport version and then check
  // for auth before attempting to update color
  try {
    const user = await User.findById(id);
    // if (!passport) return res.status(404).send("User not found"); / comment out for now

    // Setting to undefined triggers the schema default on .save()
    // If deviceColor is null or missing, it will revert to default (sky blue)
    user.deviceColor = deviceColor || "#87cefa";

    await user.save();
    res.status(200).send(`Color updated sucessfully`);
  } catch (err) {
    const invalidColorErr = err.errors.deviceColor.message ;
    if (invalidColorErr) {
      res.status(500).send(invalidColorErr);
    }
  }
});

module.exports = router;
