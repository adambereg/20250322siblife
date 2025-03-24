import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, 
  Tag, 
  Users, 
  Calendar, 
  Shield, 
  Clock, 
  Award, 
  MessageCircle, 
  Share2, 
  MoreHorizontal,
  PenSquare,
  UserPlus,
  Trash2,
  LogOut
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface ClanMember {
  _id: string;
  name: string;
  avatar?: string;
  role: 'leader' | 'moderator' | 'member';
  joinDate: string;
}

interface ClanActivity {
  _id: string;
  type: 'post' | 'event' | 'member_joined' | 'change';
  title?: string;
  content?: string;
  author?: {
    _id: string;
    name: string;
    avatar?: string;
  };
  date: string;
  comments?: Array<{
    _id: string;
    content: string;
    author: {
      _id: string;
      name: string;
      avatar?: string;
    };
    date: string;
  }>;
  likes?: number;
}

interface Clan {
  _id: string;
  name: string;
  description: string;
  logo?: string;
  type: 'open' | 'closed';
  leader: {
    _id: string;
    name: string;
    avatar?: string;
  };
  members: ClanMember[];
  rating: number;
  tags: string[];
  createdAt: string;
  activity: ClanActivity[];
  membershipRequests?: Array<{
    _id: string;
    user: {
      _id: string;
      name: string;
      avatar?: string;
    };
    date: string;
    status: 'pending' | 'approved' | 'rejected';
  }>;
}

const ClanPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { authState } = useAuth();
  const navigate = useNavigate();
  
  const [clan, setClan] = useState<Clan | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'info' | 'activity' | 'members'>('info');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [actionType, setActionType] = useState<'leave' | 'delete' | null>(null);
  
  const fetchClan = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/clans/${id}`);
      const data = await response.json();
      
      if (data.success) {
        setClan(data.data);
      } else {
        setError(data.message || 'Не удалось загрузить информацию о клане');
      }
    } catch (error) {
      console.error('Ошибка при загрузке клана:', error);
      setError('Произошла ошибка при загрузке данных клана');
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    if (id) {
      fetchClan();
    }
  }, [id]);
  
  const isLeader = authState.user && clan?.leader._id === authState.user.id;
  const isMember = authState.user && clan?.members.some(member => member._id === authState.user?.id);
  
  // Обработчик кнопки присоединения к клану
  const handleJoinClan = async () => {
    if (!authState.isAuthenticated) {
      navigate('/login', { state: { from: `/clans/${id}` } });
      return;
    }
    
    try {
      const response = await fetch(`/api/clans/${id}/join`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      const data = await response.json();
      
      if (data.success) {
        fetchClan(); // Перезагружаем данные клана
      } else {
        setError(data.message || 'Не удалось присоединиться к клану');
      }
    } catch (error) {
      console.error('Ошибка при присоединении к клану:', error);
      setError('Произошла ошибка при присоединении к клану');
    }
  };
  
  // Обработчик выхода из клана или удаления клана
  const handleConfirmAction = async () => {
    try {
      if (actionType === 'leave') {
        const response = await fetch(`/api/clans/${id}/leave`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        
        const data = await response.json();
        
        if (data.success) {
          navigate('/clans');
        } else {
          setError(data.message || 'Не удалось выйти из клана');
        }
      } else if (actionType === 'delete') {
        const response = await fetch(`/api/clans/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        
        const data = await response.json();
        
        if (data.success) {
          navigate('/clans');
        } else {
          setError(data.message || 'Не удалось удалить клан');
        }
      }
    } catch (error) {
      console.error('Ошибка:', error);
      setError('Произошла ошибка при выполнении действия');
    } finally {
      setShowConfirmModal(false);
      setActionType(null);
    }
  };
  
  // Компонент подтверждения действия
  const ConfirmActionModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-sm mx-auto">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          {actionType === 'leave' ? 'Подтвердите выход из клана' : 'Подтвердите удаление клана'}
        </h3>
        <p className="text-gray-600 mb-6">
          {actionType === 'leave' 
            ? 'Вы уверены, что хотите выйти из клана? Вы можете присоединиться снова позже.' 
            : 'Вы уверены, что хотите удалить клан? Это действие нельзя отменить.'}
        </p>
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => setShowConfirmModal(false)}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
          >
            Отмена
          </button>
          <button
            type="button"
            onClick={handleConfirmAction}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            {actionType === 'leave' ? 'Выйти из клана' : 'Удалить клан'}
          </button>
        </div>
      </div>
    </div>
  );
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      </div>
    );
  }
  
  if (error || !clan) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Link
          to="/clans"
          className="inline-flex items-center text-indigo-600 hover:text-indigo-800 mb-8"
        >
          <ChevronLeft className="h-5 w-5 mr-1" />
          Вернуться к списку кланов
        </Link>
        
        <div className="bg-red-50 border-l-4 border-red-500 p-4">
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm text-red-700">
                {error || 'Клан не найден'}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      {showConfirmModal && <ConfirmActionModal />}
      
      <Link
        to="/clans"
        className="inline-flex items-center text-indigo-600 hover:text-indigo-800 mb-8"
      >
        <ChevronLeft className="h-5 w-5 mr-1" />
        Вернуться к списку кланов
      </Link>
      
      <div className="bg-white shadow rounded-lg overflow-hidden">
        {/* Шапка клана */}
        <div className="relative bg-gradient-to-r from-indigo-800 to-violet-600 h-48">
          <div className="absolute bottom-0 left-0 p-6 flex items-end">
            <div className="relative">
              <div className="h-24 w-24 rounded-lg bg-white shadow-lg overflow-hidden">
                {clan.logo ? (
                  <img 
                    src={clan.logo} 
                    alt={clan.name} 
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center bg-gray-200 text-gray-600">
                    <Shield className="h-12 w-12" />
                  </div>
                )}
              </div>
            </div>
            <div className="ml-6 pb-2">
              <h1 className="text-3xl font-bold text-white">{clan.name}</h1>
              <div className="flex items-center mt-1">
                <Clock className="h-4 w-4 text-indigo-200 mr-1" />
                <span className="text-sm text-indigo-100">
                  Создан {new Date(clan.createdAt).toLocaleDateString('ru-RU')}
                </span>
              </div>
            </div>
          </div>
          
          <div className="absolute top-4 right-4">
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-full bg-white bg-opacity-20 text-white hover:bg-opacity-30 focus:outline-none"
              >
                <MoreHorizontal className="h-5 w-5" />
              </button>
              
              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                  <div className="py-1">
                    {isLeader && (
                      <>
                        <Link
                          to={`/clans/${id}/edit`}
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <PenSquare className="h-4 w-4 mr-2" />
                          Редактировать клан
                        </Link>
                        <button
                          type="button"
                          onClick={() => {
                            setActionType('delete');
                            setShowConfirmModal(true);
                            setIsMenuOpen(false);
                          }}
                          className="flex items-center w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Удалить клан
                        </button>
                      </>
                    )}
                    
                    {isMember && !isLeader && (
                      <button
                        type="button"
                        onClick={() => {
                          setActionType('leave');
                          setShowConfirmModal(true);
                          setIsMenuOpen(false);
                        }}
                        className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Выйти из клана
                      </button>
                    )}
                    
                    <button
                      type="button"
                      className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <Share2 className="h-4 w-4 mr-2" />
                      Поделиться
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Табы */}
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              type="button"
              onClick={() => setActiveTab('info')}
              className={`py-4 px-6 ${
                activeTab === 'info'
                  ? 'border-b-2 border-indigo-500 text-indigo-600'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Информация
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('activity')}
              className={`py-4 px-6 ${
                activeTab === 'activity'
                  ? 'border-b-2 border-indigo-500 text-indigo-600'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Активность
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('members')}
              className={`py-4 px-6 ${
                activeTab === 'members'
                  ? 'border-b-2 border-indigo-500 text-indigo-600'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Участники ({clan.members.length})
            </button>
          </nav>
        </div>
        
        {/* Контент */}
        <div className="p-6">
          {activeTab === 'info' && (
            <div>
              <div className="mb-6">
                <h2 className="text-lg font-medium text-gray-900 mb-2">О клане</h2>
                <p className="text-gray-600">{clan.description}</p>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Детали</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center">
                      <Users className="h-5 w-5 text-gray-500 mr-3" />
                      <div>
                        <span className="text-sm text-gray-500">Тип клана</span>
                        <p className="text-gray-900">
                          {clan.type === 'open' ? 'Открытый' : 'Закрытый'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-5 w-5 text-gray-500 mr-3" />
                      <div>
                        <span className="text-sm text-gray-500">Дата создания</span>
                        <p className="text-gray-900">
                          {new Date(clan.createdAt).toLocaleDateString('ru-RU')}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Shield className="h-5 w-5 text-gray-500 mr-3" />
                      <div>
                        <span className="text-sm text-gray-500">Лидер</span>
                        <p className="text-gray-900">{clan.leader.name}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Award className="h-5 w-5 text-gray-500 mr-3" />
                      <div>
                        <span className="text-sm text-gray-500">Рейтинг</span>
                        <p className="text-gray-900">{clan.rating}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {clan.tags.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Теги</h3>
                  <div className="flex flex-wrap gap-2">
                    {clan.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800"
                      >
                        <Tag className="h-3 w-3 mr-1" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {!isMember && authState.isAuthenticated && (
                <div className="mt-8">
                  <button
                    type="button"
                    onClick={handleJoinClan}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
                  >
                    <UserPlus className="h-4 w-4 mr-2" />
                    {clan.type === 'open' ? 'Вступить в клан' : 'Подать заявку на вступление'}
                  </button>
                </div>
              )}
              
              {!authState.isAuthenticated && (
                <div className="mt-8 bg-indigo-50 p-4 rounded-md">
                  <p className="text-indigo-700">
                    Войдите в систему, чтобы вступить в клан
                  </p>
                  <Link
                    to="/login"
                    className="mt-2 inline-block text-indigo-600 hover:text-indigo-800"
                  >
                    Войти
                  </Link>
                </div>
              )}
            </div>
          )}
          
          {activeTab === 'activity' && (
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">Активность клана</h2>
              
              {clan.activity.length > 0 ? (
                <div className="space-y-6">
                  {clan.activity.map((item) => (
                    <div key={item._id} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex">
                        {item.author?.avatar ? (
                          <img
                            src={item.author.avatar}
                            alt={item.author.name}
                            className="h-10 w-10 rounded-full"
                          />
                        ) : (
                          <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                            <span className="text-indigo-800 font-medium">
                              {item.author?.name.charAt(0).toUpperCase()}
                            </span>
                          </div>
                        )}
                        <div className="ml-3">
                          <div className="text-sm text-gray-500">
                            {item.author?.name} • {new Date(item.date).toLocaleDateString('ru-RU')}
                          </div>
                          {item.title && <h3 className="font-medium text-gray-900">{item.title}</h3>}
                          {item.content && <p className="mt-1 text-gray-600">{item.content}</p>}
                          
                          {/* Комментарии к активности */}
                          {item.comments && item.comments.length > 0 && (
                            <div className="mt-3 pl-3 border-l-2 border-gray-200">
                              {item.comments.map((comment) => (
                                <div key={comment._id} className="mt-2">
                                  <div className="flex items-start">
                                    <div className="mr-2">
                                      {comment.author.avatar ? (
                                        <img
                                          src={comment.author.avatar}
                                          alt={comment.author.name}
                                          className="h-6 w-6 rounded-full"
                                        />
                                      ) : (
                                        <div className="h-6 w-6 rounded-full bg-gray-200 flex items-center justify-center">
                                          <span className="text-gray-600 text-xs font-medium">
                                            {comment.author.name.charAt(0).toUpperCase()}
                                          </span>
                                        </div>
                                      )}
                                    </div>
                                    <div>
                                      <div className="text-xs text-gray-500">
                                        {comment.author.name} • {new Date(comment.date).toLocaleDateString('ru-RU')}
                                      </div>
                                      <p className="text-sm text-gray-700">{comment.content}</p>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                          
                          {/* Кнопки действий */}
                          <div className="mt-3 flex items-center space-x-4">
                            <button
                              type="button"
                              className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700"
                            >
                              <MessageCircle className="h-4 w-4 mr-1" />
                              Комментировать
                            </button>
                            {item.likes !== undefined && (
                              <button
                                type="button"
                                className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700"
                              >
                                <span>👍</span>
                                <span className="ml-1">{item.likes}</span>
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">Пока нет активности в клане</p>
                </div>
              )}
            </div>
          )}
          
          {activeTab === 'members' && (
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">Участники клана</h2>
              
              <div className="space-y-4">
                {clan.members.map((member) => (
                  <div key={member._id} className="flex items-center p-3 hover:bg-gray-50 rounded-lg">
                    {member.avatar ? (
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="h-10 w-10 rounded-full"
                      />
                    ) : (
                      <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-600 font-medium">
                          {member.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}
                    <div className="ml-3">
                      <div className="text-sm font-medium text-gray-900">{member.name}</div>
                      <div className="text-xs text-gray-500">
                        {member.role === 'leader' && 'Лидер'}
                        {member.role === 'moderator' && 'Модератор'}
                        {member.role === 'member' && 'Участник'}
                        {' • '}
                        С {new Date(member.joinDate).toLocaleDateString('ru-RU')}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClanPage; 