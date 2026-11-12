import React, { useState } from 'react';
import { 
  Truck, 
  Plane, 
  Sparkles, 
  ShieldCheck, 
  DollarSign, 
  CheckCircle2, 
  ChevronRight, 
  PhoneCall, 
  Lock 
} from 'lucide-react';

export const BespokeConcierge: React.FC = () => {
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [serviceType, setServiceType] = useState('Enclosed Home Delivery');
  const [requestDetails, setRequestDetails] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const conciergeServices = [
    {
      icon: Truck,
      title: 'Enclosed Carrier Delivery',
      desc: 'Nationwide zero-mileage climate-controlled transport delivered directly to your private estate or corporate headquarters.'
    },
    {
      icon: Plane,
      title: 'FBO Runway Handover',
      desc: 'Touch down at your local executive airfield. Your pre-conditioned vehicle awaits directly on the private aviation tarmac.'
    },
    {
      icon: Sparkles,
      title: 'Paint-to-Sample & Atelier',
      desc: 'Exclusive build slots for BMW Individual, Audi Exclusive, and Volvo bespoke Nordic interiors not available through standard dealers.'
    },
    {
      icon: ShieldCheck,
      title: 'XPEL Stealth & Ceramic Shield',
      desc: 'Comprehensive paint protection film (PPF) and 9H ceramic coatings applied in our sterile clean-room before delivery.'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !clientEmail.trim()) return;
    setIsSubmitted(true);
  };

  return (
    <section className="py-16 bg-[#0c0e12] text-white">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 space-y-12">
        
        {/* Header */}
        <div className="pb-8 border-b border-white/10">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E5B869]" />
            <span className="text-[11px] font-bold tracking-[0.2em] text-[#E5B869] uppercase">
              UNCOMPROMISING LUXURY
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight uppercase">
            Bespoke Client Concierge
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            From discreet private tarmac handovers to factory paint-to-sample allocations, our concierge advisors orchestrate your acquisition flawlessly.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {conciergeServices.map((svc, i) => {
            const IconComp = svc.icon;
            return (
              <div 
                key={i}
                className="bg-[#13161c] border border-white/10 p-6 rounded-sm space-y-4 hover:border-[#E5B869]/50 transition-colors"
              >
                <div className="w-10 h-10 rounded-sm bg-[#1b1f28] flex items-center justify-center text-[#E5B869] border border-white/10">
                  <IconComp className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white uppercase tracking-wider">
                  {svc.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {svc.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* VIP Inquiry Form Strip */}
        <div className="bg-[#151922] border border-white/15 rounded-sm p-6 sm:p-10">
          <div className="max-w-2xl">
            <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-white">
              Connect With Your Private Portfolio Advisor
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Direct consultation for rare factory allocations, private aviation delivery, or discreet trade settlement.
            </p>

            {isSubmitted ? (
              <div className="mt-6 p-6 bg-black/40 border border-[#E5B869]/40 rounded-sm space-y-2">
                <div className="flex items-center gap-2 text-[#E5B869]">
                  <CheckCircle2 className="w-5 h-5" />
                  <span className="text-sm font-bold uppercase tracking-wider">Request Confirmed</span>
                </div>
                <p className="text-xs text-slate-300">
                  Thank you, {clientName}. Your dedicated Elite Motors concierge director has been notified and will contact you via {clientPhone || clientEmail} within 2 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1">
                      Full Legal Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Lord Alistair Vance"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      className="w-full bg-[#0c0e12] border border-white/15 px-3 py-2.5 rounded-sm text-white focus:outline-none focus:border-[#E5B869]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1">
                      Direct Telephone
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+1 (415) 890-2100"
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      className="w-full bg-[#0c0e12] border border-white/15 px-3 py-2.5 rounded-sm text-white focus:outline-none focus:border-[#E5B869]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="client@privateoffice.com"
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                      className="w-full bg-[#0c0e12] border border-white/15 px-3 py-2.5 rounded-sm text-white focus:outline-none focus:border-[#E5B869]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1">
                      Requested Concierge Service
                    </label>
                    <select
                      value={serviceType}
                      onChange={(e) => setServiceType(e.target.value)}
                      className="w-full bg-[#0c0e12] border border-white/15 px-3 py-2.5 rounded-sm text-white focus:outline-none focus:border-[#E5B869]"
                    >
                      <option value="Enclosed Home Delivery">Enclosed Home Delivery</option>
                      <option value="Private Aviation FBO Delivery">Private Aviation FBO Delivery</option>
                      <option value="Factory Allocation Search (Audi / BMW / Volvo)">Factory Allocation Search</option>
                      <option value="Immediate Luxury Trade-In Wire Appraisal">Immediate Luxury Trade-In Wire Appraisal</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1">
                    Specific Requirements or Delivery Date
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Provide preferred delivery city, airport, or specific options desired..."
                    value={requestDetails}
                    onChange={(e) => setRequestDetails(e.target.value)}
                    className="w-full bg-[#0c0e12] border border-white/15 px-3 py-2.5 rounded-sm text-white focus:outline-none focus:border-[#E5B869] resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="px-8 py-3.5 bg-[#E5B869] hover:bg-[#d6a555] active:scale-98 text-black text-xs font-bold tracking-[0.14em] uppercase rounded-sm transition-all shadow-md"
                >
                  TRANSMIT BESPOKE DIRECTIVE
                </button>
              </form>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};
