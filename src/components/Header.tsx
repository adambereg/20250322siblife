import React from 'react';
import { Link } from 'react-router-dom';
import { LogIn, UserPlus, Menu, X, User, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { authState, logout } = useAuth();
  const { isAuthenticated, user } = authState;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logout();
  };

  const getRoleLabel = (role: string): string => {
    switch (role) {
      case 'participant':
        return 'Соучастник';
      case 'vip':
        return 'VIP Соучастник';
      case 'pro':
        return 'PRO Соучастник';
      case 'business':
        return 'Бизнес-партнер';
      case 'admin':
        return 'Администратор';
      default:
        return role;
    }
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <img
                className="h-8 w-auto"
                src="https://sun9-25.userapi.com/impg/WkkG4tc8r0AFvmiAZa7xDcw5cmf2WeMWw8LTpQ/nVnH44vhuck.jpg?size=893x134&quality=95&sign=cd4fdd7d3e63c63f719ec6caaa7d9122&type=album"
                alt="Siberia Life"
              />
            </Link>
          </div>
          
          {/* Мобильная навигация */}
          <div className="flex items-center sm:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            >
              <span className="sr-only">Открыть меню</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
          
          {/* Десктопная навигация */}
          <div className="hidden sm:flex sm:items-center sm:ml-6">
            {isAuthenticated && user ? (
              <div className="flex items-center">
                <span className="text-sm text-gray-500 mr-4">
                  {user.name} ({getRoleLabel(user.role)})
                </span>
                <Link
                  to="/profile"
                  className="text-gray-700 hover:text-indigo-600 flex items-center mr-4"
                >
                  <User className="h-5 w-5 mr-1" />
                  <span>Профиль</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Выйти
                </button>
              </div>
            ) : (
              <div className="flex items-center">
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-indigo-600 flex items-center mr-4"
                >
                  <LogIn className="h-5 w-5 mr-1" />
                  <span>Вход</span>
                </Link>
                <Link
                  to="/register"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <UserPlus className="h-4 w-4 mr-2" />
                  Регистрация
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Мобильное меню */}
      {isMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            {isAuthenticated && user ? (
              <>
                <div className="px-4 py-2 text-base font-medium text-gray-500">
                  {user.name} ({getRoleLabel(user.role)})
                </div>
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-100"
                >
                  Профиль
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-base font-medium text-red-600 hover:text-red-800 hover:bg-gray-100"
                >
                  Выйти
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block px-4 py-2 text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-100"
                >
                  Вход
                </Link>
                <Link
                  to="/register"
                  className="block px-4 py-2 text-base font-medium text-indigo-600 hover:text-indigo-800 hover:bg-gray-100"
                >
                  Регистрация
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header; 