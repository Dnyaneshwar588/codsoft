const express = require("express");
const Result = require("../models/Result");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/my", auth, async (req, res) => {
  const results = await Result.find({ user: req.user.id })
    .populate("quiz", "title")
    .sort({ createdAt: -1 });

  const payload = results.map((result) => ({
    id: result._id,
    quizTitle: result.quiz ? result.quiz.title : "Untitled",
    score: result.score,
    total: result.total,
    createdAt: result.createdAt
  }));

  return res.json(payload);
});

module.exports = router;
