import { 
  FileText, 
  ClipboardCheck, 
  Award, 
  Eye,
  CheckCircle2,
  Circle,
  Loader
} from 'lucide-react';
import type { Stage } from '@/app/lifecycle/page';

interface SidebarProps {
  stages: Stage[];
}

const stageIcons = {
  standard: FileText,
  audit: ClipboardCheck,
  review: Award,
  surveillance: Eye,
};

export function Sidebar({ stages }: SidebarProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="w-4 h-4 text-green-500" />;
      case 'in-progress':
        return <Loader className="w-4 h-4 text-blue-500" />;
      default:
        return <Circle className="w-4 h-4 text-gray-300 dark:text-gray-600" />;
    }
  };

  return (
    <aside className="w-72 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col">
      <div className="p-6 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Award className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-gray-900 dark:text-white">CertifyPro</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">Certification Manager</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto p-4">
        <div className="space-y-1">
          {stages.map((stage, index) => {
            const Icon = stageIcons[stage.type];
            return (
              <a
                key={stage.id}
                href={`#${stage.id}`}
                className="flex items-start gap-3 px-3 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
              >
                <div className="flex-shrink-0 mt-0.5">
                  {getStatusIcon(stage.status)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4 text-gray-400 dark:text-gray-500 flex-shrink-0" />
                    <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white truncate">
                      {stage.shortName}
                    </span>
                  </div>
                  <div className="mt-1.5 flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
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
                    <span className="text-xs text-gray-500 dark:text-gray-400 flex-shrink-0">
                      {stage.progress}%
                    </span>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </nav>

      <div className="p-4 border-t border-gray-200 dark:border-gray-800">
        <div className="bg-blue-50 dark:bg-blue-950 rounded-lg p-4">
          <p className="text-sm text-blue-900 dark:text-blue-100">
            Need help?
          </p>
          <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">
            Contact support for guidance
          </p>
        </div>
      </div>
    </aside>
  );
}
