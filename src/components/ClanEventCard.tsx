import React from 'react';
import { Calendar, Clock, MapPin, Users, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ClanEvent {
  _id: string;
  title: string;
  description: string;
  location: string;
  date: string;
  startTime: string;
  endTime: string;
  maxParticipants?: number;
  participants: string[];
  tags: string[];
  image?: string;
  clanId: string;
}

interface ClanEventCardProps {
  event: ClanEvent;
  compact?: boolean;
}

const ClanEventCard: React.FC<ClanEventCardProps> = ({ event, compact = false }) => {
  const eventDate = new Date(event.date);
  const formattedDate = eventDate.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
  
  // Проверяем, прошло ли мероприятие
  const isPast = eventDate < new Date();
  
  // Если нужно компактное отображение
  if (compact) {
    return (
      <Link 
        to={`/clans/${event.clanId}/events/${event._id}`} 
        className={`block bg-white rounded-lg shadow-sm overflow-hidden transition-colors hover:bg-gray-50 ${
          isPast ? 'opacity-70' : ''
        }`}
      >
        <div className="p-4">
          <h3 className="font-medium text-gray-900 mb-1">{event.title}</h3>
          <div className="flex items-center text-sm text-gray-500 mb-2">
            <Calendar className="h-3.5 w-3.5 mr-1" />
            <span>{formattedDate}</span>
            <span className="mx-1">•</span>
            <Clock className="h-3.5 w-3.5 mr-1" />
            <span>{event.startTime}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <MapPin className="h-3.5 w-3.5 mr-1" />
            <span>{event.location}</span>
          </div>
        </div>
      </Link>
    );
  }
  
  return (
    <Link 
      to={`/clans/${event.clanId}/events/${event._id}`} 
      className={`block bg-white rounded-lg shadow overflow-hidden transition-transform hover:-translate-y-1 ${
        isPast ? 'opacity-70' : ''
      }`}
    >
      <div className="relative">
        {event.image ? (
          <img 
            src={event.image} 
            alt={event.title} 
            className="w-full h-48 object-cover"
          />
        ) : (
          <div className="w-full h-48 bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center">
            <Calendar className="h-12 w-12 text-white" />
          </div>
        )}
        
        {isPast && (
          <div className="absolute top-0 right-0 bg-gray-800 text-white text-xs font-bold px-2 py-1 m-2 rounded">
            Завершено
          </div>
        )}
        
        <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/70 to-transparent">
          <h3 className="text-xl font-bold text-white">{event.title}</h3>
          <div className="flex items-center text-white/90 text-sm">
            <Calendar className="h-4 w-4 mr-1" />
            <span>{formattedDate}</span>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center text-sm text-gray-600">
            <Clock className="h-4 w-4 mr-1" />
            <span>{event.startTime}{event.endTime ? ` - ${event.endTime}` : ''}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-600">
            <Users className="h-4 w-4 mr-1" />
            <span>
              {event.participants.length}
              {event.maxParticipants && ` / ${event.maxParticipants}`}
            </span>
          </div>
        </div>
        
        <div className="flex items-start mb-3">
          <MapPin className="h-4 w-4 text-gray-500 mr-1 mt-0.5 flex-shrink-0" />
          <span className="text-sm text-gray-600">{event.location}</span>
        </div>
        
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{event.description}</p>
        
        {event.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {event.tags.map((tag, index) => (
              <span 
                key={index} 
                className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-indigo-100 text-indigo-800"
              >
                <Tag className="h-3 w-3 mr-0.5" />
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
};

export default ClanEventCard; 