import { useState } from 'react';
import { ChevronDown, ChevronUp, Lock, CheckCircle2, AlertCircle, Clock } from 'lucide-react';
import type { Stage } from '@/app/lifecycle/page'; 
import { DocumentList } from './DocumentList';
import { NCTracker } from './NCTracker';
import { AuditTimeline } from './AuditTimeline';
import { CertificateViewer } from './CertificateViewer';
import { EmailPreview } from './EmailPreview';
import {StatusBadge} from "./StatusBadge";

interface StageCardProps {
  stage: Stage;
  stageNumber: number;
  isUnlocked: boolean;
  onDocumentUpload: (stageId: string, docId: string) => void;
  onMarkComplete: (stageId: string) => void;
}

export function StageCard({
  stage,
  stageNumber,
  isUnlocked,
  onDocumentUpload,
  onMarkComplete,
}: StageCardProps) {
  const [isExpanded, setIsExpanded] = useState(stage.status === 'in-progress');

  const getStageIcon = () => {
    if (!isUnlocked) return <Lock className="w-5 h-5 text-gray-400" />;
    if (stage.status === 'completed') return <CheckCircle2 className="w-5 h-5 text-green-500" />;
    if (stage.status === 'in-progress') return <Clock className="w-5 h-5 text-blue-500" />;
    return <AlertCircle className="w-5 h-5 text-gray-400" />;
  };

  const canMarkComplete = stage.documents.every(doc => doc.uploaded) && isUnlocked;
  
  // Check if this is a notification/email stage
  const isNotificationStage = stage.id.includes('pre-surveillance') || 
                               (stage.id === 'pre-stage-2' && stage.documents.some(d => d.name.includes('Mail')));

  return (
    <div
      id={stage.id}
      className={`bg-white dark:bg-gray-900 rounded-xl border transition-all ${
        !isUnlocked
          ? 'border-gray-200 dark:border-gray-800 opacity-60'
          : stage.status === 'completed'
          ? 'border-green-200 dark:border-green-900'
          : stage.status === 'in-progress'
          ? 'border-blue-200 dark:border-blue-900'
          : 'border-gray-200 dark:border-gray-800'
      }`}
    >
      {/* Card Header */}
      <button
        onClick={() => isUnlocked && setIsExpanded(!isExpanded)}
        disabled={!isUnlocked}
        className="w-full px-6 py-5 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors disabled:cursor-not-allowed rounded-t-xl"
      >
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800">
            {getStageIcon()}
          </div>
          
          <div className="text-left">
            <div className="flex items-center gap-3">
              <h3 className="text-gray-900 dark:text-white">
                {stageNumber}. {stage.name}
              </h3>
              <StatusBadge status={stage.status} />
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {stage.documents.filter(d => d.uploaded).length} of {stage.documents.length} documents completed
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Progress Bar */}
          <div className="flex items-center gap-3">
            <div className="w-32 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all ${
                  stage.status === 'completed'
                    ? 'bg-green-500'
                    : stage.status === 'in-progress'
                    ? 'bg-blue-500'
                    : 'bg-gray-300 dark:bg-gray-600'
                }`}
                style={{ width: `${stage.progress}%` }}
              />
            </div>
            <span className="text-sm text-gray-600 dark:text-gray-400 w-12">
              {stage.progress}%
            </span>
          </div>

          {isUnlocked && (
            isExpanded ? (
              <ChevronUp className="w-5 h-5 text-gray-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-400" />
            )
          )}
        </div>
      </button>

      {/* Card Content */}
      {isExpanded && isUnlocked && (
        <div className="px-6 pb-6 space-y-6">
          <div className="h-px bg-gray-200 dark:bg-gray-800" />
          
          {/* Email Preview for notification stages */}
          {isNotificationStage && <EmailPreview />}

          {/* Audit Timeline for audit stages */}
          {stage.type === 'audit' && <AuditTimeline />}

          {/* Document List */}
          <DocumentList
            documents={stage.documents}
            onUpload={(docId) => onDocumentUpload(stage.id, docId)}
          />

          {/* NC Tracker for stages with non-conformities */}
          {stage.nonConformities && (
            <NCTracker
              major={stage.nonConformities.major}
              minor={stage.nonConformities.minor}
            />
          )}

          {/* Certificate Viewer for certification review */}
          {stage.id === 'certification-review' && stage.progress > 50 && (
            <CertificateViewer />
          )}

          {/* Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-800">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {canMarkComplete
                ? 'All documents uploaded. Ready to complete.'
                : 'Upload all required documents to proceed.'}
            </p>
            <button
              onClick={() => onMarkComplete(stage.id)}
              disabled={!canMarkComplete}
              className="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Mark Complete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}