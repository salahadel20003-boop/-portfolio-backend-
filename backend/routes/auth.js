const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const SECRET = "mysecretkey";

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === "SALAH" && password === "SALAHB5a-") {
    const token = jwt.sign({ user: username }, SECRET, {
      expiresIn: "1h",
    });

    return res.json({ token });
  }

  res.status(401).json({ message: "Wrong data" });
});

module.exports = router;