import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useNavigate } from 'react-router-dom';
import type { EventInput } from '@fullcalendar/core';
import { Event } from '../data/events';

interface EventCalendarProps {
  events: Event[];
}

const EventCalendar: React.FC<EventCalendarProps> = ({ events }) => {
  const navigate = useNavigate();
  const [view, setView] = useState<'dayGridMonth' | 'timeGridWeek' | 'timeGridDay'>('dayGridMonth');

  const calendarEvents: EventInput[] = events.map(event => ({
    id: event.id,
    title: event.title,
    start: new Date(event.startDate),
    end: new Date(event.endDate),
    url: `/events/${event.slug}`,
    extendedProps: {
      category: event.category,
      location: event.location.name,
      price: event.price,
    },
    backgroundColor: event.featured ? '#4F46E5' : '#6366F1',
    borderColor: event.featured ? '#4338CA' : '#4F46E5',
  }));

  const handleEventClick = (info: any) => {
    info.jsEvent.preventDefault();
    navigate(info.event.url);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView={view}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        }}
        events={calendarEvents}
        eventClick={handleEventClick}
        height="auto"
        locale="ru"
        firstDay={1}
        buttonText={{
          today: 'Сегодня',
          month: 'Месяц',
          week: 'Неделя',
          day: 'День',
        }}
        views={{
          dayGridMonth: {
            titleFormat: { year: 'numeric', month: 'long' },
          },
          timeGridWeek: {
            titleFormat: { year: 'numeric', month: 'long', day: 'numeric' },
            slotMinTime: '08:00:00',
            slotMaxTime: '22:00:00',
          },
          timeGridDay: {
            titleFormat: { year: 'numeric', month: 'long', day: 'numeric' },
            slotMinTime: '08:00:00',
            slotMaxTime: '22:00:00',
          },
        }}
        eventTimeFormat={{
          hour: '2-digit',
          minute: '2-digit',
          meridiem: false,
        }}
        eventContent={(eventInfo) => (
          <div className="p-1">
            <div className="font-medium">{eventInfo.event.title}</div>
            <div className="text-xs opacity-75">
              {eventInfo.event.extendedProps.location}
            </div>
            {!eventInfo.event.extendedProps.price.free && (
              <div className="text-xs">
                от {eventInfo.event.extendedProps.price.min} ₽
              </div>
            )}
          </div>
        )}
      />
    </div>
  );
};

export default EventCalendar;