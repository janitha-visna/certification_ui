import { Building2, Calendar, FileCheck } from 'lucide-react';

interface ClientSelectorProps {
  client: {
    name: string;
    certType: string;
    startDate: string;
  };
}

export function ClientSelector({ client }: ClientSelectorProps) {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white mb-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
            <Building2 className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-2xl mb-1">{client.name}</h2>
            <div className="flex items-center gap-4 text-white/90">
              <div className="flex items-center gap-1.5">
                <FileCheck className="w-4 h-4" />
                <span className="text-sm">{client.certType}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">Started: {client.startDate}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-right">
          <p className="text-white/80 text-sm mb-1">Overall Progress</p>
          <p className="text-3xl">50%</p>
        </div>
      </div>
    </div>
  );
}
