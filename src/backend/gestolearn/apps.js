// Import necessary modules
import { config } from "dotenv";
import express from "express";
import mongoose from "mongoose";
import passport from "passport";
import session from "express-session";
import authRoutes from "./routes/auth.js";
import postRoutes from "./routes/post.js";
import resultRoutes from "./routes/quiz.js";
import indexRoute from "./routes/index.js";
import dashboardRoutes from "./routes/dashboard.js";
import lessonsRoutes from "./routes/lessons.js";
import cors from "cors";
import http from 'http';
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import path from 'path';
import { createRequire } from 'module';

// Convert import.meta.url to __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initializing createRequire with the current URL
const require = createRequire(import.meta.url);
const WebSocket = require('ws');

config();
const app = express();

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("Mongodb connected successfully"))
  .catch((err) => console.log(err));

app.use(session({
  secret: "your_secret_here", // Ensure to replace with your actual secret
  resave: false,
  saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173", // Adjust this to match your frontend setup
  methods: "GET,POST,PUT,DELETE",
  credentials: true,
}));

// Setup routes
app.use("/", indexRoute);
app.use("/auth", authRoutes);
app.use("/post", postRoutes);
app.use("/summary", resultRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/lesson", lessonsRoutes);
app.use("/uploads", express.static("uploads"));

app.use((error, req, res, next) => {
  console.error("Error handling middleware called");
  console.error("Path:", req.path);
  console.error("Error:", error.message);
  if (res.headersSent) {
    return next(error);
  }
  res.status(500).json({ error: "Internal Server Error", details: error.message });
});

// const server = http.createServer(app);

// const wss = new WebSocket.Server({ server });

// wss.on('connection', (ws) => {
//   console.log('Client connected to WebSocket');

//   const pythonScriptPath = path.join(__dirname, '../../machine-learning/emotion-detection/main.py');
//   const pythonProcess = spawn('python', [pythonScriptPath], { cwd: '/Users/kikisanni/Documents/DCU/final-year-project/2024-ca400-issafae2-sannio3/src/machine-learning/emotion-detection/' });

//   // const pythonProcess = spawn('python', [pythonScriptPath]);

//   pythonProcess.stdout.on('data', (data) => {
//     ws.send(data.toString());
//   });

//   pythonProcess.stderr.on('data', (data) => {
//     console.error(`Python stderr: ${data}`);
//   });

//   ws.on('close', () => {
//     console.log('WebSocket client disconnected');
//     pythonProcess.kill();
//   });
// });

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
