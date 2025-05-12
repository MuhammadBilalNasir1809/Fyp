import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const storedIsLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(storedIsLoggedIn);
  }, [setIsLoggedIn]);

  const handleSignOut = async () => {
    try {
      await axios.post('http://localhost:4000/api/logout', {}, { withCredentials: true });
      localStorage.removeItem('isLoggedIn');
      setIsLoggedIn(false);
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <nav className="bg-green-50 shadow-md h-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 -ml-20 -mb-3 no-underline">
          <h2 className="text-3xl font-extrabold text-green-700 -ml-10">NutriScan</h2>
          </Link>

          {/* Desktop menu */}
          <div className="hidden md:flex md:items-center md:space-x-6 -mr-20 -mb-3">
            <Link
              to="/"
              className="text-green-700 hover:text-green-900 px-4 py-2 rounded-md text-xl font-semibold transition-colors duration-200 no-underline"
            >
              Home
            </Link>
            <Link
              to="/features"
              className="text-green-700 hover:text-green-900 px-4 py-2 rounded-md text-xl font-semibold transition-colors duration-200 no-underline"
            >
              Explore Features
            </Link>

            {!isLoggedIn ? (
              <div className="flex items-center space-x-4">
                <Link
                  to="/signup"
                  className="border border-green-600 text-green-600 hover:bg-green-600 hover:text-white px-5 py-2 rounded-md text-lg font-medium transition-colors duration-200 no-underline"
                >
                  Sign Up
                </Link>
                <Link
                  to="/login"
                  className="bg-green-600 text-white hover:bg-green-700 px-5 py-2 rounded-md text-lg font-medium transition-colors duration-200 no-underline"
                >
                  Already a member?
                </Link>
              </div>
            ) : (
              <button
                onClick={handleSignOut}
                className="border border-red-500 text-red-500 hover:bg-red-500 hover:text-white px-5 py-2 rounded-md text-lg font-medium transition-colors duration-200 no-underline"
              >
                Sign Out
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-green-700 hover:text-green-900 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500 no-underline"
            >
              <span className="sr-only">Open main menu</span>
              {/* Menu icon */}
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className="text-green-700 hover:text-green-900 block px-4 py-2 rounded-md text-lg font-medium"
            >
              Home
            </Link>
            <Link
              to="/features"
              className="text-green-700 hover:text-green-900 block px-4 py-2 rounded-md text-lg font-medium"
            >
              Explore Features
            </Link>
            {!isLoggedIn ? (
              <>
                <Link
                  to="/signup"
                  className="block border border-green-600 text-green-600 hover:bg-green-600 hover:text-white px-5 py-2 rounded-md text-lg font-medium mt-4"
                >
                  Sign Up
                </Link>
                <Link
                  to="/login"
                  className="block bg-green-600 text-white hover:bg-green-700 px-5 py-2 rounded-md text-lg font-medium mt-2"
                >
                  Already a member?
                </Link>
              </>
            ) : (
              <button
                onClick={handleSignOut}
                className="block w-full text-left border border-red-500 text-red-500 hover:bg-red-500 hover:text-white px-5 py-2 rounded-md text-lg font-medium mt-4"
              >
                Sign Out
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
