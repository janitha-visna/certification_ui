"use client";

import { useState } from 'react';
import { CalendarView } from '@/components/CalendarView';
import { FilterSidebar } from '@/components/calendercom/FilterSidebar';
import { AuditDetailPanel } from '@/components/calendercom/AuditDetailPanel';
import { TopNavigation } from '@/components/calendercom/TopNavigation';
import { UpcomingAuditsWidget } from '@/components/calendercom/UpcomingAuditsWidget';
import { ThemeProvider } from '@/components/calendercom/ThemeProvider';


export interface AuditEvent {
  id: string;
  clientName: string;
  auditType: 'Stage 1' | 'Stage 2' | 'Surveillance I' | 'Surveillance II' | 'Recertification';
  standard: string;
  auditors: Array<{ id: string; name: string; initials: string; avatar?: string }>;
  coordinator: string;
  status: 'Planned' | 'Confirmed' | 'Completed' | 'Canceled' | 'Pending';
  startDate: Date;
  endDate: Date;
  duration: number;
  locationType: 'On-site' | 'Remote';
  location: string;
  currentStage: string;
  files: Array<{ id: string; name: string; type: string }>;
  notes: string;
  color: string;
}

const mockAuditEvents: AuditEvent[] = [
  {
    id: '1',
    clientName: 'Acme Manufacturing Ltd.',
    auditType: 'Stage 2',
    standard: 'ISO 9001:2015',
    auditors: [
      { id: 'a1', name: 'John Smith', initials: 'JS' },
      { id: 'a2', name: 'Sarah Chen', initials: 'SC' },
    ],
    coordinator: 'Michael Brown',
    status: 'Confirmed',
    startDate: new Date(2024, 11, 15),
    endDate: new Date(2024, 11, 16),
    duration: 2,
    locationType: 'On-site',
    location: '1234 Industrial Pkwy, Austin, TX',
    currentStage: 'Stage 2',
    files: [
      { id: 'f1', name: 'Stage 2 Audit Plan.pdf', type: 'pdf' },
      { id: 'f2', name: 'Confirmation Email.msg', type: 'email' },
    ],
    notes: 'Client requested morning start. Production line observation required.',
    color: '#10b981',
  },
  {
    id: '2',
    clientName: 'TechSecure Inc.',
    auditType: 'Surveillance I',
    standard: 'ISO 27001:2022',
    auditors: [{ id: 'a3', name: 'David Kim', initials: 'DK' }],
    coordinator: 'Emily Wilson',
    status: 'Planned',
    startDate: new Date(2024, 11, 18),
    endDate: new Date(2024, 11, 18),
    duration: 1,
    locationType: 'Remote',
    location: 'https://meet.certifypro.com/techsecure-surv1',
    currentStage: 'Surveillance I',
    files: [{ id: 'f3', name: 'Surveillance Plan.pdf', type: 'pdf' }],
    notes: 'Remote audit via video conference. ISMS documentation review.',
    color: '#eab308',
  },
  {
    id: '3',
    clientName: 'Global Logistics Co.',
    auditType: 'Stage 1',
    standard: 'ISO 9001:2015',
    auditors: [{ id: 'a4', name: 'Maria Garcia', initials: 'MG' }],
    coordinator: 'Michael Brown',
    status: 'Pending',
    startDate: new Date(2024, 11, 20),
    endDate: new Date(2024, 11, 20),
    duration: 1,
    locationType: 'On-site',
    location: '5678 Commerce Blvd, Denver, CO',
    currentStage: 'Pre-Stage 1',
    files: [],
    notes: 'Waiting for client confirmation of date.',
    color: '#f97316',
  },
  {
    id: '4',
    clientName: 'MediCare Solutions',
    auditType: 'Recertification',
    standard: 'ISO 13485:2016',
    auditors: [
      { id: 'a5', name: 'Robert Taylor', initials: 'RT' },
      { id: 'a6', name: 'Lisa Anderson', initials: 'LA' },
    ],
    coordinator: 'Emily Wilson',
    status: 'Confirmed',
    startDate: new Date(2024, 11, 22),
    endDate: new Date(2024, 11, 24),
    duration: 3,
    locationType: 'On-site',
    location: '910 Medical Center Dr, Boston, MA',
    currentStage: 'Stage 2',
    files: [
      { id: 'f4', name: 'Recertification Audit Plan.pdf', type: 'pdf' },
      { id: 'f5', name: 'Previous Audit Report.pdf', type: 'pdf' },
    ],
    notes: 'Medical device manufacturer. Clean room inspection required.',
    color: '#10b981',
  },
  {
    id: '5',
    clientName: 'EcoEnergy Systems',
    auditType: 'Surveillance II',
    standard: 'ISO 14001:2015',
    auditors: [{ id: 'a7', name: 'James Wilson', initials: 'JW' }],
    coordinator: 'Michael Brown',
    status: 'Completed',
    startDate: new Date(2024, 11, 10),
    endDate: new Date(2024, 11, 10),
    duration: 1,
    locationType: 'On-site',
    location: '2345 Green Energy Rd, Portland, OR',
    currentStage: 'Surveillance II',
    files: [
      { id: 'f6', name: 'Surveillance II Report.pdf', type: 'pdf' },
      { id: 'f7', name: 'Attendance Sheet.pdf', type: 'pdf' },
      { id: 'f8', name: 'NC Report.pdf', type: 'pdf' },
    ],
    notes: 'Audit completed. One minor NC raised regarding waste documentation.',
    color: '#6b7280',
  },
  {
    id: '6',
    clientName: 'FinTech Innovations',
    auditType: 'Stage 1',
    standard: 'ISO 27001:2022',
    auditors: [{ id: 'a8', name: 'Anna Martinez', initials: 'AM' }],
    coordinator: 'Emily Wilson',
    status: 'Confirmed',
    startDate: new Date(2024, 11, 28),
    endDate: new Date(2024, 11, 28),
    duration: 1,
    locationType: 'Remote',
    location: 'https://meet.certifypro.com/fintech-stage1',
    currentStage: 'Stage 1',
    files: [{ id: 'f9', name: 'Stage 1 Audit Plan.pdf', type: 'pdf' }],
    notes: 'Focus on information security policies and risk assessment.',
    color: '#10b981',
  },
];

export default function App() {
  const [selectedEvent, setSelectedEvent] = useState<AuditEvent | null>(null);
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'day'>('month');
  const [currentDate, setCurrentDate] = useState(new Date(2024, 11, 1));
  const [filters, setFilters] = useState({
    auditor: '',
    client: '',
    auditType: '',
    standard: '',
    status: '',
  });

  const filteredEvents = mockAuditEvents.filter((event) => {
    if (filters.auditor && !event.auditors.some(a => a.name.includes(filters.auditor))) return false;
    if (filters.client && !event.clientName.toLowerCase().includes(filters.client.toLowerCase())) return false;
    if (filters.auditType && event.auditType !== filters.auditType) return false;
    if (filters.standard && event.standard !== filters.standard) return false;
    if (filters.status && event.status !== filters.status) return false;
    return true;
  });

  return (
    <ThemeProvider>
      <div className="flex h-screen bg-gray-50 dark:bg-gray-950">
        <FilterSidebar filters={filters} setFilters={setFilters} />
        
        <div className="flex-1 flex flex-col overflow-hidden">
          <TopNavigation 
            viewMode={viewMode} 
            setViewMode={setViewMode}
            currentDate={currentDate}
            setCurrentDate={setCurrentDate}
          />
          
          <main className="flex-1 overflow-hidden flex">
            <div className="flex-1 overflow-y-auto p-6">
              <UpcomingAuditsWidget events={mockAuditEvents} />
              
              <CalendarView
                events={filteredEvents}
                viewMode={viewMode}
                currentDate={currentDate}
                onEventClick={setSelectedEvent}
              />
            </div>
            
            {selectedEvent && (
              <AuditDetailPanel
                event={selectedEvent}
                onClose={() => setSelectedEvent(null)}
              />
            )}
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
}
