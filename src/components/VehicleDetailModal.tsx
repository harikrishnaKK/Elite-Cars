import React from 'react';
import { Vehicle } from '../types';
import { 
  X, 
  Gauge, 
  Zap, 
  CheckCircle2, 
  ShieldCheck, 
  FileText, 
  ChevronRight, 
  Share2, 
  Heart,
  Compass
} from 'lucide-react';

interface VehicleDetailModalProps {
  vehicle: Vehicle;
  onClose: () => void;
  onBookTestDrive: (vehicle: Vehicle) => void;
  onCalculateFinance: (vehicle: Vehicle) => void;
  isSaved: boolean;
  onToggleSave: () => void;
}

export const VehicleDetailModal: React.FC<VehicleDetailModalProps> = ({
  vehicle,
  onClose,
  onBookTestDrive,
  onCalculateFinance,
  isSaved,
  onToggleSave,
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#13161c] border border-white/15 rounded-sm max-w-4xl w-full text-white shadow-2xl my-6 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header Bar */}
        <div className="p-4 px-6 border-b border-white/10 flex items-center justify-between bg-[#181c24]">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-[#E5B869] tracking-widest uppercase">
              {vehicle.make} ALLOCATION SPECIFICATION
            </span>
            <span className="text-slate-500 text-xs">·</span>
            <span className="text-xs text-slate-400 font-mono">VIN: {vehicle.specs.vin}</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onToggleSave}
              className={`p-1.5 rounded-full border border-white/10 transition-colors ${
                isSaved ? 'text-red-500 fill-red-500' : 'text-slate-400 hover:text-white'
              }`}
              title={isSaved ? 'Remove from saved' : 'Save to garage'}
            >
              <Heart className={`w-4 h-4 ${isSaved ? 'fill-red-500' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white p-1 text-lg font-bold"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto p-6 space-y-6">
          
          {/* Main Visual Frame */}
          <div className="relative h-80 sm:h-96 rounded-sm overflow-hidden bg-black/70 border border-white/10">
            <img
              src={vehicle.image}
              alt={vehicle.model}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#13161c] via-transparent to-transparent opacity-80" />
            
            <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <div className="text-xs text-[#E5B869] font-bold tracking-[0.2em] uppercase mb-1">
                  {vehicle.year} · {vehicle.make}
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-white">
                  {vehicle.model}
                </h2>
                <div className="text-xs text-slate-300 mt-1">
                  {vehicle.trim}
                </div>
              </div>

              <div className="bg-black/70 backdrop-blur-md p-3 px-5 rounded-sm border border-white/15 text-right">
                <span className="text-[10px] text-slate-400 uppercase font-semibold block">MSRP Outright</span>
                <span className="text-2xl font-bold text-white font-mono-tabular">
                  ${vehicle.price.toLocaleString()}
                </span>
                <span className="text-xs text-[#E5B869] block font-mono-tabular font-bold mt-0.5">
                  ${vehicle.leaseMonthly.toLocaleString()}/mo executive lease
                </span>
              </div>
            </div>
          </div>

          {/* Key Metric Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div className="p-3 bg-[#181c24] border border-white/10 rounded-sm">
              <span className="text-[10px] text-slate-500 uppercase font-bold block">Engine Output</span>
              <span className="text-lg font-bold text-white font-mono-tabular mt-0.5 block">
                {vehicle.specs.horsepower} HP
              </span>
              <span className="text-[10px] text-slate-400 font-mono-tabular">{vehicle.specs.torque}</span>
            </div>

            <div className="p-3 bg-[#181c24] border border-white/10 rounded-sm">
              <span className="text-[10px] text-slate-500 uppercase font-bold block">Acceleration</span>
              <span className="text-lg font-bold text-[#E5B869] font-mono-tabular mt-0.5 block">
                {vehicle.specs.zeroToSixty}
              </span>
              <span className="text-[10px] text-slate-400">0–60 MPH Sprint</span>
            </div>

            <div className="p-3 bg-[#181c24] border border-white/10 rounded-sm">
              <span className="text-[10px] text-slate-500 uppercase font-bold block">Top Velocity</span>
              <span className="text-lg font-bold text-white font-mono-tabular mt-0.5 block">
                {vehicle.specs.topSpeed}
              </span>
              <span className="text-[10px] text-slate-400">Track Calibrated</span>
            </div>

            <div className="p-3 bg-[#181c24] border border-white/10 rounded-sm">
              <span className="text-[10px] text-slate-500 uppercase font-bold block">Drivetrain</span>
              <span className="text-sm font-bold text-white mt-1 block truncate">
                {vehicle.specs.drivetrain}
              </span>
              <span className="text-[10px] text-slate-400 font-mono-tabular">{vehicle.specs.efficiency}</span>
            </div>
          </div>

          {/* Technical Specifications Grid */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#E5B869] mb-3">
              Powertrain & Architecture
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2.5 text-xs text-slate-300 bg-[#181c24] p-4 rounded-sm border border-white/10">
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-slate-400">Powerplant:</span>
                <span className="font-semibold text-white">{vehicle.specs.engine}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-slate-400">Gearbox:</span>
                <span className="font-semibold text-white">{vehicle.specs.transmission}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-slate-400">Exterior Finish:</span>
                <span className="font-semibold text-white">{vehicle.specs.exteriorColor}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-slate-400">Interior Atelier:</span>
                <span className="font-semibold text-white">{vehicle.specs.interiorColor}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400">Odometer:</span>
                <span className="font-mono-tabular text-emerald-400 font-bold">{vehicle.specs.mileage}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400">Allocation Status:</span>
                <span className="text-[#E5B869] font-bold">{vehicle.status}</span>
              </div>
            </div>
          </div>

          {/* Factory Bespoke Equipment */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#E5B869] mb-3">
              Factory Bespoke Equipment Included
            </h3>
            <div className="space-y-2 text-xs text-slate-300">
              {vehicle.features.map((feature, i) => (
                <div key={i} className="flex items-center gap-2.5 p-2.5 bg-[#181c24] rounded-sm border border-white/5">
                  <CheckCircle2 className="w-4 h-4 text-[#E5B869] shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-4 px-6 bg-[#181c24] border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={() => {
              onClose();
              onCalculateFinance(vehicle);
            }}
            className="w-full sm:w-auto px-5 py-2.5 bg-[#252b37] hover:bg-[#2f3747] text-white text-xs font-bold tracking-wider uppercase rounded-sm transition-colors text-center"
          >
            Calculate Lease / Finance
          </button>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onBookTestDrive(vehicle);
              }}
              className="flex-1 sm:flex-none px-6 py-2.5 bg-[#E5B869] hover:bg-[#d6a555] active:scale-98 text-black text-xs font-bold tracking-wider uppercase rounded-sm transition-all"
            >
              BOOK VIP TEST DRIVE
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
