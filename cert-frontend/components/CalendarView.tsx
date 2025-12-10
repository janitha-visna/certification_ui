import React, { useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { AuditEvent } from '@/app/calender/page';

export interface CalendarViewProps {
  events: AuditEvent[];
  viewMode: 'month' | 'week' | 'day';
  currentDate: Date;
  onEventClick: (event: AuditEvent) => void;
}

export function CalendarView({ events, viewMode, currentDate, onEventClick }: CalendarViewProps) {
  const monthNames = [
    'January','February','March','April','May','June',
    'July','August','September','October','November','December'
  ];

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const calendarDays = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    const days: { date: Date; isCurrentMonth: boolean }[] = [];

    // Previous month trailing days
    const prevMonthDays = getDaysInMonth(year, month - 1);
    for (let i = firstDay - 1; i >= 0; i--) {
      days.push({
        date: new Date(year, month - 1, prevMonthDays - i),
        isCurrentMonth: false
      });
    }

    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        date: new Date(year, month, i),
        isCurrentMonth: true
      });
    }

    // Fill next month's leading days
    const remaining = 42 - days.length;
    for (let i = 1; i <= remaining; i++) {
      days.push({
        date: new Date(year, month + 1, i),
        isCurrentMonth: false
      });
    }

    return days;
  }, [currentDate]);

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
    today.setHours(0, 0, 0, 0);

    const compare = new Date(date);
    compare.setHours(0, 0, 0, 0);

    return today.getTime() === compare.getTime();
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h2>

        <div className="flex gap-2">
          <button
            onClick={() =>
              (window as any).setCurrentDate?.(
                new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
              )
            }
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>

          <button
            onClick={() =>
              (window as any).setCurrentDate?.(new Date())
            }
            className="px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            Today
          </button>

          <button
            onClick={() =>
              (window as any).setCurrentDate?.(
                new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
              )
            }
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-7 gap-2">
        {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(day => (
          <div key={day} className="text-center font-medium text-gray-600 py-2">
            {day}
          </div>
        ))}

        {calendarDays.map((day, index) => {
          const dayEvents = getEventsForDate(day.date);
          const today = isToday(day.date);

          return (
            <div
              key={index}
              className={`min-h-24 border rounded-lg p-2 
                ${day.isCurrentMonth ? 'bg-white' : 'bg-gray-50'} 
                ${today ? 'ring-2 ring-blue-500' : ''}`}
            >
              <div
                className={`text-right mb-1 text-sm 
                ${day.isCurrentMonth ? 'text-gray-900' : 'text-gray-400'}
                ${today ? 'text-blue-600 font-bold' : ''}`}
              >
                {day.date.getDate()}
              </div>

              <div className="space-y-1">
                {dayEvents.slice(0, 3).map(event => (
                  <button
                    key={event.id}
                    onClick={() => onEventClick(event)}
                    className={`w-full text-left px-2 py-1 rounded text-white text-xs truncate`}
                    style={{ backgroundColor: event.color }}
                  >
                    {event.clientName}
                  </button>
                ))}

                {dayEvents.length > 3 && (
                  <div className="text-xs text-gray-600 px-2">
                    +{dayEvents.length - 3} more
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
