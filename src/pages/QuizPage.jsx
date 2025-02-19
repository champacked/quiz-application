import { useState, useEffect } from "react";
import { quizData } from "../data/quizData";

const QuizPage = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isAnswered, setIsAnswered] = useState(false);

  useEffect(() => {
    let timer;
    if (timeLeft > 0 && !showScore && !isAnswered) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && !showScore && !isAnswered) {
      handleNextQuestion();
    }

    return () => clearInterval(timer);
  }, [timeLeft, showScore, isAnswered]);

  const handleAnswerClick = (answer) => {
    setIsAnswered(true);
    if (answer === quizData[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    setTimeout(() => {
      handleNextQuestion();
    }, 1000);
  };

  const handleNextQuestion = () => {
    setIsAnswered(false);
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < quizData.length) {
      setCurrentQuestion(nextQuestion);
      setTimeLeft(30);
    } else {
      const newAttempt = {
        date: new Date().toLocaleString(),
        score: score,
        totalQuestions: quizData.length,
        percentage: Math.round((score / quizData.length) * 100),
      };

      // Get existing attempts from localStorage
      const existingAttempts = JSON.parse(
        localStorage.getItem("quizAttempts") || "[]"
      );
      const updatedAttempts = [...existingAttempts, newAttempt];

      // Save to localStorage
      localStorage.setItem("quizAttempts", JSON.stringify(updatedAttempts));
      setShowScore(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setTimeLeft(30);
    setIsAnswered(false);
  };

  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg p-6">
        {showScore ? (
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">
              Quiz Completed!
            </h2>
            <p className="text-2xl mb-8 text-gray-700">
              You scored {score} out of {quizData.length}
            </p>
            <button className="btn-primary" onClick={resetQuiz}>
              Retry Quiz
            </button>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Time Left: {timeLeft}s</span>
                <span className="text-gray-600">
                  Question {currentQuestion + 1}/{quizData.length}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-primary h-2.5 rounded-full transition-all duration-300"
                  style={{ width: `${(timeLeft / 30) * 100}%` }}
                ></div>
              </div>
            </div>

            <h2 className="text-2xl font-bold mb-6 text-gray-900">
              {quizData[currentQuestion].question}
            </h2>

            <div className="space-y-3">
              {quizData[currentQuestion].options.map((option) => (
                <button
                  key={option}
                  onClick={() => !isAnswered && handleAnswerClick(option)}
                  disabled={isAnswered}
                  className={`w-full text-left px-6 py-4 rounded-lg border-2 
                    ${
                      isAnswered
                        ? option === quizData[currentQuestion].correctAnswer
                          ? "bg-green-100 border-green-500"
                          : "bg-gray-100 border-gray-300"
                        : "border-gray-200 hover:border-primary hover:bg-blue-50"
                    }
                    transition-all duration-200
                    focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50
                    disabled:cursor-not-allowed`}
                >
                  {option}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default QuizPage;
