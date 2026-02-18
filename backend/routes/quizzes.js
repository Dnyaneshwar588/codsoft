const express = require("express");
const { body, validationResult } = require("express-validator");
const Quiz = require("../models/Quiz");
const auth = require("../middleware/auth");

const router = express.Router();

const stripCorrectAnswers = (quiz) => {
  const safeQuestions = quiz.questions.map((question) => ({
    prompt: question.prompt,
    points: question.points,
    options: question.options.map((option) => ({ text: option.text }))
  }));

  return {
    id: quiz._id,
    title: quiz.title,
    description: quiz.description,
    creator: quiz.creator,
    questions: safeQuestions
  };
};

router.get("/", async (req, res) => {
  const quizzes = await Quiz.find()
    .populate("creator", "name")
    .sort({ createdAt: -1 });

  const payload = quizzes.map((quiz) => ({
    id: quiz._id,
    title: quiz.title,
    description: quiz.description,
    creatorName: quiz.creator ? quiz.creator.name : "Unknown",
    questionCount: quiz.questions.length,
    createdAt: quiz.createdAt
  }));

  return res.json(payload);
});

router.get("/:id", async (req, res) => {
  const quiz = await Quiz.findById(req.params.id).populate("creator", "name");
  if (!quiz) {
    return res.status(404).json({ message: "Quiz not found" });
  }

  return res.json(stripCorrectAnswers(quiz));
});

router.post(
  "/",
  auth,
  [
    body("title").trim().notEmpty().withMessage("Title is required"),
    body("questions").isArray({ min: 1 }).withMessage("At least one question is required")
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, description, questions } = req.body;

    const normalizedQuestions = questions.map((question) => {
      const correctIndex = Number(question.correctIndex);
      const options = question.options.map((text, index) => ({
        text,
        isCorrect: index === correctIndex
      }));

      return {
        prompt: question.prompt,
        points: Number(question.points) || 1,
        options
      };
    });

    const quiz = await Quiz.create({
      title,
      description,
      creator: req.user.id,
      questions: normalizedQuestions
    });

    return res.status(201).json({ id: quiz._id });
  }
);

router.post("/:id/submit", auth, async (req, res) => {
  const { answers } = req.body;
  const quiz = await Quiz.findById(req.params.id);

  if (!quiz) {
    return res.status(404).json({ message: "Quiz not found" });
  }

  const safeAnswers = Array.isArray(answers) ? answers : [];
  let score = 0;
  let total = 0;

  const answerDetails = quiz.questions.map((question, index) => {
    const correctIndex = question.options.findIndex((option) => option.isCorrect);
    const selectedOptionIndex = Number(safeAnswers[index]);
    const isCorrect = selectedOptionIndex === correctIndex;
    const points = question.points || 1;

    total += points;
    if (isCorrect) score += points;

    return {
      questionIndex: index,
      selectedOptionIndex: Number.isNaN(selectedOptionIndex) ? -1 : selectedOptionIndex,
      isCorrect
    };
  });

  const Result = require("../models/Result");
  const result = await Result.create({
    quiz: quiz._id,
    user: req.user.id,
    score,
    total,
    answers: answerDetails
  });

  const correctAnswers = quiz.questions.map((question) =>
    question.options.findIndex((option) => option.isCorrect)
  );

  return res.json({
    resultId: result._id,
    score,
    total,
    correctAnswers
  });
});

module.exports = router;
