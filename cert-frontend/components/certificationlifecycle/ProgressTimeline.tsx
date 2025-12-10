import { CheckCircle2, Circle, Loader } from 'lucide-react';
import type { Stage } from '@/app/lifecycle/page';

interface ProgressTimelineProps {
  stages: Stage[];
}

export function ProgressTimeline({ stages }: ProgressTimelineProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500';
      case 'in-progress':
        return 'bg-blue-500';
      default:
        return 'bg-gray-300 dark:bg-gray-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="w-5 h-5 text-white" />;
      case 'in-progress':
        return <Loader className="w-5 h-5 text-white" />;
      default:
        return <Circle className="w-5 h-5 text-white" />;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
      <h3 className="text-gray-900 dark:text-white mb-6">Certification Timeline</h3>
      
      <div className="relative">
        {/* Progress Line */}
        <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200 dark:bg-gray-700">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-500"
            style={{
              width: `${(stages.filter(s => s.status === 'completed').length / stages.length) * 100}%`,
            }}
          />
        </div>

        {/* Stage Markers */}
        <div className="relative flex justify-between">
          {stages.map((stage, index) => (
            <div key={stage.id} className="flex flex-col items-center" style={{ width: '100px' }}>
              <div
                className={`w-10 h-10 rounded-full ${getStatusColor(
                  stage.status
                )} flex items-center justify-center shadow-lg relative z-10`}
              >
                {getStatusIcon(stage.status)}
              </div>
              <div className="mt-3 text-center">
                <p className="text-xs text-gray-900 dark:text-white">
                  {stage.shortName}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  {stage.progress}%
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
