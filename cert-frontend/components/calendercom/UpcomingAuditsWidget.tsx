import { Calendar, MapPin, Video, ChevronRight } from 'lucide-react';
import type { AuditEvent } from '@/app/calender/page';

interface UpcomingAuditsWidgetProps {
  events: AuditEvent[];
}

export function UpcomingAuditsWidget({ events }: UpcomingAuditsWidgetProps) {
  const today = new Date();
  const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);

  const upcomingEvents = events
    .filter(event => {
      const eventDate = new Date(event.startDate);
      return eventDate >= today && eventDate <= nextWeek && event.status !== 'Completed' && event.status !== 'Canceled';
    })
    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
    .slice(0, 3);

  if (upcomingEvents.length === 0) return null;

  return (
    <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 mb-6 text-white">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          <h3 className="text-white">Upcoming Audits (Next 7 Days)</h3>
        </div>
        <span className="px-3 py-1 bg-white/20 rounded-full text-sm">
          {upcomingEvents.length} {upcomingEvents.length === 1 ? 'audit' : 'audits'}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {upcomingEvents.map((event) => (
          <div
            key={event.id}
            className="bg-white/10 backdrop-blur-sm rounded-lg p-4 hover:bg-white/20 transition-all cursor-pointer group"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <p className="text-white mb-1">{event.clientName}</p>
                <p className="text-sm text-white/80">{event.auditType}</p>
              </div>
              {event.locationType === 'Remote' ? (
                <Video className="w-4 h-4 text-white/60" />
              ) : (
                <MapPin className="w-4 h-4 text-white/60" />
              )}
            </div>

            <div className="flex items-center gap-2 mb-3">
              {event.auditors.slice(0, 2).map((auditor) => (
                <div
                  key={auditor.id}
                  className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs text-white"
                >
                  {auditor.initials}
                </div>
              ))}
              {event.auditors.length > 2 && (
                <span className="text-xs text-white/80">+{event.auditors.length - 2}</span>
              )}
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-white/80">
                {new Date(event.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </span>
              <ChevronRight className="w-4 h-4 text-white/60 group-hover:text-white group-hover:translate-x-1 transition-all" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
