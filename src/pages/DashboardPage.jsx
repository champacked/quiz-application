import { FaChartLine, FaHistory, FaTrophy } from "react-icons/fa";
import { useEffect, useState } from "react";

const DashboardPage = () => {
  const [attempts, setAttempts] = useState([]);

  useEffect(() => {
    // Function to load attempts
    const loadAttempts = () => {
      const savedAttempts = JSON.parse(
        localStorage.getItem("quizAttempts") || "[]"
      );
      setAttempts(savedAttempts);
    };

    // Load attempts initially
    loadAttempts();

    // Add event listener for storage changes
    window.addEventListener("storage", loadAttempts);

    // Set up interval to check for updates
    const interval = setInterval(loadAttempts, 1000);

    // Cleanup
    return () => {
      window.removeEventListener("storage", loadAttempts);
      clearInterval(interval);
    };
  }, []);

  const totalAttempts = attempts.length;

  const averageScore =
    attempts.length > 0
      ? Math.round(
          attempts.reduce((acc, curr) => acc + curr.percentage, 0) /
            attempts.length
        )
      : 0;

  const bestScore =
    attempts.length > 0
      ? Math.max(...attempts.map((attempt) => attempt.percentage))
      : 0;

  return (
    <div className="w-full py-8 px-4 sm:px-6">
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-3xl font-bold mb-8 text-gray-900">Dashboard</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-lg hover:-translate-y-1 transition-transform duration-200">
            <div className="flex flex-col items-center">
              <FaChartLine className="text-4xl text-primary mb-4" />
              <h2 className="text-xl font-semibold mb-2">Total Attempts</h2>
              <p className="text-3xl font-bold">{totalAttempts}</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg hover:-translate-y-1 transition-transform duration-200">
            <div className="flex flex-col items-center">
              <FaTrophy className="text-4xl text-primary mb-4" />
              <h2 className="text-xl font-semibold mb-2">Average Score</h2>
              <p className="text-3xl font-bold">{averageScore}%</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg hover:-translate-y-1 transition-transform duration-200">
            <div className="flex flex-col items-center">
              <FaHistory className="text-4xl text-primary mb-4" />
              <h2 className="text-xl font-semibold mb-2">Best Score</h2>
              <p className="text-3xl font-bold">{bestScore}%</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Recent Attempts</h2>
          <div className="space-y-4">
            {attempts
              .slice()
              .reverse()
              .map((attempt, index) => (
                <div
                  key={index}
                  className="p-4 border-b last:border-b-0 hover:bg-gray-50 transition-colors duration-200"
                >
                  <h3 className="text-lg font-semibold">
                    Attempt #{attempts.length - index}
                  </h3>
                  <p className="text-gray-600">Score: {attempt.percentage}%</p>
                  <p className="text-sm text-gray-500">{attempt.date}</p>
                </div>
              ))}
            {attempts.length === 0 && (
              <p className="text-gray-500 text-center py-4">
                No attempts yet. Take a quiz to see your results!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
