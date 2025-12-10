import { Award, Download, Send, FileCheck } from 'lucide-react';

export function CertificateViewer() {
  return (
    <div className="space-y-4">
      <h4 className="text-gray-900 dark:text-white flex items-center gap-2">
        <Award className="w-4 h-4" />
        Certificate Preview & Generation
      </h4>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Certificate Preview */}
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 border-2 border-dashed border-blue-300 dark:border-blue-800 rounded-lg p-8 text-center">
            <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-4">
              <Award className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-gray-900 dark:text-white mb-2">
              ISO 9001:2015 Certificate
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
              Acme Manufacturing Ltd.
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500 mb-4">
              Certificate No: CERT-2024-001234
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500 mb-4">
              Valid: Jan 2024 - Jan 2027
            </p>
            
            <div className="flex gap-2 justify-center">
              <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm">
                <Download className="w-4 h-4" />
                Download PDF
              </button>
            </div>
          </div>
        </div>

        {/* Approval Panel */}
        <div className="space-y-4">
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <h5 className="text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <FileCheck className="w-4 h-4" />
              Approval Signatures
            </h5>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-900">
                <div>
                  <p className="text-sm text-gray-900 dark:text-white">Lead Auditor</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">John Auditor</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-green-600 dark:text-green-400">✓ Approved</p>
                  <p className="text-xs text-gray-500 dark:text-gray-500">2024-02-20</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-900">
                <div>
                  <p className="text-sm text-gray-900 dark:text-white">Technical Reviewer</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">Jane Smith</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-green-600 dark:text-green-400">✓ Approved</p>
                  <p className="text-xs text-gray-500 dark:text-gray-500">2024-02-21</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                <div>
                  <p className="text-sm text-gray-900 dark:text-white">Certification Manager</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">Pending</p>
                </div>
                <button className="px-3 py-1.5 bg-blue-500 text-white rounded text-xs hover:bg-blue-600 transition-colors">
                  Sign Now
                </button>
              </div>
            </div>
          </div>

          <button className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all">
            <Send className="w-4 h-4" />
            Generate & Send Certificate
          </button>
        </div>
      </div>
    </div>
  );
}
