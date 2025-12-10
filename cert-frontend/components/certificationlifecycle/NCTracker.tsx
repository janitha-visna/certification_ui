import { AlertTriangle, AlertCircle, CheckCircle2, Upload } from 'lucide-react';
import { useState } from 'react';

interface NCTrackerProps {
  major: number;
  minor: number;
}

export function NCTracker({ major, minor }: NCTrackerProps) {
  const [ncItems] = useState([
    {
      id: 'nc-1',
      type: 'major',
      title: 'Quality Management Documentation Incomplete',
      description: 'Quality manual missing key procedures for document control',
      status: 'open',
      raisedDate: '2024-02-15',
    },
    {
      id: 'nc-2',
      type: 'minor',
      title: 'Calibration Records Not Updated',
      description: 'Equipment calibration records from Q4 2023 not available',
      status: 'closed',
      closedDate: '2024-02-20',
    },
  ]);

  return (
    <div className="space-y-4">
      <h4 className="text-gray-900 dark:text-white flex items-center gap-2">
        <AlertCircle className="w-4 h-4" />
        Non-Conformity Tracking
      </h4>

      {/* NC Summary */}
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-red-100 dark:bg-red-900 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <p className="text-2xl text-red-900 dark:text-red-100">{major}</p>
              <p className="text-sm text-red-600 dark:text-red-400">Major NCs</p>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-lg bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-900">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-yellow-100 dark:bg-yellow-900 flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div>
              <p className="text-2xl text-yellow-900 dark:text-yellow-100">{minor}</p>
              <p className="text-sm text-yellow-600 dark:text-yellow-400">Minor NCs</p>
            </div>
          </div>
        </div>
      </div>

      {/* NC Items List */}
      <div className="space-y-3">
        {ncItems.map((nc) => (
          <div
            key={nc.id}
            className={`p-4 rounded-lg border ${
              nc.status === 'closed'
                ? 'bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-900'
                : nc.type === 'major'
                ? 'bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-900'
                : 'bg-yellow-50 dark:bg-yellow-950/20 border-yellow-200 dark:border-yellow-900'
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className={`px-2 py-0.5 rounded text-xs ${
                      nc.type === 'major'
                        ? 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300'
                        : 'bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300'
                    }`}
                  >
                    {nc.type.toUpperCase()}
                  </span>
                  {nc.status === 'closed' && (
                    <span className="flex items-center gap-1 px-2 py-0.5 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded text-xs">
                      <CheckCircle2 className="w-3 h-3" />
                      Closed
                    </span>
                  )}
                </div>
                
                <h5 className="text-gray-900 dark:text-white mb-1">
                  {nc.title}
                </h5>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  {nc.description}
                </p>
                
                <p className="text-xs text-gray-500 dark:text-gray-500">
                  Raised: {nc.raisedDate}
                  {nc.closedDate && ` • Closed: ${nc.closedDate}`}
                </p>
              </div>

              {nc.status === 'open' && (
                <button className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm">
                  <Upload className="w-4 h-4" />
                  Upload Evidence
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
