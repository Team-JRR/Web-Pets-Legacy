const express = require("express");
const router = express.Router();
const { User } = require("../db");

// used to change background color in src HTML file, exported at the bottom


// used to display updated device color when user hits apply change button from profile
router.get("/current-device-color", (req, res) => {
  const { passport } = req.session;
  if (passport) {
  User.findById(passport.user.id)
      .then(({ deviceColor }) => {
        res.status(200).send({ deviceColor });

      })
      .catch((error) => {
        console.error("Failed to find user:", error);
        res.sendStatus(500);
      });
  } else {
    res.status(200).send(null);
  }

});

// used to handle updating user device color preferences in database
router.patch("/device-color", async (req, res) => {
  const { passport } = req.session;
  const deviceColor = req.body.deviceColor;

  if (!passport) return res.status(404).send("User not found");
  try {
    const user = await User.findById(passport.user.id);
    // check for auth

    // saves the user's device color choice in database, otherwise when reset to default
    // button is clicked on profile, it will not pass in a color causing the device to go back to default color settings
    user.deviceColor = deviceColor || "#87cefa";

    await user.save();
    res.status(200).send(`Color updated sucessfully`);
  } catch (err) {
    const invalidColorErr = err.errors.deviceColor.message;
    if (invalidColorErr) {
      res.status(500).send(invalidColorErr);
    }
    console.error(err);
  }
});

module.exports =  router;