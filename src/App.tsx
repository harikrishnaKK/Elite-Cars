import React, { useState } from 'react';
import { NavTab, Vehicle, TestDriveRequest } from './types';
import { VEHICLES, INITIAL_TEST_DRIVES } from './data/mockData';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ShowroomGrid } from './components/ShowroomGrid';
import { FinancingCalculator } from './components/FinancingCalculator';
import { BespokeConcierge } from './components/BespokeConcierge';
import { ClientPortal } from './components/ClientPortal';
import { BookTestDriveModal } from './components/BookTestDriveModal';
import { VehicleDetailModal } from './components/VehicleDetailModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('showroom');
  const [activeBrandFilter, setActiveBrandFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  const [savedVehicleIds, setSavedVehicleIds] = useState<string[]>(['audi-rsq8-2025']);
  const [testDriveRequests, setTestDriveRequests] = useState<TestDriveRequest[]>(INITIAL_TEST_DRIVES);
  
  const [selectedVehicleForModal, setSelectedVehicleForModal] = useState<Vehicle | null>(null);
  const [selectedVehicleIdForFinance, setSelectedVehicleIdForFinance] = useState<string>(VEHICLES[0].id);
  const [showTestDriveModal, setShowTestDriveModal] = useState<boolean>(false);
  const [testDriveTargetVehicleId, setTestDriveTargetVehicleId] = useState<string | undefined>(undefined);

  const handleTabChange = (tab: NavTab) => {
    setActiveTab(tab);
    if (tab === 'audi') {
      setActiveBrandFilter('AUDI');
      // Scroll to showroom
      const el = document.getElementById('showroom-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (tab === 'bmw') {
      setActiveBrandFilter('BMW');
      const el = document.getElementById('showroom-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (tab === 'volvo') {
      setActiveBrandFilter('VOLVO');
      const el = document.getElementById('showroom-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (tab === 'showroom') {
      setActiveBrandFilter('ALL');
    }
  };

  const handleToggleSaveVehicle = (vehicleId: string) => {
    setSavedVehicleIds((prev) =>
      prev.includes(vehicleId) ? prev.filter((id) => id !== vehicleId) : [...prev, vehicleId]
    );
  };

  const handleOpenTestDriveModal = (vehicle?: Vehicle) => {
    setTestDriveTargetVehicleId(vehicle ? vehicle.id : undefined);
    setShowTestDriveModal(true);
  };

  const handleConfirmTestDrive = (booking: TestDriveRequest) => {
    setTestDriveRequests((prev) => [booking, ...prev]);
    setShowTestDriveModal(false);
  };

  const handleCalculateFinance = (vehicle: Vehicle) => {
    setSelectedVehicleIdForFinance(vehicle.id);
    setActiveTab('financing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToInventory = () => {
    const el = document.getElementById('showroom-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      setActiveTab('showroom');
    }
  };

  return (
    <div className="min-h-screen bg-[#0c0e12] text-white flex flex-col font-sans selection:bg-[#E5B869] selection:text-black">
      
      {/* Top Navigation Bar matching image.png */}
      <Navbar
        activeTab={activeTab}
        onTabChange={handleTabChange}
        onOpenTestDriveModal={() => handleOpenTestDriveModal()}
        onSearchQuery={setSearchQuery}
      />

      {/* Main Viewport */}
      <main className="flex-1">
        
        {/* If on Showroom, Audi, BMW, or Volvo: render Hero + Showroom */}
        {(activeTab === 'showroom' || activeTab === 'audi' || activeTab === 'bmw' || activeTab === 'volvo') && (
          <>
            <HeroSection
              onExploreInventory={scrollToInventory}
              onBookTestDrive={() => handleOpenTestDriveModal()}
            />

            <ShowroomGrid
              vehicles={VEHICLES}
              activeBrandFilter={activeBrandFilter}
              onBrandFilterChange={(filter) => {
                setActiveBrandFilter(filter);
                if (filter === 'AUDI') setActiveTab('audi');
                else if (filter === 'BMW') setActiveTab('bmw');
                else if (filter === 'VOLVO') setActiveTab('volvo');
                else setActiveTab('showroom');
              }}
              onSelectVehicle={setSelectedVehicleForModal}
              onBookTestDrive={handleOpenTestDriveModal}
              onCalculateFinance={handleCalculateFinance}
              savedVehicleIds={savedVehicleIds}
              onToggleSaveVehicle={handleToggleSaveVehicle}
              searchFilter={searchQuery}
            />
          </>
        )}

        {/* Financing View */}
        {activeTab === 'financing' && (
          <FinancingCalculator
            vehicles={VEHICLES}
            selectedVehicleId={selectedVehicleIdForFinance}
            onSelectVehicleId={setSelectedVehicleIdForFinance}
            onBookTestDrive={handleOpenTestDriveModal}
          />
        )}

        {/* Bespoke Concierge View */}
        {activeTab === 'concierge' && (
          <BespokeConcierge />
        )}

        {/* Client Portal View */}
        {activeTab === 'portal' && (
          <ClientPortal
            vehicles={VEHICLES}
            savedVehicleIds={savedVehicleIds}
            onToggleSaveVehicle={handleToggleSaveVehicle}
            onSelectVehicle={setSelectedVehicleForModal}
            testDriveRequests={testDriveRequests}
            onOpenTestDriveModal={() => handleOpenTestDriveModal()}
          />
        )}

      </main>

      {/* Book Test Drive Modal */}
      {showTestDriveModal && (
        <BookTestDriveModal
          vehicles={VEHICLES}
          initialVehicleId={testDriveTargetVehicleId}
          onClose={() => setShowTestDriveModal(false)}
          onConfirmBooking={handleConfirmTestDrive}
        />
      )}

      {/* Vehicle Detail / Window Sticker Modal */}
      {selectedVehicleForModal && (
        <VehicleDetailModal
          vehicle={selectedVehicleForModal}
          onClose={() => setSelectedVehicleForModal(null)}
          onBookTestDrive={handleOpenTestDriveModal}
          onCalculateFinance={handleCalculateFinance}
          isSaved={savedVehicleIds.includes(selectedVehicleForModal.id)}
          onToggleSave={() => handleToggleSaveVehicle(selectedVehicleForModal.id)}
        />
      )}

      {/* Luxury Automotive Footer */}
      <footer className="bg-[#08090c] border-t border-white/10 text-white/60 py-12 text-xs">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 space-y-8">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-white/10">
            <div>
              <div className="flex items-center">
                <span className="text-xl font-bold tracking-[0.18em] text-white">ELITE</span>
                <span className="text-xl font-light tracking-[0.22em] text-[#E5B869] ml-2">MOTORS</span>
              </div>
              <p className="text-slate-400 text-xs mt-1 max-w-sm">
                Authorized luxury franchise partner for Audi, BMW, and Volvo bespoke models.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-xs font-semibold tracking-wider text-slate-300">
              <button onClick={() => handleTabChange('showroom')} className="hover:text-white">SHOWROOM</button>
              <button onClick={() => handleTabChange('audi')} className="hover:text-white">AUDI</button>
              <button onClick={() => handleTabChange('bmw')} className="hover:text-white">BMW</button>
              <button onClick={() => handleTabChange('volvo')} className="hover:text-white">VOLVO</button>
              <button onClick={() => handleTabChange('financing')} className="hover:text-white">FINANCING</button>
              <button onClick={() => handleTabChange('concierge')} className="hover:text-white">CONCIERGE</button>
              <button onClick={() => handleTabChange('portal')} className="hover:text-white">CLIENT PORTAL</button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
            <div>
              © 2026 Elite Motors Prestige Group. All rights reserved. 
              Showrooms in Beverly Hills · Manhattan · Miami Beach · Aspen.
            </div>
            <div className="flex items-center gap-4">
              <span>White-Glove 48-Hr Delivery</span>
              <span>·</span>
              <span>100% Certified Inspection</span>
              <span>·</span>
              <span>Discreet Acquisition</span>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
