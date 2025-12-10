import type { Reminder } from '../types/reminder';

export const mockReminders: Reminder[] = [
  {
    id: '1',
    title: 'ISO 9001 Certificate Expiry - ABC Manufacturing',
    description: 'Certificate expires in 30 days. Schedule recertification audit.',
    category: 'certificate',
    dueDate: new Date(2025, 0, 15),
    priority: 'high',
    status: 'pending',
    recurrence: 'none',
    assignedTo: 'Sarah Johnson',
    linkedEntity: {
      type: 'client',
      id: 'c1',
      name: 'ABC Manufacturing Ltd.'
    },
    notifications: ['email', 'in-app'],
    notes: 'Client requested early notification',
    createdAt: new Date(2024, 11, 1),
    updatedAt: new Date(2024, 11, 1),
    createdBy: 'System',
    isSystemGenerated: true,
    history: [
      {
        id: 'h1',
        action: 'Created',
        user: 'System',
        timestamp: new Date(2024, 11, 1),
        details: 'Auto-generated 90 days before expiry'
      }
    ]
  },
  {
    id: '2',
    title: 'Surveillance Audit 1 - XYZ Tech Solutions',
    description: 'First surveillance audit due. Stage 1 completed on Jan 10, 2024.',
    category: 'audit',
    dueDate: new Date(2025, 0, 10),
    priority: 'high',
    status: 'pending',
    recurrence: 'none',
    assignedTo: 'Michael Chen',
    linkedEntity: {
      type: 'client',
      id: 'c2',
      name: 'XYZ Tech Solutions'
    },
    notifications: ['email', 'in-app', 'sms'],
    createdAt: new Date(2024, 10, 15),
    updatedAt: new Date(2024, 10, 15),
    createdBy: 'System',
    isSystemGenerated: true,
    history: [
      {
        id: 'h2',
        action: 'Created',
        user: 'System',
        timestamp: new Date(2024, 10, 15)
      }
    ]
  },
  {
    id: '3',
    title: 'NC Closing Deadline - Global Foods Inc.',
    description: 'Major non-conformity must be closed within 30 days.',
    category: 'nc',
    dueDate: new Date(2024, 11, 20),
    priority: 'high',
    status: 'overdue',
    recurrence: 'none',
    assignedTo: 'Sarah Johnson',
    linkedEntity: {
      type: 'client',
      id: 'c3',
      name: 'Global Foods Inc.'
    },
    notifications: ['email', 'in-app'],
    notes: 'Major NC found during Stage 2 audit. Client needs to submit corrective action plan.',
    createdAt: new Date(2024, 10, 20),
    updatedAt: new Date(2024, 11, 5),
    createdBy: 'Sarah Johnson',
    isSystemGenerated: false,
    history: [
      {
        id: 'h3',
        action: 'Created',
        user: 'Sarah Johnson',
        timestamp: new Date(2024, 10, 20)
      },
      {
        id: 'h4',
        action: 'Reminder sent',
        user: 'System',
        timestamp: new Date(2024, 11, 5),
        details: 'Email reminder sent to client'
      }
    ]
  },
  {
    id: '4',
    title: 'Invoice Payment Due - Stellar Manufacturing',
    description: 'Invoice #INV-2024-456 payment due (Stage 2 Audit)',
    category: 'invoice',
    dueDate: new Date(2025, 0, 5),
    priority: 'medium',
    status: 'pending',
    recurrence: 'none',
    assignedTo: 'Finance Team',
    linkedEntity: {
      type: 'client',
      id: 'c4',
      name: 'Stellar Manufacturing'
    },
    notifications: ['email'],
    createdAt: new Date(2024, 11, 6),
    updatedAt: new Date(2024, 11, 6),
    createdBy: 'System',
    isSystemGenerated: true,
    history: [
      {
        id: 'h5',
        action: 'Created',
        user: 'System',
        timestamp: new Date(2024, 11, 6)
      }
    ]
  },
  {
    id: '5',
    title: 'Auditor CV Update - John Smith',
    description: 'Annual CV and qualifications update required',
    category: 'document',
    dueDate: new Date(2025, 0, 31),
    priority: 'medium',
    status: 'pending',
    recurrence: 'yearly',
    assignedTo: 'HR Department',
    linkedEntity: {
      type: 'auditor',
      id: 'a1',
      name: 'John Smith'
    },
    notifications: ['email', 'in-app'],
    createdAt: new Date(2024, 11, 1),
    updatedAt: new Date(2024, 11, 1),
    createdBy: 'System',
    isSystemGenerated: true,
    history: [
      {
        id: 'h6',
        action: 'Created',
        user: 'System',
        timestamp: new Date(2024, 11, 1)
      }
    ]
  },
  {
    id: '6',
    title: 'Contract Renewal - Premium Services Ltd.',
    description: 'Annual service contract expires. Prepare renewal documents.',
    category: 'contract',
    dueDate: new Date(2025, 1, 1),
    priority: 'high',
    status: 'pending',
    recurrence: 'yearly',
    assignedTo: 'Business Development',
    linkedEntity: {
      type: 'client',
      id: 'c5',
      name: 'Premium Services Ltd.'
    },
    notifications: ['email', 'in-app'],
    createdAt: new Date(2024, 10, 1),
    updatedAt: new Date(2024, 10, 1),
    createdBy: 'System',
    isSystemGenerated: true,
    history: [
      {
        id: 'h7',
        action: 'Created',
        user: 'System',
        timestamp: new Date(2024, 10, 1)
      }
    ]
  },
  {
    id: '7',
    title: 'Auditor Competency Review - Emily Davis',
    description: 'Annual competency assessment and evaluation',
    category: 'competency',
    dueDate: new Date(2025, 0, 20),
    priority: 'medium',
    status: 'pending',
    recurrence: 'yearly',
    assignedTo: 'Technical Manager',
    linkedEntity: {
      type: 'auditor',
      id: 'a2',
      name: 'Emily Davis'
    },
    notifications: ['email', 'in-app'],
    createdAt: new Date(2024, 11, 1),
    updatedAt: new Date(2024, 11, 1),
    createdBy: 'System',
    isSystemGenerated: true,
    history: [
      {
        id: 'h8',
        action: 'Created',
        user: 'System',
        timestamp: new Date(2024, 11, 1)
      }
    ]
  },
  {
    id: '8',
    title: 'Management Review Meeting',
    description: 'Quarterly management review meeting - Q1 2025',
    category: 'meeting',
    dueDate: new Date(2025, 2, 15),
    priority: 'medium',
    status: 'pending',
    recurrence: 'custom',
    assignedTo: 'Management Team',
    notifications: ['email', 'in-app'],
    notes: 'Prepare KPI reports and audit statistics',
    createdAt: new Date(2024, 11, 1),
    updatedAt: new Date(2024, 11, 1),
    createdBy: 'Admin',
    isSystemGenerated: false,
    history: [
      {
        id: 'h9',
        action: 'Created',
        user: 'Admin',
        timestamp: new Date(2024, 11, 1)
      }
    ]
  },
  {
    id: '9',
    title: 'Witness Audit - Regional Office',
    description: 'Witness audit scheduled for lead auditor certification',
    category: 'audit',
    dueDate: new Date(2025, 0, 25),
    priority: 'high',
    status: 'pending',
    recurrence: 'none',
    assignedTo: 'Quality Manager',
    notifications: ['email', 'in-app'],
    createdAt: new Date(2024, 11, 15),
    updatedAt: new Date(2024, 11, 15),
    createdBy: 'Quality Manager',
    isSystemGenerated: false,
    history: [
      {
        id: 'h10',
        action: 'Created',
        user: 'Quality Manager',
        timestamp: new Date(2024, 11, 15)
      }
    ]
  },
  {
    id: '10',
    title: 'Internal Audit - ISO 17021 Compliance',
    description: 'Semi-annual internal audit of CB processes',
    category: 'audit',
    dueDate: new Date(2025, 5, 30),
    priority: 'medium',
    status: 'pending',
    recurrence: 'custom',
    assignedTo: 'Internal Auditor',
    notifications: ['email', 'in-app'],
    createdAt: new Date(2024, 11, 1),
    updatedAt: new Date(2024, 11, 1),
    createdBy: 'System',
    isSystemGenerated: true,
    history: [
      {
        id: 'h11',
        action: 'Created',
        user: 'System',
        timestamp: new Date(2024, 11, 1)
      }
    ]
  }
];
