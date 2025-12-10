import React, { useState, useMemo } from "react";
import { AlertCircle, Clock, CheckCircle2, Filter } from "lucide-react";
import { ReminderCard } from "./ReminderCard";
import type {
  Reminder,
  ReminderCategory,
  ReminderPriority,
  ReminderStatus,
} from "../types/reminder";

interface ReminderDashboardProps {
  reminders: Reminder[];
  onViewDetails: (reminder: Reminder) => void;
  onComplete: (id: string) => void;
  onSnooze: (id: string, snoozeUntil: Date) => void;
  onDelete: (id: string) => void;
}

export function ReminderDashboard({
  reminders,
  onViewDetails,
  onComplete,
  onSnooze,
  onDelete,
}: ReminderDashboardProps) {
  const [filterCategory, setFilterCategory] = useState<
    ReminderCategory | "all"
  >("all");
  const [filterPriority, setFilterPriority] = useState<
    ReminderPriority | "all"
  >("all");
  const [filterStatus, setFilterStatus] = useState<ReminderStatus | "all">(
    "all"
  );
  const [searchQuery, setSearchQuery] = useState("");

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const categorizedReminders = useMemo(() => {
    let filtered = reminders;

    // Apply filters
    if (filterCategory !== "all") {
      filtered = filtered.filter((r) => r.category === filterCategory);
    }
    if (filterPriority !== "all") {
      filtered = filtered.filter((r) => r.priority === filterPriority);
    }
    if (filterStatus !== "all") {
      filtered = filtered.filter((r) => r.status === filterStatus);
    }
    if (searchQuery) {
      filtered = filtered.filter(
        (r) =>
          r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          r.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          r.linkedEntity?.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    const overdue = filtered.filter((r) => {
      const dueDate = new Date(r.dueDate);
      dueDate.setHours(0, 0, 0, 0);
      return r.status !== "completed" && dueDate < today;
    });

    const todayReminders = filtered.filter((r) => {
      const dueDate = new Date(r.dueDate);
      dueDate.setHours(0, 0, 0, 0);
      return r.status !== "completed" && dueDate.getTime() === today.getTime();
    });

    const upcoming = filtered.filter((r) => {
      const dueDate = new Date(r.dueDate);
      dueDate.setHours(0, 0, 0, 0);
      return r.status !== "completed" && dueDate > today;
    });

    const completed = filtered.filter((r) => r.status === "completed");

    return { overdue, today: todayReminders, upcoming, completed };
  }, [
    reminders,
    filterCategory,
    filterPriority,
    filterStatus,
    searchQuery,
    today,
  ]);

  const stats = useMemo(() => {
    const total = reminders.length;
    const overdueCount = reminders.filter((r) => {
      const dueDate = new Date(r.dueDate);
      dueDate.setHours(0, 0, 0, 0);
      return r.status !== "completed" && dueDate < today;
    }).length;
    const todayCount = reminders.filter((r) => {
      const dueDate = new Date(r.dueDate);
      dueDate.setHours(0, 0, 0, 0);
      return r.status !== "completed" && dueDate.getTime() === today.getTime();
    }).length;
    const completedCount = reminders.filter(
      (r) => r.status === "completed"
    ).length;

    return {
      total,
      overdue: overdueCount,
      today: todayCount,
      completed: completedCount,
    };
  }, [reminders, today]);

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Clock className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-gray-600">Total Reminders</p>
              <p className="text-gray-900">{stats.total}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 border border-red-200">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-red-100 rounded-lg">
              <AlertCircle className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <p className="text-gray-600">Overdue</p>
              <p className="text-gray-900">{stats.overdue}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 border border-yellow-200">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-gray-600">Due Today</p>
              <p className="text-gray-900">{stats.today}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 border border-green-200">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-100 rounded-lg">
              <CheckCircle2 className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-gray-600">Completed</p>
              <p className="text-gray-900">{stats.completed}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg p-4 border border-gray-200">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-5 h-5 text-gray-600" />
          <h3 className="text-gray-900">Filters</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-gray-700 mb-2">Search</label>
            <input
              type="text"
              placeholder="Search reminders..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Category</label>
            <select
              value={filterCategory}
              onChange={(e) =>
                setFilterCategory(e.target.value as ReminderCategory | "all")
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Categories</option>
              <option value="audit">Audit</option>
              <option value="certificate">Certificate</option>
              <option value="nc">Non-Conformity</option>
              <option value="invoice">Invoice</option>
              <option value="document">Document</option>
              <option value="contract">Contract</option>
              <option value="competency">Competency</option>
              <option value="meeting">Meeting</option>
              <option value="other">Other</option>
              <option value="other">suspension</option>
              <option value="other">withdrawal</option>
              <option value="other">terminate</option>
              <option value="other">stage 1</option>
              <option value="other">stage 2</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Priority</label>
            <select
              value={filterPriority}
              onChange={(e) =>
                setFilterPriority(e.target.value as ReminderPriority | "all")
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Priorities</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Status</label>
            <select
              value={filterStatus}
              onChange={(e) =>
                setFilterStatus(e.target.value as ReminderStatus | "all")
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="snoozed">Snoozed</option>
              <option value="overdue">Overdue</option>
            </select>
          </div>
        </div>
      </div>

      {/* Overdue Reminders */}
      {categorizedReminders.overdue.length > 0 && (
        <div>
          <h2 className="text-red-600 mb-4 flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            Overdue ({categorizedReminders.overdue.length})
          </h2>
          <div className="space-y-3">
            {categorizedReminders.overdue.map((reminder) => (
              <ReminderCard
                key={reminder.id}
                reminder={reminder}
                onView={onViewDetails}
                onComplete={onComplete}
                onSnooze={onSnooze}
                onDelete={onDelete}
              />
            ))}
          </div>
        </div>
      )}

      {/* Today's Reminders */}
      {categorizedReminders.today.length > 0 && (
        <div>
          <h2 className="text-yellow-600 mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Due Today ({categorizedReminders.today.length})
          </h2>
          <div className="space-y-3">
            {categorizedReminders.today.map((reminder) => (
              <ReminderCard
                key={reminder.id}
                reminder={reminder}
                onView={onViewDetails}
                onComplete={onComplete}
                onSnooze={onSnooze}
                onDelete={onDelete}
              />
            ))}
          </div>
        </div>
      )}

      {/* Upcoming Reminders */}
      {categorizedReminders.upcoming.length > 0 && (
        <div>
          <h2 className="text-blue-600 mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Upcoming ({categorizedReminders.upcoming.length})
          </h2>
          <div className="space-y-3">
            {categorizedReminders.upcoming.map((reminder) => (
              <ReminderCard
                key={reminder.id}
                reminder={reminder}
                onView={onViewDetails}
                onComplete={onComplete}
                onSnooze={onSnooze}
                onDelete={onDelete}
              />
            ))}
          </div>
        </div>
      )}

      {/* Completed Reminders */}
      {categorizedReminders.completed.length > 0 && (
        <div>
          <h2 className="text-green-600 mb-4 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5" />
            Completed ({categorizedReminders.completed.length})
          </h2>
          <div className="space-y-3">
            {categorizedReminders.completed.map((reminder) => (
              <ReminderCard
                key={reminder.id}
                reminder={reminder}
                onView={onViewDetails}
                onComplete={onComplete}
                onSnooze={onSnooze}
                onDelete={onDelete}
              />
            ))}
          </div>
        </div>
      )}

      {/* No Results */}
      {categorizedReminders.overdue.length === 0 &&
        categorizedReminders.today.length === 0 &&
        categorizedReminders.upcoming.length === 0 &&
        categorizedReminders.completed.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
            <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No reminders found</p>
            <p className="text-gray-500">
              Try adjusting your filters or create a new reminder
            </p>
          </div>
        )}
    </div>
  );
}
