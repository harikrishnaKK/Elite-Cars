import React, { useState } from 'react';
import { Deal, InvestmentPosition, DistributionRecord, UserRole } from '../types';
import { 
  TrendingUp, 
  DollarSign, 
  PieChart, 
  Building, 
  ArrowUpRight, 
  FileText, 
  ChevronRight,
  Sparkles,
  ExternalLink
} from 'lucide-react';

interface DashboardViewProps {
  deals: Deal[];
  positions: InvestmentPosition[];
  distributions: DistributionRecord[];
  userRole: UserRole;
  onNavigateToDeal: (dealId: string) => void;
  onNavigateToTab: (tab: any) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  deals,
  positions,
  distributions,
  userRole,
  onNavigateToDeal,
  onNavigateToTab,
}) => {
  const [selectedPeriod, setSelectedPeriod] = useState<'quarterly' | 'annual'>('quarterly');
  const [selectedReceipt, setSelectedReceipt] = useState<DistributionRecord | null>(null);

  // Compute metrics
  const totalInvested = positions.reduce((acc, p) => acc + p.investedAmount, 0);
  const totalValue = positions.reduce((acc, p) => acc + p.currentValue, 0);
  const totalDistributed = positions.reduce((acc, p) => acc + p.totalDistributed, 0);
  const totalUnrealizedGain = positions.reduce((acc, p) => acc + p.unrealizedGain, 0);

  // Total sponsor AUM
  const totalAum = deals.reduce((acc, d) => acc + d.totalRaise, 0);
  const totalRaised = deals.reduce((acc, d) => acc + d.amountRaised, 0);

  // Quarterly distribution chart simulation data
  const chartData = [
    { label: 'Q4 2024', prefYield: 3000, roc: 0, total: 3000 },
    { label: 'Q1 2025', prefYield: 5125, roc: 0, total: 5125 },
    { label: 'Q2 2025', prefYield: 6750, roc: 0, total: 6750 },
    { label: 'Q3 2025', prefYield: 8875, roc: 1200, total: 10075 },
    { label: 'Q4 2025 (Est)', prefYield: 9200, roc: 1500, total: 10700 },
  ];

  const maxChartValue = 12000;

  return (
    <div className="space-y-8">
      
      {/* Top Welcome & Subtitle Notice */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            {userRole === 'investor' ? 'Investor Portfolio Overview' : 'Sponsor Fund Command Center'}
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            {userRole === 'investor' 
              ? 'Real-time performance, cash flow distributions, and active capital allocations.'
              : 'Enterprise syndication pipeline, active fund equity, and LP investor operations.'}
          </p>
        </div>

        {/* Screen Importer Quick Launcher Link */}
        <button
          onClick={() => onNavigateToTab('importer')}
          className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-md transition-colors text-left"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0" />
          <span>Have an HTML screen or image to hotlink? Open Importer</span>
          <ChevronRight className="w-3.5 h-3.5 text-amber-600" />
        </button>
      </div>

      {/* KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {userRole === 'investor' ? (
          <>
            <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-xs">
              <span className="text-xs font-medium text-slate-500 block">Total Portfolio Value</span>
              <div className="mt-2 flex items-baseline justify-between">
                <span className="text-2xl font-bold tracking-tight text-slate-900 font-mono-tabular">
                  ${totalValue.toLocaleString()}
                </span>
                <span className="text-xs font-semibold text-emerald-600 flex items-center">
                  <TrendingUp className="w-3 h-3 mr-0.5" /> +{((totalUnrealizedGain / totalInvested) * 100).toFixed(1)}%
                </span>
              </div>
              <div className="mt-2 text-xs text-slate-500 font-mono-tabular">
                ${totalInvested.toLocaleString()} initial equity
              </div>
            </div>

            <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-xs">
              <span className="text-xs font-medium text-slate-500 block">Cumulative Distributions</span>
              <div className="mt-2 flex items-baseline justify-between">
                <span className="text-2xl font-bold tracking-tight text-slate-900 font-mono-tabular">
                  ${totalDistributed.toLocaleString()}
                </span>
                <span className="text-xs font-medium text-slate-600">
                  {distributions.length} Payouts
                </span>
              </div>
              <div className="mt-2 text-xs text-slate-500 font-mono-tabular">
                Last payment: $3,000 (Q3 2025)
              </div>
            </div>

            <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-xs">
              <span className="text-xs font-medium text-slate-500 block">Blended Portfolio Net IRR</span>
              <div className="mt-2 flex items-baseline justify-between">
                <span className="text-2xl font-bold tracking-tight text-slate-900 font-mono-tabular">
                  16.8%
                </span>
                <span className="text-xs font-medium text-slate-500">
                  Net of GP fees
                </span>
              </div>
              <div className="mt-2 text-xs text-slate-500">
                8.2% Avg. Cash-on-Cash yield
              </div>
            </div>

            <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-xs">
              <span className="text-xs font-medium text-slate-500 block">Active Property Holdings</span>
              <div className="mt-2 flex items-baseline justify-between">
                <span className="text-2xl font-bold tracking-tight text-slate-900 font-mono-tabular">
                  {positions.length} Assets
                </span>
                <span className="text-xs font-medium text-emerald-700">
                  100% Performing
                </span>
              </div>
              <div className="mt-2 text-xs text-slate-500">
                Austin · Inland Empire · Denver
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-xs">
              <span className="text-xs font-medium text-slate-500 block">Total Active Fund AUM</span>
              <div className="mt-2 flex items-baseline justify-between">
                <span className="text-2xl font-bold tracking-tight text-slate-900 font-mono-tabular">
                  ${(totalAum / 1000000).toFixed(1)}M
                </span>
                <span className="text-xs font-semibold text-emerald-600">
                  4 Active Assets
                </span>
              </div>
              <div className="mt-2 text-xs text-slate-500 font-mono-tabular">
                ${(totalRaised / 1000000).toFixed(1)}M Total Capital Raised
              </div>
            </div>

            <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-xs">
              <span className="text-xs font-medium text-slate-500 block">Active Capital Raise</span>
              <div className="mt-2 flex items-baseline justify-between">
                <span className="text-2xl font-bold tracking-tight text-slate-900 font-mono-tabular">
                  {((totalRaised / totalAum) * 100).toFixed(0)}%
                </span>
                <span className="text-xs font-medium text-slate-500 font-mono-tabular">
                  ${((totalAum - totalRaised) / 1000000).toFixed(1)}M remaining
                </span>
              </div>
              <div className="w-full bg-slate-100 h-1.5 rounded-full mt-3 overflow-hidden">
                <div 
                  className="bg-indigo-600 h-1.5 rounded-full" 
                  style={{ width: `${(totalRaised / totalAum) * 100}%` }}
                />
              </div>
            </div>

            <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-xs">
              <span className="text-xs font-medium text-slate-500 block">Accredited LP Network</span>
              <div className="mt-2 flex items-baseline justify-between">
                <span className="text-2xl font-bold tracking-tight text-slate-900 font-mono-tabular">
                  148 LPs
                </span>
                <span className="text-xs font-medium text-indigo-600">
                  506(c) & 506(b)
                </span>
              </div>
              <div className="mt-2 text-xs text-slate-500 font-mono-tabular">
                Avg. ticket: $118,500
              </div>
            </div>

            <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-xs">
              <span className="text-xs font-medium text-slate-500 block">YTD Distributed to LPs</span>
              <div className="mt-2 flex items-baseline justify-between">
                <span className="text-2xl font-bold tracking-tight text-slate-900 font-mono-tabular">
                  $3,420,000
                </span>
                <span className="text-xs font-medium text-emerald-600">
                  On Schedule
                </span>
              </div>
              <div className="mt-2 text-xs text-slate-500">
                100% preferred return satisfied
              </div>
            </div>
          </>
        )}
      </div>

      {/* Main Grid: Chart & Allocation */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Cash Flow Distribution Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-lg border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Cash Distributions & Payout Trajectory
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Preferred yield distributions and return of capital by calendar quarter.
              </p>
            </div>
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-md text-xs font-medium">
              <button
                onClick={() => setSelectedPeriod('quarterly')}
                className={`px-2.5 py-1 rounded transition-colors ${
                  selectedPeriod === 'quarterly'
                    ? 'bg-white text-slate-900 shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Quarterly
              </button>
              <button
                onClick={() => setSelectedPeriod('annual')}
                className={`px-2.5 py-1 rounded transition-colors ${
                  selectedPeriod === 'annual'
                    ? 'bg-white text-slate-900 shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Cumulative
              </button>
            </div>
          </div>

          {/* Clean Bar Visualization */}
          <div className="mt-6 pt-4">
            <div className="h-56 flex items-end justify-between gap-3 sm:gap-6 px-2">
              {chartData.map((d, idx) => {
                const heightPercent = Math.min(100, (d.total / maxChartValue) * 100);
                const prefHeight = (d.prefYield / d.total) * 100;
                const rocHeight = (d.roc / d.total) * 100;

                return (
                  <div key={idx} className="flex-1 flex flex-col items-center h-full justify-end group">
                    <div className="text-[11px] font-mono-tabular font-medium text-slate-700 opacity-0 group-hover:opacity-100 transition-opacity mb-1">
                      ${d.total.toLocaleString()}
                    </div>
                    <div 
                      className="w-full max-w-[48px] bg-slate-100 rounded-t flex flex-col justify-end overflow-hidden transition-all duration-300 group-hover:brightness-95"
                      style={{ height: `${heightPercent}%` }}
                    >
                      {d.roc > 0 && (
                        <div 
                          className="w-full bg-emerald-500" 
                          style={{ height: `${rocHeight}%` }} 
                          title={`Return of Capital: $${d.roc}`}
                        />
                      )}
                      <div 
                        className="w-full bg-indigo-600" 
                        style={{ height: `${prefHeight}%` }} 
                        title={`Preferred Return: $${d.prefYield}`}
                      />
                    </div>
                    <div className="mt-2 text-xs font-medium text-slate-600 text-center">
                      {d.label}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between text-xs text-slate-500">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 bg-indigo-600 rounded-xs inline-block" />
                  <span>8.0% Preferred Return Yield</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 bg-emerald-500 rounded-xs inline-block" />
                  <span>Capital Return / Refinance</span>
                </span>
              </div>
              <button 
                onClick={() => onNavigateToTab('distributions')}
                className="font-medium text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
              >
                <span>View Full Distribution Ledger</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Sector Asset Allocation Card */}
        <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h2 className="text-base font-bold text-slate-900">Portfolio Diversification</h2>
              <PieChart className="w-4 h-4 text-slate-400" />
            </div>

            <div className="mt-5 space-y-4">
              <div>
                <div className="flex justify-between text-xs font-medium text-slate-700 mb-1">
                  <span>Multifamily (Class A)</span>
                  <span className="font-mono-tabular">45% · $202,500</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '45%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-medium text-slate-700 mb-1">
                  <span>Industrial Logistics</span>
                  <span className="font-mono-tabular">35% · $157,500</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '35%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-medium text-slate-700 mb-1">
                  <span>Healthcare / Medical Office</span>
                  <span className="font-mono-tabular">20% · $90,000</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '20%' }} />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100">
            <div className="bg-slate-50 p-3 rounded border border-slate-100 text-xs text-slate-600">
              <span className="font-semibold text-slate-900 block mb-0.5">Underwriting Stability</span>
              Weighted average portfolio loan-to-value (LTV) sits at <span className="font-mono-tabular font-semibold text-slate-900">55.2%</span> with fixed-rate terms through 2029.
            </div>
          </div>
        </div>

      </div>

      {/* Featured Live Offering Banner */}
      {deals.length > 0 && (
        <div className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-xs">
          <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            
            {/* Property Image with Fallback */}
            <div className="md:col-span-5 h-56 rounded-lg overflow-hidden relative bg-slate-100 border border-slate-200">
              <img
                src={deals[0].image}
                alt={deals[0].title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 bg-slate-900/85 backdrop-blur-xs text-white text-[11px] font-semibold px-2.5 py-1 rounded">
                Active Opportunity
              </div>
            </div>

            {/* Content & Details */}
            <div className="md:col-span-7 flex flex-col justify-between h-full space-y-4">
              <div>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span>{deals[0].assetClass}</span>
                  <span aria-hidden="true">·</span>
                  <span>{deals[0].location}</span>
                  <span aria-hidden="true">·</span>
                  <span>{deals[0].unitsOrSqFt}</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mt-1">
                  {deals[0].title}
                </h3>
                <p className="text-xs text-slate-600 mt-2 line-clamp-2">
                  {deals[0].description}
                </p>
              </div>

              {/* Stats strip */}
              <div className="grid grid-cols-4 gap-2 py-3 border-y border-slate-100 text-center">
                <div>
                  <span className="text-[10px] text-slate-500 uppercase block font-medium">Target IRR</span>
                  <span className="text-base font-bold text-slate-900 font-mono-tabular">{deals[0].targetIrr}%</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 uppercase block font-medium">Equity Multiple</span>
                  <span className="text-base font-bold text-slate-900 font-mono-tabular">{deals[0].equityMultiple}x</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 uppercase block font-medium">Pref Return</span>
                  <span className="text-base font-bold text-slate-900 font-mono-tabular">{deals[0].prefReturn}%</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 uppercase block font-medium">Min Invest</span>
                  <span className="text-base font-bold text-slate-900 font-mono-tabular">${deals[0].minInvestment.toLocaleString()}</span>
                </div>
              </div>

              {/* Progress and action */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="text-xs">
                  <div className="flex justify-between font-medium text-slate-700 mb-1">
                    <span>${(deals[0].amountRaised / 1000000).toFixed(1)}M Raised</span>
                    <span className="font-mono-tabular">{Math.round((deals[0].amountRaised / deals[0].totalRaise) * 100)}% Funded</span>
                  </div>
                  <div className="w-48 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div 
                      className="bg-indigo-600 h-1.5 rounded-full" 
                      style={{ width: `${(deals[0].amountRaised / deals[0].totalRaise) * 100}%` }}
                    />
                  </div>
                </div>

                <button
                  onClick={() => onNavigateToDeal(deals[0].id)}
                  className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-md transition-colors flex items-center justify-center gap-1.5 shrink-0"
                >
                  <span>Review Deal Room & Memo</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* Recent Distributions Table */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900">Recent Distribution Transactions</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Verified wire confirmations and quarterly preferred cash yields deposited to your account.
            </p>
          </div>
          <button
            onClick={() => onNavigateToTab('distributions')}
            className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
          >
            <span>View All</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                <th className="py-3 px-5">Date</th>
                <th className="py-3 px-5">Asset / Syndication</th>
                <th className="py-3 px-5">Distribution Period</th>
                <th className="py-3 px-5">Method</th>
                <th className="py-3 px-5 text-right">Amount</th>
                <th className="py-3 px-5 text-center">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {distributions.slice(0, 4).map((dist) => (
                <tr key={dist.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-5 font-mono-tabular text-slate-600 whitespace-nowrap">
                    {dist.date}
                  </td>
                  <td className="py-3 px-5 font-medium text-slate-900 whitespace-nowrap">
                    {dist.dealTitle}
                  </td>
                  <td className="py-3 px-5 text-slate-500 whitespace-nowrap">
                    {dist.period}
                  </td>
                  <td className="py-3 px-5 text-slate-600 whitespace-nowrap">
                    {dist.payoutMethod}
                  </td>
                  <td className="py-3 px-5 text-right font-mono-tabular font-bold text-slate-900 whitespace-nowrap">
                    +${dist.amount.toLocaleString()}
                  </td>
                  <td className="py-3 px-5 text-center">
                    <button
                      onClick={() => setSelectedReceipt(dist)}
                      className="px-2 py-1 text-[11px] font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded transition-colors inline-flex items-center gap-1"
                    >
                      <FileText className="w-3 h-3 text-slate-500" />
                      <span>{dist.pdfRef}</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Distribution Receipt Modal */}
      {selectedReceipt && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full border border-slate-200 p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900">Distribution Advice & Receipt</h3>
                <span className="text-xs text-slate-500 font-mono-tabular">{selectedReceipt.pdfRef}</span>
              </div>
              <button 
                onClick={() => setSelectedReceipt(null)}
                className="text-slate-400 hover:text-slate-600 text-lg font-bold p-1"
              >
                ✕
              </button>
            </div>

            <div className="bg-slate-50 p-4 rounded border border-slate-100 space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-200/60">
                <span className="text-slate-500">Asset:</span>
                <span className="font-semibold text-slate-900">{selectedReceipt.dealTitle}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200/60">
                <span className="text-slate-500">Effective Date:</span>
                <span className="font-mono-tabular text-slate-900">{selectedReceipt.date}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200/60">
                <span className="text-slate-500">Classification:</span>
                <span className="text-slate-900">{selectedReceipt.period}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200/60">
                <span className="text-slate-500">Payment Delivery:</span>
                <span className="text-slate-900">{selectedReceipt.payoutMethod} (Fedwire Reference)</span>
              </div>
              <div className="flex justify-between py-2 text-sm">
                <span className="font-bold text-slate-900">Total Net Amount:</span>
                <span className="font-bold font-mono-tabular text-emerald-700 text-base">
                  ${selectedReceipt.amount.toLocaleString()}.00
                </span>
              </div>
            </div>

            <p className="text-[11px] text-slate-500 leading-relaxed">
              This distribution represents ordinary operating cash distributions under Section 5.2 of the Limited Partnership Agreement. Schedule K-1 will reflect applicable tax treatment at fiscal year-end.
            </p>

            <div className="pt-2 flex justify-end gap-2">
              <button
                onClick={() => setSelectedReceipt(null)}
                className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-md transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
