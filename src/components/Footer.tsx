import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Heart, Mail, Phone, MapPin, Globe } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-4">
              <Users className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">Siberia Life</span>
            </div>
            <p className="text-gray-600 mb-4">
              Социальная сеть для активных жителей Новосибирска
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-indigo-600">
                <span className="sr-only">VK</span>
                <Globe className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-indigo-600">
                <span className="sr-only">Telegram</span>
                <Mail className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
              Навигация
            </h3>
            <ul className="space-y-4">
              <li>
                <Link to="/news" className="text-gray-600 hover:text-indigo-600">
                  Новости
                </Link>
              </li>
              <li>
                <Link to="/events" className="text-gray-600 hover:text-indigo-600">
                  События
                </Link>
              </li>
              <li>
                <Link to="/clans" className="text-gray-600 hover:text-indigo-600">
                  Кланы
                </Link>
              </li>
              <li>
                <Link to="/places" className="text-gray-600 hover:text-indigo-600">
                  Места
                </Link>
              </li>
              <li>
                <Link to="/marketplace" className="text-gray-600 hover:text-indigo-600">
                  Маркетплейс
                </Link>
              </li>
              <li>
                <Link to="/housing" className="text-gray-600 hover:text-indigo-600">
                  Жильё
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
              Поддержка
            </h3>
            <ul className="space-y-4">
              <li>
                <a href="#" className="text-gray-600 hover:text-indigo-600">
                  Помощь
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-indigo-600">
                  Правила
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-indigo-600">
                  Конфиденциальность
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-indigo-600">
                  Условия использования
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
              Контакты
            </h3>
            <ul className="space-y-4">
              <li className="flex items-center">
                <MapPin className="h-5 w-5 text-gray-400 mr-2" />
                <span className="text-gray-600">Новосибирск, Россия</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-gray-400 mr-2" />
                <a href="tel:+73831234567" className="text-gray-600 hover:text-indigo-600">
                  +7 (383) 123-45-67
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-gray-400 mr-2" />
                <a href="mailto:info@siberialife.ru" className="text-gray-600 hover:text-indigo-600">
                  info@siberialife.ru
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500">
              © {currentYear} Siberia Life. Все права защищены.
            </p>
            <div className="flex items-center mt-4 md:mt-0">
              <span className="text-gray-500">Сделано с</span>
              <Heart className="h-5 w-5 text-red-500 mx-1" />
              <span className="text-gray-500">в Новосибирске</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;