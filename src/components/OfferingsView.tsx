import React, { useState } from 'react';
import { Deal, AssetClass } from '../types';
import { 
  Building, 
  MapPin, 
  ChevronRight, 
  CheckCircle2, 
  Percent, 
  Coins, 
  Calendar,
  X,
  FileCheck2,
  TrendingUp,
  Search,
  Filter
} from 'lucide-react';

interface OfferingsViewProps {
  deals: Deal[];
  selectedDealId: string | null;
  onSelectDeal: (dealId: string | null) => void;
  onStartInvestment: (deal: Deal) => void;
}

export const OfferingsView: React.FC<OfferingsViewProps> = ({
  deals,
  selectedDealId,
  onSelectDeal,
  onStartInvestment,
}) => {
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [calcAmount, setCalcAmount] = useState<number>(50000);

  const activeDeal = deals.find((d) => d.id === selectedDealId);

  // Filtering
  const filteredDeals = deals.filter((deal) => {
    const matchesFilter = activeFilter === 'All' || deal.assetClass === activeFilter;
    const matchesSearch = 
      deal.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      deal.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      deal.assetClass.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const filterCategories = ['All', 'Multifamily', 'Industrial', 'Healthcare / Medical', 'Mixed-Use Retail'];

  // Calculate projected return for active deal drawer
  const projectedYears = activeDeal?.targetHoldYears || 5;
  const prefRate = (activeDeal?.prefReturn || 8.0) / 100;
  const annualPref = calcAmount * prefRate;
  const totalPrefOverHold = annualPref * projectedYears;
  const targetMultiple = activeDeal?.equityMultiple || 2.0;
  const totalReturnTarget = calcAmount * targetMultiple;
  const capitalGainAtExit = Math.max(0, totalReturnTarget - calcAmount - totalPrefOverHold);

  return (
    <div className="space-y-6">
      
      {/* Page Title & Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Active Syndications & Offerings
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Institutional commercial real estate offerings available for direct co-investment under Regulation D (Rule 506(c)).
          </p>
        </div>

        {/* Live Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search by market or asset..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 text-xs bg-white border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-900"
          />
        </div>
      </div>

      {/* Segmented Filter Controls */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
        {filterCategories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveFilter(category)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 ${
              activeFilter === category
                ? 'bg-slate-900 text-white'
                : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Offerings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredDeals.map((deal) => {
          const fundedPercent = Math.min(100, Math.round((deal.amountRaised / deal.totalRaise) * 100));

          return (
            <div
              key={deal.id}
              className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Property Hero Media */}
                <div className="h-56 relative bg-slate-100 overflow-hidden group">
                  <img
                    src={deal.image}
                    alt={deal.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                  />
                  
                  {/* Subtle Top Metadata Overlay */}
                  <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-xs text-white text-[11px] font-semibold px-2.5 py-1 rounded">
                    {deal.assetClass}
                  </div>

                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs text-slate-800 text-[11px] font-semibold px-2.5 py-1 rounded border border-slate-200/50">
                    {deal.status}
                  </div>
                </div>

                {/* Details Header */}
                <div className="p-5">
                  <div className="flex items-center text-xs text-slate-500 gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{deal.location}</span>
                    <span aria-hidden="true">·</span>
                    <span>{deal.unitsOrSqFt}</span>
                  </div>

                  <h2 className="text-lg font-bold text-slate-900 mt-1">
                    {deal.title}
                  </h2>

                  <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                    {deal.description}
                  </p>

                  {/* Underwriting Metrics Grid */}
                  <div className="grid grid-cols-4 gap-2 py-4 my-4 border-y border-slate-100 text-center">
                    <div>
                      <span className="text-[10px] text-slate-500 uppercase block font-medium">Target IRR</span>
                      <span className="text-sm font-bold text-slate-900 font-mono-tabular">{deal.targetIrr}%</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 uppercase block font-medium">Multiple</span>
                      <span className="text-sm font-bold text-slate-900 font-mono-tabular">{deal.equityMultiple}x</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 uppercase block font-medium">Pref Return</span>
                      <span className="text-sm font-bold text-slate-900 font-mono-tabular">{deal.prefReturn}%</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 uppercase block font-medium">Hold Period</span>
                      <span className="text-sm font-bold text-slate-900 font-mono-tabular">{deal.targetHoldYears} Yrs</span>
                    </div>
                  </div>

                  {/* Capital Raise Progress */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-medium text-slate-700">
                      <span>${(deal.amountRaised / 1000000).toFixed(2)}M committed</span>
                      <span className="font-mono-tabular text-slate-500">
                        ${(deal.totalRaise / 1000000).toFixed(2)}M target ({fundedPercent}%)
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div 
                        className="bg-indigo-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${fundedPercent}%` }}
                      />
                    </div>
                  </div>

                </div>
              </div>

              {/* Action Footer */}
              <div className="px-5 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-3">
                <div className="text-xs text-slate-500">
                  Min: <span className="font-mono-tabular font-semibold text-slate-900">${deal.minInvestment.toLocaleString()}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      onSelectDeal(deal.id);
                      setCalcAmount(deal.minInvestment);
                    }}
                    className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-md transition-colors"
                  >
                    Deal Sheet
                  </button>
                  <button
                    onClick={() => onStartInvestment(deal)}
                    className="px-3.5 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-md transition-colors flex items-center gap-1 shadow-xs"
                  >
                    <span>Invest Now</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>
          );
        })}
      </div>

      {/* Deal Room Drawer / Modal */}
      {activeDeal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-lg shadow-2xl max-w-3xl w-full border border-slate-200 my-8 overflow-hidden">
            
            {/* Drawer Header */}
            <div className="relative h-64 bg-slate-100">
              <img
                src={activeDeal.image}
                alt={activeDeal.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
              
              <button
                onClick={() => onSelectDeal(null)}
                className="absolute top-4 right-4 bg-black/40 hover:bg-black/60 text-white rounded-full p-1.5 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-5 left-6 right-6 text-white">
                <div className="flex items-center gap-2 text-xs font-medium text-slate-200 mb-1">
                  <span>{activeDeal.assetClass}</span>
                  <span aria-hidden="true">·</span>
                  <span>{activeDeal.location}</span>
                  <span aria-hidden="true">·</span>
                  <span>{activeDeal.unitsOrSqFt}</span>
                </div>
                <h2 className="text-2xl font-bold tracking-tight">
                  {activeDeal.title}
                </h2>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
              
              {/* Executive Summary & Business Plan */}
              <div>
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                  Executive Business Plan
                </h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  {activeDeal.description}
                </p>
                <div className="mt-3 p-3.5 bg-slate-50 border border-slate-100 rounded-md text-xs text-slate-700">
                  <span className="font-semibold text-slate-900 block mb-1">Value-Add Execution Strategy:</span>
                  {activeDeal.businessPlan}
                </div>
              </div>

              {/* Key Highlights */}
              <div>
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                  Investment Highlights
                </h3>
                <div className="mt-2.5 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                  {activeDeal.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2 bg-slate-50/80 p-2.5 rounded border border-slate-100">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Underwriting Sensitivity Matrix */}
              <div>
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                  Underwriting & Capital Stack
                </h3>
                <div className="mt-2.5 grid grid-cols-2 sm:grid-cols-5 gap-3 text-center">
                  <div className="p-3 bg-slate-50 rounded border border-slate-100">
                    <span className="text-[10px] text-slate-500 block uppercase">Cap Rate on Cost</span>
                    <span className="text-sm font-bold text-slate-900 font-mono-tabular">{activeDeal.underwriting.capRateOnCost}%</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded border border-slate-100">
                    <span className="text-[10px] text-slate-500 block uppercase">Exit Cap Rate</span>
                    <span className="text-sm font-bold text-slate-900 font-mono-tabular">{activeDeal.underwriting.exitCapRate}%</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded border border-slate-100">
                    <span className="text-[10px] text-slate-500 block uppercase">Debt LTV</span>
                    <span className="text-sm font-bold text-slate-900 font-mono-tabular">{activeDeal.underwriting.debtLtv}%</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded border border-slate-100">
                    <span className="text-[10px] text-slate-500 block uppercase">Debt Rate</span>
                    <span className="text-sm font-bold text-slate-900 font-mono-tabular">{activeDeal.underwriting.interestRate}%</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded border border-slate-100 col-span-2 sm:col-span-1">
                    <span className="text-[10px] text-slate-500 block uppercase">Occupancy</span>
                    <span className="text-sm font-bold text-slate-900 font-mono-tabular">{activeDeal.underwriting.occupancy}%</span>
                  </div>
                </div>
              </div>

              {/* Interactive Return Projections Calculator */}
              <div className="bg-slate-900 text-white p-5 rounded-lg">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-indigo-400" />
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-200">
                      Projected Cash Return Simulator
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400 font-mono-tabular">
                    {projectedYears}-Year Holding Horizon
                  </span>
                </div>

                <div className="mt-4 space-y-4">
                  <div>
                    <div className="flex justify-between text-xs text-slate-300 mb-1.5">
                      <span>Investment Commitment:</span>
                      <span className="font-mono-tabular font-bold text-white">${calcAmount.toLocaleString()}</span>
                    </div>
                    <input
                      type="range"
                      min={activeDeal.minInvestment}
                      max={500000}
                      step={5000}
                      value={calcAmount}
                      onChange={(e) => setCalcAmount(Number(e.target.value))}
                      className="w-full accent-indigo-500 cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono-tabular">
                      <span>Min: ${activeDeal.minInvestment.toLocaleString()}</span>
                      <span>$250,000</span>
                      <span>$500,000</span>
                    </div>
                  </div>

                  {/* Calculator Output Grid */}
                  <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-800 text-center">
                    <div className="p-2.5 bg-slate-800/80 rounded">
                      <span className="text-[10px] text-slate-400 block uppercase">Annual Preferred Return</span>
                      <span className="text-sm font-bold text-white font-mono-tabular">
                        ${Math.round(annualPref).toLocaleString()} / yr
                      </span>
                    </div>
                    <div className="p-2.5 bg-slate-800/80 rounded">
                      <span className="text-[10px] text-slate-400 block uppercase">Cumulative Pref Yield</span>
                      <span className="text-sm font-bold text-indigo-300 font-mono-tabular">
                        ${Math.round(totalPrefOverHold).toLocaleString()}
                      </span>
                    </div>
                    <div className="p-2.5 bg-slate-800/80 rounded">
                      <span className="text-[10px] text-slate-400 block uppercase">Projected Net Proceeds</span>
                      <span className="text-sm font-bold text-emerald-400 font-mono-tabular">
                        ${Math.round(totalReturnTarget).toLocaleString()}
                      </span>
                    </div>
                  </div>

                </div>
              </div>

            </div>

            {/* Drawer Actions */}
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
              <button
                onClick={() => onSelectDeal(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
              >
                Close Memo
              </button>
              <button
                onClick={() => {
                  onSelectDeal(null);
                  onStartInvestment(activeDeal);
                }}
                className="px-5 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-md transition-colors flex items-center gap-1.5 shadow-sm"
              >
                <span>Commit Capital to this Offering</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
