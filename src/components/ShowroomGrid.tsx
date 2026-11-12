import React, { useState } from 'react';
import { Vehicle, Brand } from '../types';
import { 
  Gauge, 
  Zap, 
  Compass, 
  ChevronRight, 
  ArrowUpRight, 
  Heart, 
  Check, 
  SlidersHorizontal,
  Flame
} from 'lucide-react';

interface ShowroomGridProps {
  vehicles: Vehicle[];
  activeBrandFilter: string;
  onBrandFilterChange: (brand: string) => void;
  onSelectVehicle: (vehicle: Vehicle) => void;
  onBookTestDrive: (vehicle: Vehicle) => void;
  onCalculateFinance: (vehicle: Vehicle) => void;
  savedVehicleIds: string[];
  onToggleSaveVehicle: (id: string) => void;
  searchFilter?: string;
}

export const ShowroomGrid: React.FC<ShowroomGridProps> = ({
  vehicles,
  activeBrandFilter,
  onBrandFilterChange,
  onSelectVehicle,
  onBookTestDrive,
  onCalculateFinance,
  savedVehicleIds,
  onToggleSaveVehicle,
  searchFilter = '',
}) => {
  const [sortOption, setSortOption] = useState<'featured' | 'price-asc' | 'price-desc' | 'hp'>('featured');

  const filterTabs = ['ALL', 'AUDI', 'BMW', 'VOLVO', 'ELECTRIC', 'PERFORMANCE'];

  const filteredVehicles = vehicles.filter((v) => {
    // Brand or Category filter
    let matchesCategory = true;
    if (activeBrandFilter === 'AUDI') matchesCategory = v.make === 'AUDI';
    else if (activeBrandFilter === 'BMW') matchesCategory = v.make === 'BMW';
    else if (activeBrandFilter === 'VOLVO') matchesCategory = v.make === 'VOLVO';
    else if (activeBrandFilter === 'ELECTRIC') matchesCategory = !!v.isElectric;
    else if (activeBrandFilter === 'PERFORMANCE') matchesCategory = v.specs.horsepower >= 600;

    // Search query
    let matchesSearch = true;
    if (searchFilter) {
      const q = searchFilter.toLowerCase();
      matchesSearch = 
        v.make.toLowerCase().includes(q) ||
        v.model.toLowerCase().includes(q) ||
        v.trim.toLowerCase().includes(q) ||
        v.category.toLowerCase().includes(q);
    }

    return matchesCategory && matchesSearch;
  });

  // Sorting
  const sortedVehicles = [...filteredVehicles].sort((a, b) => {
    if (sortOption === 'price-asc') return a.price - b.price;
    if (sortOption === 'price-desc') return b.price - a.price;
    if (sortOption === 'hp') return b.specs.horsepower - a.specs.horsepower;
    return 0; // featured default
  });

  return (
    <section id="showroom-section" className="py-16 bg-[#0c0e12] text-white">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E5B869]" />
              <span className="text-[11px] font-bold tracking-[0.2em] text-[#E5B869] uppercase">
                CURRENT ALLOCATIONS
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight uppercase">
              The Prestige Showroom
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-xl">
              Inspect current allocations ready for immediate showroom preview or 48-hour enclosed carrier white-glove delivery.
            </p>
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 self-start md:self-auto text-xs text-slate-400">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Sort by:</span>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value as any)}
              className="bg-[#151922] border border-white/15 text-white text-xs px-3 py-1.5 rounded-sm focus:outline-none focus:border-[#E5B869]"
            >
              <option value="featured">Featured Allocation</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="hp">Highest Horsepower</option>
            </select>
          </div>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="flex items-center gap-2 py-6 overflow-x-auto no-scrollbar">
          {filterTabs.map((tab) => {
            const isActive = activeBrandFilter === tab;
            return (
              <button
                key={tab}
                onClick={() => onBrandFilterChange(tab)}
                className={`px-5 py-2 text-xs font-bold tracking-[0.14em] uppercase rounded-sm transition-all duration-200 whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'bg-[#E5B869] text-black shadow-sm'
                    : 'bg-[#151922] text-slate-300 hover:text-white hover:bg-[#1f2430] border border-white/5'
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* Vehicles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-4">
          {sortedVehicles.map((vehicle) => {
            const isSaved = savedVehicleIds.includes(vehicle.id);

            return (
              <div
                key={vehicle.id}
                className="group bg-[#13161c] border border-white/10 rounded-sm overflow-hidden hover:border-[#E5B869]/50 transition-all duration-300 flex flex-col justify-between shadow-lg"
              >
                <div>
                  
                  {/* Vehicle Photo Container */}
                  <div className="relative h-64 bg-[#0a0c0f] overflow-hidden">
                    <img
                      src={vehicle.image}
                      alt={`${vehicle.make} ${vehicle.model}`}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />

                    {/* Badge */}
                    <div className="absolute top-3 left-3 bg-black/75 backdrop-blur-xs text-[#E5B869] text-[10px] font-bold tracking-wider px-2.5 py-1 rounded-xs uppercase border border-[#E5B869]/30">
                      {vehicle.badge || vehicle.make}
                    </div>

                    {/* Status Pill */}
                    <div className="absolute top-3 right-3 bg-white/10 backdrop-blur-xs text-white text-[10px] font-semibold px-2 py-0.5 rounded-xs">
                      {vehicle.status}
                    </div>

                    {/* Save to Garage Heart */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleSaveVehicle(vehicle.id);
                      }}
                      className="absolute bottom-3 right-3 p-2 bg-black/60 hover:bg-black/80 rounded-full text-white/70 hover:text-white transition-colors backdrop-blur-xs"
                      title={isSaved ? 'Remove from Saved Garage' : 'Save to Garage'}
                    >
                      <Heart className={`w-4 h-4 ${isSaved ? 'fill-red-500 text-red-500' : ''}`} />
                    </button>
                  </div>

                  {/* Vehicle Details */}
                  <div className="p-6 space-y-4">
                    
                    {/* Make & Model */}
                    <div>
                      <div className="flex items-center justify-between text-xs text-[#E5B869] font-bold tracking-widest uppercase">
                        <span>{vehicle.make}</span>
                        <span className="font-mono-tabular text-slate-400 font-normal">{vehicle.year}</span>
                      </div>
                      <h3 className="text-xl font-bold text-white mt-1 group-hover:text-[#E5B869] transition-colors">
                        {vehicle.model}
                      </h3>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {vehicle.trim}
                      </p>
                    </div>

                    {/* Specs Grid */}
                    <div className="grid grid-cols-3 gap-2 py-3 border-y border-white/10 text-center">
                      <div>
                        <span className="text-[10px] text-slate-500 uppercase font-semibold block">Power</span>
                        <span className="text-sm font-bold text-white font-mono-tabular">
                          {vehicle.specs.horsepower} HP
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-500 uppercase font-semibold block">0-60 MPH</span>
                        <span className="text-sm font-bold text-[#E5B869] font-mono-tabular">
                          {vehicle.specs.zeroToSixty}
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-500 uppercase font-semibold block">Top Speed</span>
                        <span className="text-sm font-bold text-white font-mono-tabular">
                          {vehicle.specs.topSpeed}
                        </span>
                      </div>
                    </div>

                    {/* Price Strip */}
                    <div className="flex items-baseline justify-between pt-1">
                      <div>
                        <span className="text-[10px] text-slate-500 uppercase block font-semibold">MSRP Purchase</span>
                        <span className="text-xl font-bold text-white font-mono-tabular">
                          ${vehicle.price.toLocaleString()}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] text-slate-500 uppercase block font-semibold">Executive Lease</span>
                        <span className="text-sm font-bold text-[#E5B869] font-mono-tabular">
                          ${vehicle.leaseMonthly.toLocaleString()} <span className="text-[11px] text-slate-400 font-normal">/mo</span>
                        </span>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Card Actions */}
                <div className="p-6 pt-0 space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => onSelectVehicle(vehicle)}
                      className="py-2.5 px-3 bg-[#1e232e] hover:bg-[#282f3e] text-white text-xs font-bold tracking-wider rounded-sm transition-colors uppercase text-center"
                    >
                      View Specs
                    </button>
                    <button
                      onClick={() => onBookTestDrive(vehicle)}
                      className="py-2.5 px-3 bg-[#E5B869] hover:bg-[#d6a555] active:scale-98 text-black text-xs font-bold tracking-wider rounded-sm transition-colors uppercase text-center"
                    >
                      Book Drive
                    </button>
                  </div>

                  <button
                    onClick={() => onCalculateFinance(vehicle)}
                    className="w-full text-center text-[11px] text-slate-400 hover:text-[#E5B869] py-1 font-medium transition-colors flex items-center justify-center gap-1"
                  >
                    <span>Configure Bespoke Financing</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
