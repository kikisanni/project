import mongoose from "mongoose";
import { config } from "dotenv";
import debug from "debug";

config();
const DEBUG = debug("dev");

const { NODE_ENV, MONGO_URL } = process.env;

mongoose
  .connect(MONGO_URL)
  .then(() => {
    DEBUG("MongoDB is connected");
  })
  .catch((err) => {
    DEBUG("MongoDB connection unsuccessful");
    console.log(err);
  });
