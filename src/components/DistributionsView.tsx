import React, { useState } from 'react';
import { DistributionRecord, TaxDocument } from '../types';
import { 
  Download, 
  FileText, 
  Sliders, 
  CheckCircle2, 
  ArrowDownToLine, 
  Calendar, 
  DollarSign,
  Percent,
  Calculator
} from 'lucide-react';

interface DistributionsViewProps {
  distributions: DistributionRecord[];
  taxDocuments: TaxDocument[];
}

export const DistributionsView: React.FC<DistributionsViewProps> = ({
  distributions,
  taxDocuments,
}) => {
  const [activeTab, setActiveTab] = useState<'ledger' | 'waterfall' | 'tax'>('ledger');
  const [previewK1, setPreviewK1] = useState<TaxDocument | null>(null);

  // Waterfall Simulator State
  const [wfCapital, setWfCapital] = useState<number>(10000000);
  const [wfExitProceeds, setWfExitProceeds] = useState<number>(18500000);
  const [wfYears, setWfYears] = useState<number>(5);
  const [wfPrefRate, setWfPrefRate] = useState<number>(8.0);

  // Compute Waterfall Tiers
  // Tier 1: Return of Capital + Cumulative Pref to LPs
  const totalPrefDue = wfCapital * (wfPrefRate / 100) * wfYears;
  const tier1Needed = wfCapital + totalPrefDue;
  const tier1Lp = Math.min(wfExitProceeds, tier1Needed);
  const tier1Gp = 0;

  const remainingAfterTier1 = Math.max(0, wfExitProceeds - tier1Needed);

  // Tier 2: 80% LP / 20% GP Promote split on residual profits
  const tier2Lp = remainingAfterTier1 * 0.8;
  const tier2Gp = remainingAfterTier1 * 0.2;

  const totalLpProceeds = tier1Lp + tier2Lp;
  const totalGpProceeds = tier1Gp + tier2Gp;

  const lpMultiple = (totalLpProceeds / wfCapital).toFixed(2);
  const totalProfit = wfExitProceeds - wfCapital;

  // CSV Export handler
  const handleExportCsv = () => {
    const headers = ['ID,Date,Asset,Period,Method,Amount,Status'];
    const rows = distributions.map(
      (d) => `"${d.id}","${d.date}","${d.dealTitle}","${d.period}","${d.payoutMethod}",${d.amount},"${d.status}"`
    );
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `SponsorCloud_Distributions_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Distributions & Tax Center
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Historical cash payout ledger, waterfall distribution mechanics, and Schedule K-1 tax document repository.
          </p>
        </div>

        {/* View mode tabs */}
        <div className="flex items-center gap-1 bg-white p-1 border border-slate-200 rounded-md">
          <button
            onClick={() => setActiveTab('ledger')}
            className={`px-3 py-1.5 text-xs font-semibold rounded transition-colors ${
              activeTab === 'ledger'
                ? 'bg-slate-900 text-white'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            Cash Ledger
          </button>
          <button
            onClick={() => setActiveTab('waterfall')}
            className={`px-3 py-1.5 text-xs font-semibold rounded transition-colors ${
              activeTab === 'waterfall'
                ? 'bg-slate-900 text-white'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            Waterfall Simulator
          </button>
          <button
            onClick={() => setActiveTab('tax')}
            className={`px-3 py-1.5 text-xs font-semibold rounded transition-colors ${
              activeTab === 'tax'
                ? 'bg-slate-900 text-white'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            Schedule K-1 Center
          </button>
        </div>
      </div>

      {/* Tab 1: Cash Ledger */}
      {activeTab === 'ledger' && (
        <div className="bg-white rounded-lg border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-bold text-slate-900">Distribution Ledger</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                All operating cash flow payouts, refinance proceeds, and preferred return distributions.
              </p>
            </div>
            <button
              onClick={handleExportCsv}
              className="px-3.5 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-md transition-colors flex items-center gap-1.5 self-start sm:self-auto"
            >
              <Download className="w-3.5 h-3.5 text-slate-500" />
              <span>Export CSV</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                  <th className="py-3 px-5">Effective Date</th>
                  <th className="py-3 px-5">Investment Asset</th>
                  <th className="py-3 px-5">Income Classification</th>
                  <th className="py-3 px-5">Disbursement Method</th>
                  <th className="py-3 px-5 text-right">Preferred Return</th>
                  <th className="py-3 px-5 text-right">Net Distribution</th>
                  <th className="py-3 px-5 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {distributions.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-5 font-mono-tabular text-slate-600 whitespace-nowrap">
                      {item.date}
                    </td>
                    <td className="py-3 px-5 font-medium text-slate-900 whitespace-nowrap">
                      {item.dealTitle}
                    </td>
                    <td className="py-3 px-5 text-slate-500 whitespace-nowrap">
                      {item.period}
                    </td>
                    <td className="py-3 px-5 text-slate-600 whitespace-nowrap">
                      {item.payoutMethod}
                    </td>
                    <td className="py-3 px-5 text-right font-mono-tabular text-slate-600 whitespace-nowrap">
                      ${item.prefAmount.toLocaleString()}
                    </td>
                    <td className="py-3 px-5 text-right font-mono-tabular font-bold text-emerald-700 whitespace-nowrap">
                      +${item.amount.toLocaleString()}
                    </td>
                    <td className="py-3 px-5 text-center whitespace-nowrap">
                      <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Waterfall Simulator */}
      {activeTab === 'waterfall' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-xs space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Calculator className="w-5 h-5 text-indigo-600" />
                <span>Real Estate Syndication Waterfall Model</span>
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Standard institutional 2-tier American waterfall: 100% Return of Capital + Preferred Return to Limited Partners (LPs), followed by an 80/20 LP / General Partner (GP) promote split on residual capital profits.
              </p>
            </div>

            {/* Slider Controls */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="space-y-4 bg-slate-50 p-4 rounded-md border border-slate-100">
                <span className="text-xs font-bold text-slate-900 uppercase tracking-wide block">
                  Fund Assumptions
                </span>

                <div>
                  <div className="flex justify-between text-xs text-slate-700 mb-1">
                    <span>Total LP Invested Capital:</span>
                    <span className="font-mono-tabular font-bold">${wfCapital.toLocaleString()}</span>
                  </div>
                  <input
                    type="range"
                    min={1000000}
                    max={30000000}
                    step={500000}
                    value={wfCapital}
                    onChange={(e) => setWfCapital(Number(e.target.value))}
                    className="w-full accent-indigo-600 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs text-slate-700 mb-1">
                    <span>Annual Preferred Return Hurdle:</span>
                    <span className="font-mono-tabular font-bold">{wfPrefRate}% / yr</span>
                  </div>
                  <input
                    type="range"
                    min={6.0}
                    max={10.0}
                    step={0.5}
                    value={wfPrefRate}
                    onChange={(e) => setWfPrefRate(Number(e.target.value))}
                    className="w-full accent-indigo-600 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs text-slate-700 mb-1">
                    <span>Hold Period (Years to Exit):</span>
                    <span className="font-mono-tabular font-bold">{wfYears} Years</span>
                  </div>
                  <input
                    type="range"
                    min={3}
                    max={7}
                    step={1}
                    value={wfYears}
                    onChange={(e) => setWfYears(Number(e.target.value))}
                    className="w-full accent-indigo-600 cursor-pointer"
                  />
                </div>
              </div>

              <div className="space-y-4 bg-slate-50 p-4 rounded-md border border-slate-100">
                <span className="text-xs font-bold text-slate-900 uppercase tracking-wide block">
                  Liquidation & Exit Value
                </span>

                <div>
                  <div className="flex justify-between text-xs text-slate-700 mb-1">
                    <span>Total Net Exit Proceeds:</span>
                    <span className="font-mono-tabular font-bold text-indigo-700 text-sm">
                      ${wfExitProceeds.toLocaleString()}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={wfCapital}
                    max={wfCapital * 3}
                    step={250000}
                    value={wfExitProceeds}
                    onChange={(e) => setWfExitProceeds(Number(e.target.value))}
                    className="w-full accent-indigo-600 cursor-pointer"
                  />
                  <div className="text-[11px] text-slate-500 mt-1">
                    Total Gross Profit Created: <strong className="font-mono-tabular text-slate-800">${totalProfit.toLocaleString()}</strong>
                  </div>
                </div>

                {/* Split Visualizer */}
                <div className="pt-2">
                  <span className="text-xs text-slate-600 block mb-1.5 font-medium">Proceeds Split Allocation:</span>
                  <div className="h-6 w-full bg-slate-200 rounded flex overflow-hidden text-[11px] font-bold text-white">
                    <div 
                      className="bg-indigo-600 flex items-center justify-center transition-all duration-300" 
                      style={{ width: `${(totalLpProceeds / wfExitProceeds) * 100}%` }}
                    >
                      LP {((totalLpProceeds / wfExitProceeds) * 100).toFixed(0)}%
                    </div>
                    <div 
                      className="bg-slate-800 flex items-center justify-center transition-all duration-300" 
                      style={{ width: `${(totalGpProceeds / wfExitProceeds) * 100}%` }}
                    >
                      GP {((totalGpProceeds / wfExitProceeds) * 100).toFixed(0)}%
                    </div>
                  </div>
                </div>

              </div>

            </div>

            {/* Results Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100 text-center">
              <div className="p-4 bg-indigo-50/60 rounded-md border border-indigo-100">
                <span className="text-xs text-indigo-900 block font-medium">Total LP Distribution</span>
                <span className="text-xl font-bold text-indigo-950 font-mono-tabular mt-1 block">
                  ${Math.round(totalLpProceeds).toLocaleString()}
                </span>
                <span className="text-[11px] text-indigo-700 font-semibold font-mono-tabular mt-1 block">
                  {lpMultiple}x LP Net Equity Multiple
                </span>
              </div>

              <div className="p-4 bg-slate-50 rounded-md border border-slate-200">
                <span className="text-xs text-slate-600 block font-medium">GP Carried Interest (Promote)</span>
                <span className="text-xl font-bold text-slate-900 font-mono-tabular mt-1 block">
                  ${Math.round(totalGpProceeds).toLocaleString()}
                </span>
                <span className="text-[11px] text-slate-500 font-mono-tabular mt-1 block">
                  20% share of excess profits
                </span>
              </div>

              <div className="p-4 bg-emerald-50/60 rounded-md border border-emerald-100">
                <span className="text-xs text-emerald-900 block font-medium">Cumulative LP Preferred Yield</span>
                <span className="text-xl font-bold text-emerald-950 font-mono-tabular mt-1 block">
                  ${Math.round(totalPrefDue).toLocaleString()}
                </span>
                <span className="text-[11px] text-emerald-700 font-semibold font-mono-tabular mt-1 block">
                  100% capital preservation prioritized
                </span>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Tab 3: Tax Documents (Schedule K-1) */}
      {activeTab === 'tax' && (
        <div className="bg-white rounded-lg border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-5 border-b border-slate-100">
            <h2 className="text-base font-bold text-slate-900">Schedule K-1 Tax Filing Center</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Download IRS Form 1065 Schedule K-1s for your federal and state tax filings.
            </p>
          </div>

          <div className="divide-y divide-slate-100">
            {taxDocuments.map((doc) => (
              <div key={doc.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/70 transition-colors">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 bg-slate-100 rounded text-slate-700 shrink-0">
                    <FileText className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-slate-900">{doc.dealTitle}</h3>
                      <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                        Tax Year {doc.year}
                      </span>
                    </div>
                    <div className="text-xs text-slate-500 mt-1 flex items-center gap-3">
                      <span>{doc.docType}</span>
                      <span aria-hidden="true">·</span>
                      <span>Uploaded {doc.dateUploaded}</span>
                      <span aria-hidden="true">·</span>
                      <span>{doc.fileSize}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => setPreviewK1(doc)}
                    className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-md transition-colors"
                  >
                    View Schedule Details
                  </button>
                  <button
                    onClick={() => setPreviewK1(doc)}
                    className="px-3.5 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-md transition-colors flex items-center gap-1.5 shadow-xs"
                  >
                    <ArrowDownToLine className="w-3.5 h-3.5" />
                    <span>Download PDF</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* K-1 Modal Preview */}
      {previewK1 && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-xl w-full border border-slate-200 p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900">IRS Form 1065 — Schedule K-1</h3>
                <span className="text-xs text-slate-500">Tax Year {previewK1.year} · {previewK1.dealTitle}</span>
              </div>
              <button 
                onClick={() => setPreviewK1(null)}
                className="text-slate-400 hover:text-slate-600 text-lg font-bold p-1"
              >
                ✕
              </button>
            </div>

            <div className="bg-slate-50 p-4 rounded border border-slate-100 space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-200/60">
                <span className="text-slate-500">Part II - Partner Tax ID:</span>
                <span className="font-mono-tabular text-slate-900">***-**-4912 (Domestic Limited Partner)</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200/60">
                <span className="text-slate-500">Box 1 - Ordinary Business Income:</span>
                <span className="font-mono-tabular text-slate-900">$0.00</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200/60">
                <span className="text-slate-500">Box 2 - Net Rental Real Estate Income (Loss):</span>
                <span className="font-mono-tabular font-semibold text-slate-900">-$18,450.00 (Depreciation Shielded)</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200/60">
                <span className="text-slate-500">Box 19 - Cash Distributions Received:</span>
                <span className="font-mono-tabular font-bold text-emerald-700">+$12,000.00</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Section 199A Qualified Business Income:</span>
                <span className="font-mono-tabular text-slate-900">Eligible (Statement Attached)</span>
              </div>
            </div>

            <p className="text-[11px] text-slate-500 leading-relaxed">
              Certified by Grant Thornton LLP for SponsorCloud Investment Fund Series. You may deliver this document directly to your CPA or tax preparer.
            </p>

            <div className="pt-2 flex justify-end gap-2">
              <button
                onClick={() => setPreviewK1(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-md transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => {
                  alert(`Schedule K-1 for ${previewK1.dealTitle} downloaded.`);
                  setPreviewK1(null);
                }}
                className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-md transition-colors flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Certified PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
