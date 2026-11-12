import React, { useState } from 'react';
import { NavTab } from '../types';
import { Search, Lock, User, X } from 'lucide-react';

interface NavbarProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  onOpenTestDriveModal: () => void;
  onSearchQuery: (query: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onTabChange,
  onOpenTestDriveModal,
  onSearchQuery,
}) => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchVal, setSearchVal] = useState('');

  const navLinks: { id: NavTab; label: string }[] = [
    { id: 'showroom', label: 'SHOWROOM' },
    { id: 'audi', label: 'AUDI' },
    { id: 'bmw', label: 'BMW' },
    { id: 'volvo', label: 'VOLVO' },
    { id: 'financing', label: 'FINANCING' },
    { id: 'concierge', label: 'BESPOKE CONCIERGE' },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchQuery(searchVal);
    onTabChange('showroom');
    setShowSearch(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#0c0e12]/95 backdrop-blur-md border-b border-white/10 text-white">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Brand Logo: ELITE MOTORS */}
          <div className="flex items-center gap-8 shrink-0">
            <button 
              onClick={() => onTabChange('showroom')}
              className="text-left focus:outline-none group flex items-center gap-2"
            >
              <div className="flex items-center">
                <span className="text-xl sm:text-2xl font-bold tracking-[0.18em] text-white">
                  ELITE
                </span>
                <span className="text-xl sm:text-2xl font-light tracking-[0.22em] text-[#E5B869] ml-2">
                  MOTORS
                </span>
              </div>
            </button>

            {/* Navigation Links */}
            <nav className="hidden xl:flex items-center gap-8 ml-4">
              {navLinks.map((link) => {
                const isActive = activeTab === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => onTabChange(link.id)}
                    className="relative py-2 text-xs font-bold tracking-[0.12em] transition-colors whitespace-nowrap focus:outline-none"
                  >
                    <span className={isActive ? 'text-white' : 'text-slate-300 hover:text-white'}>
                      {link.label}
                    </span>
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#E5B869] rounded-full" />
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Right Zone: Search, Client Portal, Book Test Drive, Profile */}
          <div className="flex items-center gap-4 sm:gap-6 shrink-0">
            
            {/* Search Button */}
            <button
              onClick={() => setShowSearch(!showSearch)}
              className="p-2 text-slate-300 hover:text-white transition-colors rounded-full hover:bg-white/5 focus:outline-none"
              title="Search vehicles"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Client Portal */}
            <button
              onClick={() => onTabChange('portal')}
              className={`hidden md:flex items-center gap-2 text-xs font-semibold tracking-wider transition-colors ${
                activeTab === 'portal' ? 'text-[#E5B869]' : 'text-slate-300 hover:text-white'
              }`}
            >
              <Lock className="w-3.5 h-3.5 text-[#E5B869]" />
              <span>CLIENT PORTAL</span>
            </button>

            {/* Book Test Drive Button (Prominent Gold Button matching image.png) */}
            <button
              onClick={onOpenTestDriveModal}
              className="px-5 py-2.5 bg-[#E5B869] hover:bg-[#d6a555] active:scale-98 text-black text-xs font-bold tracking-wider rounded-sm transition-all duration-200 uppercase whitespace-nowrap shadow-sm"
            >
              BOOK TEST DRIVE
            </button>

            {/* User Icon Badge */}
            <button
              onClick={() => onTabChange('portal')}
              className="w-8 h-8 rounded-full border border-white/20 bg-slate-800/80 hover:border-[#E5B869] transition-colors flex items-center justify-center text-slate-300 hover:text-white overflow-hidden"
              title="Client Profile"
            >
              <User className="w-4 h-4" />
            </button>

          </div>

        </div>

        {/* Mobile Horizontal Navigation Strip */}
        <div className="flex xl:hidden overflow-x-auto py-2.5 border-t border-white/10 gap-5 no-scrollbar text-xs font-bold tracking-wider">
          {navLinks.map((link) => {
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => onTabChange(link.id)}
                className={`whitespace-nowrap shrink-0 transition-colors pb-1 ${
                  isActive ? 'text-[#E5B869] border-b-2 border-[#E5B869]' : 'text-slate-400 hover:text-white'
                }`}
              >
                {link.label}
              </button>
            );
          })}
          <button
            onClick={() => onTabChange('portal')}
            className={`whitespace-nowrap shrink-0 transition-colors flex items-center gap-1.5 pb-1 ${
              activeTab === 'portal' ? 'text-[#E5B869]' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Lock className="w-3 h-3 text-[#E5B869]" />
            <span>PORTAL</span>
          </button>
        </div>

      </div>

      {/* Slide-Down Quick Search Overlay */}
      {showSearch && (
        <div className="bg-[#13161c] border-b border-white/10 px-4 py-3">
          <form onSubmit={handleSearchSubmit} className="max-w-2xl mx-auto flex items-center gap-3">
            <Search className="w-4 h-4 text-slate-400" />
            <input
              type="text"
              autoFocus
              placeholder="Search by model (e.g. RS Q8, M8, EX90, RS6, e-tron)..."
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              className="w-full bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none"
            />
            {searchVal && (
              <button
                type="button"
                onClick={() => {
                  setSearchVal('');
                  onSearchQuery('');
                }}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              type="submit"
              className="px-3 py-1 bg-[#E5B869] text-black text-xs font-bold rounded-sm uppercase tracking-wider"
            >
              Filter
            </button>
          </form>
        </div>
      )}
    </header>
  );
};
