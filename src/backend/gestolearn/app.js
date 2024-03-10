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
// import emotionRoute from "./routes/emotion.js";
import cors from "cors";

config();
const app = express();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Mongodb connected successfully");
  })
  .then(() => {
    app.listen(process.env.PORT || 3000, (app) => {
      console.log(`Server is running on port 8000`);
    });
  })
  .catch((err) => console.log(err));

app.use(
  session({
    secret: "e3a8b53f6f28340e79badd2c505d5f91c7c89ccea03579ea6ea7527c5f5e75f1",
    resave: false,
    saveUninitialized: true,
    // cookie: { secure: true },
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

// app.get("/", (req, res) => {
//   res.send("http://localhost:5173");
// });

app.use("/", indexRoute);
app.use("/auth", authRoutes);
app.use("/post", postRoutes);
app.use("/summary", resultRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/lesson", lessonsRoutes);
// app.use("/emotion", emotionRoute);
app.use("/uploads", express.static("uploads"));


app.use((error, req, res, next) => {
  console.error("Error handling middleware called");
  console.error("Path:", req.path);
  console.error("Error:", error.stack);

  if (res.headersSent) {
    return next(error);
  }

  res
    .status(500)
    .json({ error: "Internal Server Error", details: error.stack });
});
