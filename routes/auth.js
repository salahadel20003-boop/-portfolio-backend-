const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const SECRET = process.env.JWT_SECRET || "mysecretkey";

const ADMIN_USER = process.env.ADMIN_USER || "SALAH";
const ADMIN_PASS = process.env.ADMIN_PASS || "SALAHB5a-";

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === ADMIN_USER && password === ADMIN_PASS) {
    const token = jwt.sign({ user: username }, SECRET, {
      expiresIn: "1h"
    });

    return res.json({ token });
  }

  res.status(401).json({ message: "Wrong data" });
});

module.exports = router;
