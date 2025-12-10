import { Upload, FileText, Check, Calendar } from 'lucide-react';
import type { Document } from '@/app/lifecycle/page';

interface DocumentListProps {
  documents: Document[];
  onUpload: (docId: string) => void;
}

export function DocumentList({ documents, onUpload }: DocumentListProps) {
  return (
    <div className="space-y-3">
      <h4 className="text-gray-900 dark:text-white flex items-center gap-2">
        <FileText className="w-4 h-4" />
        Required Documents
      </h4>

      <div className="grid gap-3">
        {documents.map((doc) => (
          <div
            key={doc.id}
            className={`flex items-center justify-between p-4 rounded-lg border transition-all ${
              doc.uploaded
                ? 'bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-900'
                : 'bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
            }`}
          >
            <div className="flex items-center gap-3 flex-1">
              {doc.uploaded ? (
                <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900 flex items-center justify-center flex-shrink-0">
                  <Check className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
              ) : (
                <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center flex-shrink-0">
                  <FileText className="w-5 h-5 text-gray-400" />
                </div>
              )}

              <div className="flex-1 min-w-0">
                <p className={`text-sm ${
                  doc.uploaded
                    ? 'text-green-900 dark:text-green-100'
                    : 'text-gray-900 dark:text-white'
                }`}>
                  {doc.name}
                </p>
                {doc.uploaded && doc.uploadDate && (
                  <div className="flex items-center gap-1.5 mt-1">
                    <Calendar className="w-3 h-3 text-green-600 dark:text-green-400" />
                    <span className="text-xs text-green-600 dark:text-green-400">
                      Uploaded on {doc.uploadDate}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {!doc.uploaded && (
              <button
                onClick={() => onUpload(doc.id)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors text-sm"
              >
                <Upload className="w-4 h-4" />
                Upload
              </button>
            )}

            {doc.uploaded && (
              <button className="px-4 py-2 text-sm text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 transition-colors">
                View File
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
