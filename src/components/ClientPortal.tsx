import React, { useState } from 'react';
import { Vehicle, TestDriveRequest } from '../types';
import { 
  Lock, 
  Car, 
  Calendar, 
  FileText, 
  Heart, 
  Trash2, 
  CheckCircle2, 
  ArrowUpRight, 
  Clock,
  Wrench
} from 'lucide-react';

interface ClientPortalProps {
  vehicles: Vehicle[];
  savedVehicleIds: string[];
  onToggleSaveVehicle: (id: string) => void;
  onSelectVehicle: (vehicle: Vehicle) => void;
  testDriveRequests: TestDriveRequest[];
  onOpenTestDriveModal: () => void;
}

export const ClientPortal: React.FC<ClientPortalProps> = ({
  vehicles,
  savedVehicleIds,
  onToggleSaveVehicle,
  onSelectVehicle,
  testDriveRequests,
  onOpenTestDriveModal,
}) => {
  const [activeTab, setActiveTab] = useState<'garage' | 'drives' | 'documents'>('garage');

  const savedVehicles = vehicles.filter((v) => savedVehicleIds.includes(v.id));

  return (
    <section className="py-16 bg-[#0c0e12] text-white">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-8 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Lock className="w-4 h-4 text-[#E5B869]" />
              <span className="text-[11px] font-bold tracking-[0.2em] text-[#E5B869] uppercase">
                PRIVATE CLIENT SANCTUARY
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight uppercase">
              Elite Client Portal
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Manage your personal curated garage, scheduled test drive dispatches, and private acquisition records.
            </p>
          </div>

          {/* Tab controls */}
          <div className="flex items-center gap-1.5 bg-[#151922] p-1 border border-white/10 rounded-sm text-xs">
            <button
              onClick={() => setActiveTab('garage')}
              className={`px-4 py-2 font-bold tracking-wider uppercase rounded-xs transition-colors ${
                activeTab === 'garage'
                  ? 'bg-[#E5B869] text-black shadow-sm'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Saved Garage ({savedVehicles.length})
            </button>
            <button
              onClick={() => setActiveTab('drives')}
              className={`px-4 py-2 font-bold tracking-wider uppercase rounded-xs transition-colors ${
                activeTab === 'drives'
                  ? 'bg-[#E5B869] text-black shadow-sm'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Test Drives ({testDriveRequests.length})
            </button>
            <button
              onClick={() => setActiveTab('documents')}
              className={`px-4 py-2 font-bold tracking-wider uppercase rounded-xs transition-colors ${
                activeTab === 'documents'
                  ? 'bg-[#E5B869] text-black shadow-sm'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Window Stickers
            </button>
          </div>
        </div>

        {/* Tab 1: Saved Garage */}
        {activeTab === 'garage' && (
          <div>
            {savedVehicles.length === 0 ? (
              <div className="p-12 text-center bg-[#13161c] border border-white/10 rounded-sm space-y-3">
                <Car className="w-10 h-10 text-slate-600 mx-auto" />
                <h3 className="text-base font-bold uppercase text-white">Your Garage is Empty</h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  Browse the showroom and click the heart icon on any Audi, BMW, or Volvo vehicle to save it to your private portfolio.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedVehicles.map((vehicle) => (
                  <div
                    key={vehicle.id}
                    className="bg-[#13161c] border border-white/10 rounded-sm overflow-hidden flex flex-col justify-between"
                  >
                    <div>
                      <div className="h-52 relative overflow-hidden bg-black/60">
                        <img
                          src={vehicle.image}
                          alt={vehicle.model}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                        <button
                          onClick={() => onToggleSaveVehicle(vehicle.id)}
                          className="absolute top-3 right-3 p-2 bg-black/70 hover:bg-black text-red-400 rounded-full"
                          title="Remove from garage"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="p-5 space-y-2">
                        <div className="text-[10px] text-[#E5B869] font-bold tracking-widest uppercase">
                          {vehicle.make} · {vehicle.year}
                        </div>
                        <h4 className="text-lg font-bold text-white">
                          {vehicle.model}
                        </h4>
                        <div className="flex justify-between items-baseline pt-2 border-t border-white/10">
                          <span className="text-lg font-bold text-white font-mono-tabular">
                            ${vehicle.price.toLocaleString()}
                          </span>
                          <span className="text-xs text-[#E5B869] font-mono-tabular">
                            ${vehicle.leaseMonthly}/mo lease
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="p-5 pt-0">
                      <button
                        onClick={() => onSelectVehicle(vehicle)}
                        className="w-full py-2 bg-[#E5B869] hover:bg-[#d6a555] text-black text-xs font-bold tracking-wider uppercase rounded-xs transition-colors"
                      >
                        Inspect Specifications
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Test Drives */}
        {activeTab === 'drives' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-2">
              <span className="text-xs text-slate-400">Scheduled Concierge Test Drives</span>
              <button
                onClick={onOpenTestDriveModal}
                className="px-3.5 py-1.5 bg-[#E5B869] text-black text-xs font-bold uppercase rounded-xs tracking-wider"
              >
                + Book New Drive
              </button>
            </div>

            <div className="bg-[#13161c] border border-white/10 rounded-sm overflow-hidden">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-[#181c24] border-b border-white/10 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    <th className="py-3 px-5">Allocation</th>
                    <th className="py-3 px-5">Date & Time</th>
                    <th className="py-3 px-5">Experience Format</th>
                    <th className="py-3 px-5">Delivery Location</th>
                    <th className="py-3 px-5 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {testDriveRequests.map((td) => (
                    <tr key={td.id} className="hover:bg-white/5 transition-colors">
                      <td className="py-3.5 px-5 font-bold text-white whitespace-nowrap">
                        {td.vehicleTitle}
                      </td>
                      <td className="py-3.5 px-5 text-slate-300 font-mono-tabular whitespace-nowrap">
                        {td.date} · {td.timeSlot}
                      </td>
                      <td className="py-3.5 px-5 text-[#E5B869] whitespace-nowrap">
                        {td.deliveryType}
                      </td>
                      <td className="py-3.5 px-5 text-slate-400 whitespace-nowrap truncate max-w-xs">
                        {td.address || 'Elite Motors VIP Showroom Suite'}
                      </td>
                      <td className="py-3.5 px-5 text-center whitespace-nowrap">
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2.5 py-0.5 rounded-full">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>{td.status}</span>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Window Stickers */}
        {activeTab === 'documents' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vehicles.slice(0, 3).map((v) => (
              <div key={v.id} className="bg-[#13161c] border border-white/10 p-5 rounded-sm space-y-3">
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <div className="text-[10px] font-bold text-[#E5B869] uppercase tracking-wider">{v.make}</div>
                  <span className="text-[10px] text-slate-500 font-mono">VIN: {v.specs.vin.slice(0, 10)}...</span>
                </div>
                <h4 className="text-sm font-bold text-white">{v.year} {v.model}</h4>
                <div className="text-xs text-slate-400 font-mono-tabular">
                  MSRP Total: ${v.price.toLocaleString()}
                </div>
                <button
                  onClick={() => onSelectVehicle(v)}
                  className="w-full py-2 bg-[#1b1f28] hover:bg-[#252b38] text-white text-xs font-semibold uppercase tracking-wider rounded-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <FileText className="w-3.5 h-3.5 text-[#E5B869]" />
                  <span>Inspect Monroney Window Label</span>
                </button>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
