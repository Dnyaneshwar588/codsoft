const mongoose = require("mongoose");

const optionSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
    isCorrect: { type: Boolean, default: false }
  },
  { _id: false }
);

const questionSchema = new mongoose.Schema(
  {
    prompt: { type: String, required: true },
    options: { type: [optionSchema], required: true },
    points: { type: Number, default: 1 }
  },
  { _id: false }
);

const quizSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: "" },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    questions: { type: [questionSchema], default: [] }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Quiz", quizSchema);
