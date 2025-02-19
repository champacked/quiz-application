import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-primary shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <h1 
            className="text-white text-xl font-bold cursor-pointer"
            onClick={() => navigate('/')}
          >
            Quiz Platform
          </h1>
          
          <div className="flex space-x-4">
            <button
              onClick={() => navigate('/')}
              className={`text-white px-3 py-2 rounded-md ${
                isActive('/') ? 'bg-blue-600 font-bold' : 'hover:bg-blue-600'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => navigate('/dashboard')}
              className={`text-white px-3 py-2 rounded-md ${
                isActive('/dashboard') ? 'bg-blue-600 font-bold' : 'hover:bg-blue-600'
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => navigate('/quiz')}
              className={`text-white px-3 py-2 rounded-md ${
                isActive('/quiz') ? 'bg-blue-600 font-bold' : 'hover:bg-blue-600'
              }`}
            >
              Quiz
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;