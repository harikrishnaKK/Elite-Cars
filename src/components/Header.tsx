import React from 'react';
import { ViewMode, UserRole } from '../types';
import { Building2, Code2, Plus, User, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  currentView: ViewMode;
  onViewChange: (view: ViewMode) => void;
  userRole: UserRole;
  onRoleToggle: () => void;
  onOpenNewDealOrInvest: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onViewChange,
  userRole,
  onRoleToggle,
  onOpenNewDealOrInvest,
}) => {
  const navItems: { id: ViewMode; label: string }[] = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'offerings', label: 'Offerings' },
    { id: 'portfolio', label: 'My Portfolio' },
    { id: 'distributions', label: 'Distributions & K-1' },
    { id: 'crm', label: 'Capital CRM' },
    { id: 'importer', label: 'HTML / Screen Importer' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Zone 1: Brand Wordmark */}
          <div className="flex items-center gap-3 shrink-0">
            <button 
              onClick={() => onViewChange('dashboard')}
              className="flex items-center gap-2.5 text-left focus:outline-none"
            >
              <div className="w-9 h-9 rounded-lg bg-slate-900 flex items-center justify-center text-white shadow-sm">
                <Building2 className="w-5 h-5 text-indigo-400" />
              </div>
              <div>
                <span className="text-lg font-bold tracking-tight text-slate-900 block leading-tight">
                  SponsorCloud
                </span>
                <span className="text-[10px] text-slate-500 font-medium tracking-wide uppercase">
                  Real Estate Fund OS
                </span>
              </div>
            </button>
          </div>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onViewChange(item.id)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-slate-900 text-white'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {item.id === 'importer' && (
                    <Code2 className="w-3.5 h-3.5 text-amber-500" />
                  )}
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Actions & Role Toggle */}
          <div className="flex items-center gap-2.5 shrink-0">
            {/* Role switch toggle */}
            <button
              onClick={onRoleToggle}
              className="px-2.5 py-1 text-xs font-medium border border-slate-200 rounded-md text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-1.5"
              title="Switch between LP Investor and GP Sponsor view"
            >
              {userRole === 'investor' ? (
                <>
                  <User className="w-3.5 h-3.5 text-slate-500" />
                  <span>LP Investor</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
                  <span>GP Sponsor</span>
                </>
              )}
            </button>

            {/* Primary Action Button */}
            <button
              onClick={onOpenNewDealOrInvest}
              className="px-3.5 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-md transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{userRole === 'investor' ? 'Explore Offerings' : 'Add New Deal'}</span>
            </button>
          </div>

        </div>

        {/* Mobile / Tablet Horizontal Scroll Nav */}
        <div className="flex lg:hidden overflow-x-auto py-2 border-t border-slate-100 gap-2 no-scrollbar">
          {navItems.map((item) => {
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onViewChange(item.id)}
                className={`px-3 py-1 text-xs font-medium rounded-md whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
