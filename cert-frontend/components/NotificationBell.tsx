import React, { useState, useMemo } from 'react';
import { Bell, X, AlertCircle, Clock } from 'lucide-react';
import type { Reminder } from '../types/reminder';

interface NotificationBellProps {
  reminders: Reminder[];
}

export function NotificationBell({ reminders }: NotificationBellProps) {
  const [showPanel, setShowPanel] = useState(false);

  const notifications = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const overdue = reminders.filter(r => {
      const dueDate = new Date(r.dueDate);
      dueDate.setHours(0, 0, 0, 0);
      return r.status !== 'completed' && dueDate < today;
    });

    const dueToday = reminders.filter(r => {
      const dueDate = new Date(r.dueDate);
      dueDate.setHours(0, 0, 0, 0);
      return r.status !== 'completed' && dueDate.getTime() === today.getTime();
    });

    const dueSoon = reminders.filter(r => {
      const dueDate = new Date(r.dueDate);
      dueDate.setHours(0, 0, 0, 0);
      const threeDaysFromNow = new Date(today);
      threeDaysFromNow.setDate(threeDaysFromNow.getDate() + 3);
      
      return r.status !== 'completed' && dueDate > today && dueDate <= threeDaysFromNow;
    });

    return [...overdue, ...dueToday, ...dueSoon];
  }, [reminders]);

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  const getNotificationIcon = (reminder: Reminder) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dueDate = new Date(reminder.dueDate);
    dueDate.setHours(0, 0, 0, 0);

    if (dueDate < today) {
      return <AlertCircle className="w-5 h-5 text-red-500" />;
    }
    return <Clock className="w-5 h-5 text-yellow-500" />;
  };

  return (
    <div className="relative">
      {/* Bell Button */}
      <button
        onClick={() => setShowPanel(!showPanel)}
        className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
      >
        <Bell className="w-6 h-6 text-gray-700" />
        {notifications.length > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {notifications.length > 9 ? '9+' : notifications.length}
          </span>
        )}
      </button>

      {/* Notification Panel */}
      {showPanel && (
        <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-xl border border-gray-200 z-20">
          {/* Panel Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h3 className="text-gray-900">Notifications</h3>
            <button
              onClick={() => setShowPanel(false)}
              className="p-1 hover:bg-gray-100 rounded transition-colors"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Notifications List */}
          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-8 text-center">
                <Bell className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-600">No notifications</p>
                <p className="text-gray-500">You're all caught up!</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {notifications.map(reminder => (
                  <div
                    key={reminder.id}
                    className="p-4 hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    <div className="flex gap-3">
                      {getNotificationIcon(reminder)}
                      <div className="flex-1">
                        <p className="text-gray-900">{reminder.title}</p>
                        <p className="text-gray-600">{reminder.description}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-gray-500">Due: {formatDate(reminder.dueDate)}</span>
                          {reminder.linkedEntity && (
                            <>
                              <span className="text-gray-400">•</span>
                              <span className="text-gray-500">{reminder.linkedEntity.name}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Panel Footer */}
          {notifications.length > 0 && (
            <div className="p-3 border-t border-gray-200 text-center">
              <button
                onClick={() => setShowPanel(false)}
                className="text-blue-600 hover:text-blue-700"
              >
                View All Reminders
              </button>
            </div>
          )}
        </div>
      )}

      {/* Backdrop */}
      {showPanel && (
        <div
          className="fixed inset-0 z-10"
          onClick={() => setShowPanel(false)}
        ></div>
      )}
    </div>
  );
}
