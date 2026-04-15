const express = require('express');
const cors = require('cors');
const path = require('path');
const jwt = require("jsonwebtoken");

const app = express();
const SECRET = "mysecretkey";

// Middleware
app.use(cors());
app.use(express.json());

// ✅ CSP
app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; connect-src 'self' http://localhost:5000; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:;"
  );
  next();
});

// static frontend
app.use(express.static(path.join(__dirname, '../frontend')));

// Routes
const projectsRoute = require('./routes/projects');
const contactRoute = require('./routes/contact');
const authRoute = require('./routes/auth');

app.use('/api/projects', projectsRoute);
app.use('/api/contact', contactRoute);
app.use('/api/auth', authRoute);

// 🔐 JWT Middleware
function verifyToken(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "No token" });
  }

  try {
    jwt.verify(token, SECRET);
    next();
  } catch {
    return res.status(403).json({ message: "Invalid token" });
  }
}

// 🔐 حماية الداشبورد
app.get("/dashboard.html", verifyToken, (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dashboard.html"));
});

// ⭐ الصفحة الرئيسية
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// تشغيل السيرفر
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log('Server running on port ' + PORT);
});