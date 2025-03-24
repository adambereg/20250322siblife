import React from 'react';
import { Link } from 'react-router-dom';
import { Tag, Users, Shield } from 'lucide-react';

interface ClanCardProps {
  clan: {
    _id: string;
    name: string;
    description: string;
    logo?: string;
    type: 'open' | 'closed';
    leader: {
      name: string;
    };
    members: number;
    rating: number;
    tags: string[];
    createdAt: string;
  };
}

const ClanCard: React.FC<ClanCardProps> = ({ clan }) => {
  // Обрезаем описание до 120 символов
  const truncatedDescription = clan.description.length > 120 
    ? `${clan.description.substring(0, 120)}...` 
    : clan.description;
  
  return (
    <Link to={`/clans/${clan._id}`} className="block">
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg">
        <div className="h-36 bg-gradient-to-r from-indigo-700 to-purple-600 relative">
          {/* Логотип клана */}
          <div className="absolute bottom-0 left-4 transform translate-y-1/2">
            <div className="h-16 w-16 rounded-lg bg-white p-1 shadow-lg overflow-hidden">
              {clan.logo ? (
                <img 
                  src={clan.logo} 
                  alt={clan.name} 
                  className="h-full w-full object-cover rounded-md"
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center bg-gray-200 rounded-md">
                  <Shield className="h-8 w-8 text-gray-600" />
                </div>
              )}
            </div>
          </div>
          
          {/* Тип клана и рейтинг */}
          <div className="absolute top-3 right-3 flex space-x-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              clan.type === 'open' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-yellow-100 text-yellow-800'
            }`}>
              {clan.type === 'open' ? 'Открытый' : 'Закрытый'}
            </span>
            <span className="px-2 py-1 rounded-full bg-white text-xs font-medium text-gray-800">
              Рейтинг: {clan.rating}
            </span>
          </div>
        </div>
        
        <div className="p-4 pt-12">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{clan.name}</h3>
          <p className="text-sm text-gray-600 mb-3">{truncatedDescription}</p>
          
          {/* Лидер и участники */}
          <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
            <div className="flex items-center">
              <Shield className="h-3.5 w-3.5 mr-1" />
              <span>Лидер: {clan.leader.name}</span>
            </div>
            <div className="flex items-center">
              <Users className="h-3.5 w-3.5 mr-1" />
              <span>{clan.members} {getParticipantsText(clan.members)}</span>
            </div>
          </div>
          
          {/* Теги */}
          {clan.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {clan.tags.slice(0, 3).map((tag, index) => (
                <span 
                  key={index} 
                  className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                >
                  <Tag className="h-3 w-3 mr-0.5" />
                  {tag}
                </span>
              ))}
              {clan.tags.length > 3 && (
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                  +{clan.tags.length - 3}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

// Вспомогательная функция для склонения слова "участник"
function getParticipantsText(count: number): string {
  if (count % 10 === 1 && count % 100 !== 11) {
    return 'участник';
  } else if (
    [2, 3, 4].includes(count % 10) &&
    ![12, 13, 14].includes(count % 100)
  ) {
    return 'участника';
  } else {
    return 'участников';
  }
}

export default ClanCard; 