import { useState } from 'react';
import type { AuditEvent } from '@/app/calender/page';
import { MapPin, Video } from 'lucide-react';

interface CalendarViewProps {
  events: AuditEvent[];
  viewMode: 'month' | 'week' | 'day';
  currentDate: Date;
  onEventClick: (event: AuditEvent) => void;
}

export function CalendarView({ events, viewMode, currentDate, onEventClick }: CalendarViewProps) {
  const [hoveredEvent, setHoveredEvent] = useState<string | null>(null);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add previous month's days
    for (let i = 0; i < startingDayOfWeek; i++) {
      const prevMonthDay = new Date(year, month, -startingDayOfWeek + i + 1);
      days.push({ date: prevMonthDay, isCurrentMonth: false });
    }
    
    // Add current month's days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({ date: new Date(year, month, i), isCurrentMonth: true });
    }
    
    // Add next month's days to fill the grid
    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      days.push({ date: new Date(year, month + 1, i), isCurrentMonth: false });
    }
    
    return days;
  };

  const getEventsForDate = (date: Date) => {
    return events.filter(event => {
      const eventDate = new Date(event.startDate);
      return (
        eventDate.getDate() === date.getDate() &&
        eventDate.getMonth() === date.getMonth() &&
        eventDate.getFullYear() === date.getFullYear()
      );
    });
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  if (viewMode === 'month') {
    const days = getDaysInMonth(currentDate);
    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return (
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
        {/* Week day headers */}
        <div className="grid grid-cols-7 border-b border-gray-200 dark:border-gray-800">
          {weekDays.map((day) => (
            <div
              key={day}
              className="p-4 text-center text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/50"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7">
          {days.map((day, index) => {
            const dayEvents = getEventsForDate(day.date);
            const isTodayDate = isToday(day.date);

            return (
              <div
                key={index}
                className={`min-h-[120px] border-b border-r border-gray-200 dark:border-gray-800 p-2 ${
                  !day.isCurrentMonth ? 'bg-gray-50/50 dark:bg-gray-800/20' : ''
                } ${index % 7 === 6 ? 'border-r-0' : ''}`}
              >
                <div
                  className={`text-sm mb-2 ${
                    isTodayDate
                      ? 'w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center'
                      : day.isCurrentMonth
                      ? 'text-gray-900 dark:text-white'
                      : 'text-gray-400 dark:text-gray-600'
                  }`}
                >
                  {day.date.getDate()}
                </div>

                <div className="space-y-1">
                  {dayEvents.map((event) => (
                    <button
                      key={event.id}
                      onClick={() => onEventClick(event)}
                      onMouseEnter={() => setHoveredEvent(event.id)}
                      onMouseLeave={() => setHoveredEvent(null)}
                      className="w-full text-left p-2 rounded-lg transition-all hover:shadow-md relative group"
                      style={{ backgroundColor: event.color + '20', borderLeft: `3px solid ${event.color}` }}
                    >
                      <div className="flex items-start justify-between gap-1">
                        <div className="flex-1 min-w-0">
                          <p className="text-xs truncate text-gray-900 dark:text-white">
                            {event.clientName}
                          </p>
                          <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
                            {event.auditType}
                          </p>
                        </div>
                        <div className="flex items-center gap-1 flex-shrink-0">
                          <div className="w-5 h-5 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-[10px] text-white">
                            {event.auditors[0]?.initials}
                          </div>
                          {event.locationType === 'Remote' ? (
                            <Video className="w-3 h-3 text-gray-500" />
                          ) : (
                            <MapPin className="w-3 h-3 text-gray-500" />
                          )}
                        </div>
                      </div>

                      {/* Tooltip on hover */}
                      {hoveredEvent === event.id && (
                        <div className="absolute z-10 left-0 top-full mt-1 w-64 p-3 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700">
                          <p className="text-sm text-gray-900 dark:text-white mb-1">
                            {event.clientName}
                          </p>
                          <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                            {event.auditType} • {event.standard}
                          </p>
                          <div className="flex items-center gap-2 mb-2">
                            {event.auditors.map((auditor) => (
                              <span key={auditor.id} className="text-xs text-gray-600 dark:text-gray-400">
                                {auditor.name}
                              </span>
                            ))}
                          </div>
                          <span
                            className="inline-block px-2 py-1 rounded-full text-xs"
                            style={{ backgroundColor: event.color, color: 'white' }}
                          >
                            {event.status}
                          </span>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // Week and Day views can be implemented similarly
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-8 text-center">
      <p className="text-gray-500 dark:text-gray-400">
        {viewMode === 'week' ? 'Week' : 'Day'} view coming soon
      </p>
    </div>
  );
}
