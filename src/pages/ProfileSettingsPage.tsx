import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { User } from '../types/auth';
import { userAPI } from '../api/client';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Camera, Save, AlertCircle, Lock, ChevronRight } from 'lucide-react';

const ProfileSettingsPage: React.FC = () => {
  const { authState, updateUserData } = useAuth();
  const { user } = authState;
  const navigate = useNavigate();

  const [formData, setFormData] = useState<Partial<User>>({
    name: '',
    email: '',
  });
  
  const [avatar, setAvatar] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
      });
      setPreviewUrl(user.avatar || '');
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Проверка типа файла
      if (!file.type.match('image.*')) {
        setError('Пожалуйста, загрузите изображение');
        return;
      }
      
      // Проверка размера файла (максимум 5 МБ)
      if (file.size > 5 * 1024 * 1024) {
        setError('Размер файла не должен превышать 5 МБ');
        return;
      }
      
      setAvatar(file);
      setPreviewUrl(URL.createObjectURL(file));
      setError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setLoading(true);
    setError(null);
    setSuccess(false);
    
    try {
      console.log('Отправка запроса на обновление профиля:', formData);
      const response = await userAPI.updateProfile({
        name: formData.name,
      });
      console.log('Ответ от сервера:', response);
      
      if (response.success) {
        setSuccess(true);
        // Обновляем данные пользователя в контексте
        await updateUserData();
      } else {
        setError(response.message || 'Не удалось обновить профиль');
        console.error('Ошибка обновления профиля:', response.message);
      }
    } catch (err: any) {
      console.error('Исключение при обновлении профиля:', err);
      setError(err.message || 'Произошла ошибка при обновлении профиля');
    } finally {
      setLoading(false);
    }
  };

  // Функция для получения полного URL аватара
  const getAvatarUrl = (avatarPath: string) => {
    if (!avatarPath) return 'https://via.placeholder.com/150?text=Нет+фото';
    // Если это уже полный URL (начинается с http или https)
    if (avatarPath.startsWith('http')) return avatarPath;
    // Если это относительный путь с сервера
    return `http://localhost:5000${avatarPath}`;
  };

  if (!user) {
    return null;
  }

  return (
    <div className="bg-gray-100 min-h-screen pt-6 pb-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          {/* Шапка */}
          <div className="border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <button 
                  onClick={() => navigate('/profile')}
                  className="mr-3 text-gray-400 hover:text-gray-500"
                >
                  <ArrowLeft size={20} />
                </button>
                <h1 className="text-lg font-medium text-gray-900">Настройки профиля</h1>
              </div>
              
              <button
                type="submit"
                form="profile-form"
                disabled={loading}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                {loading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Сохранение
                  </span>
                ) : (
                  <span className="flex items-center">
                    <Save className="mr-2 h-4 w-4" />
                    Сохранить
                  </span>
                )}
              </button>
            </div>
          </div>
          
          {/* Сообщения */}
          {error && (
            <div className="border-l-4 border-red-500 bg-red-50 p-4 mx-6 mt-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <AlertCircle className="h-5 w-5 text-red-400" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}
          
          {success && (
            <div className="border-l-4 border-green-500 bg-green-50 p-4 mx-6 mt-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-green-700">Профиль успешно обновлен!</p>
                </div>
              </div>
            </div>
          )}
          
          {/* Основное содержимое */}
          <div className="px-6 py-4">
            {/* Блок с аватаром */}
            <div className="mb-8 flex flex-col items-center">
              <div className="relative mb-3">
                <div className="h-24 w-24 rounded-full overflow-hidden border-2 border-gray-200">
                  <img 
                    src={getAvatarUrl(user.avatar || '')} 
                    alt="Аватар" 
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
              <Link
                to="/profile/settings/avatar"
                className="flex items-center text-sm text-indigo-600 hover:text-indigo-700 font-medium"
              >
                <Camera className="h-4 w-4 mr-1" />
                Изменить аватар
              </Link>
            </div>
            
            {/* Форма для основных данных */}
            <form id="profile-form" className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Имя
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name || ''}
                  onChange={handleChange}
                  required
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email || ''}
                  onChange={handleChange}
                  required
                  disabled
                  className="mt-1 bg-gray-50 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md cursor-not-allowed"
                />
                <p className="mt-1 text-xs text-gray-500">
                  Email используется для входа и не может быть изменен
                </p>
              </div>
            </form>
          </div>
          
          {/* Дополнительные настройки */}
          <div className="px-6 py-4 border-t border-gray-200">
            <h2 className="text-sm font-medium text-gray-900 mb-3">Дополнительные настройки</h2>
            
            <div className="space-y-2">
              <Link 
                to="/profile/settings/password"
                className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition"
              >
                <div className="flex items-center">
                  <Lock className="h-5 w-5 text-indigo-500 mr-3" />
                  <span className="text-gray-700">Изменить пароль</span>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettingsPage; 