import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center py-8 px-4 sm:px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-gray-900">
            Welcome to Quiz Platform
          </h1>
          <p className="text-xl sm:text-2xl text-gray-600 max-w-3xl mb-8">
            Test your knowledge with our interactive quizzes
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => navigate('/dashboard')}
              className="btn-primary min-w-[200px]"
            >
              Go to Dashboard
            </button>
            <button
              onClick={() => navigate('/quiz')}
              className="btn-secondary min-w-[200px]"
            >
              Start Quiz
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;