import React, { useState } from 'react';
import { Send, Image, Paperclip, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface ClanActivityFormProps {
  clanId: string;
  onActivityAdded: () => void;
}

const ClanActivityForm: React.FC<ClanActivityFormProps> = ({ clanId, onActivityAdded }) => {
  const { authState } = useAuth();
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Обработчик изменения содержимого
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    if (error) setError(null);
  };
  
  // Обработчик изменения заголовка
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  
  // Обработчик добавления изображений
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(e.target.files || []);
    
    // Проверка на количество файлов
    if (images.length + newFiles.length > 4) {
      setError('Можно загрузить максимум 4 изображения');
      return;
    }
    
    // Проверка на размер и формат файлов
    for (const file of newFiles) {
      if (file.size > 5 * 1024 * 1024) {
        setError('Размер файла не должен превышать 5 МБ');
        return;
      }
      
      if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
        setError('Допустимы только изображения в формате JPEG, PNG или WebP');
        return;
      }
    }
    
    // Создаем URL для предпросмотра изображений
    const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
    
    setImages([...images, ...newFiles]);
    setImagePreviews([...imagePreviews, ...newPreviews]);
    setError(null);
    
    // Сбрасываем значение input, чтобы можно было выбрать тот же файл снова
    e.target.value = '';
  };
  
  // Обработчик удаления изображения
  const handleRemoveImage = (index: number) => {
    const newImages = [...images];
    const newPreviews = [...imagePreviews];
    
    // Удаляем URL предпросмотра из памяти
    URL.revokeObjectURL(newPreviews[index]);
    
    newImages.splice(index, 1);
    newPreviews.splice(index, 1);
    
    setImages(newImages);
    setImagePreviews(newPreviews);
  };
  
  // Отправка формы
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!content.trim()) {
      setError('Пожалуйста, введите текст публикации');
      return;
    }
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      const formData = new FormData();
      
      if (title.trim()) {
        formData.append('title', title);
      }
      
      formData.append('content', content);
      
      images.forEach((image) => {
        formData.append('images', image);
      });
      
      const response = await fetch(`/api/clans/${clanId}/posts`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: formData,
      });
      
      const data = await response.json();
      
      if (data.success) {
        // Сбрасываем форму
        setContent('');
        setTitle('');
        setImages([]);
        setImagePreviews([]);
        onActivityAdded();
      } else {
        setError(data.message || 'Не удалось опубликовать активность');
      }
    } catch (error) {
      console.error('Ошибка при публикации активности:', error);
      setError('Произошла ошибка при публикации активности');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (!authState.isAuthenticated) {
    return null;
  }
  
  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-4 mb-6">
      <div className="mb-3">
        <input
          type="text"
          placeholder="Заголовок (необязательно)"
          value={title}
          onChange={handleTitleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      
      <div className="mb-3">
        <textarea
          placeholder="Поделитесь новостями с участниками клана..."
          value={content}
          onChange={handleContentChange}
          rows={3}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
            error && !content.trim() ? 'border-red-500' : 'border-gray-300'
          }`}
        />
      </div>
      
      {/* Предпросмотр изображений */}
      {imagePreviews.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {imagePreviews.map((preview, index) => (
            <div key={index} className="relative">
              <img
                src={preview}
                alt={`Предпросмотр ${index + 1}`}
                className="h-20 w-20 object-cover rounded-md"
              />
              <button
                type="button"
                onClick={() => handleRemoveImage(index)}
                className="absolute top-1 right-1 bg-white p-1 rounded-full shadow-sm"
              >
                <X className="h-3 w-3 text-gray-600" />
              </button>
            </div>
          ))}
        </div>
      )}
      
      {error && (
        <div className="mb-3 text-sm text-red-600">
          {error}
        </div>
      )}
      
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <label className="cursor-pointer p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100">
            <Image className="h-5 w-5" />
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              multiple
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
        </div>
        
        <button
          type="submit"
          disabled={isSubmitting || !content.trim()}
          className={`inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
            (isSubmitting || !content.trim()) && 'opacity-50 cursor-not-allowed'
          }`}
        >
          {isSubmitting ? (
            'Публикация...'
          ) : (
            <>
              <Send className="h-4 w-4 mr-2" />
              Опубликовать
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default ClanActivityForm; 