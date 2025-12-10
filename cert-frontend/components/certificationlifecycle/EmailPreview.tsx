import { Mail, Send, Calendar, Clock } from 'lucide-react';
import { useState } from 'react';

export function EmailPreview() {
  const [scheduledDate, setScheduledDate] = useState('2024-06-15');
  const [scheduledTime, setScheduledTime] = useState('10:00');

  return (
    <div className="space-y-4">
      <h4 className="text-gray-900 dark:text-white flex items-center gap-2">
        <Mail className="w-4 h-4" />
        Email Notification
      </h4>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Email Preview */}
        <div className="space-y-4">
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
            {/* Email Header */}
            <div className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700 px-4 py-3">
              <div className="space-y-2 text-sm">
                <div className="flex gap-2">
                  <span className="text-gray-500 dark:text-gray-400 w-12">To:</span>
                  <span className="text-gray-900 dark:text-white">client@acmemanufacturing.com</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-gray-500 dark:text-gray-400 w-12">From:</span>
                  <span className="text-gray-900 dark:text-white">auditor@certifypro.com</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-gray-500 dark:text-gray-400 w-12">Subject:</span>
                  <span className="text-gray-900 dark:text-white">Surveillance Audit Notification</span>
                </div>
              </div>
            </div>

            {/* Email Body */}
            <div className="p-6 space-y-4">
              <p className="text-gray-900 dark:text-white">Dear Client,</p>
              
              <p className="text-sm text-gray-600 dark:text-gray-400">
                We are pleased to inform you that your upcoming Surveillance I Audit has been scheduled.
              </p>

              <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 rounded-lg p-4">
                <p className="text-sm text-blue-900 dark:text-blue-100 mb-2">Audit Details:</p>
                <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                  <li>• Date: {scheduledDate}</li>
                  <li>• Time: {scheduledTime}</li>
                  <li>• Type: Surveillance I Audit</li>
                  <li>• Standard: ISO 9001:2015</li>
                </ul>
              </div>

              <p className="text-sm text-gray-600 dark:text-gray-400">
                Please ensure all relevant documentation and personnel are available on the scheduled date.
              </p>

              <p className="text-sm text-gray-600 dark:text-gray-400">
                Best regards,<br />
                CertifyPro Audit Team
              </p>
            </div>
          </div>
        </div>

        {/* Scheduling Panel */}
        <div className="space-y-4">
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <h5 className="text-gray-900 dark:text-white mb-4">Schedule Notification</h5>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">
                  Audit Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="date"
                    value={scheduledDate}
                    onChange={(e) => setScheduledDate(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">
                  Audit Time
                </label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="time"
                    value={scheduledTime}
                    onChange={(e) => setScheduledTime(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">
                  Additional Notes
                </label>
                <textarea
                  rows={4}
                  placeholder="Add any special instructions or requirements..."
                  className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white placeholder-gray-400"
                />
              </div>
            </div>
          </div>

          <button className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all">
            <Send className="w-4 h-4" />
            Send Notification
          </button>
        </div>
      </div>
    </div>
  );
}
