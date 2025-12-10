import React, { useState } from 'react';
import {
  Calendar,
  User,
  Tag,
  AlertCircle,
  CheckCircle2,
  Clock,
  Trash2,
  Eye,
  Bell,
  Link2
} from 'lucide-react';
import type { Reminder } from '../types/reminder';

interface ReminderCardProps {
  reminder: Reminder;
  onView: (reminder: Reminder) => void;
  onComplete: (id: string) => void;
  onSnooze: (id: string, snoozeUntil: Date) => void;
  onDelete: (id: string) => void;
}

export function ReminderCard({ reminder, onView, onComplete, onSnooze, onDelete }: ReminderCardProps) {
  const [showSnoozeMenu, setShowSnoozeMenu] = useState(false);

  const getBorderColor = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dueDate = new Date(reminder.dueDate);
    dueDate.setHours(0, 0, 0, 0);

    if (reminder.status === 'completed') return 'border-green-200 bg-green-50';
    if (dueDate < today) return 'border-red-200 bg-red-50';
    if (dueDate.getTime() === today.getTime()) return 'border-yellow-200 bg-yellow-50';
    return 'border-blue-200 bg-blue-50';
  };

  const getPriorityColor = () => {
    switch (reminder.priority) {
      case 'high': return 'bg-red-100 text-red-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'low': return 'bg-green-100 text-green-700';
    }
  };

  const getCategoryIcon = () => {
    switch (reminder.category) {
      case 'audit': return '📋';
      case 'certificate': return '📜';
      case 'nc': return '⚠️';
      case 'invoice': return '💰';
      case 'document': return '📄';
      case 'contract': return '📝';
      case 'competency': return '🎓';
      case 'meeting': return '👥';
      default: return '📌';
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handleSnooze = (hours: number) => {
    const snoozeDate = new Date();
    snoozeDate.setHours(snoozeDate.getHours() + hours);
    onSnooze(reminder.id, snoozeDate);
    setShowSnoozeMenu(false);
  };

  return (
    <div className={`border rounded-lg p-4 ${getBorderColor()} transition-all hover:shadow-md`}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          {/* Header */}
          <div className="flex items-start gap-3 mb-2">
            <span className="text-2xl">{getCategoryIcon()}</span>
            <div className="flex-1">
              <h3 className="text-gray-900 mb-1">{reminder.title}</h3>
              <p className="text-gray-600">{reminder.description}</p>
            </div>
          </div>

          {/* Metadata */}
          <div className="flex flex-wrap items-center gap-4 mt-3">
            <div className="flex items-center gap-2 text-gray-700">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(reminder.dueDate)}</span>
            </div>

            <div className={`px-2 py-1 rounded ${getPriorityColor()}`}>
              {reminder.priority.charAt(0).toUpperCase() + reminder.priority.slice(1)}
            </div>

            <div className="flex items-center gap-2 text-gray-700">
              <User className="w-4 h-4" />
              <span>{reminder.assignedTo}</span>
            </div>

            {reminder.linkedEntity && (
              <div className="flex items-center gap-2 text-gray-700">
                <Link2 className="w-4 h-4" />
                <span>{reminder.linkedEntity.name}</span>
              </div>
            )}

            {reminder.recurrence !== 'none' && (
              <div className="flex items-center gap-2 text-gray-700">
                <Tag className="w-4 h-4" />
                <span>{reminder.recurrence}</span>
              </div>
            )}

            {reminder.isSystemGenerated && (
              <div className="flex items-center gap-2 text-blue-600">
                <Bell className="w-4 h-4" />
                <span>Auto</span>
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2">
          <button
            onClick={() => onView(reminder)}
            className="p-2 hover:bg-white rounded-lg transition-colors"
            title="View Details"
          >
            <Eye className="w-5 h-5 text-gray-600" />
          </button>

          {reminder.status !== 'completed' && (
            <>
              <button
                onClick={() => onComplete(reminder.id)}
                className="p-2 hover:bg-white rounded-lg transition-colors"
                title="Mark as Complete"
              >
                <CheckCircle2 className="w-5 h-5 text-green-600" />
              </button>

              <div className="relative">
                <button
                  onClick={() => setShowSnoozeMenu(!showSnoozeMenu)}
                  className="p-2 hover:bg-white rounded-lg transition-colors"
                  title="Snooze"
                >
                  <Clock className="w-5 h-5 text-yellow-600" />
                </button>

                {showSnoozeMenu && (
                  <div className="absolute right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10 w-48">
                    <button
                      onClick={() => handleSnooze(24)}
                      className="w-full px-4 py-2 text-left hover:bg-gray-100 transition-colors"
                    >
                      24 hours
                    </button>
                    <button
                      onClick={() => handleSnooze(72)}
                      className="w-full px-4 py-2 text-left hover:bg-gray-100 transition-colors"
                    >
                      3 days
                    </button>
                    <button
                      onClick={() => handleSnooze(168)}
                      className="w-full px-4 py-2 text-left hover:bg-gray-100 transition-colors"
                    >
                      1 week
                    </button>
                  </div>
                )}
              </div>
            </>
          )}

          <button
            onClick={() => onDelete(reminder.id)}
            className="p-2 hover:bg-white rounded-lg transition-colors"
            title="Delete"
          >
            <Trash2 className="w-5 h-5 text-red-600" />
          </button>
        </div>
      </div>

      {/* Snoozed indicator */}
      {reminder.snoozedUntil && (
        <div className="mt-3 flex items-center gap-2 text-gray-600 bg-white px-3 py-2 rounded">
          <Clock className="w-4 h-4" />
          <span>Snoozed until {formatDate(reminder.snoozedUntil)}</span>
        </div>
      )}
    </div>
  );
}
