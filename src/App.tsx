import React, { useState } from 'react';
import { ViewMode, UserRole, Deal, InvestmentPosition, CrmLead } from './types';
import { 
  INITIAL_DEALS, 
  INITIAL_POSITIONS, 
  INITIAL_DISTRIBUTIONS, 
  INITIAL_TAX_DOCUMENTS, 
  INITIAL_CRM_LEADS 
} from './data/mockData';
import { Header } from './components/Header';
import { DashboardView } from './components/DashboardView';
import { OfferingsView } from './components/OfferingsView';
import { PortfolioView } from './components/PortfolioView';
import { DistributionsView } from './components/DistributionsView';
import { SponsorCRMView } from './components/SponsorCRMView';
import { HtmlScreenImporter } from './components/HtmlScreenImporter';
import { InvestModal } from './components/InvestModal';
import { Plus, X, Building, ShieldCheck } from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewMode>('dashboard');
  const [userRole, setUserRole] = useState<UserRole>('investor');
  
  const [deals, setDeals] = useState<Deal[]>(INITIAL_DEALS);
  const [positions, setPositions] = useState<InvestmentPosition[]>(INITIAL_POSITIONS);
  const [distributions, setDistributions] = useState(INITIAL_DISTRIBUTIONS);
  const [taxDocuments, setTaxDocuments] = useState(INITIAL_TAX_DOCUMENTS);
  const [crmLeads, setCrmLeads] = useState<CrmLead[]>(INITIAL_CRM_LEADS);

  const [selectedDealId, setSelectedDealId] = useState<string | null>(null);
  const [activeInvestDeal, setActiveInvestDeal] = useState<Deal | null>(null);
  const [showNewDealModal, setShowNewDealModal] = useState<boolean>(false);

  // New Deal Form State
  const [dealTitle, setDealTitle] = useState('');
  const [dealLocation, setDealLocation] = useState('');
  const [dealAssetClass, setDealAssetClass] = useState<Deal['assetClass']>('Multifamily');
  const [dealIrr, setDealIrr] = useState('17.5');
  const [dealMultiple, setDealMultiple] = useState('2.0');
  const [dealPref, setDealPref] = useState('8.0');
  const [dealMin, setDealMin] = useState('50000');
  const [dealTargetRaise, setDealTargetRaise] = useState('15000000');
  const [dealDescription, setDealDescription] = useState('');

  const handleRoleToggle = () => {
    setUserRole((prev) => (prev === 'investor' ? 'sponsor' : 'investor'));
  };

  const handleOpenNewDealOrInvest = () => {
    if (userRole === 'sponsor') {
      setShowNewDealModal(true);
    } else {
      setCurrentView('offerings');
    }
  };

  const handleNavigateToDeal = (dealId: string) => {
    setSelectedDealId(dealId);
    setCurrentView('offerings');
  };

  const handleStartInvestment = (deal: Deal) => {
    setActiveInvestDeal(deal);
  };

  const handleCompleteInvestment = (newPosition: InvestmentPosition) => {
    setPositions((prev) => [newPosition, ...prev]);
    
    // Also record in CRM
    const newLead: CrmLead = {
      id: `lead-${Date.now()}`,
      name: newPosition.entityName,
      email: 'investor@sponsorcloud.io',
      phone: '+1 (415) 555-0199',
      accreditationStatus: 'Verified 506(c)',
      entityType: 'LLC',
      targetDeal: newPosition.dealTitle,
      stage: 'Funds Wired',
      committedAmount: newPosition.investedAmount,
      lastContact: 'Just now'
    };
    setCrmLeads((prev) => [newLead, ...prev]);

    // Update amount raised in the deal
    setDeals((prev) =>
      prev.map((d) =>
        d.id === newPosition.dealId
          ? { ...d, amountRaised: Math.min(d.totalRaise, d.amountRaised + newPosition.investedAmount) }
          : d
      )
    );

    setActiveInvestDeal(null);
    setCurrentView('portfolio');
  };

  const handleAddLead = (newLeadData: Omit<CrmLead, 'id'>) => {
    const newLead: CrmLead = {
      id: `lead-${Date.now()}`,
      ...newLeadData
    };
    setCrmLeads((prev) => [newLead, ...prev]);
  };

  const handleUpdateLeadStage = (leadId: string, newStage: CrmLead['stage']) => {
    setCrmLeads((prev) =>
      prev.map((l) => (l.id === leadId ? { ...l, stage: newStage } : l))
    );
  };

  const handleCreateNewDealSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dealTitle.trim()) return;

    const newDeal: Deal = {
      id: `deal-${Date.now()}`,
      title: dealTitle,
      location: dealLocation || 'Dallas, TX',
      assetClass: dealAssetClass,
      image: '/src/assets/images/deal_multifamily_lux_1794457823484.jpg',
      status: 'Funding',
      targetIrr: Number(dealIrr) || 17.5,
      equityMultiple: Number(dealMultiple) || 2.0,
      prefReturn: Number(dealPref) || 8.0,
      targetHoldYears: 5,
      minInvestment: Number(dealMin) || 50000,
      totalRaise: Number(dealTargetRaise) || 15000000,
      amountRaised: 0,
      projectedCoC: 8.5,
      description: dealDescription || 'New syndication offering structured under SEC Regulation D Rule 506(c).',
      businessPlan: 'Institutional acquisition with programmatic renovations and submarket lease optimization.',
      unitsOrSqFt: '240 Units / 185,000 SF',
      underwriting: {
        capRateOnCost: 6.9,
        exitCapRate: 5.8,
        debtLtv: 55.0,
        interestRate: 5.35,
        occupancy: 95.0,
      },
      highlights: [
        'Class A asset in high-growth demographic market',
        'Conservative fixed-rate leverage structure',
        'Quarterly cash distributions with 8% preferred return',
        'Direct GP co-investment aligned with LP capital'
      ]
    };

    setDeals((prev) => [newDeal, ...prev]);
    setShowNewDealModal(false);
    setDealTitle('');
    setDealLocation('');
    setDealDescription('');
    setSelectedDealId(newDeal.id);
    setCurrentView('offerings');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-slate-900 selection:text-white text-slate-900">
      
      {/* Top Header */}
      <Header
        currentView={currentView}
        onViewChange={(view) => {
          setCurrentView(view);
          if (view !== 'offerings') {
            setSelectedDealId(null);
          }
        }}
        userRole={userRole}
        onRoleToggle={handleRoleToggle}
        onOpenNewDealOrInvest={handleOpenNewDealOrInvest}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentView === 'dashboard' && (
          <DashboardView
            deals={deals}
            positions={positions}
            distributions={distributions}
            userRole={userRole}
            onNavigateToDeal={handleNavigateToDeal}
            onNavigateToTab={(tab) => setCurrentView(tab)}
          />
        )}

        {currentView === 'offerings' && (
          <OfferingsView
            deals={deals}
            selectedDealId={selectedDealId}
            onSelectDeal={setSelectedDealId}
            onStartInvestment={handleStartInvestment}
          />
        )}

        {currentView === 'portfolio' && (
          <PortfolioView
            positions={positions}
            onNavigateToDeal={handleNavigateToDeal}
            onNavigateToTab={(tab) => setCurrentView(tab)}
          />
        )}

        {currentView === 'distributions' && (
          <DistributionsView
            distributions={distributions}
            taxDocuments={taxDocuments}
          />
        )}

        {currentView === 'crm' && (
          <SponsorCRMView
            leads={crmLeads}
            onAddLead={handleAddLead}
            onUpdateStage={handleUpdateLeadStage}
          />
        )}

        {currentView === 'importer' && (
          <HtmlScreenImporter />
        )}
      </main>

      {/* Primary Modal: Invest / Commit */}
      {activeInvestDeal && (
        <InvestModal
          deal={activeInvestDeal}
          onClose={() => setActiveInvestDeal(null)}
          onCompleteInvestment={handleCompleteInvestment}
        />
      )}

      {/* Modal: Add New Deal (GP Sponsor) */}
      {showNewDealModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-lg shadow-xl max-w-lg w-full border border-slate-200 p-6 space-y-4 my-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Building className="w-5 h-5 text-indigo-600" />
                <h3 className="text-base font-bold text-slate-900">Launch New Syndication Offering</h3>
              </div>
              <button
                onClick={() => setShowNewDealModal(false)}
                className="text-slate-400 hover:text-slate-600 text-lg font-bold p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateNewDealSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-medium text-slate-700 mb-1">Asset Offering Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Crescent Heights Multifamily"
                  value={dealTitle}
                  onChange={(e) => setDealTitle(e.target.value)}
                  className="w-full px-3 py-1.5 border border-slate-200 rounded focus:outline-none focus:ring-1 focus:ring-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Market Location</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Phoenix, AZ"
                    value={dealLocation}
                    onChange={(e) => setDealLocation(e.target.value)}
                    className="w-full px-3 py-1.5 border border-slate-200 rounded focus:outline-none focus:ring-1 focus:ring-slate-900"
                  />
                </div>

                <div>
                  <label className="block font-medium text-slate-700 mb-1">Asset Class</label>
                  <select
                    value={dealAssetClass}
                    onChange={(e) => setDealAssetClass(e.target.value as any)}
                    className="w-full px-3 py-1.5 border border-slate-200 rounded focus:outline-none focus:ring-1 focus:ring-slate-900"
                  >
                    <option value="Multifamily">Multifamily</option>
                    <option value="Industrial">Industrial</option>
                    <option value="Healthcare / Medical">Healthcare / Medical</option>
                    <option value="Mixed-Use Retail">Mixed-Use Retail</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Target IRR (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={dealIrr}
                    onChange={(e) => setDealIrr(e.target.value)}
                    className="w-full px-2.5 py-1.5 border border-slate-200 rounded focus:outline-none focus:ring-1 focus:ring-slate-900 font-mono-tabular"
                  />
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Equity Multiple</label>
                  <input
                    type="number"
                    step="0.05"
                    value={dealMultiple}
                    onChange={(e) => setDealMultiple(e.target.value)}
                    className="w-full px-2.5 py-1.5 border border-slate-200 rounded focus:outline-none focus:ring-1 focus:ring-slate-900 font-mono-tabular"
                  />
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Pref Return (%)</label>
                  <input
                    type="number"
                    step="0.5"
                    value={dealPref}
                    onChange={(e) => setDealPref(e.target.value)}
                    className="w-full px-2.5 py-1.5 border border-slate-200 rounded focus:outline-none focus:ring-1 focus:ring-slate-900 font-mono-tabular"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Total Equity Target ($)</label>
                  <input
                    type="number"
                    step="100000"
                    value={dealTargetRaise}
                    onChange={(e) => setDealTargetRaise(e.target.value)}
                    className="w-full px-3 py-1.5 border border-slate-200 rounded focus:outline-none focus:ring-1 focus:ring-slate-900 font-mono-tabular"
                  />
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Minimum LP Check ($)</label>
                  <input
                    type="number"
                    step="5000"
                    value={dealMin}
                    onChange={(e) => setDealMin(e.target.value)}
                    className="w-full px-3 py-1.5 border border-slate-200 rounded focus:outline-none focus:ring-1 focus:ring-slate-900 font-mono-tabular"
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Executive Summary</label>
                <textarea
                  rows={3}
                  value={dealDescription}
                  onChange={(e) => setDealDescription(e.target.value)}
                  placeholder="Describe property acquisition and value-add business plan..."
                  className="w-full px-3 py-1.5 border border-slate-200 rounded focus:outline-none focus:ring-1 focus:ring-slate-900 resize-none"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowNewDealModal(false)}
                  className="px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-md transition-colors"
                >
                  Publish Offering
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="mt-auto bg-white border-t border-slate-200 py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-900">SponsorCloud</span>
            <span>·</span>
            <span>Real Estate Fund Operating System</span>
            <span>·</span>
            <span className="text-[11px] text-slate-400">SEC Regulation D Rule 506(c) Platform</span>
          </div>
          <div className="text-[11px] text-slate-400">
            Past performance is no guarantee of future results. Private placements are speculative and illiquid.
          </div>
        </div>
      </footer>

    </div>
  );
}
