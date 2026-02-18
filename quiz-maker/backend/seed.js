const mongoose = require("mongoose");
require("dotenv").config();

const User = require("./models/User");
const Quiz = require("./models/Quiz");

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/quiz-maker";

const run = async () => {
  await mongoose.connect(MONGO_URI);
  console.log("Connected to MongoDB");

  await Quiz.deleteMany({});
  await User.deleteMany({ email: "creator@quizmaker.com" });

  const creator = await User.create({
    name: "Demo Creator",
    email: "creator@quizmaker.com",
    password: "password123",
    role: "creator"
  });

  await Quiz.create({
    title: "Web Basics",
    description: "Quick check on HTML, CSS, and JavaScript fundamentals.",
    creator: creator._id,
    questions: [
      {
        prompt: "What does HTML stand for?",
        points: 1,
        options: [
          { text: "Hyper Text Markup Language", isCorrect: true },
          { text: "High Text Machine Language", isCorrect: false },
          { text: "Hyperlinks Text Markup Language", isCorrect: false },
          { text: "Hyperlink and Text Markup Language", isCorrect: false }
        ]
      },
      {
        prompt: "Which CSS property controls text size?",
        points: 1,
        options: [
          { text: "font-style", isCorrect: false },
          { text: "text-size", isCorrect: false },
          { text: "font-size", isCorrect: true },
          { text: "text-style", isCorrect: false }
        ]
      },
      {
        prompt: "Which of these is a JavaScript framework?",
        points: 1,
        options: [
          { text: "React", isCorrect: true },
          { text: "Laravel", isCorrect: false },
          { text: "Django", isCorrect: false },
          { text: "Rails", isCorrect: false }
        ]
      }
    ]
  });

  await Quiz.create({
    title: "HTML & Accessibility",
    description: "Semantic HTML and accessibility fundamentals.",
    creator: creator._id,
    questions: [
      {
        prompt: "Which HTML element is best for main page navigation links?",
        points: 1,
        options: [
          { text: "<nav>", isCorrect: true },
          { text: "<section>", isCorrect: false },
          { text: "<article>", isCorrect: false },
          { text: "<aside>", isCorrect: false }
        ]
      },
      {
        prompt: "What does the alt attribute provide on an image?",
        points: 1,
        options: [
          { text: "Alternative text for screen readers", isCorrect: true },
          { text: "A link to the image source", isCorrect: false },
          { text: "The image width in pixels", isCorrect: false },
          { text: "A tooltip that replaces the title attribute", isCorrect: false }
        ]
      },
      {
        prompt: "Which attribute links a label to a form input?",
        points: 1,
        options: [
          { text: "for", isCorrect: true },
          { text: "name", isCorrect: false },
          { text: "aria-label", isCorrect: false },
          { text: "role", isCorrect: false }
        ]
      }
    ]
  });

  await Quiz.create({
    title: "CSS & JavaScript Essentials",
    description: "Core CSS layout and JS behavior checks.",
    creator: creator._id,
    questions: [
      {
        prompt: "Which CSS layout module is best for two-dimensional layouts?",
        points: 1,
        options: [
          { text: "CSS Grid", isCorrect: true },
          { text: "Flexbox", isCorrect: false },
          { text: "Float", isCorrect: false },
          { text: "Positioning", isCorrect: false }
        ]
      },
      {
        prompt: "Which method is used to add an event listener in JavaScript?",
        points: 1,
        options: [
          { text: "addEventListener", isCorrect: true },
          { text: "listen", isCorrect: false },
          { text: "onEvent", isCorrect: false },
          { text: "attachEvent", isCorrect: false }
        ]
      },
      {
        prompt: "What does the CSS box-sizing: border-box do?",
        points: 1,
        options: [
          { text: "Includes padding and border in element width", isCorrect: true },
          { text: "Adds margin to the border", isCorrect: false },
          { text: "Resets all inherited styles", isCorrect: false },
          { text: "Makes the element inline", isCorrect: false }
        ]
      }
    ]
  });

  console.log("Seeded demo quizzes");
  console.log("Creator login: creator@quizmaker.com / password123");
  await mongoose.disconnect();
};

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
