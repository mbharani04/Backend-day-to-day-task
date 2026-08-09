import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '../../components/DashboardLayout';
import { EmptyState } from '../../components/EmptyState';
import { getOrganizations, getEvents } from '../../utils/storage';
import { formatDate } from '../../utils/helpers';
import { Building2, Search, Calendar, Phone, Mail, MapPin } from 'lucide-react';

export const AdminOrganizations = () => {
  const [orgsList, setOrgsList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const orgs = getOrganizations();
    const events = getEvents();

    // Map live event counts to each organization
    const mapped = orgs.map((org) => {
      const orgEvents = events.filter((e) => e.organizationId === org.id);
      return {
        ...org,
        eventsCount: orgEvents.length
      };
    });

    setOrgsList(mapped);
  }, []);

  const filteredOrgs = orgsList.filter((org) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      org.name?.toLowerCase().includes(q) ||
      org.email?.toLowerCase().includes(q) ||
      org.phone?.includes(q) ||
      org.address?.toLowerCase().includes(q)
    );
  });

  return (
    <DashboardLayout
      title="Registered Organizations Directory"
      subtitle="Event organizers and institutions hosting public events in Chennai."
    >
      <div className="space-y-6">
        {/* Search */}
        <div className="flex items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search organization name, email, or address..."
              className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            Total Organizations: <strong className="text-slate-900 dark:text-white">{filteredOrgs.length}</strong>
          </span>
        </div>

        {/* Organizations Table */}
        {filteredOrgs.length === 0 ? (
          <EmptyState
            icon={Building2}
            title="No Organizations Found"
            description="No registered organizations match your search query."
          />
        ) : (
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200/80 dark:border-slate-800 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    <th className="py-4 px-6">Organization Name</th>
                    <th className="py-4 px-6">Contact Email</th>
                    <th className="py-4 px-6">Phone Number</th>
                    <th className="py-4 px-6">Events Created</th>
                    <th className="py-4 px-6">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
                  {filteredOrgs.map((org) => (
                    <tr key={org.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-cyan-100 dark:bg-cyan-950 text-cyan-600 dark:text-cyan-400 font-bold flex items-center justify-center text-sm shrink-0">
                            <Building2 className="w-5 h-5" />
                          </div>
                          <div>
                            <span className="font-bold text-slate-900 dark:text-white block">
                              {org.name}
                            </span>
                            <span className="text-[10px] text-slate-400 truncate max-w-xs block">
                              {org.address || 'Chennai'}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-slate-600 dark:text-slate-300">
                        {org.email}
                      </td>
                      <td className="py-4 px-6 text-slate-600 dark:text-slate-300">
                        {org.phone || '044-24356789'}
                      </td>
                      <td className="py-4 px-6 whitespace-nowrap">
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-cyan-400">
                          {org.eventsCount} Events
                        </span>
                      </td>
                      <td className="py-4 px-6 whitespace-nowrap">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                          {org.status || 'Active'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};
