import React, { useState } from 'react';
import { Deal, InvestmentPosition } from '../types';
import { 
  X, 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft, 
  ShieldCheck, 
  DollarSign, 
  FileText, 
  Building,
  Lock,
  ArrowRight
} from 'lucide-react';

interface InvestModalProps {
  deal: Deal;
  onClose: () => void;
  onCompleteInvestment: (position: InvestmentPosition) => void;
}

export const InvestModal: React.FC<InvestModalProps> = ({
  deal,
  onClose,
  onCompleteInvestment,
}) => {
  const [step, setStep] = useState<number>(1);
  const [amount, setAmount] = useState<number>(deal.minInvestment);
  const [entityType, setEntityType] = useState<'Individual' | 'LLC' | 'Revocable Trust' | 'Self-Directed IRA'>('Individual');
  const [entityName, setEntityName] = useState<string>('Harikrishna Investment Trust');
  const [taxId, setTaxId] = useState<string>('***-**-8841');
  const [accreditationBasis, setAccreditationBasis] = useState<string>('net_worth');
  const [signature, setSignature] = useState<string>('Harikrishna');
  const [agreedTerms, setAgreedTerms] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  // Math
  const annualPref = amount * (deal.prefReturn / 100);
  const total5YearReturn = amount * deal.equityMultiple;
  const netProfit = total5YearReturn - amount;

  const handleFinish = () => {
    const newPosition: InvestmentPosition = {
      id: `pos-${Date.now()}`,
      dealId: deal.id,
      dealTitle: deal.title,
      assetClass: deal.assetClass,
      image: deal.image,
      location: deal.location,
      investedAmount: amount,
      investedDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      currentValue: amount,
      totalDistributed: 0,
      unrealizedGain: 0,
      irrToDate: deal.targetIrr,
      ownershipPercent: Number(((amount / deal.totalRaise) * 100).toFixed(2)),
      entityName,
      lastQuarterYield: deal.prefReturn,
      status: 'Performing'
    };

    setIsSuccess(true);
    setTimeout(() => {
      onCompleteInvestment(newPosition);
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-2xl max-w-xl w-full border border-slate-200 overflow-hidden my-6">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div>
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">
              Syndication Subscription Packet
            </span>
            <h2 className="text-base font-bold text-slate-900">
              {deal.title}
            </h2>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1 font-bold text-lg"
          >
            ✕
          </button>
        </div>

        {/* Progress Tracker (4 steps) */}
        <div className="px-5 pt-4 pb-2 border-b border-slate-100 bg-white">
          <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500 mb-2">
            <span className={step >= 1 ? 'text-slate-900' : ''}>1. Commitment</span>
            <span className={step >= 2 ? 'text-slate-900' : ''}>2. Entity Profile</span>
            <span className={step >= 3 ? 'text-slate-900' : ''}>3. Accreditation</span>
            <span className={step >= 4 ? 'text-slate-900' : ''}>4. Sign & Wire</span>
          </div>
          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
            <div 
              className="bg-slate-900 h-1.5 rounded-full transition-all duration-300"
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>
        </div>

        {/* Body Content by Step */}
        <div className="p-6">
          
          {isSuccess ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                Commitment Confirmed!
              </h3>
              <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
                Your subscription agreement of <strong className="font-mono-tabular font-bold">${amount.toLocaleString()}</strong> has been submitted. Escrow wire instructions have been emailed to your account.
              </p>
              <div className="text-xs text-slate-400 font-mono-tabular">
                Transaction ID: SPC-{Math.floor(100000 + Math.random() * 900000)}
              </div>
            </div>
          ) : (
            <>
              {/* Step 1: Commitment */}
              {step === 1 && (
                <div className="space-y-4 text-xs">
                  <div>
                    <label className="block font-semibold text-slate-800 mb-1">
                      Investment Commitment Amount ($)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5 font-bold text-slate-400">$</span>
                      <input
                        type="number"
                        min={deal.minInvestment}
                        step={5000}
                        value={amount}
                        onChange={(e) => setAmount(Number(e.target.value))}
                        className="w-full pl-8 pr-4 py-2 border border-slate-200 rounded text-base font-bold font-mono-tabular text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
                      />
                    </div>
                    <span className="text-[11px] text-slate-500 mt-1 block">
                      Minimum required commitment: <strong className="font-mono-tabular text-slate-800">${deal.minInvestment.toLocaleString()}</strong>
                    </span>
                  </div>

                  {/* Projections Card */}
                  <div className="p-4 bg-slate-50 border border-slate-100 rounded-md space-y-2">
                    <span className="font-bold text-slate-900 block text-[11px] uppercase tracking-wide">
                      Projected Return Summary
                    </span>
                    <div className="flex justify-between py-1 border-b border-slate-200/60">
                      <span className="text-slate-500">Annual Preferred Cash Yield ({deal.prefReturn}%):</span>
                      <span className="font-bold font-mono-tabular text-slate-900">
                        ${Math.round(annualPref).toLocaleString()} / yr
                      </span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-200/60">
                      <span className="text-slate-500">Quarterly Estimated Payout:</span>
                      <span className="font-mono-tabular text-slate-900">
                        ${Math.round(annualPref / 4).toLocaleString()} / qtr
                      </span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-200/60">
                      <span className="text-slate-500">Target Equity Multiple:</span>
                      <span className="font-mono-tabular text-slate-900 font-bold">
                        {deal.equityMultiple}x
                      </span>
                    </div>
                    <div className="flex justify-between pt-1">
                      <span className="font-bold text-slate-900">Target Total Capital Return:</span>
                      <span className="font-bold font-mono-tabular text-emerald-700 text-sm">
                        ${Math.round(total5YearReturn).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Entity Profile */}
              {step === 2 && (
                <div className="space-y-4 text-xs">
                  <div>
                    <label className="block font-semibold text-slate-800 mb-1">
                      Investing Entity Type
                    </label>
                    <select
                      value={entityType}
                      onChange={(e) => setEntityType(e.target.value as any)}
                      className="w-full px-3 py-2 border border-slate-200 rounded focus:outline-none focus:ring-1 focus:ring-slate-900"
                    >
                      <option value="Individual">Individual (Direct Ownership)</option>
                      <option value="Revocable Trust">Revocable / Living Trust</option>
                      <option value="LLC">Limited Liability Company (LLC)</option>
                      <option value="Self-Directed IRA">Self-Directed IRA / 401(k)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-800 mb-1">
                      Legal Name of Investing Entity
                    </label>
                    <input
                      type="text"
                      value={entityName}
                      onChange={(e) => setEntityName(e.target.value)}
                      placeholder="e.g. Sterling Family Revocable Trust"
                      className="w-full px-3 py-2 border border-slate-200 rounded focus:outline-none focus:ring-1 focus:ring-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-800 mb-1">
                      Taxpayer Identification Number (SSN or EIN)
                    </label>
                    <input
                      type="text"
                      value={taxId}
                      onChange={(e) => setTaxId(e.target.value)}
                      placeholder="XX-XXXXXXX"
                      className="w-full px-3 py-2 border border-slate-200 rounded focus:outline-none focus:ring-1 focus:ring-slate-900 font-mono-tabular"
                    />
                  </div>
                </div>
              )}

              {/* Step 3: Accreditation Verification */}
              {step === 3 && (
                <div className="space-y-4 text-xs">
                  <div className="flex items-center gap-2 text-indigo-700 bg-indigo-50 p-2.5 rounded border border-indigo-100">
                    <ShieldCheck className="w-4 h-4 shrink-0" />
                    <span>SEC Regulation D Rule 506(c) requires verification of accredited status.</span>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-800 mb-2">
                      Select Basis for Accreditation:
                    </label>
                    <div className="space-y-2">
                      <label className="flex items-start gap-2.5 p-3 rounded border border-slate-200 cursor-pointer hover:bg-slate-50">
                        <input
                          type="radio"
                          name="accreditation"
                          checked={accreditationBasis === 'net_worth'}
                          onChange={() => setAccreditationBasis('net_worth')}
                          className="mt-0.5 accent-slate-900"
                        />
                        <div>
                          <span className="font-semibold text-slate-900 block">Individual Net Worth &gt; $1,000,000</span>
                          <span className="text-slate-500 text-[11px]">Excluding primary residence value.</span>
                        </div>
                      </label>

                      <label className="flex items-start gap-2.5 p-3 rounded border border-slate-200 cursor-pointer hover:bg-slate-50">
                        <input
                          type="radio"
                          name="accreditation"
                          checked={accreditationBasis === 'income'}
                          onChange={() => setAccreditationBasis('income')}
                          className="mt-0.5 accent-slate-900"
                        />
                        <div>
                          <span className="font-semibold text-slate-900 block">Annual Income &gt; $200,000 ($300,000 with spouse)</span>
                          <span className="text-slate-500 text-[11px]">For the prior 2 years with reasonable expectation this year.</span>
                        </div>
                      </label>

                      <label className="flex items-start gap-2.5 p-3 rounded border border-slate-200 cursor-pointer hover:bg-slate-50">
                        <input
                          type="radio"
                          name="accreditation"
                          checked={accreditationBasis === 'professional'}
                          onChange={() => setAccreditationBasis('professional')}
                          className="mt-0.5 accent-slate-900"
                        />
                        <div>
                          <span className="font-semibold text-slate-900 block">Securities Professional License</span>
                          <span className="text-slate-500 text-[11px]">Active Series 7, 65, or 82 license in good standing with FINRA.</span>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Digital Signature */}
              {step === 4 && (
                <div className="space-y-4 text-xs">
                  <div className="p-3.5 bg-slate-50 border border-slate-200 rounded text-slate-700 leading-relaxed text-[11px]">
                    By signing below, I certify that I am authorized to bind <strong>{entityName}</strong> to invest <strong>${amount.toLocaleString()}</strong> in {deal.title}, subject to the terms of the Private Placement Memorandum and Operating Agreement.
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-800 mb-1">
                      Type Full Legal Name to Electronically Sign
                    </label>
                    <input
                      type="text"
                      value={signature}
                      onChange={(e) => setSignature(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-200 rounded text-sm font-semibold focus:outline-none focus:ring-1 focus:ring-slate-900 italic font-serif"
                    />
                  </div>

                  <label className="flex items-start gap-2 cursor-pointer pt-1">
                    <input
                      type="checkbox"
                      checked={agreedTerms}
                      onChange={(e) => setAgreedTerms(e.target.checked)}
                      className="mt-0.5 accent-slate-900"
                    />
                    <span className="text-slate-600 text-[11px]">
                      I have reviewed the Private Placement Memorandum and understand commercial real estate syndication investments involve risk of loss and illiquidity.
                    </span>
                  </label>
                </div>
              )}
            </>
          )}

        </div>

        {/* Modal Navigation Buttons */}
        {!isSuccess && (
          <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
            {step > 1 ? (
              <button
                onClick={() => setStep(step - 1)}
                className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-md transition-colors flex items-center gap-1"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
            ) : (
              <button
                onClick={onClose}
                className="px-3 py-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800"
              >
                Cancel
              </button>
            )}

            {step < 4 ? (
              <button
                onClick={() => setStep(step + 1)}
                disabled={step === 1 && amount < deal.minInvestment}
                className="px-4 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 disabled:opacity-50 rounded-md transition-colors flex items-center gap-1"
              >
                <span>Continue</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={handleFinish}
                disabled={!agreedTerms || !signature.trim()}
                className="px-5 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 disabled:opacity-40 rounded-md transition-colors flex items-center gap-1.5 shadow-sm"
              >
                <Lock className="w-3.5 h-3.5 text-emerald-400" />
                <span>Execute Subscription Agreement</span>
              </button>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
