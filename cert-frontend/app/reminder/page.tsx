"use client";

import React, { useState } from "react";


import { ReminderDashboard } from "@/components/ReminderDashboard";
import { AddReminder } from "@/components/AddReminder";
import { ReminderDetails } from "@/components/ReminderDetails";
import {CalendarView} from "@/components/CalendarView";
import { NotificationBell } from "@/components/NotificationBell";

import { mockReminders } from "@/data/mockData";
import type { Reminder } from "@/types/reminder";

type View = "dashboard" | "add" | "details" | "calendar";

export default function Page() {
  const [currentView, setCurrentView] = useState<View>("dashboard");
  const [reminders, setReminders] = useState<Reminder[]>(mockReminders);
  const [selectedReminder, setSelectedReminder] = useState<Reminder | null>(null);

  const handleAddReminder = (reminder: Reminder) => {
    setReminders([...reminders, reminder]);
    setCurrentView("dashboard");
  };

  const handleEditReminder = (updatedReminder: Reminder) => {
    setReminders(
      reminders.map((r) =>
        r.id === updatedReminder.id ? updatedReminder : r
      )
    );
    setCurrentView("dashboard");
  };

  const handleDeleteReminder = (id: string) => {
    setReminders(reminders.filter((r) => r.id !== id));
    setCurrentView("dashboard");
  };

  const handleViewDetails = (reminder: Reminder) => {
    setSelectedReminder(reminder);
    setCurrentView("details");
  };

  const handleSnoozeReminder = (id: string, snoozeUntil: Date) => {
    setReminders(
      reminders.map((r) =>
        r.id === id ? { ...r, snoozedUntil: snoozeUntil } : r
      )
    );
  };

  const handleCompleteReminder = (id: string) => {
    setReminders(
      reminders.map((r) =>
        r.id === id ? { ...r, status: "completed" } : r
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-gray-900">Reminder Management System</h1>
              <p className="text-gray-600">Certification Body Activity Tracker</p>
            </div>
            <NotificationBell reminders={reminders} />
          </div>

          {/* Navigation */}
          <nav className="flex gap-4 mt-4">
            <button
              onClick={() => setCurrentView("dashboard")}
              className={`px-4 py-2 rounded-lg transition-colors ${
                currentView === "dashboard"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Dashboard
            </button>

            <button
              onClick={() => setCurrentView("calendar")}
              className={`px-4 py-2 rounded-lg transition-colors ${
                currentView === "calendar"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Calendar
            </button>

            <button
              onClick={() => {
                setSelectedReminder(null);
                setCurrentView("add");
              }}
              className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-colors ml-auto"
            >
              + New Reminder
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentView === "dashboard" && (
          <ReminderDashboard
            reminders={reminders}
            onViewDetails={handleViewDetails}
            onComplete={handleCompleteReminder}
            onSnooze={handleSnoozeReminder}
            onDelete={handleDeleteReminder}
          />
        )}

        {currentView === "add" && (
          <AddReminder
            onSave={handleAddReminder}
            onCancel={() => setCurrentView("dashboard")}
          />
        )}

        {currentView === "details" && selectedReminder && (
          <ReminderDetails
            reminder={selectedReminder}
            onEdit={(reminder) => {
              setSelectedReminder(reminder);
              setCurrentView("add");
            }}
            onComplete={handleCompleteReminder}
            onSnooze={handleSnoozeReminder}
            onDelete={handleDeleteReminder}
            onBack={() => setCurrentView("dashboard")}
          />
        )}

        {/* {currentView === "calendar" && (
          // <CalendarView
          //   reminders={reminders}
          //   onReminderClick={handleViewDetails}
          // />
        )} */}
      </main>
    </div>
  );
}
