import { useState, useEffect } from 'react';
import { quizData } from '../data/quizData';

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [attempts, setAttempts] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);

  useEffect(() => {
    if (timeLeft > 0 && !showScore) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showScore) {
      handleNextQuestion();
    }
  }, [timeLeft, showScore]);

  const handleAnswerClick = (answer) => {
    setSelectedAnswer(answer);
    setShowFeedback(true);
    
    if (answer === quizData[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    setTimeout(() => {
      setShowFeedback(false);
      handleNextQuestion();
    }, 1500);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setTimeLeft(30);
      setSelectedAnswer('');
    } else {
      const newAttempt = {
        date: new Date().toLocaleString(),
        score: score,
        totalQuestions: quizData.length
      };
      setAttempts([...attempts, newAttempt]);
      setShowScore(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setTimeLeft(30);
    setSelectedAnswer('');
    setShowFeedback(false);
  };

  if (showScore) {
    return (
      <div className="quiz-container">
        <h2>Quiz Completed!</h2>
        <div className="score-section">
          You scored {score} out of {quizData.length}
        </div>
        <div className="attempts-history">
          <h3>Attempt History</h3>
          {attempts.map((attempt, index) => (
            <div key={index} className="attempt">
              Attempt {index + 1}: {attempt.score}/{attempt.totalQuestions} - {attempt.date}
            </div>
          ))}
        </div>
        <button onClick={restartQuiz}>Try Again</button>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      <div className="timer">Time left: {timeLeft}s</div>
      <div className="question-section">
        <div className="question-count">
          Question {currentQuestion + 1}/{quizData.length}
        </div>
        <div className="question-text">
          {quizData[currentQuestion].question}
        </div>
      </div>
      <div className="answer-section">
        {quizData[currentQuestion].options.map((option) => (
          <button
            key={option}
            onClick={() => handleAnswerClick(option)}
            className={`answer-button ${
              showFeedback
                ? option === quizData[currentQuestion].correctAnswer
                  ? 'correct'
                  : option === selectedAnswer
                  ? 'incorrect'
                  : ''
                : ''
            }`}
            disabled={showFeedback}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Quiz;