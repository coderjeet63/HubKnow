import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-gray-800 text-white p-4 shadow-md">
      <nav className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          AI Knowledge Hub
        </Link>
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <Link to="/" className="hover:text-gray-300">Dashboard</Link>
              <Link 
                to="/articles/new" 
                className="bg-blue-500 px-3 py-1 rounded-md text-sm font-medium hover:bg-blue-600"
              >
                New Article
              </Link>
              <span className="text-gray-400 text-sm">({user.email} - {user.role})</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 px-3 py-1 rounded-md text-sm font-medium hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-gray-300">Login</Link>
              <Link to="/register" className="hover:text-gray-300">Register</Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;