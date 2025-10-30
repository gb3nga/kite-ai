import React, { useEffect, useState } from "react";
import "./App.css";
import logo from "./assets/kite-logo.jpg"; // make sure this matches your actual file

// === QUIZ QUESTIONS ===
const quizData = [
  {
    question: "1. Kite AI describes itself primarily as a platform for building what kind of internet?",
    options: ["A) Social Web", "B) Agentic Internet", "C) Decentralized Finance", "D) Industrial Internet"],
    answer: 1,
  },
  {
    question: "2. What is the main purpose of the Kite AIR Platform?",
    options: [
      "A) Cloud data storage for NFTs",
      "B) Agent Identity, Reputation & Payments",
      "C) Smart-contract auditing",
      "D) AI image generation",
    ],
    answer: 1,
  },
  {
    question: "3. Which major investor led Kite AI’s Series A funding round in 2025?",
    options: ["A) Sequoia Capital", "B) PayPal Ventures", "C) OpenAI Startup Fund", "D) Coinbase Ventures"],
    answer: 1,
  },
  {
    question: "4. How much did Kite AI reportedly raise in its Series A funding?",
    options: ["A) $10 million", "B) $18 million", "C) $25 million", "D) $50 million"],
    answer: 1,
  },
  {
    question: "5. Kite AI’s blockchain is described as:",
    options: [
      "A) Bitcoin Layer-2 solution",
      "B) Sovereign Layer-1, EVM-compatible chain for AI agents",
      "C) Private enterprise blockchain",
      "D) Solana-based sidechain",
    ],
    answer: 1,
  },
  {
    question: "6. What is the function of an Agent Passport (KitePass) in the Kite ecosystem?",
    options: [
      "A) Store NFTs",
      "B) Assign a unique cryptographic identity to each AI agent",
      "C) Generate trading signals",
      "D) Provide web hosting",
    ],
    answer: 1,
  },
  {
    question: "7. Which of the following is not listed as a core component of Kite AI’s ecosystem?",
    options: [
      "A) Agent App Store",
      "B) Agent Passport",
      "C) Decentralized Cloud Mining",
      "D) Agent Reputation System",
    ],
    answer: 2,
  },
  {
    question: "8. (Updated) Which of the following describes Kite AI’s developer tools?",
    options: [
      "A) SDK and CLI to build and deploy AI agents",
      "B) NFT marketplace plugins",
      "C) Video rendering API",
      "D) Email automation suite",
    ],
    answer: 0,
  },
  {
    question: "9. Which of these is a potential risk mentioned for Kite AI?",
    options: [
      "A) Over-centralization",
      "B) Execution and token-economics uncertainty",
      "C) Lack of EVM compatibility",
      "D) Absence of investors",
    ],
    answer: 1,
  },
  {
    question: "10. What is the primary currency type used for payments in the Kite AI agent network?",
    options: ["A) Bitcoin", "B) Stablecoins", "C) NFTs", "D) Utility Points"],
    answer: 1,
  },
];

export default function App() {
  const [phase, setPhase] = useState("intro"); // intro → ready → splash → quiz → result
  const [lineIndex, setLineIndex] = useState(0);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const introLines = [
    "Today’s internet was built for humans.",
    "But the next generation of intelligence is already here.",
    "AI agents will think, trade, and create alongside us.",
    "Yet the web they inherit lacks identity, trust, and scalable payments.",
    "To move forward, we need a new foundation.",
    "That foundation is Kite AI.",
  ];

  // === INTRO FADE SEQUENCE ===
  useEffect(() => {
    if (phase === "intro" && lineIndex < introLines.length) {
      const timer = setTimeout(() => {
        setLineIndex((i) => i + 1);
      }, 3000); // 3s per line
      return () => clearTimeout(timer);
    } else if (phase === "intro" && lineIndex === introLines.length) {
      const timer = setTimeout(() => setPhase("ready"), 1500);
      return () => clearTimeout(timer);
    }
  }, [lineIndex, phase]);

  const startQuiz = () => setPhase("splash");

  useEffect(() => {
    if (phase === "splash") {
      const t = setTimeout(() => setPhase("quiz"), 1800);
      return () => clearTimeout(t);
    }
  }, [phase]);

  // === QUIZ LOGIC ===
  const handleSelect = (i) => setSelected(i);
  const handleNext = () => {
    if (selected === quizData[index].answer) setScore((s) => s + 1);
    setSelected(null);
    if (index + 1 < quizData.length) setIndex((i) => i + 1);
    else setFinished(true);
  };
  const handlePrev = () => index > 0 && setIndex((i) => i - 1);
  const handleRetry = () => {
    setIndex(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
    setPhase("intro");
    setLineIndex(0);
  };
  const handleShare = () => {
  const quizUrl = "https://kiteai-quiz.netlify.app/";
  const text = `I just completed the Kite AI Quiz by @Toluszn and scored ${score}/${quizData.length}! 🚀\nTry it yourself: ${quizUrl}`;
  const url = `https://x.com/intent/tweet?text=${encodeURIComponent(text)}`;
  window.open(url, "_blank");
};
  // === PHASE RENDER ===
  if (phase === "intro") {
    return (
      <div className="intro-screen">
        {introLines.map((line, i) => (
          <div
            key={i}
            className={`intro-line ${i === lineIndex ? "visible" : ""}`}
          >
            {line}
          </div>
        ))}
      </div>
    );
  }

  if (phase === "ready") {
    return (
      <div className="intro-screen fade-out">
        <button className="start-btn" onClick={startQuiz}>
          Start Quiz
        </button>
      </div>
    );
  }

  if (phase === "splash") {
    return (
      <div className="splash-screen">
        <div className="logo-wrap">
          <img src={logo} alt="Kite AI Logo" className="splash-logo" />
        </div>
      </div>
    );
  }

  if (finished) {
    return (
      <div className="result-screen">
        <h1 className="result-title">Quiz Complete!</h1>
        <p className="result-sub">Nice effort, learning is part of the journey.</p>
        <div className="score">
          Your Score: {score}/{quizData.length}
        </div>
        <div className="result-actions">
          <button className="btn retry" onClick={handleRetry}>
            Retry Quiz
          </button>
          <button className="btn share" onClick={handleShare}>
            Share on X
          </button>
          <a
            className="follow"
            href="https://x.com/Toluszn"
            target="_blank"
            rel="noreferrer"
          >
            Follow the creator @Toluszn
          </a>
        </div>
      </div>
    );
  }

  const q = quizData[index];
  return (
    <div className="quiz-container">
      <header className="quiz-header">
        <h1>Kite AI Quiz</h1>
      </header>
      <div className="question-wrap">
        <div className="q-meta">
          Question {index + 1} / {quizData.length}
        </div>
        <div className="q-text">{q.question}</div>
        <div className="options">
          {q.options.map((opt, i) => (
            <button
              key={i}
              className={`option ${selected === i ? "selected" : ""}`}
              onClick={() => handleSelect(i)}
            >
              {opt}
            </button>
          ))}
        </div>
        <div className="nav">
          <button
            className="nav-btn prev"
            onClick={handlePrev}
            disabled={index === 0}
          >
            ◀ Previous
          </button>
          <button
            className="nav-btn next"
            onClick={handleNext}
            disabled={selected === null}
          >
            {index + 1 === quizData.length ? "Finish" : "Next ▶"}
          </button>
        </div>
      </div>
    </div>
  );
}
