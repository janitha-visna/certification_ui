import { Calendar, Clock, MapPin, Users } from 'lucide-react';

export function AuditTimeline() {
  const auditEvents = [
    {
      time: '09:00 AM',
      title: 'Opening Meeting',
      description: 'Introduction and audit plan review',
      attendees: 5,
      location: 'Conference Room A',
    },
    {
      time: '10:00 AM',
      title: 'Document Review',
      description: 'Quality management system documentation',
      attendees: 3,
      location: 'QA Department',
    },
    {
      time: '12:00 PM',
      title: 'Lunch Break',
      description: 'Break',
      attendees: 0,
      location: '',
    },
    {
      time: '01:00 PM',
      title: 'Process Observation',
      description: 'Manufacturing floor inspection',
      attendees: 4,
      location: 'Production Floor',
    },
    {
      time: '03:00 PM',
      title: 'Interviews',
      description: 'Staff interviews and competency verification',
      attendees: 6,
      location: 'Meeting Room B',
    },
    {
      time: '04:30 PM',
      title: 'Closing Meeting',
      description: 'Findings presentation and next steps',
      attendees: 8,
      location: 'Conference Room A',
    },
  ];

  return (
    <div className="space-y-4">
      <h4 className="text-gray-900 dark:text-white flex items-center gap-2">
        <Calendar className="w-4 h-4" />
        Audit Day Timeline
      </h4>

      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700" />

        {/* Events */}
        <div className="space-y-4">
          {auditEvents.map((event, index) => (
            <div key={index} className="relative flex gap-4">
              {/* Time Marker */}
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-950 border-4 border-white dark:border-gray-900 flex items-center justify-center z-10">
                  <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
              </div>

              {/* Event Card */}
              <div className="flex-1 pb-4">
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="text-sm text-blue-600 dark:text-blue-400">
                        {event.time}
                      </p>
                      <h5 className="text-gray-900 dark:text-white mt-1">
                        {event.title}
                      </h5>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    {event.description}
                  </p>

                  {event.attendees > 0 && (
                    <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                      <div className="flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5" />
                        <span>{event.attendees} attendees</span>
                      </div>
                      {event.location && (
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5" />
                          <span>{event.location}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
