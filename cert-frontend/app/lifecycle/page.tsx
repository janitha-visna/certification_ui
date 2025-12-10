"use client";

import { useState } from "react";
import { Sidebar } from "@/components/certificationlifecycle/Sidebar";
import { TopBar } from "@/components/certificationlifecycle/TopBar";
import { ProgressTimeline } from "@/components/certificationlifecycle/ProgressTimeline";
import { StageCard } from "@/components/certificationlifecycle/StageCard";
import { ClientSelector } from "@/components/certificationlifecycle/ClientSelector";
import { ThemeProvider } from "@/components/certificationlifecycle/ThemeProvider";


export type StageStatus = "not-started" | "in-progress" | "completed";

export interface Document {
  id: string;
  name: string;
  uploaded: boolean;
  uploadDate?: string;
  fileUrl?: string;
}

export interface Stage {
  id: string;
  name: string;
  shortName: string;
  status: StageStatus;
  documents: Document[];
  progress: number;
  type: "standard" | "audit" | "review" | "surveillance";
  nonConformities?: {
    major: number;
    minor: number;
  };
}

const initialStages: Stage[] = [
  {
    id: 'pre-stage-1',
    name: 'Pre-Stage 1 Activities',
    shortName: 'Pre-Stage 1',
    status: 'in-progress',
    progress: 50,
    type: 'standard',
    documents: [
      { id: 'doc-1', name: 'Application form for Certification', uploaded: true, uploadDate: '2024-01-15' },
      { id: 'doc-2', name: 'Application acknowledgement', uploaded: true, uploadDate: '2024-01-16' },
      { id: 'doc-3', name: 'Application Review', uploaded: true, uploadDate: '2024-01-20' },
      { id: 'doc-4', name: 'Determination of Audit Time', uploaded: false },
      { id: 'doc-5', name: 'Document Review (Adequacy audit report)', uploaded: false },
      { id: 'doc-6', name: 'Mail – date confirmation for Stage 1 audit', uploaded: false },
    ],
  },
  {
    id: 'stage-1',
    name: 'Stage 1 Audit',
    shortName: 'Stage 1',
    status: 'not-started',
    progress: 0,
    type: 'audit',
    documents: [
      { id: 'doc-7', name: 'Stage 1 – Audit Plan and email communications', uploaded: false },
      { id: 'doc-8', name: 'Stage 1 – Audit Report', uploaded: false },
      { id: 'doc-9', name: 'Stage 1 – Signed confidentiality forms', uploaded: false },
      { id: 'doc-10', name: 'Stage 1 – Opening/Closing attendance sheets', uploaded: false },
      { id: 'doc-11', name: 'Stage 1 – Corrective actions communications', uploaded: false },
      { id: 'doc-12', name: 'Stage 1 – Audit log', uploaded: false },
    ],
  },
  {
    id: 'pre-stage-2',
    name: 'Pre-Stage 2 Activities',
    shortName: 'Pre-Stage 2',
    status: 'not-started',
    progress: 0,
    type: 'standard',
    documents: [
      { id: 'doc-13', name: 'Mail – date confirmation for Stage II audit', uploaded: false },
    ],
  },
  {
    id: 'stage-2',
    name: 'Stage 2 Audit',
    shortName: 'Stage 2',
    status: 'not-started',
    progress: 0,
    type: 'audit',
    nonConformities: { major: 0, minor: 0 },
    documents: [
      { id: 'doc-14', name: 'Stage II – Audit Plan and email communications', uploaded: false },
      { id: 'doc-15', name: 'Stage II – Audit Report', uploaded: false },
      { id: 'doc-16', name: 'Stage II – Signed confidentiality forms', uploaded: false },
      { id: 'doc-17', name: 'Stage II – Opening/Closing attendance sheets', uploaded: false },
      { id: 'doc-18', name: 'Stage II – Audit log', uploaded: false },
      { id: 'doc-19', name: 'Stage II – Non-conformity Reports', uploaded: false },
      { id: 'doc-20', name: 'Stage II – Closed NC reports + evidence', uploaded: false },
    ],
  },
  {
    id: 'certification-review',
    name: 'Certification Committee Review',
    shortName: 'Committee Review',
    status: 'not-started',
    progress: 0,
    type: 'review',
    documents: [
      { id: 'doc-21', name: 'Certification Committee Meeting minutes', uploaded: false },
      { id: 'doc-22', name: 'Decision Making form', uploaded: false },
      { id: 'doc-23', name: 'Letter of Award', uploaded: false },
      { id: 'doc-24', name: 'Certificate', uploaded: false },
      { id: 'doc-25', name: 'Certification Agreement', uploaded: false },
      { id: 'doc-26', name: 'Terms & Conditions for Certification', uploaded: false },
      { id: 'doc-27', name: 'Terms & Conditions for use of Certification Mark', uploaded: false },
    ],
  },
  {
    id: 'pre-surveillance-1',
    name: 'Pre-Surveillance I',
    shortName: 'Pre-Surv I',
    status: 'not-started',
    progress: 0,
    type: 'standard',
    documents: [
      { id: 'doc-28', name: 'Notification Letter – Surveillance I Audit', uploaded: false },
    ],
  },
  {
    id: 'surveillance-1',
    name: 'Surveillance I Audit',
    shortName: 'Surveillance I',
    status: 'not-started',
    progress: 0,
    type: 'surveillance',
    nonConformities: { major: 0, minor: 0 },
    documents: [
      { id: 'doc-29', name: 'Surveillance I – Audit Plan', uploaded: false },
      { id: 'doc-30', name: 'Surveillance I – Audit Report', uploaded: false },
      { id: 'doc-31', name: 'Surveillance I – Signed confidentiality forms', uploaded: false },
      { id: 'doc-32', name: 'Surveillance I – Opening/Closing attendance sheets', uploaded: false },
      { id: 'doc-33', name: 'Surveillance I – Non-conformity Report', uploaded: false },
      { id: 'doc-34', name: 'Surveillance I – Closed NC Reports + evidence', uploaded: false },
    ],
  },
  {
    id: 'post-surveillance-1',
    name: 'Post-Surveillance I',
    shortName: 'Post-Surv I',
    status: 'not-started',
    progress: 0,
    type: 'standard',
    documents: [
      { id: 'doc-35', name: 'Letter of Continuation', uploaded: false },
    ],
  },
  {
    id: 'pre-surveillance-2',
    name: 'Pre-Surveillance II',
    shortName: 'Pre-Surv II',
    status: 'not-started',
    progress: 0,
    type: 'standard',
    documents: [
      { id: 'doc-36', name: 'Notification Letter – Surveillance II Audit', uploaded: false },
    ],
  },
  {
    id: 'surveillance-2',
    name: 'Surveillance II Audit',
    shortName: 'Surveillance II',
    status: 'not-started',
    progress: 0,
    type: 'surveillance',
    nonConformities: { major: 0, minor: 0 },
    documents: [
      { id: 'doc-37', name: 'Surveillance II – Audit Plan', uploaded: false },
      { id: 'doc-38', name: 'Surveillance II – Audit Report', uploaded: false },
      { id: 'doc-39', name: 'Surveillance II – Signed confidentiality forms', uploaded: false },
      { id: 'doc-40', name: 'Surveillance II – Opening/Closing attendance sheets', uploaded: false },
      { id: 'doc-41', name: 'Surveillance II – Non-conformity Report', uploaded: false },
      { id: 'doc-42', name: 'Surveillance II – Closed NC Reports + evidence', uploaded: false },
    ],
  },
];

export default function Page() {
  const [stages, setStages] = useState<Stage[]>(initialStages);

  const [selectedClient] = useState({
    name: "Acme Manufacturing Ltd.",
    certType: "ISO 9001:2015",
    startDate: "2024-01-15",
  });

  const handleDocumentUpload = (stageId: string, docId: string) => {
    setStages((prev) =>
      prev.map((stage) => {
        if (stage.id === stageId) {
          const updatedDocs = stage.documents.map((d) =>
            d.id === docId
              ? {
                  ...d,
                  uploaded: true,
                  uploadDate: new Date().toISOString().split("T")[0],
                }
              : d
          );

          const uploadedCount = updatedDocs.filter((d) => d.uploaded).length;
          const progress = Math.round(
            (uploadedCount / updatedDocs.length) * 100
          );

          return {
            ...stage,
            documents: updatedDocs,
            progress,
            status:
              progress === 100
                ? "completed"
                : progress > 0
                ? "in-progress"
                : "not-started",
          };
        }
        return stage;
      })
    );
  };

  const handleMarkComplete = (stageId: string) => {
    setStages((prev) =>
      prev.map((stage) => {
        if (stage.id === stageId) {
          const allUploaded = stage.documents.every((d) => d.uploaded);
          if (allUploaded) {
            return { ...stage, status: "completed", progress: 100 };
          }
        }
        return stage;
      })
    );
  };

  const isStageUnlocked = (index: number) => {
    if (index === 0) return true;
    return stages[index - 1].status === "completed";
  };

  return (
    <ThemeProvider>
      <div className="flex h-screen bg-gray-50 dark:bg-gray-950">
        <Sidebar stages={stages} />

        <div className="flex-1 flex flex-col overflow-hidden">
          <TopBar client={selectedClient} />

          <main className="flex-1 overflow-y-auto">
            <div className="max-w-7xl mx-auto px-6 py-8">
              <ClientSelector client={selectedClient} />

              <ProgressTimeline stages={stages} />

              <div className="mt-8 space-y-6">
                {stages.map((stage, index) => (
                  <StageCard
                    key={stage.id}
                    stage={stage}
                    stageNumber={index + 1}
                    isUnlocked={isStageUnlocked(index)}
                    onDocumentUpload={handleDocumentUpload}
                    onMarkComplete={handleMarkComplete}
                  />
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
}
