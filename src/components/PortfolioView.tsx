import React, { useState } from 'react';
import { InvestmentPosition } from '../types';
import { 
  Building2, 
  MapPin, 
  ArrowUpRight, 
  TrendingUp, 
  CheckCircle2, 
  Settings2,
  DollarSign,
  ShieldCheck,
  Calendar
} from 'lucide-react';

interface PortfolioViewProps {
  positions: InvestmentPosition[];
  onNavigateToDeal: (dealId: string) => void;
  onNavigateToTab: (tab: any) => void;
}

export const PortfolioView: React.FC<PortfolioViewProps> = ({
  positions,
  onNavigateToDeal,
  onNavigateToTab,
}) => {
  const [selectedPosition, setSelectedPosition] = useState<InvestmentPosition | null>(null);
  const [reinvestMode, setReinvestMode] = useState<'cash' | 'drip'>('cash');

  const totalCostBasis = positions.reduce((acc, p) => acc + p.investedAmount, 0);
  const totalValuation = positions.reduce((acc, p) => acc + p.currentValue, 0);
  const totalDistributions = positions.reduce((acc, p) => acc + p.totalDistributed, 0);

  return (
    <div className="space-y-6">
      
      {/* Title & Summary */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Active Investment Positions
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Your equity ownership, quarterly yield history, and property operational asset updates.
          </p>
        </div>

        {/* Reinvestment Preference */}
        <div className="flex items-center gap-2 bg-white p-1.5 border border-slate-200 rounded-md text-xs">
          <span className="text-slate-500 text-[11px] font-medium pl-1">Distribution Election:</span>
          <button
            onClick={() => setReinvestMode('cash')}
            className={`px-2.5 py-1 rounded font-medium transition-colors ${
              reinvestMode === 'cash'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Direct ACH Payout
          </button>
          <button
            onClick={() => setReinvestMode('drip')}
            className={`px-2.5 py-1 rounded font-medium transition-colors ${
              reinvestMode === 'drip'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Auto-Reinvest
          </button>
        </div>
      </div>

      {/* Summary Banner */}
      <div className="bg-slate-900 text-white p-6 rounded-lg grid grid-cols-1 sm:grid-cols-3 gap-6 divide-y sm:divide-y-0 sm:divide-x divide-slate-800">
        <div className="sm:pr-4">
          <span className="text-xs text-slate-400 block">Total Invested Equity</span>
          <div className="text-2xl font-bold font-mono-tabular mt-1 text-white">
            ${totalCostBasis.toLocaleString()}
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">
            Across {positions.length} commercial real estate syndications
          </span>
        </div>

        <div className="pt-4 sm:pt-0 sm:px-4">
          <span className="text-xs text-slate-400 block">Current Portfolio Valuation</span>
          <div className="text-2xl font-bold font-mono-tabular mt-1 text-emerald-400">
            ${totalValuation.toLocaleString()}
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block font-mono-tabular">
            +${(totalValuation - totalCostBasis).toLocaleString()} unrealized asset appreciation
          </span>
        </div>

        <div className="pt-4 sm:pt-0 sm:pl-4">
          <span className="text-xs text-slate-400 block">Total Cash Distributions</span>
          <div className="text-2xl font-bold font-mono-tabular mt-1 text-indigo-300">
            ${totalDistributions.toLocaleString()}
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">
            13.8% cumulative cash-on-invested capital returned
          </span>
        </div>
      </div>

      {/* Position Cards */}
      <div className="space-y-4">
        {positions.map((pos) => {
          const appreciation = pos.currentValue - pos.investedAmount;
          const appreciationPct = ((appreciation / pos.investedAmount) * 100).toFixed(1);

          return (
            <div
              key={pos.id}
              className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-xs hover:border-slate-300 transition-colors"
            >
              <div className="p-5 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                
                {/* Property Thumbnail */}
                <div className="lg:col-span-3 h-36 rounded-md overflow-hidden relative bg-slate-100">
                  <img
                    src={pos.image}
                    alt={pos.dealTitle}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2 bg-slate-900/85 backdrop-blur-xs text-white text-[10px] font-semibold px-2 py-0.5 rounded">
                    {pos.assetClass}
                  </div>
                </div>

                {/* Details */}
                <div className="lg:col-span-5 space-y-2">
                  <div className="flex items-center text-xs text-slate-500 gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{pos.location}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono-tabular">Acquired {pos.investedDate}</span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900">
                    {pos.dealTitle}
                  </h3>

                  <div className="flex items-center gap-3 text-xs text-slate-600">
                    <span>Entity: <strong className="font-semibold text-slate-800">{pos.entityName}</strong></span>
                    <span aria-hidden="true">·</span>
                    <span>Equity Ownership: <strong className="font-mono-tabular text-slate-800">{pos.ownershipPercent}%</strong></span>
                  </div>

                  <div className="flex items-center gap-2 pt-1 text-xs">
                    <span className="text-slate-500">Asset Health:</span>
                    <span className="font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[11px]">
                      {pos.status}
                    </span>
                    <span className="text-slate-400">·</span>
                    <span className="text-slate-500">Trailing Yield:</span>
                    <span className="font-mono-tabular font-semibold text-slate-800">{pos.lastQuarterYield}% CoC</span>
                  </div>
                </div>

                {/* Financial Figures */}
                <div className="lg:col-span-4 bg-slate-50 p-4 rounded-md border border-slate-100 grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-500 block uppercase font-medium">Cost Basis</span>
                    <span className="text-sm font-bold text-slate-900 font-mono-tabular">
                      ${pos.investedAmount.toLocaleString()}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-500 block uppercase font-medium">Current Valuation</span>
                    <span className="text-sm font-bold text-slate-900 font-mono-tabular">
                      ${pos.currentValue.toLocaleString()}
                    </span>
                    <span className="text-[10px] text-emerald-600 font-semibold block font-mono-tabular">
                      +{appreciationPct}%
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-500 block uppercase font-medium">Distributions Paid</span>
                    <span className="text-sm font-bold text-indigo-700 font-mono-tabular">
                      ${pos.totalDistributed.toLocaleString()}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-500 block uppercase font-medium">IRR to Date</span>
                    <span className="text-sm font-bold text-slate-900 font-mono-tabular">
                      {pos.irrToDate}% Net
                    </span>
                  </div>

                  <div className="col-span-2 pt-2 border-t border-slate-200/60 flex items-center justify-between">
                    <button
                      onClick={() => onNavigateToDeal(pos.dealId)}
                      className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                    >
                      <span>Property Updates & Memo</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onNavigateToTab('distributions')}
                      className="text-xs font-medium text-slate-600 hover:text-slate-900"
                    >
                      View Payouts
                    </button>
                  </div>

                </div>

              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
