const express = require("express");
const cors = require("cors");
const path = require("path");
const jwt = require("jsonwebtoken");

const app = express();

const SECRET = process.env.JWT_SECRET || "mysecretkey";

app.use(cors({
  origin: "https://salahadel20003-boop.github.io",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; connect-src 'self' https://portfolio-backend-production-770e.up.railway.app; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:;"
  );
  next();
});

app.use(express.static(path.join(__dirname, "../frontend")));

function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "No token" });
  }

  const token = authHeader.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : authHeader;

  try {
    jwt.verify(token, SECRET);
    next();
  } catch {
    return res.status(403).json({ message: "Invalid token" });
  }
}

const projectsRoute = require("./routes/projects");
const contactRoute = require("./routes/contact");
const authRoute = require("./routes/auth");

app.use("/api/projects", projectsRoute);
app.use("/api/contact", contactRoute(verifyToken));
app.use("/api/auth", authRoute);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
