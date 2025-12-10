
import React, { useState } from 'react';
import { X, Save } from 'lucide-react';
import type { Reminder, ReminderCategory, ReminderPriority, RecurrenceType, NotificationChannel } from '../types/reminder';

interface AddReminderProps {
  onSave: (reminder: Reminder) => void;
  onCancel: () => void;
  initialData?: Reminder;
}

export function AddReminder({ onSave, onCancel, initialData }: AddReminderProps) {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    description: initialData?.description || '',
    category: initialData?.category || 'other' as ReminderCategory,
    dueDate: initialData?.dueDate ? new Date(initialData.dueDate).toISOString().split('T')[0] : '',
    priority: initialData?.priority || 'medium' as ReminderPriority,
    recurrence: initialData?.recurrence || 'none' as RecurrenceType,
    assignedTo: initialData?.assignedTo || '',
    linkedEntityType: initialData?.linkedEntity?.type || 'client' as 'client' | 'auditor' | 'certificate' | 'audit',
    linkedEntityName: initialData?.linkedEntity?.name || '',
    notes: initialData?.notes || '',
    notifications: initialData?.notifications || ['email', 'in-app'] as NotificationChannel[]
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const reminder: Reminder = {
      id: initialData?.id || Date.now().toString(),
      title: formData.title,
      description: formData.description,
      category: formData.category,
      dueDate: new Date(formData.dueDate),
      priority: formData.priority,
      status: initialData?.status || 'pending',
      recurrence: formData.recurrence,
      assignedTo: formData.assignedTo,
      linkedEntity: formData.linkedEntityName ? {
        type: formData.linkedEntityType,
        id: Date.now().toString(),
        name: formData.linkedEntityName
      } : undefined,
      notifications: formData.notifications,
      notes: formData.notes,
      createdAt: initialData?.createdAt || new Date(),
      updatedAt: new Date(),
      createdBy: initialData?.createdBy || 'Current User',
      isSystemGenerated: false,
      history: initialData?.history || [
        {
          id: Date.now().toString(),
          action: 'Created',
          user: 'Current User',
          timestamp: new Date()
        }
      ]
    };

    onSave(reminder);
  };

  const handleNotificationToggle = (channel: NotificationChannel) => {
    setFormData(prev => ({
      ...prev,
      notifications: prev.notifications.includes(channel)
        ? prev.notifications.filter(n => n !== channel)
        : [...prev.notifications, channel]
    }));
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-gray-900">{initialData ? 'Edit Reminder' : 'Create New Reminder'}</h2>
        <button
          onClick={onCancel}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label className="block text-gray-700 mb-2">
            Reminder Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., ISO 9001 Certificate Expiry"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-700 mb-2">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            required
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-24"
            placeholder="Provide details about this reminder..."
          />
        </div>

        {/* Category & Priority */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 mb-2">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              required
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value as ReminderCategory })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="audit">Audit</option>
              <option value="certificate">Certificate</option>
              <option value="nc">Non-Conformity</option>
              <option value="invoice">Invoice</option>
              <option value="document">Document</option>
              <option value="contract">Contract</option>
              <option value="competency">Competency</option>
              <option value="meeting">Meeting</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">
              Priority <span className="text-red-500">*</span>
            </label>
            <select
              required
              value={formData.priority}
              onChange={(e) => setFormData({ ...formData, priority: e.target.value as ReminderPriority })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>

        {/* Due Date & Recurrence */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 mb-2">
              Due Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              required
              value={formData.dueDate}
              onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Recurrence</label>
            <select
              value={formData.recurrence}
              onChange={(e) => setFormData({ ...formData, recurrence: e.target.value as RecurrenceType })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="none">None</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
              <option value="custom">Custom</option>
            </select>
          </div>
        </div>

        {/* Assigned To */}
        <div>
          <label className="block text-gray-700 mb-2">
            Assigned To <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            value={formData.assignedTo}
            onChange={(e) => setFormData({ ...formData, assignedTo: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., Sarah Johnson, Quality Team"
          />
        </div>

        {/* Linked Entity */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 mb-2">Linked Entity Type</label>
            <select
              value={formData.linkedEntityType}
              onChange={(e) => setFormData({ ...formData, linkedEntityType: e.target.value as 'client' | 'auditor' | 'certificate' | 'audit' })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="client">Client</option>
              <option value="auditor">Auditor</option>
              <option value="certificate">Certificate</option>
              <option value="audit">Audit</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Entity Name</label>
            <input
              type="text"
              value={formData.linkedEntityName}
              onChange={(e) => setFormData({ ...formData, linkedEntityName: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., ABC Manufacturing Ltd."
            />
          </div>
        </div>

        {/* Notifications */}
        <div>
          <label className="block text-gray-700 mb-2">Notification Channels</label>
          <div className="flex flex-wrap gap-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.notifications.includes('email')}
                onChange={() => handleNotificationToggle('email')}
                className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-gray-700">Email</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.notifications.includes('sms')}
                onChange={() => handleNotificationToggle('sms')}
                className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-gray-700">SMS</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.notifications.includes('in-app')}
                onChange={() => handleNotificationToggle('in-app')}
                className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-gray-700">In-App</span>
            </label>
          </div>
        </div>

        {/* Notes */}
        <div>
          <label className="block text-gray-700 mb-2">Additional Notes</label>
          <textarea
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-24"
            placeholder="Any additional information..."
          />
        </div>

        {/* Actions */}
        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
          >
            <Save className="w-5 h-5" />
            {initialData ? 'Update Reminder' : 'Create Reminder'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
