import { X, MapPin, Video, Calendar, Clock, Users, FileText, CheckCircle, AlertCircle, Bell } from 'lucide-react';
import type { AuditEvent } from '@/app/calender/page';

interface AuditDetailPanelProps {
  event: AuditEvent;
  onClose: () => void;
}

export function AuditDetailPanel({ event, onClose }: AuditDetailPanelProps) {
  const stages = [
    'Pre-Stage 1',
    'Stage 1',
    'Pre-Stage 2',
    'Stage 2',
    'Certification Committee',
    'Surveillance I',
    'Surveillance II',
  ];

  const currentStageIndex = stages.indexOf(event.currentStage);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Planned':
        return 'bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300 border-yellow-300 dark:border-yellow-700';
      case 'Confirmed':
        return 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 border-green-300 dark:border-green-700';
      case 'Completed':
        return 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-700';
      case 'Canceled':
        return 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 border-red-300 dark:border-red-700';
      case 'Pending':
        return 'bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300 border-orange-300 dark:border-orange-700';
      default:
        return 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300';
    }
  };

  const getAuditTypeColor = (type: string) => {
    switch (type) {
      case 'Stage 1':
        return 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300';
      case 'Stage 2':
        return 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300';
      case 'Surveillance I':
      case 'Surveillance II':
        return 'bg-cyan-100 dark:bg-cyan-900 text-cyan-700 dark:text-cyan-300';
      case 'Recertification':
        return 'bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300';
      default:
        return 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300';
    }
  };

  return (
    <div className="w-[480px] bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-800 flex flex-col overflow-hidden animate-slide-in">
      {/* Header */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h2 className="text-gray-900 dark:text-white mb-2">{event.clientName}</h2>
            <div className="flex items-center gap-2">
              <span className={`px-3 py-1 rounded-full text-sm ${getAuditTypeColor(event.auditType)}`}>
                {event.auditType}
              </span>
              <span className={`px-3 py-1 rounded-full text-sm border ${getStatusColor(event.status)}`}>
                {event.status}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400">{event.standard}</p>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Audit Information */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-800">
          <h3 className="text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Audit Information
          </h3>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">Start Date</span>
              <span className="text-sm text-gray-900 dark:text-white">
                {new Date(event.startDate).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">End Date</span>
              <span className="text-sm text-gray-900 dark:text-white">
                {new Date(event.endDate).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">Duration</span>
              <span className="text-sm text-gray-900 dark:text-white">
                {event.duration} {event.duration === 1 ? 'day' : 'days'}
              </span>
            </div>

            <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Assigned Auditors</p>
              <div className="flex flex-wrap gap-2">
                {event.auditors.map((auditor) => (
                  <div
                    key={auditor.id}
                    className="flex items-center gap-2 px-3 py-2 bg-gray-50 dark:bg-gray-800 rounded-lg"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-xs text-white">
                      {auditor.initials}
                    </div>
                    <span className="text-sm text-gray-900 dark:text-white">{auditor.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Coordinator</span>
                <span className="text-sm text-gray-900 dark:text-white">{event.coordinator}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Location Details */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-800">
          <h3 className="text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            {event.locationType === 'Remote' ? (
              <Video className="w-4 h-4" />
            ) : (
              <MapPin className="w-4 h-4" />
            )}
            Location Details
          </h3>
          
          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <span className={`px-2 py-1 rounded text-xs ${
                event.locationType === 'Remote'
                  ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                  : 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
              }`}>
                {event.locationType}
              </span>
            </div>
            <p className="text-sm text-gray-900 dark:text-white">
              {event.location}
            </p>
          </div>
        </div>

        {/* Audit Workflow Stage */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-800">
          <h3 className="text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            Audit Workflow Stage
          </h3>
          
          <div className="space-y-2">
            {stages.map((stage, index) => {
              const isActive = index === currentStageIndex;
              const isCompleted = index < currentStageIndex;
              
              return (
                <div
                  key={stage}
                  className={`flex items-center gap-3 p-3 rounded-lg ${
                    isActive
                      ? 'bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900'
                      : isCompleted
                      ? 'bg-green-50 dark:bg-green-950/30'
                      : 'bg-gray-50 dark:bg-gray-800'
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                      isActive
                        ? 'bg-blue-500 text-white'
                        : isCompleted
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-300 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                    }`}
                  >
                    {isCompleted ? '✓' : index + 1}
                  </div>
                  <span
                    className={`text-sm ${
                      isActive || isCompleted
                        ? 'text-gray-900 dark:text-white'
                        : 'text-gray-500 dark:text-gray-400'
                    }`}
                  >
                    {stage}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Important Files */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-800">
          <h3 className="text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Important Files
          </h3>
          
          {event.files.length > 0 ? (
            <div className="space-y-2">
              {event.files.map((file) => (
                <div
                  key={file.id}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded flex items-center justify-center">
                      <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <span className="text-sm text-gray-900 dark:text-white">{file.name}</span>
                  </div>
                  <button className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">
                    View
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">
              No files uploaded yet
            </p>
          )}
        </div>

        {/* Reminders & Alerts */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-800">
          <h3 className="text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Bell className="w-4 h-4" />
            Reminders & Alerts
          </h3>
          
          <div className="space-y-2">
            <div className="flex items-start gap-3 p-3 bg-yellow-50 dark:bg-yellow-950/30 border border-yellow-200 dark:border-yellow-900 rounded-lg">
              <AlertCircle className="w-4 h-4 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-yellow-900 dark:text-yellow-100">
                  Audit reminder
                </p>
                <p className="text-xs text-yellow-700 dark:text-yellow-300 mt-1">
                  7 days before audit start
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 rounded-lg">
              <AlertCircle className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-blue-900 dark:text-blue-100">
                  Final preparation
                </p>
                <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">
                  1 day before audit start
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Notes */}
        <div className="p-6">
          <h3 className="text-gray-900 dark:text-white mb-4">Notes</h3>
          
          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              {event.notes || 'No notes added yet.'}
            </p>
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="p-6 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
        <div className="flex gap-3">
          <button className="flex-1 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            Edit Audit
          </button>
          <button className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
            View Full Details
          </button>
        </div>
      </div>
    </div>
  );
}
