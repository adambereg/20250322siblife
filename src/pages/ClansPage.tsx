import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Users, Search, Filter, Star, MapPin, Calendar, Crown,
  ChevronRight, Shield, Target, Trophy, UserPlus, Settings,
  MessageCircle, Heart, Share2, Activity, Plus, ArrowLeft, ArrowRight, Tag, X
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import api from '../api/client';
import ClanCard from '../components/ClanCard';

interface Clan {
  _id: string;
  name: string;
  description: string;
  logo: string | null;
  type: 'open' | 'closed';
  leader: {
    _id: string;
    name: string;
    avatar: string;
    role: string;
  };
  members: {
    user: {
      _id: string;
      name: string;
      avatar: string;
      role: string;
    };
    role: string;
    joinedAt: string;
  }[];
  rating: number;
  tags: string[];
  createdAt: string;
}

const ClansPage: React.FC = () => {
  const { authState } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);
  const [clans, setClans] = useState<Clan[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [error, setError] = useState<string | null>(null);

  // Загрузка списка кланов
  useEffect(() => {
    const fetchClans = async () => {
      try {
        setLoading(true);
        
        // Формируем URL с параметрами фильтрации и пагинации
        let url = `/api/clans?page=${page}&limit=6`;
        
        if (searchQuery) {
          url += `&search=${encodeURIComponent(searchQuery)}`;
        }
        
        if (selectedTypes.length > 0) {
          url += `&types=${selectedTypes.join(',')}`;
        }
        
        if (selectedTags.length > 0) {
          url += `&tags=${selectedTags.join(',')}`;
        }
        
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error('Не удалось загрузить кланы');
        }
        
        const data = await response.json();
        
        if (data.success) {
          setClans(data.data.clans);
          setTotalPages(data.data.pagination.pages);
        } else {
          setError(data.message || 'Произошла ошибка при загрузке кланов');
        }
      } catch (error) {
        console.error('Ошибка при загрузке кланов:', error);
        setError('Не удалось загрузить кланы. Пожалуйста, попробуйте позже.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchClans();
  }, [page, searchQuery, selectedTypes, selectedTags]);

  // Обработчик поиска
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1); // Сбрасываем страницу на первую при поиске
  };

  // Обработчик выбора типа клана
  const handleTypeChange = (type: string) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter(t => t !== type));
    } else {
      setSelectedTypes([...selectedTypes, type]);
    }
    setPage(1);
  };

  // Обработчик выбора тегов
  const handleTagChange = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
    setPage(1);
  };

  // Популярные теги для фильтрации
  const popularTags = ['Походы', 'Спорт', 'Отдых', 'Творчество', 'Образование', 'Бизнес'];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Кланы Сибири</h1>
        
        {authState.isAuthenticated && (authState.user?.role === 'pro' || authState.user?.role === 'admin') && (
          <Link 
            to="/clans/create" 
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Создать клан
          </Link>
        )}
      </div>
      
      <div className="bg-white shadow rounded-lg p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Поиск */}
          <div className="md:col-span-6">
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
              Поиск клана
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                placeholder="Название, описание или теги"
              />
            </div>
          </div>
          
          {/* Тип клана */}
          <div className="md:col-span-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Тип клана
            </label>
            <div className="flex space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  value="open"
                  checked={selectedTypes.includes('open')}
                  onChange={() => handleTypeChange('open')}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">Открытый</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  value="closed"
                  checked={selectedTypes.includes('closed')}
                  onChange={() => handleTypeChange('closed')}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">Закрытый</span>
              </label>
            </div>
          </div>
          
          {/* Теги */}
          <div className="md:col-span-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Популярные теги
            </label>
            <div className="flex flex-wrap gap-2">
              {popularTags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => handleTagChange(tag)}
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                    selectedTags.includes(tag)
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  {tag}
                  {selectedTags.includes(tag) && <X className="h-3 w-3 ml-1" />}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8">
          <div className="flex">
            <div className="ml-3">
              <p className="text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      ) : (
        <>
          {clans.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Кланы не найдены</h3>
              <p className="text-gray-500 mb-6">Попробуйте изменить критерии поиска или создайте свой собственный клан</p>
              {authState.isAuthenticated && (authState.user?.role === 'pro' || authState.user?.role === 'admin') && (
                <Link 
                  to="/clans/create" 
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Создать клан
                </Link>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {clans.map((clan) => (
                <ClanCard 
                  key={clan._id} 
                  clan={{
                    _id: clan._id,
                    name: clan.name,
                    description: clan.description,
                    logo: clan.logo || undefined,
                    type: clan.type,
                    leader: { name: clan.leader.name },
                    members: clan.members.length,
                    rating: clan.rating,
                    tags: clan.tags,
                    createdAt: clan.createdAt
                  }} 
                />
              ))}
            </div>
          )}
          
          {/* Пагинация */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-8">
              <nav className="inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button
                  type="button"
                  disabled={page === 1}
                  onClick={() => setPage(Math.max(1, page - 1))}
                  className={`relative inline-flex items-center px-2 py-2 rounded-l-md border text-sm font-medium ${
                    page === 1
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-white text-gray-500 hover:bg-gray-50'
                  }`}
                >
                  <span className="sr-only">Предыдущая</span>
                  &laquo;
                </button>
                
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i + 1}
                    type="button"
                    onClick={() => setPage(i + 1)}
                    className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                      page === i + 1
                        ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                        : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                
                <button
                  type="button"
                  disabled={page === totalPages}
                  onClick={() => setPage(Math.min(totalPages, page + 1))}
                  className={`relative inline-flex items-center px-2 py-2 rounded-r-md border text-sm font-medium ${
                    page === totalPages
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-white text-gray-500 hover:bg-gray-50'
                  }`}
                >
                  <span className="sr-only">Следующая</span>
                  &raquo;
                </button>
              </nav>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ClansPage;