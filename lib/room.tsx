"use client";

import { useState, useEffect } from "react";

interface Question {
  question: string;
  options: string[];
  answer: string;
}

// Medium difficulty STEM questions
const questions: Question[] = [
  {
    question: "What is the chemical symbol for Sodium?",
    options: ["Na", "S", "So", "Sn"],
    answer: "Na",
  },
  {
    question: "If a car travels 60 km in 2 hours, what is its average speed?",
    options: ["30 km/h", "60 km/h", "120 km/h", "90 km/h"],
    answer: "30 km/h",
  },
  {
    question: "Which planet has the largest diameter in our solar system?",
    options: ["Earth", "Jupiter", "Saturn", "Neptune"],
    answer: "Jupiter",
  },
  {
    question: "What is the powerhouse of the cell?",
    options: ["Nucleus", "Mitochondria", "Ribosome", "Chloroplast"],
    answer: "Mitochondria",
  },
  {
    question: "What is 25% of 200?",
    options: ["25", "50", "75", "100"],
    answer: "50",
  },
  {
    question: "Water boils at which temperature at sea level?",
    options: ["90°C", "100°C", "120°C", "80°C"],
    answer: "100°C",
  },
  {
    question: "Which of these is a non-renewable energy source?",
    options: ["Solar", "Wind", "Coal", "Hydro"],
    answer: "Coal",
  },
  {
    question:
      "Which gas do plants absorb from the atmosphere for photosynthesis?",
    options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
    answer: "Carbon Dioxide",
  },
  {
    question: "What is the next prime number after 7?",
    options: ["9", "11", "13", "17"],
    answer: "11",
  },
  {
    question:
      "A force of 10 N acts on an object of mass 2 kg. What is its acceleration?",
    options: ["2 m/s²", "5 m/s²", "10 m/s²", "20 m/s²"],
    answer: "5 m/s²",
  },
];

export const QuizOnly = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10);

  const currentQuestion = questions[currentIndex];
  const totalQuestions = questions.length;

  // Timer countdown
  useEffect(() => {
    if (showResults) return;

    setTimeLeft(10);
    const interval = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(interval);
          // Auto advance when timer hits zero
          handleNext(false);
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex, showResults]);

  const handleNext = (answered: boolean) => {
    if (answered && selectedAnswer === currentQuestion.answer) {
      setScore((prev) => prev + 1);
    }

    setSelectedAnswer("");

    if (currentIndex + 1 >= totalQuestions) {
      setShowResults(true);
    } else {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const restart = () => {
    setCurrentIndex(0);
    setSelectedAnswer("");
    setScore(0);
    setShowResults(false);
    setTimeLeft(10);
  };

  // progress calculation (not displayed explicitly)

  if (showResults) {
    return (
      <div className="p-6 max-w-md mx-auto">
        <div className="bg-white rounded-xl shadow p-6 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Quiz Completed!
          </h2>
          <p className="text-lg text-gray-700 mb-4">
            Your Score: <span className="font-semibold">{score}</span> /{" "}
            {totalQuestions}
          </p>
          <div className="flex justify-center gap-3">
            <button
              className="px-4 py-2 bg-sky-600 text-white rounded-md shadow-sm hover:shadow-md"
              onClick={restart}
            >
              Play Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-md mx-auto">
      <div className="bg-white rounded-xl shadow p-6">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              Question {currentIndex + 1} of {totalQuestions}
            </h3>
            <p className="text-sm text-gray-500">
              Answer quickly — timer resets each question.
            </p>
          </div>
          <div className="text-sm font-medium text-gray-700">{timeLeft}s</div>
        </div>

        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-4">
          <div
            className="h-full bg-sky-500 transition-all"
            style={{ width: `${((10 - timeLeft) / 10) * 100}%` }}
          />
        </div>

        <p className="text-xl text-gray-800 mb-4">{currentQuestion.question}</p>

        <ul className="grid grid-cols-1 gap-3">
          {currentQuestion.options.map((option) => {
            const chosen = selectedAnswer === option;
            return (
              <li key={option}>
                <button
                  className={`w-full text-left px-4 py-3 rounded-lg border transition-all duration-150 flex items-center justify-between
                    ${
                      chosen
                        ? "bg-sky-50 border-sky-300 text-sky-800 font-semibold shadow-sm"
                        : "bg-white border-gray-200 hover:bg-gray-50"
                    }`}
                  onClick={() => setSelectedAnswer(option)}
                >
                  <span>{option}</span>
                  {chosen && (
                    <span className="text-xs px-2 py-0.5 bg-sky-100 text-sky-700 rounded">
                      Selected
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>

        <div className="mt-4 flex items-center justify-between">
          <button
            className="px-4 py-2 bg-sky-600 text-white rounded-md shadow-sm disabled:opacity-50"
            onClick={() => handleNext(true)}
            disabled={!selectedAnswer}
          >
            Submit
          </button>

          <div className="text-sm text-gray-500">
            Progress: {currentIndex}/{totalQuestions - 1}
          </div>
        </div>
      </div>
    </div>
  );
};
