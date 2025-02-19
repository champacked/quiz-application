import React from 'react';
import { FaClipboardList, FaClock, FaCheckCircle } from 'react-icons/fa';
import { quizData } from '../data/quizData';

const Instructions = ({ onStartQuiz }) => {
  return (
    <div className="instructions-container">
      <h2 className="instructions-title">Quiz Instructions</h2>
      <div className="instructions-content">
        <div className="instruction-item">
          <FaClipboardList className="instruction-icon" />
          <div className="instruction-text">
            <h3>Number of Questions</h3>
            <p>{quizData.length} questions to test your knowledge</p>
          </div>
        </div>
        
        <div className="instruction-item">
          <FaClock className="instruction-icon" />
          <div className="instruction-text">
            <h3>Time Limit</h3>
            <p>30 seconds per question</p>
          </div>
        </div>
        
        <div className="instruction-item">
          <FaCheckCircle className="instruction-icon" />
          <div className="instruction-text">
            <h3>Scoring</h3>
            <p>Each correct answer earns you 1 point</p>
          </div>
        </div>

        <div className="instructions-details">
          <h3>Additional Information</h3>
          <ul>
            <li>You'll receive instant feedback for each answer</li>
            <li>Your progress and score will be tracked</li>
            <li>You can attempt the quiz multiple times</li>
            <li>Previous attempts will be saved</li>
          </ul>
        </div>
      </div>
      
      <button className="start-quiz-btn" onClick={onStartQuiz}>
        Start Quiz
      </button>
    </div>
  );
};

export default Instructions;