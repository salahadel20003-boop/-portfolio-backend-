const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const SECRET = process.env.JWT_SECRET;
const ADMIN_USER = process.env.ADMIN_USER;
const ADMIN_PASS = process.env.ADMIN_PASS;

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (!SECRET || !ADMIN_USER || !ADMIN_PASS) {
    return res.status(500).json({ message: "Server config error" });
  }

  if (username === ADMIN_USER && password === ADMIN_PASS) {
    const token = jwt.sign({ user: username }, SECRET, {
      expiresIn: "1h"
    });

    return res.json({ token });
  }

  res.status(401).json({ message: "Wrong data" });
});

module.exports = router;
