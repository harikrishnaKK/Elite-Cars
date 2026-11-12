import React, { useState } from 'react';
import { Vehicle } from '../types';
import { Calculator, DollarSign, Percent, ShieldCheck, CheckCircle2, ChevronRight } from 'lucide-react';

interface FinancingCalculatorProps {
  vehicles: Vehicle[];
  selectedVehicleId?: string;
  onSelectVehicleId: (id: string) => void;
  onBookTestDrive: (vehicle: Vehicle) => void;
}

export const FinancingCalculator: React.FC<FinancingCalculatorProps> = ({
  vehicles,
  selectedVehicleId,
  onSelectVehicleId,
  onBookTestDrive,
}) => {
  const currentVehicle = vehicles.find((v) => v.id === selectedVehicleId) || vehicles[0];

  const [paymentType, setPaymentType] = useState<'lease' | 'finance'>('lease');
  const [downPayment, setDownPayment] = useState<number>(15000);
  const [tradeInValue, setTradeInValue] = useState<number>(0);
  const [termMonths, setTermMonths] = useState<number>(36);
  const [creditTier, setCreditTier] = useState<'tier1' | 'tier2' | 'tier3'>('tier1');
  const [annualMiles, setAnnualMiles] = useState<number>(10000);
  const [preApproved, setPreApproved] = useState<boolean>(false);

  // Financial calculations
  const price = currentVehicle.price;
  const netFinanced = Math.max(0, price - downPayment - tradeInValue);

  // Interest rate assumptions
  const interestRate = creditTier === 'tier1' ? 4.9 : creditTier === 'tier2' ? 6.4 : 8.2;
  const monthlyInterestRate = interestRate / 100 / 12;

  // Finance monthly payment (standard amortization)
  const financeMonthly = 
    monthlyInterestRate > 0
      ? (netFinanced * (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, termMonths))) /
        (Math.pow(1 + monthlyInterestRate, termMonths) - 1)
      : netFinanced / termMonths;

  // Lease residual value assumption (e.g. 58% at 36 mo)
  const residualPercent = termMonths === 24 ? 0.65 : termMonths === 36 ? 0.58 : 0.50;
  const residualValue = price * residualPercent;
  const depreciationFee = (netFinanced - residualValue) / termMonths;
  const moneyFactor = (interestRate / 2400);
  const financeFee = (netFinanced + residualValue) * moneyFactor;
  const leaseMonthly = Math.max(450, depreciationFee + financeFee);

  const displayMonthly = paymentType === 'lease' ? Math.round(leaseMonthly) : Math.round(financeMonthly);

  return (
    <section className="py-16 bg-[#0c0e12] text-white">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8">
        
        {/* Header */}
        <div className="pb-8 border-b border-white/10">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E5B869]" />
            <span className="text-[11px] font-bold tracking-[0.2em] text-[#E5B869] uppercase">
              TRANSPARENT CLIENT ACQUISITION
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight uppercase">
            Bespoke Lease & Finance Studio
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            Model structured financial instruments, factory subsidized lease residuals, or bespoke capital loan terms for your prestige vehicle.
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8">
          
          {/* Controls Column (7 cols) */}
          <div className="lg:col-span-7 space-y-6 bg-[#13161c] p-6 sm:p-8 rounded-sm border border-white/10">
            
            {/* Vehicle Selector */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                Select Vehicle Allocation
              </label>
              <select
                value={currentVehicle.id}
                onChange={(e) => onSelectVehicleId(e.target.value)}
                className="w-full bg-[#1b1f28] border border-white/15 text-white text-sm px-4 py-3 rounded-sm focus:outline-none focus:border-[#E5B869]"
              >
                {vehicles.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.year} {v.make} {v.model} ({v.trim}) — ${v.price.toLocaleString()}
                  </option>
                ))}
              </select>
            </div>

            {/* Lease vs Finance Switch */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={() => setPaymentType('lease')}
                className={`py-3 text-xs font-bold tracking-widest uppercase rounded-sm border transition-all ${
                  paymentType === 'lease'
                    ? 'bg-[#E5B869] text-black border-[#E5B869] shadow-sm'
                    : 'bg-[#1b1f28] text-slate-300 border-white/10 hover:border-white/30'
                }`}
              >
                Executive Closed-End Lease
              </button>
              <button
                type="button"
                onClick={() => setPaymentType('finance')}
                className={`py-3 text-xs font-bold tracking-widest uppercase rounded-sm border transition-all ${
                  paymentType === 'finance'
                    ? 'bg-[#E5B869] text-black border-[#E5B869] shadow-sm'
                    : 'bg-[#1b1f28] text-slate-300 border-white/10 hover:border-white/30'
                }`}
              >
                Capital Purchase Financing
              </button>
            </div>

            {/* Down Payment Slider */}
            <div className="space-y-2 pt-2">
              <div className="flex justify-between text-xs text-slate-300">
                <span className="font-semibold uppercase tracking-wider">Initial Down Payment</span>
                <span className="text-[#E5B869] font-bold font-mono-tabular text-sm">${downPayment.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min={5000}
                max={50000}
                step={2500}
                value={downPayment}
                onChange={(e) => setDownPayment(Number(e.target.value))}
                className="w-full accent-[#E5B869] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono-tabular">
                <span>$5,000</span>
                <span>$25,000</span>
                <span>$50,000</span>
              </div>
            </div>

            {/* Trade-In Value */}
            <div className="space-y-2 pt-1">
              <div className="flex justify-between text-xs text-slate-300">
                <span className="font-semibold uppercase tracking-wider">Trade-In Vehicle Equity Allowance</span>
                <span className="text-[#E5B869] font-bold font-mono-tabular text-sm">${tradeInValue.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min={0}
                max={60000}
                step={5000}
                value={tradeInValue}
                onChange={(e) => setTradeInValue(Number(e.target.value))}
                className="w-full accent-[#E5B869] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono-tabular">
                <span>$0</span>
                <span>$30,000</span>
                <span>$60,000</span>
              </div>
            </div>

            {/* Term Selection */}
            <div className="pt-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                Contract Term
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[24, 36, 48, 60].map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTermMonths(t)}
                    className={`py-2 text-xs font-bold rounded-sm border transition-colors ${
                      termMonths === t
                        ? 'bg-white text-black border-white'
                        : 'bg-[#1b1f28] text-slate-300 border-white/10 hover:border-white/30'
                    }`}
                  >
                    {t} Months
                  </button>
                ))}
              </div>
            </div>

            {/* Credit Tier */}
            <div className="pt-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                Tier Credit Rating
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setCreditTier('tier1')}
                  className={`py-2 text-xs font-semibold rounded-sm border transition-colors ${
                    creditTier === 'tier1'
                      ? 'bg-[#E5B869]/20 text-[#E5B869] border-[#E5B869]'
                      : 'bg-[#1b1f28] text-slate-300 border-white/10 hover:border-white/30'
                  }`}
                >
                  Tier 1+ (780+ FICO)
                </button>
                <button
                  type="button"
                  onClick={() => setCreditTier('tier2')}
                  className={`py-2 text-xs font-semibold rounded-sm border transition-colors ${
                    creditTier === 'tier2'
                      ? 'bg-[#E5B869]/20 text-[#E5B869] border-[#E5B869]'
                      : 'bg-[#1b1f28] text-slate-300 border-white/10 hover:border-white/30'
                  }`}
                >
                  Tier 2 (720–779)
                </button>
                <button
                  type="button"
                  onClick={() => setCreditTier('tier3')}
                  className={`py-2 text-xs font-semibold rounded-sm border transition-colors ${
                    creditTier === 'tier3'
                      ? 'bg-[#E5B869]/20 text-[#E5B869] border-[#E5B869]'
                      : 'bg-[#1b1f28] text-slate-300 border-white/10 hover:border-white/30'
                  }`}
                >
                  Tier 3 (680–719)
                </button>
              </div>
            </div>

          </div>

          {/* Output Card Column (5 cols) */}
          <div className="lg:col-span-5 bg-[#171b23] border border-white/15 rounded-sm p-6 sm:p-8 flex flex-col justify-between shadow-2xl">
            <div className="space-y-6">
              
              {/* Vehicle Preview Card */}
              <div className="relative h-44 rounded-sm overflow-hidden bg-black/60 border border-white/10">
                <img
                  src={currentVehicle.image}
                  alt={currentVehicle.model}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <span className="text-[10px] text-[#E5B869] uppercase font-bold tracking-widest">{currentVehicle.make}</span>
                  <div className="text-base font-bold">{currentVehicle.model}</div>
                </div>
              </div>

              {/* Monthly Quote Highlight */}
              <div className="p-5 bg-black/40 border border-[#E5B869]/30 rounded-sm text-center space-y-1">
                <span className="text-[11px] text-slate-400 uppercase tracking-widest font-semibold block">
                  Estimated Monthly Outlay
                </span>
                <div className="text-4xl sm:text-5xl font-extrabold text-[#E5B869] font-mono-tabular">
                  ${displayMonthly.toLocaleString()}
                </div>
                <span className="text-xs text-slate-400 block font-normal">
                  plus local tax & licensing · {termMonths} month term
                </span>
              </div>

              {/* Breakdown List */}
              <div className="space-y-2 text-xs text-slate-300 border-t border-white/10 pt-4">
                <div className="flex justify-between py-1">
                  <span className="text-slate-400">MSRP Vehicle Price:</span>
                  <span className="font-mono-tabular font-bold text-white">${price.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-400">Capitalized Down Payment:</span>
                  <span className="font-mono-tabular text-white">-${downPayment.toLocaleString()}</span>
                </div>
                {tradeInValue > 0 && (
                  <div className="flex justify-between py-1">
                    <span className="text-slate-400">Trade-In Allowance:</span>
                    <span className="font-mono-tabular text-emerald-400">-${tradeInValue.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between py-1">
                  <span className="text-slate-400">Applicable APR / Money Factor:</span>
                  <span className="font-mono-tabular text-white">{interestRate}% APR</span>
                </div>
                <div className="flex justify-between py-1 border-t border-white/10 pt-2 text-sm">
                  <span className="font-bold text-white">Total Due at Signing:</span>
                  <span className="font-mono-tabular font-bold text-[#E5B869]">
                    ${(downPayment + displayMonthly).toLocaleString()}
                  </span>
                </div>
              </div>

            </div>

            {/* Actions */}
            <div className="pt-6 space-y-3">
              <button
                onClick={() => {
                  setPreApproved(true);
                  setTimeout(() => setPreApproved(false), 4000);
                }}
                className="w-full py-3.5 bg-[#E5B869] hover:bg-[#d6a555] active:scale-98 text-black text-xs font-bold tracking-widest uppercase rounded-sm transition-all shadow-md text-center"
              >
                {preApproved ? '✓ PRE-APPROVAL APPLICATION INITIATED' : 'REQUEST BESPOKE PRE-APPROVAL'}
              </button>

              <button
                onClick={() => onBookTestDrive(currentVehicle)}
                className="w-full py-3 bg-transparent hover:bg-white/5 border border-white/20 text-white text-xs font-bold tracking-widest uppercase rounded-sm transition-colors text-center"
              >
                SCHEDULE PRIVATE TEST DRIVE
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
