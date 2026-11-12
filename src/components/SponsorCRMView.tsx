import React, { useState } from 'react';
import { CrmLead } from '../types';
import { 
  Users, 
  DollarSign, 
  UserPlus, 
  Search, 
  Mail, 
  Phone, 
  CheckCircle, 
  Clock, 
  Building,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

interface SponsorCRMViewProps {
  leads: CrmLead[];
  onAddLead: (lead: Omit<CrmLead, 'id'>) => void;
  onUpdateStage: (leadId: string, newStage: CrmLead['stage']) => void;
}

export const SponsorCRMView: React.FC<SponsorCRMViewProps> = ({
  leads,
  onAddLead,
  onUpdateStage,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [stageFilter, setStageFilter] = useState<string>('All');
  const [showAddModal, setShowAddModal] = useState(false);

  // New Lead Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [amount, setAmount] = useState('100000');
  const [entityType, setEntityType] = useState<CrmLead['entityType']>('LLC');
  const [targetDeal, setTargetDeal] = useState('The Oakwood Residences');
  const [accreditation, setAccreditation] = useState<CrmLead['accreditationStatus']>('Verified 506(c)');

  const stages: CrmLead['stage'][] = ['Lead', 'NDA / PPM Sent', 'Soft Committed', 'Funds Wired', 'Closed'];

  const filteredLeads = leads.filter((lead) => {
    const matchesStage = stageFilter === 'All' || lead.stage === stageFilter;
    const matchesSearch = 
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.targetDeal.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStage && matchesSearch;
  });

  const totalCommitted = leads.reduce((acc, l) => acc + l.committedAmount, 0);

  const handleSubmitNewLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    onAddLead({
      name,
      email,
      phone: phone || '+1 (555) 000-0000',
      accreditationStatus: accreditation,
      entityType,
      targetDeal,
      stage: 'Soft Committed',
      committedAmount: Number(amount) || 50000,
      lastContact: 'Just now'
    });

    setName('');
    setEmail('');
    setPhone('');
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6">
      
      {/* Header and Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Capital Raising Pipeline & LP CRM
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Manage prospective high-net-worth investors, subscription packets, accreditation checks, and wire receipts.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-3.5 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-md transition-colors flex items-center gap-1.5 shadow-xs self-start sm:self-auto"
        >
          <UserPlus className="w-3.5 h-3.5" />
          <span>Add Prospective LP</span>
        </button>
      </div>

      {/* Summary KPI Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs">
          <span className="text-xs font-medium text-slate-500 block">Total Pipeline Commitments</span>
          <div className="text-xl font-bold text-slate-900 font-mono-tabular mt-1">
            ${totalCommitted.toLocaleString()}
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block">
            Across active syndication offerings
          </span>
        </div>

        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs">
          <span className="text-xs font-medium text-slate-500 block">Accredited LP Contacts</span>
          <div className="text-xl font-bold text-indigo-700 font-mono-tabular mt-1">
            {leads.length} Records
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block">
            80% 506(c) CPA-certified
          </span>
        </div>

        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs">
          <span className="text-xs font-medium text-slate-500 block">Average Ticket Size</span>
          <div className="text-xl font-bold text-emerald-700 font-mono-tabular mt-1">
            ${Math.round(totalCommitted / (leads.length || 1)).toLocaleString()}
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block">
            Institutional and family office minimums met
          </span>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search by LP name, email, or deal..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 text-xs bg-white border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-900"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
          {['All', ...stages].map((st) => (
            <button
              key={st}
              onClick={() => setStageFilter(st)}
              className={`px-3 py-1 rounded-md font-medium transition-colors whitespace-nowrap shrink-0 ${
                stageFilter === st
                  ? 'bg-slate-900 text-white'
                  : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                <th className="py-3 px-5">Investor Name</th>
                <th className="py-3 px-5">Target Offering</th>
                <th className="py-3 px-5">Accreditation</th>
                <th className="py-3 px-5">Entity</th>
                <th className="py-3 px-5 text-right">Commitment</th>
                <th className="py-3 px-5 text-center">Pipeline Stage</th>
                <th className="py-3 px-5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filteredLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-5 whitespace-nowrap">
                    <div className="font-semibold text-slate-900">{lead.name}</div>
                    <div className="text-[11px] text-slate-500 font-mono-tabular">{lead.email}</div>
                  </td>
                  <td className="py-3 px-5 font-medium text-slate-700 whitespace-nowrap">
                    {lead.targetDeal}
                  </td>
                  <td className="py-3 px-5 whitespace-nowrap">
                    <span className="text-[11px] font-semibold text-slate-800 bg-slate-100 px-2 py-0.5 rounded">
                      {lead.accreditationStatus}
                    </span>
                  </td>
                  <td className="py-3 px-5 text-slate-600 whitespace-nowrap">
                    {lead.entityType}
                  </td>
                  <td className="py-3 px-5 text-right font-mono-tabular font-bold text-slate-900 whitespace-nowrap">
                    ${lead.committedAmount.toLocaleString()}
                  </td>
                  <td className="py-3 px-5 text-center whitespace-nowrap">
                    <select
                      value={lead.stage}
                      onChange={(e) => onUpdateStage(lead.id, e.target.value as CrmLead['stage'])}
                      className="text-xs bg-slate-50 border border-slate-200 rounded px-2 py-1 font-medium text-slate-800 focus:outline-none focus:ring-1 focus:ring-slate-900"
                    >
                      {stages.map((st) => (
                        <option key={st} value={st}>
                          {st}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="py-3 px-5 text-right whitespace-nowrap">
                    <button
                      onClick={() => alert(`Emailing subscription documents to ${lead.email}...`)}
                      className="px-2.5 py-1 text-[11px] font-semibold text-indigo-700 hover:text-indigo-900 bg-indigo-50 hover:bg-indigo-100 rounded transition-colors"
                    >
                      Send PPM
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Lead Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full border border-slate-200 p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">Add Prospective Investor</h3>
              <button 
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-600 text-lg font-bold p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmitNewLead} className="space-y-3 text-xs">
              <div>
                <label className="block font-medium text-slate-700 mb-1">Full Legal Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Jonathan Sterling"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-1.5 border border-slate-200 rounded focus:outline-none focus:ring-1 focus:ring-slate-900"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. j.sterling@capital.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-1.5 border border-slate-200 rounded focus:outline-none focus:ring-1 focus:ring-slate-900"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Phone Number</label>
                <input
                  type="text"
                  placeholder="+1 (555) 123-4567"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-1.5 border border-slate-200 rounded focus:outline-none focus:ring-1 focus:ring-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Committed Amount ($)</label>
                  <input
                    type="number"
                    step="5000"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full px-3 py-1.5 border border-slate-200 rounded focus:outline-none focus:ring-1 focus:ring-slate-900 font-mono-tabular"
                  />
                </div>

                <div>
                  <label className="block font-medium text-slate-700 mb-1">Entity Type</label>
                  <select
                    value={entityType}
                    onChange={(e) => setEntityType(e.target.value as any)}
                    className="w-full px-3 py-1.5 border border-slate-200 rounded focus:outline-none focus:ring-1 focus:ring-slate-900"
                  >
                    <option value="LLC">LLC</option>
                    <option value="Individual">Individual</option>
                    <option value="Revocable Trust">Revocable Trust</option>
                    <option value="Self-Directed IRA">Self-Directed IRA</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Target Offering</label>
                <select
                  value={targetDeal}
                  onChange={(e) => setTargetDeal(e.target.value)}
                  className="w-full px-3 py-1.5 border border-slate-200 rounded focus:outline-none focus:ring-1 focus:ring-slate-900"
                >
                  <option value="The Oakwood Residences">The Oakwood Residences</option>
                  <option value="Apex Pacific Logistics Center">Apex Pacific Logistics Center</option>
                  <option value="Summit Healthcare Pavilion">Summit Healthcare Pavilion</option>
                  <option value="Metropolitan Quarter">Metropolitan Quarter</option>
                </select>
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Accreditation Verification</label>
                <select
                  value={accreditation}
                  onChange={(e) => setAccreditation(e.target.value as any)}
                  className="w-full px-3 py-1.5 border border-slate-200 rounded focus:outline-none focus:ring-1 focus:ring-slate-900"
                >
                  <option value="Verified 506(c)">Verified 506(c) (Letter on file)</option>
                  <option value="Self-Certified 506(b)">Self-Certified 506(b)</option>
                  <option value="Pending Verification">Pending Verification</option>
                </select>
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-md transition-colors"
                >
                  Save LP Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
