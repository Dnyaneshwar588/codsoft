const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema(
  {
    questionIndex: { type: Number, required: true },
    selectedOptionIndex: { type: Number, required: true },
    isCorrect: { type: Boolean, required: true }
  },
  { _id: false }
);

const resultSchema = new mongoose.Schema(
  {
    quiz: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz", required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    score: { type: Number, required: true },
    total: { type: Number, required: true },
    answers: { type: [answerSchema], default: [] }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Result", resultSchema);
