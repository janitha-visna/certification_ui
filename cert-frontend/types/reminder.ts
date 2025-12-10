export type ReminderCategory = 
  | 'audit'
  | 'certificate'
  | 'nc'
  | 'invoice'
  | 'document'
  | 'contract'
  | 'competency'
  | 'meeting'
  | 'other';

export type ReminderPriority = 'high' | 'medium' | 'low';

export type ReminderStatus = 'pending' | 'completed' | 'snoozed' | 'overdue';

export type RecurrenceType = 'daily' | 'weekly' | 'monthly' | 'yearly' | 'custom' | 'none';

export type NotificationChannel = 'email' | 'sms' | 'in-app';

export interface Reminder {
  id: string;
  title: string;
  description: string;
  category: ReminderCategory;
  dueDate: Date;
  priority: ReminderPriority;
  status: ReminderStatus;
  recurrence: RecurrenceType;
  assignedTo: string;
  linkedEntity?: {
    type: 'client' | 'auditor' | 'certificate' | 'audit';
    id: string;
    name: string;
  };
  notifications: NotificationChannel[];
  notes?: string;
  attachments?: string[];
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  snoozedUntil?: Date;
  completedAt?: Date;
  isSystemGenerated: boolean;
  history: HistoryEntry[];
}

export interface HistoryEntry {
  id: string;
  action: string;
  user: string;
  timestamp: Date;
  details?: string;
}
