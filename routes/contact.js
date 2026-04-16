const express = require("express");
const router = express.Router();
const fs = require("fs");

module.exports = function (verifyToken) {
  router.post("/", (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newMessage = {
      name,
      email,
      message,
      date: new Date()
    };

    let messages = [];

    if (fs.existsSync("messages.json")) {
      try {
        messages = JSON.parse(fs.readFileSync("messages.json", "utf8"));
      } catch {
        messages = [];
      }
    }

    messages.push(newMessage);

    fs.writeFileSync("messages.json", JSON.stringify(messages, null, 2));

    res.json({ message: "Message saved successfully" });
  });

  router.get("/", verifyToken, (req, res) => {
    if (!fs.existsSync("messages.json")) {
      return res.json([]);
    }

    try {
      const messages = JSON.parse(fs.readFileSync("messages.json", "utf8"));
      res.json(messages);
    } catch {
      res.json([]);
    }
  });

  return router;
};
