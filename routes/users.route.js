const express = require("express");

//JWT
const jwt = require("jsonwebtoken");

//Models
const User = require("../database/models/User");

//TODO : Implememnt BYCRYPT
let router = express.Router();

router.route("/signup").post(async (req, res) => {
  try {
    const newUser = new User(req.body);

    if (!newUser) {
      return res
        .status(500)
        .json({ message: "Creazione utente non andata a buon fine" });
    }

    const isAlready = await User.find({ email: newUser.email });

    if (isAlready.length > 0) {
      return res.status(401).json("User Already Exist");
    }

    const userSaved = await newUser.save();

    const accessToken = jwt.sign(
      {
        data: userSaved._id,
      },
      `${process.env.JWT_SECRET}`,
      { expiresIn: "1h" }
    );

    return res.status(200).json({ user: newUser, token: accessToken });
  } catch (error) {
    return res.status(500).json({ error });
  }
});

router.route("/signin").post(async (req, res) => {
  try {
    const userToFind = await User.findOne({ email: req.body.email });

    if (
      userToFind &&
      userToFind.password === req.body.password &&
      userToFind.email === req.body.email
    ) {
      const accessToken = jwt.sign(
        {
          data: userToFind._id,
        },
        `${process.env.JWT_SECRET}`,
        { expiresIn: "1h" }
      );
      return res.status(200).json({ user: userToFind, token: accessToken });
    }

    return res.status(401).json("Authorization Failed");
  } catch (error) {
    return res.status(500).json({ error });
  }
});

module.exports = router;
