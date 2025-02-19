import { FaChartLine, FaHistory, FaTrophy } from 'react-icons/fa';

const DashboardPage = () => {
  return (
    <div className="w-full py-8 px-4 sm:px-6">
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-3xl font-bold mb-8 text-gray-900">Dashboard</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-lg hover:-translate-y-1 transition-transform duration-200">
            <div className="flex flex-col items-center">
              <FaChartLine className="text-4xl text-primary mb-4" />
              <h2 className="text-xl font-semibold mb-2">Total Attempts</h2>
              <p className="text-3xl font-bold">5</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg hover:-translate-y-1 transition-transform duration-200">
            <div className="flex flex-col items-center">
              <FaTrophy className="text-4xl text-primary mb-4" />
              <h2 className="text-xl font-semibold mb-2">Average Score</h2>
              <p className="text-3xl font-bold">75%</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg hover:-translate-y-1 transition-transform duration-200">
            <div className="flex flex-col items-center">
              <FaHistory className="text-4xl text-primary mb-4" />
              <h2 className="text-xl font-semibold mb-2">Best Score</h2>
              <p className="text-3xl font-bold">90%</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Recent Attempts</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((attempt) => (
              <div
                key={attempt}
                className="p-4 border-b last:border-b-0 hover:bg-gray-50 transition-colors duration-200"
              >
                <h3 className="text-lg font-semibold">Attempt #{attempt}</h3>
                <p className="text-gray-600">Score: {70 + attempt * 5}%</p>
                <p className="text-sm text-gray-500">
                  {new Date().toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;