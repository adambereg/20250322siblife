import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Camera, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { userAPI } from '../api/client';

const AvatarSettingsPage: React.FC = () => {
  const navigate = useNavigate();
  const { authState, updateUserData } = useAuth();
  const { user } = authState;
  
  const [avatar, setAvatar] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Функция для получения полного URL аватара
  const getAvatarUrl = (avatarPath: string) => {
    if (!avatarPath) return 'https://via.placeholder.com/150?text=Нет+фото';
    // Если это уже полный URL (начинается с http или https)
    if (avatarPath.startsWith('http')) return avatarPath;
    // Если это относительный путь с сервера
    return `http://localhost:5000${avatarPath}`;
  };
  
  useEffect(() => {
    if (user && user.avatar) {
      setPreviewUrl(getAvatarUrl(user.avatar));
    } else {
      setPreviewUrl('https://via.placeholder.com/150?text=Нет+фото');
    }
  }, [user]);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      console.log('Выбран файл:', file.name, 'тип:', file.type, 'размер:', file.size);
      
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
    
    if (!user || !avatar) {
      setError('Выберите файл для загрузки');
      return;
    }
    
    setLoading(true);
    setError(null);
    setSuccess(false);
    
    try {
      console.log('Подготовка данных для отправки');
      
      const formData = new FormData();
      formData.append('avatar', avatar);
      
      // Проверка содержимого FormData
      console.log('Файл в FormData:', avatar.name, avatar.type, avatar.size);
      
      console.log('Отправка аватара на сервер...');
      const response = await userAPI.updateProfileWithAvatar(formData);
      console.log('Ответ сервера:', response);
      
      if (response.success) {
        setSuccess(true);
        console.log('Аватар успешно обновлен');
        // Обновляем данные пользователя в контексте
        const updated = await updateUserData();
        if (updated && user.avatar) {
          // Обновляем локальное превью аватара
          setPreviewUrl(getAvatarUrl(user.avatar));
        }
      } else {
        setError(response.message || 'Не удалось обновить аватар');
        console.error('Ошибка обновления аватара:', response.message);
      }
    } catch (err: any) {
      console.error('Исключение при загрузке аватара:', err);
      setError(err.message || 'Произошла ошибка при загрузке аватара');
    } finally {
      setLoading(false);
    }
  };
  
  if (!user) {
    return null;
  }
  
  return (
    <div className="bg-gray-100 min-h-screen pt-6 pb-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          {/* Шапка */}
          <div className="border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <button 
                  onClick={() => navigate('/profile/settings')}
                  className="mr-3 text-gray-400 hover:text-gray-500"
                >
                  <ArrowLeft size={20} />
                </button>
                <h1 className="text-lg font-medium text-gray-900">Изменение аватара</h1>
              </div>
              
              <button
                type="submit"
                form="avatar-form"
                disabled={loading || !avatar}
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
                  <p className="text-sm text-green-700">Аватар успешно обновлен!</p>
                </div>
              </div>
            </div>
          )}
          
          {/* Форма */}
          <form id="avatar-form" className="px-6 py-6" onSubmit={handleSubmit}>
            <div className="flex flex-col items-center">
              <div className="relative mb-6 group">
                <div className="h-40 w-40 rounded-full overflow-hidden border-4 border-gray-200">
                  <img 
                    src={previewUrl} 
                    alt="Аватар" 
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity rounded-full">
                    <Camera className="h-10 w-10 text-white" />
                  </div>
                </div>
                <input 
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                />
              </div>
              
              <p className="text-sm text-gray-700 text-center">
                Нажмите на изображение, чтобы выбрать новый аватар
              </p>
              
              <p className="text-xs text-gray-500 mt-2 text-center">
                Рекомендуемый размер: 200×200 пикселей<br />
                Максимальный размер файла: 5 МБ<br />
                Поддерживаемые форматы: JPG, PNG, GIF
              </p>
              
              <div className="mt-8 border-t border-gray-200 pt-6 w-full max-w-md">
                <h3 className="text-sm font-medium text-gray-700 mb-3">
                  Рекомендации для аватара:
                </h3>
                <ul className="list-disc pl-5 text-xs text-gray-600 space-y-1">
                  <li>Используйте свою реальную фотографию для узнаваемости</li>
                  <li>Убедитесь, что ваше лицо хорошо видно и занимает центральную часть изображения</li>
                  <li>Избегайте размытых или низкокачественных изображений</li>
                  <li>Не используйте оскорбительные или неприемлемые изображения</li>
                </ul>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AvatarSettingsPage; 