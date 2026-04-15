const express = require('express');
const router = express.Router();
const fs = require('fs');

// ✅ إرسال رسالة
router.post('/', (req, res) => {
  const { name, email, message } = req.body;

  const newMessage = {
    name,
    email,
    message,
    date: new Date()
  };

  let messages = [];

  if (fs.existsSync('messages.json')) {
    messages = JSON.parse(fs.readFileSync('messages.json'));
  }

  messages.push(newMessage);

  fs.writeFileSync('messages.json', JSON.stringify(messages, null, 2));

  res.json({ message: 'Message saved successfully' });
});

// ✅ جلب الرسائل
router.get('/', (req, res) => {
  if (!fs.existsSync('messages.json')) {
    return res.json([]);
  }

  const messages = JSON.parse(fs.readFileSync('messages.json'));
  res.json(messages);
});

module.exports = router;