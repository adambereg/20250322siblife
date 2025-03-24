import React, { useState } from 'react';
import { UserCheck, UserMinus, UserPlus, Shield, ChevronDown, ChevronUp, MoreHorizontal, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface ClanMember {
  _id: string;
  name: string;
  avatar?: string;
  role: 'leader' | 'moderator' | 'member';
  joinDate: string;
}

interface MembershipRequest {
  _id: string;
  user: {
    _id: string;
    name: string;
    avatar?: string;
  };
  date: string;
  status: 'pending' | 'approved' | 'rejected';
}

interface ClanMemberListProps {
  clanId: string;
  members: ClanMember[];
  requests?: MembershipRequest[];
  onMemberUpdate: () => void;
  isLeader: boolean;
}

const ClanMemberList: React.FC<ClanMemberListProps> = ({ 
  clanId, 
  members, 
  requests = [], 
  onMemberUpdate,
  isLeader
}) => {
  const { authState } = useAuth();
  const [showRequests, setShowRequests] = useState(false);
  const [actionMember, setActionMember] = useState<string | null>(null);
  
  const pendingRequests = requests.filter(req => req.status === 'pending');
  
  const handleRequestAction = async (requestId: string, approve: boolean) => {
    try {
      const response = await fetch(`/api/clans/${clanId}/requests/${requestId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ approved: approve })
      });
      
      const data = await response.json();
      
      if (data.success) {
        onMemberUpdate();
      } else {
        console.error('Ошибка при обработке заявки:', data.message);
      }
    } catch (error) {
      console.error('Ошибка при обработке заявки:', error);
    }
  };
  
  const handleMemberAction = async (memberId: string, action: 'promote' | 'demote' | 'kick' | 'transfer') => {
    try {
      let endpoint = '';
      let method = 'PUT';
      
      switch (action) {
        case 'promote':
          endpoint = `/api/clans/${clanId}/members/${memberId}/promote`;
          break;
        case 'demote':
          endpoint = `/api/clans/${clanId}/members/${memberId}/demote`;
          break;
        case 'kick':
          endpoint = `/api/clans/${clanId}/members/${memberId}`;
          method = 'DELETE';
          break;
        case 'transfer':
          endpoint = `/api/clans/${clanId}/transfer-leadership`;
          break;
      }
      
      const response = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: action === 'transfer' ? JSON.stringify({ newLeaderId: memberId }) : undefined
      });
      
      const data = await response.json();
      
      if (data.success) {
        setActionMember(null);
        onMemberUpdate();
      } else {
        console.error('Ошибка при управлении участником:', data.message);
      }
    } catch (error) {
      console.error('Ошибка при управлении участником:', error);
    }
  };
  
  const sortedMembers = [...members].sort((a, b) => {
    // Сортируем по роли: сначала лидер, потом модераторы, потом обычные участники
    const roleOrder = { leader: 0, moderator: 1, member: 2 };
    return roleOrder[a.role] - roleOrder[b.role];
  });
  
  return (
    <div className="space-y-4">
      {/* Заявки на вступление */}
      {isLeader && pendingRequests.length > 0 && (
        <div className="bg-white shadow rounded-lg overflow-hidden mb-6">
          <div 
            className="flex justify-between items-center p-4 cursor-pointer bg-indigo-50"
            onClick={() => setShowRequests(!showRequests)}
          >
            <div className="flex items-center">
              <UserPlus className="h-5 w-5 text-indigo-600 mr-2" />
              <h3 className="text-lg font-medium text-gray-900">
                Заявки на вступление ({pendingRequests.length})
              </h3>
            </div>
            {showRequests ? (
              <ChevronUp className="h-5 w-5 text-gray-500" />
            ) : (
              <ChevronDown className="h-5 w-5 text-gray-500" />
            )}
          </div>
          
          {showRequests && (
            <div className="divide-y divide-gray-200">
              {pendingRequests.map((request) => (
                <div key={request._id} className="flex items-center justify-between p-4">
                  <div className="flex items-center">
                    {request.user.avatar ? (
                      <img
                        src={request.user.avatar}
                        alt={request.user.name}
                        className="h-10 w-10 rounded-full"
                      />
                    ) : (
                      <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-600 font-medium">
                          {request.user.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">{request.user.name}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(request.date).toLocaleDateString('ru-RU')}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      type="button"
                      onClick={() => handleRequestAction(request._id, true)}
                      className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-green-600 hover:bg-green-700"
                    >
                      <UserCheck className="h-3.5 w-3.5 mr-1" />
                      Принять
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRequestAction(request._id, false)}
                      className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded-full shadow-sm text-gray-700 bg-white hover:bg-gray-50"
                    >
                      <X className="h-3.5 w-3.5 mr-1" />
                      Отклонить
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      
      {/* Список участников */}
      <div className="space-y-3">
        {sortedMembers.map((member) => (
          <div 
            key={member._id} 
            className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg"
          >
            <div className="flex items-center">
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
                <div className="flex items-center">
                  <span className="text-sm font-medium text-gray-900">{member.name}</span>
                  {member.role === 'leader' && (
                    <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
                      <Shield className="h-3 w-3 mr-0.5" />
                      Лидер
                    </span>
                  )}
                  {member.role === 'moderator' && (
                    <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                      <Shield className="h-3 w-3 mr-0.5" />
                      Модератор
                    </span>
                  )}
                </div>
                <div className="text-xs text-gray-500">
                  С {new Date(member.joinDate).toLocaleDateString('ru-RU')}
                </div>
              </div>
            </div>
            
            {/* Меню действий для лидера клана */}
            {isLeader && member._id !== authState.user?.id && (
              <div className="relative">
                <button
                  type="button"
                  className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none"
                  onClick={() => setActionMember(actionMember === member._id ? null : member._id)}
                >
                  <MoreHorizontal className="h-5 w-5" />
                </button>
                
                {actionMember === member._id && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                    <div className="py-1">
                      {member.role === 'member' && (
                        <button
                          type="button"
                          onClick={() => handleMemberAction(member._id, 'promote')}
                          className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <Shield className="h-4 w-4 mr-2 text-blue-500" />
                          Назначить модератором
                        </button>
                      )}
                      
                      {member.role === 'moderator' && (
                        <button
                          type="button"
                          onClick={() => handleMemberAction(member._id, 'demote')}
                          className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <Shield className="h-4 w-4 mr-2 text-gray-500" />
                          Снять модератора
                        </button>
                      )}
                      
                      <button
                        type="button"
                        onClick={() => handleMemberAction(member._id, 'transfer')}
                        className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <Shield className="h-4 w-4 mr-2 text-yellow-500" />
                        Передать лидерство
                      </button>
                      
                      <button
                        type="button"
                        onClick={() => handleMemberAction(member._id, 'kick')}
                        className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                      >
                        <UserMinus className="h-4 w-4 mr-2" />
                        Исключить из клана
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClanMemberList; 