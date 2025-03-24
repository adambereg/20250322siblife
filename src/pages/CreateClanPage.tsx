import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, Upload, X, Plus, Tag } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import api from '../api/client';

const CreateClanPage: React.FC = () => {
  const { authState } = useAuth();
  const navigate = useNavigate();
  
  // Состояния формы
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [type, setType] = useState<'open' | 'closed'>('open');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState<string>('');
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  
  // Состояния ошибок и загрузки
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [generalError, setGeneralError] = useState<string | null>(null);
  
  // Проверка авторизации
  if (!authState.isAuthenticated || (authState.user?.role !== 'pro' && authState.user?.role !== 'admin')) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Доступ запрещен</h1>
          <p className="text-gray-600 mb-4">Только PRO-участники могут создавать кланы.</p>
          <Link to="/clans" className="text-indigo-600 hover:text-indigo-800">
            Вернуться к списку кланов
          </Link>
        </div>
      </div>
    );
  }
  
  // Обработчик изменения изображения
  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({
          ...prev,
          logo: 'Размер файла не должен превышать 5 МБ'
        }));
        return;
      }
      
      if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
        setErrors(prev => ({
          ...prev,
          logo: 'Допустимы только изображения в формате JPEG, PNG или WebP'
        }));
        return;
      }
      
      const reader = new FileReader();
      reader.onload = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setLogoFile(file);
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.logo;
        return newErrors;
      });
    }
  };
  
  // Обработчик удаления изображения
  const handleLogoRemove = () => {
    setLogoFile(null);
    setLogoPreview(null);
  };
  
  // Обработчик добавления тега
  const handleAddTag = () => {
    const trimmedTag = tagInput.trim();
    if (trimmedTag && !tags.includes(trimmedTag) && tags.length < 10) {
      setTags([...tags, trimmedTag]);
      setTagInput('');
    }
  };
  
  // Обработчик нажатия клавиши Enter в поле ввода тега
  const handleTagInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };
  
  // Обработчик удаления тега
  const handleTagRemove = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };
  
  // Валидация формы
  const validateForm = (): boolean => {
    const formErrors: Record<string, string> = {};
    
    if (!name.trim()) {
      formErrors.name = 'Название клана обязательно';
    } else if (name.length > 100) {
      formErrors.name = 'Название клана не должно превышать 100 символов';
    }
    
    if (!description.trim()) {
      formErrors.description = 'Описание клана обязательно';
    } else if (description.length > 1000) {
      formErrors.description = 'Описание клана не должно превышать 1000 символов';
    }
    
    setErrors(formErrors);
    
    return Object.keys(formErrors).length === 0;
  };
  
  // Обработчик отправки формы
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setGeneralError(null);
    
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('type', type);
      formData.append('tags', tags.join(','));
      
      if (logoFile) {
        formData.append('logo', logoFile);
      }
      
      const response = await fetch('/api/clans', {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      const data = await response.json();
      
      if (data.success) {
        // Перенаправляем на страницу созданного клана
        navigate(`/clans/${data.data._id}`);
      } else {
        setGeneralError(data.message || 'Не удалось создать клан');
      }
    } catch (error) {
      console.error('Ошибка при создании клана:', error);
      setGeneralError('Произошла ошибка при создании клана. Пожалуйста, попробуйте позже.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Предложенные теги для выбора
  const suggestedTags = [
    'Походы', 'Спорт', 'Образование', 'Искусство', 'Музыка', 'Технологии', 
    'Экология', 'Бизнес', 'Творчество', 'Развитие', 'Волонтерство'
  ].filter(tag => !tags.includes(tag));
  
  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        to="/clans"
        className="inline-flex items-center text-indigo-600 hover:text-indigo-800 mb-8"
      >
        <ChevronLeft className="h-5 w-5 mr-1" />
        Вернуться к списку кланов
      </Link>
      
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow rounded-lg">
          <div className="p-6 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-900">Создание нового клана</h1>
            <p className="text-gray-600 mt-1">
              Создайте сообщество для объединения единомышленников
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {generalError && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4">
                <div className="flex">
                  <div className="ml-3">
                    <p className="text-sm text-red-700">{generalError}</p>
                  </div>
                </div>
              </div>
            )}
            
            {/* Логотип клана */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Логотип клана
              </label>
              <div className="flex items-center">
                {logoPreview ? (
                  <div className="relative w-32 h-32 rounded-lg overflow-hidden">
                    <img
                      src={logoPreview}
                      alt="Предпросмотр логотипа"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={handleLogoRemove}
                      className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md"
                    >
                      <X className="h-4 w-4 text-gray-600" />
                    </button>
                  </div>
                ) : (
                  <div className="w-32 h-32 border-2 border-dashed border-gray-300 flex flex-col items-center justify-center rounded-lg">
                    <Upload className="h-8 w-8 text-gray-400" />
                    <span className="text-sm text-gray-500 mt-1">Загрузить логотип</span>
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      onChange={handleLogoChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                  </div>
                )}
                <div className="ml-4">
                  <p className="text-sm text-gray-500">
                    Загрузите логотип клана в формате JPEG, PNG или WebP.
                    <br />
                    Рекомендуемый размер - 400x400 пикселей.
                    <br />
                    Максимальный размер файла - 5 МБ.
                  </p>
                </div>
              </div>
              {errors.logo && (
                <p className="mt-1 text-sm text-red-600">{errors.logo}</p>
              )}
            </div>
            
            {/* Название клана */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Название клана*
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Введите название клана"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
              )}
            </div>
            
            {/* Описание клана */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Описание клана*
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  errors.description ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Опишите цель и основные направления деятельности клана"
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-600">{errors.description}</p>
              )}
              <p className="mt-1 text-sm text-gray-500">
                Осталось {1000 - description.length} символов
              </p>
            </div>
            
            {/* Тип клана */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Тип клана
              </label>
              <div className="flex space-x-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    value="open"
                    checked={type === 'open'}
                    onChange={() => setType('open')}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                  />
                  <span className="ml-2 text-gray-700">Открытый (любой может вступить)</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    value="closed"
                    checked={type === 'closed'}
                    onChange={() => setType('closed')}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                  />
                  <span className="ml-2 text-gray-700">Закрытый (по приглашению или заявке)</span>
                </label>
              </div>
            </div>
            
            {/* Теги */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Теги ({tags.length}/10)
              </label>
              <div className="flex flex-wrap gap-2 mb-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800"
                  >
                    <Tag className="h-3 w-3 mr-1" />
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleTagRemove(tag)}
                      className="ml-1 text-indigo-600 hover:text-indigo-800 focus:outline-none"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
              
              <div className="flex">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleTagInputKeyDown}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Добавить тег"
                  disabled={tags.length >= 10}
                />
                <button
                  type="button"
                  onClick={handleAddTag}
                  disabled={!tagInput.trim() || tags.length >= 10}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-r-md hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  <Plus className="h-5 w-5" />
                </button>
              </div>
              
              {tags.length < 10 && (
                <div className="mt-2">
                  <p className="text-sm text-gray-500 mb-1">Предложенные теги:</p>
                  <div className="flex flex-wrap gap-2">
                    {suggestedTags.slice(0, 6).map((tag) => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => {
                          if (tags.length < 10) {
                            setTags([...tags, tag]);
                          }
                        }}
                        className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 hover:bg-gray-200"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {/* Кнопки действий */}
            <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
              <Link
                to="/clans"
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Отмена
              </Link>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                  isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? 'Создание...' : 'Создать клан'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateClanPage; 