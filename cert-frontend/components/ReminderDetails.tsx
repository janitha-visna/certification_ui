import React from 'react';
import {
  ArrowLeft,
  Calendar,
  User,
  Tag,
  Bell,
  Link2,
  Clock,
  CheckCircle2,
  Edit,
  Trash2,
  FileText,
  History
} from 'lucide-react';
import type { Reminder } from '../types/reminder';

interface ReminderDetailsProps {
  reminder: Reminder;
  onEdit: (reminder: Reminder) => void;
  onComplete: (id: string) => void;
  onSnooze: (id: string, snoozeUntil: Date) => void;
  onDelete: (id: string) => void;
  onBack: () => void;
}

export function ReminderDetails({
  reminder,
  onEdit,
  onComplete,
  onSnooze,
  onDelete,
  onBack
}: ReminderDetailsProps) {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatDateTime = (date: Date) => {
    return new Date(date).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getPriorityColor = () => {
    switch (reminder.priority) {
      case 'high': return 'bg-red-100 text-red-700 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-700 border-green-200';
    }
  };

  const getStatusColor = () => {
    switch (reminder.status) {
      case 'completed': return 'bg-green-100 text-green-700 border-green-200';
      case 'overdue': return 'bg-red-100 text-red-700 border-red-200';
      case 'snoozed': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      default: return 'bg-blue-100 text-blue-700 border-blue-200';
    }
  };

  const handleSnooze = (hours: number) => {
    const snoozeDate = new Date();
    snoozeDate.setHours(snoozeDate.getHours() + hours);
    onSnooze(reminder.id, snoozeDate);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Dashboard
        </button>

        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h1 className="text-gray-900 mb-2">{reminder.title}</h1>
            <p className="text-gray-600">{reminder.description}</p>
          </div>

          <div className="flex gap-2">
            {reminder.status !== 'completed' && (
              <>
                <button
                  onClick={() => onEdit(reminder)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                  <Edit className="w-4 h-4" />
                  Edit
                </button>
                <button
                  onClick={() => onComplete(reminder.id)}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Complete
                </button>
              </>
            )}
            <button
              onClick={() => onDelete(reminder.id)}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </button>
          </div>
        </div>

        {/* Status badges */}
        <div className="flex flex-wrap gap-3 mt-4">
          <span className={`px-3 py-1 rounded-lg border ${getStatusColor()}`}>
            {reminder.status.charAt(0).toUpperCase() + reminder.status.slice(1)}
          </span>
          <span className={`px-3 py-1 rounded-lg border ${getPriorityColor()}`}>
            {reminder.priority.charAt(0).toUpperCase() + reminder.priority.slice(1)} Priority
          </span>
          {reminder.isSystemGenerated && (
            <span className="px-3 py-1 rounded-lg border bg-blue-100 text-blue-700 border-blue-200">
              System Generated
            </span>
          )}
        </div>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Date Information */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-gray-900 mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Date Information
            </h2>
            <div className="space-y-3">
              <div>
                <p className="text-gray-600">Due Date</p>
                <p className="text-gray-900">{formatDate(reminder.dueDate)}</p>
              </div>
              <div>
                <p className="text-gray-600">Created</p>
                <p className="text-gray-900">{formatDateTime(reminder.createdAt)}</p>
              </div>
              <div>
                <p className="text-gray-600">Last Updated</p>
                <p className="text-gray-900">{formatDateTime(reminder.updatedAt)}</p>
              </div>
              {reminder.completedAt && (
                <div>
                  <p className="text-gray-600">Completed</p>
                  <p className="text-gray-900">{formatDateTime(reminder.completedAt)}</p>
                </div>
              )}
            </div>
          </div>

          {/* Assignment & Category */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-gray-900 mb-4 flex items-center gap-2">
              <Tag className="w-5 h-5" />
              Assignment & Category
            </h2>
            <div className="space-y-3">
              <div>
                <p className="text-gray-600">Category</p>
                <p className="text-gray-900">
                  {reminder.category.charAt(0).toUpperCase() + reminder.category.slice(1)}
                </p>
              </div>
              <div>
                <p className="text-gray-600">Assigned To</p>
                <p className="text-gray-900 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  {reminder.assignedTo}
                </p>
              </div>
              <div>
                <p className="text-gray-600">Created By</p>
                <p className="text-gray-900">{reminder.createdBy}</p>
              </div>
              <div>
                <p className="text-gray-600">Recurrence</p>
                <p className="text-gray-900">
                  {reminder.recurrence === 'none' ? 'No recurrence' : reminder.recurrence.charAt(0).toUpperCase() + reminder.recurrence.slice(1)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Linked Entity */}
          {reminder.linkedEntity && (
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-gray-900 mb-4 flex items-center gap-2">
                <Link2 className="w-5 h-5" />
                Linked Entity
              </h2>
              <div className="space-y-3">
                <div>
                  <p className="text-gray-600">Type</p>
                  <p className="text-gray-900">
                    {reminder.linkedEntity.type.charAt(0).toUpperCase() + reminder.linkedEntity.type.slice(1)}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">Name</p>
                  <p className="text-gray-900">{reminder.linkedEntity.name}</p>
                </div>
              </div>
            </div>
          )}

          {/* Notifications */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-gray-900 mb-4 flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Notifications
            </h2>
            <div className="flex flex-wrap gap-2">
              {reminder.notifications.map(channel => (
                <span
                  key={channel}
                  className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg"
                >
                  {channel.charAt(0).toUpperCase() + channel.slice(1)}
                </span>
              ))}
            </div>
          </div>

          {/* Notes */}
          {reminder.notes && (
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-gray-900 mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Notes
              </h2>
              <p className="text-gray-700 whitespace-pre-wrap">{reminder.notes}</p>
            </div>
          )}

          {/* Snooze Actions */}
          {reminder.status !== 'completed' && (
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-gray-900 mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Snooze Options
              </h2>
              <div className="space-y-2">
                <button
                  onClick={() => handleSnooze(24)}
                  className="w-full px-4 py-2 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200 transition-colors"
                >
                  Snooze for 24 hours
                </button>
                <button
                  onClick={() => handleSnooze(72)}
                  className="w-full px-4 py-2 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200 transition-colors"
                >
                  Snooze for 3 days
                </button>
                <button
                  onClick={() => handleSnooze(168)}
                  className="w-full px-4 py-2 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200 transition-colors"
                >
                  Snooze for 1 week
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* History */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-gray-900 mb-4 flex items-center gap-2">
          <History className="w-5 h-5" />
          Activity History
        </h2>
        <div className="space-y-4">
          {reminder.history.map((entry) => (
            <div key={entry.id} className="flex gap-4 pb-4 border-b border-gray-200 last:border-0">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
              <div className="flex-1">
                <p className="text-gray-900">{entry.action}</p>
                <p className="text-gray-600">by {entry.user}</p>
                <p className="text-gray-500">{formatDateTime(entry.timestamp)}</p>
                {entry.details && (
                  <p className="text-gray-700 mt-1">{entry.details}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
