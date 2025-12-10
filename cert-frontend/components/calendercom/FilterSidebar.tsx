import { Filter, X, ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface FilterSidebarProps {
  filters: {
    auditor: string;
    client: string;
    auditType: string;
    standard: string;
    status: string;
  };
  setFilters: (filters: any) => void;
}

export function FilterSidebar({ filters, setFilters }: FilterSidebarProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  const auditors = ['John Smith', 'Sarah Chen', 'David Kim', 'Maria Garcia', 'Robert Taylor', 'Lisa Anderson', 'James Wilson', 'Anna Martinez'];
  const auditTypes = ['Stage 1', 'Stage 2', 'Surveillance I', 'Surveillance II', 'Recertification'];
  const standards = ['ISO 9001:2015', 'ISO 27001:2022', 'ISO 14001:2015', 'ISO 13485:2016', 'ISO 45001:2018'];
  const statuses = ['Planned', 'Confirmed', 'Completed', 'Canceled', 'Pending'];

  const handleClearFilters = () => {
    setFilters({
      auditor: '',
      client: '',
      auditType: '',
      standard: '',
      status: '',
    });
  };

  const activeFilterCount = Object.values(filters).filter(v => v !== '').length;

  return (
    <aside className="w-72 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col">
      <div className="p-6 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            <h2 className="text-gray-900 dark:text-white">Filters</h2>
            {activeFilterCount > 0 && (
              <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-xs">
                {activeFilterCount}
              </span>
            )}
          </div>
          {activeFilterCount > 0 && (
            <button
              onClick={handleClearFilters}
              className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
            >
              Clear all
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Auditor Filter */}
        <div>
          <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">
            Auditor Name
          </label>
          <div className="relative">
            <select
              value={filters.auditor}
              onChange={(e) => setFilters({ ...filters, auditor: e.target.value })}
              className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white text-sm appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Auditors</option>
              {auditors.map((auditor) => (
                <option key={auditor} value={auditor}>
                  {auditor}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Client Filter */}
        <div>
          <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">
            Client Name
          </label>
          <input
            type="text"
            value={filters.client}
            onChange={(e) => setFilters({ ...filters, client: e.target.value })}
            placeholder="Search client..."
            className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Audit Type Filter */}
        <div>
          <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">
            Audit Type
          </label>
          <div className="flex flex-wrap gap-2">
            {auditTypes.map((type) => (
              <button
                key={type}
                onClick={() => setFilters({ ...filters, auditType: filters.auditType === type ? '' : type })}
                className={`px-3 py-1.5 rounded-full text-xs transition-colors ${
                  filters.auditType === type
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Standard Filter */}
        <div>
          <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">
            Standard
          </label>
          <div className="relative">
            <select
              value={filters.standard}
              onChange={(e) => setFilters({ ...filters, standard: e.target.value })}
              className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white text-sm appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Standards</option>
              {standards.map((standard) => (
                <option key={standard} value={standard}>
                  {standard}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Status Filter */}
        <div>
          <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">
            Status
          </label>
          <div className="space-y-2">
            {statuses.map((status) => {
              const statusColors = {
                Planned: 'bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300 border-yellow-300 dark:border-yellow-700',
                Confirmed: 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 border-green-300 dark:border-green-700',
                Completed: 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-700',
                Canceled: 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 border-red-300 dark:border-red-700',
                Pending: 'bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300 border-orange-300 dark:border-orange-700',
              };

              return (
                <button
                  key={status}
                  onClick={() => setFilters({ ...filters, status: filters.status === status ? '' : status })}
                  className={`w-full px-3 py-2 rounded-lg text-sm transition-all border ${
                    filters.status === status
                      ? statusColors[status as keyof typeof statusColors]
                      : 'bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  {status}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="p-6 border-t border-gray-200 dark:border-gray-800">
        <div className="bg-blue-50 dark:bg-blue-950/30 rounded-lg p-4">
          <p className="text-sm text-blue-900 dark:text-blue-100 mb-1">
            Quick Tip
          </p>
          <p className="text-xs text-blue-700 dark:text-blue-300">
            Use filters to quickly find specific audits and auditors.
          </p>
        </div>
      </div>
    </aside>
  );
}
