import mongoose from "mongoose";

const { Schema } = mongoose;

const ResultsSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  completed: {
    type: Number,
    default: 0
  },
  lessonsCompleted: {
    type: [String], // Array of lessonIds
    default: []
  },
  categoryTotalPoints: {
    type: [Number],
    default: []
  },
  totalXP: {
    type: Number,
    default: 0
  },
  totalPoints: {
    type: Number,
    default: 0
  },
  hearts: {
    type: Number,
    default: 5
  },
});

const Results = mongoose.model("Results", ResultsSchema);
export default Results;
