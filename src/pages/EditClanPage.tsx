import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft, Upload, X, Plus, Tag, Trash2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface ClanFormData {
  name: string;
  description: string;
  type: 'open' | 'closed';
  tags: string[];
}

const EditClanPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { authState } = useAuth();
  const navigate = useNavigate();
  
  // Состояния формы
  const [formData, setFormData] = useState<ClanFormData>({
    name: '',
    description: '',
    type: 'open',
    tags: []
  });
  const [tagInput, setTagInput] = useState<string>('');
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [originalLogo, setOriginalLogo] = useState<string | null>(null);
  const [removeLogo, setRemoveLogo] = useState<boolean>(false);
  
  // Состояния ошибок и загрузки
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [generalError, setGeneralError] = useState<string | null>(null);
  
  // Загрузка данных клана
  useEffect(() => {
    if (!id) return;
    
    const fetchClan = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/clans/${id}`);
        const data = await response.json();
        
        if (data.success) {
          const clan = data.data;
          setFormData({
            name: clan.name,
            description: clan.description,
            type: clan.type,
            tags: clan.tags
          });
          
          if (clan.logo) {
            setOriginalLogo(clan.logo);
            setLogoPreview(clan.logo);
          }
        } else {
          setGeneralError('Не удалось загрузить данные клана');
        }
      } catch (error) {
        console.error('Ошибка при загрузке клана:', error);
        setGeneralError('Произошла ошибка при загрузке данных клана');
      } finally {
        setLoading(false);
      }
    };
    
    fetchClan();
  }, [id]);
  
  // Проверка прав доступа
  useEffect(() => {
    const checkPermission = async () => {
      if (!authState.isAuthenticated || !id) return;
      
      try {
        const response = await fetch(`/api/clans/${id}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        
        const data = await response.json();
        if (data.success) {
          const isLeader = data.data.leader._id === authState.user?.id;
          const isAdmin = authState.user?.role === 'admin';
          
          if (!isLeader && !isAdmin) {
            navigate(`/clans/${id}`);
          }
        }
      } catch (error) {
        console.error('Ошибка при проверке прав доступа:', error);
      }
    };
    
    checkPermission();
  }, [id, authState, navigate]);
  
  // Обработчики изменения формы
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };
  
  // Обработчик изменения типа клана
  const handleTypeChange = (type: 'open' | 'closed') => {
    setFormData(prev => ({ ...prev, type }));
  };
  
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
      setRemoveLogo(false);
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
    setRemoveLogo(true);
  };
  
  // Обработчик добавления тега
  const handleAddTag = () => {
    const trimmedTag = tagInput.trim();
    if (trimmedTag && !formData.tags.includes(trimmedTag) && formData.tags.length < 10) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, trimmedTag]
      }));
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
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };
  
  // Валидация формы
  const validateForm = (): boolean => {
    const formErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      formErrors.name = 'Название клана обязательно';
    } else if (formData.name.length > 100) {
      formErrors.name = 'Название клана не должно превышать 100 символов';
    }
    
    if (!formData.description.trim()) {
      formErrors.description = 'Описание клана обязательно';
    } else if (formData.description.length > 1000) {
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
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('type', formData.type);
      formDataToSend.append('tags', formData.tags.join(','));
      formDataToSend.append('removeLogo', String(removeLogo));
      
      if (logoFile) {
        formDataToSend.append('logo', logoFile);
      }
      
      const response = await fetch(`/api/clans/${id}`, {
        method: 'PUT',
        body: formDataToSend,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      const data = await response.json();
      
      if (data.success) {
        navigate(`/clans/${id}`);
      } else {
        setGeneralError(data.message || 'Не удалось обновить клан');
      }
    } catch (error) {
      console.error('Ошибка при обновлении клана:', error);
      setGeneralError('Произошла ошибка при обновлении клана. Пожалуйста, попробуйте позже.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Предложенные теги для выбора
  const suggestedTags = [
    'Походы', 'Спорт', 'Образование', 'Искусство', 'Музыка', 'Технологии', 
    'Экология', 'Бизнес', 'Творчество', 'Развитие', 'Волонтерство'
  ].filter(tag => !formData.tags.includes(tag));
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        to={`/clans/${id}`}
        className="inline-flex items-center text-indigo-600 hover:text-indigo-800 mb-8"
      >
        <ChevronLeft className="h-5 w-5 mr-1" />
        Вернуться к профилю клана
      </Link>
      
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow rounded-lg">
          <div className="p-6 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-900">Редактирование клана</h1>
            <p className="text-gray-600 mt-1">
              Обновите информацию о вашем клане
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
                name="name"
                value={formData.name}
                onChange={handleInputChange}
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
                name="description"
                value={formData.description}
                onChange={handleInputChange}
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
                Осталось {1000 - formData.description.length} символов
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
                    name="type"
                    value="open"
                    checked={formData.type === 'open'}
                    onChange={() => handleTypeChange('open')}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                  />
                  <span className="ml-2 text-gray-700">Открытый (любой может вступить)</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="type"
                    value="closed"
                    checked={formData.type === 'closed'}
                    onChange={() => handleTypeChange('closed')}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                  />
                  <span className="ml-2 text-gray-700">Закрытый (по приглашению или заявке)</span>
                </label>
              </div>
            </div>
            
            {/* Теги */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Теги ({formData.tags.length}/10)
              </label>
              <div className="flex flex-wrap gap-2 mb-2">
                {formData.tags.map((tag) => (
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
                  disabled={formData.tags.length >= 10}
                />
                <button
                  type="button"
                  onClick={handleAddTag}
                  disabled={!tagInput.trim() || formData.tags.length >= 10}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-r-md hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  <Plus className="h-5 w-5" />
                </button>
              </div>
              
              {formData.tags.length < 10 && (
                <div className="mt-2">
                  <p className="text-sm text-gray-500 mb-1">Предложенные теги:</p>
                  <div className="flex flex-wrap gap-2">
                    {suggestedTags.slice(0, 6).map((tag) => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => {
                          if (formData.tags.length < 10) {
                            setFormData(prev => ({
                              ...prev,
                              tags: [...prev.tags, tag]
                            }));
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
            
            {/* Опасные действия */}
            <div className="pt-4 border-t border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Опасная зона</h3>
              <p className="text-sm text-gray-600 mb-4">
                Действия в этой зоне могут иметь серьезные последствия
              </p>
              
              <Link
                to={`/clans/${id}`}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-red-600 hover:bg-red-700"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Удалить клан
              </Link>
            </div>
            
            {/* Кнопки действий */}
            <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
              <Link
                to={`/clans/${id}`}
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
                {isSubmitting ? 'Сохранение...' : 'Сохранить изменения'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditClanPage; 