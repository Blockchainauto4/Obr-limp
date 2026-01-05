
import React from 'react';
import { UserLocation } from '../types';

interface HeaderProps {
  isScrolled: boolean;
  location: UserLocation;
  onAdminOpen: () => void;
}

const Header: React.FC<HeaderProps> = ({ isScrolled, location, onAdminOpen }) => {
  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-500/20">OL</div>
          <span className={`font-black text-xl tracking-tighter text-blue-900 uppercase`}>OBRA LIMPA SP</span>
        </div>
        
        <nav className="hidden md:flex gap-6 items-center">
          <a href="#inicio" className="text-sm font-bold text-slate-700 hover:text-blue-600 transition-colors uppercase tracking-widest">Início</a>
          <a href="#servicos" className="text-sm font-bold text-slate-700 hover:text-blue-600 transition-colors uppercase tracking-widest">Serviços</a>
          <a href="#faq" className="text-sm font-bold text-slate-700 hover:text-blue-600 transition-colors uppercase tracking-widest">FAQ</a>
        </nav>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-blue-50 px-3 py-1 rounded-full border border-blue-100 shadow-sm">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <span className="text-xs font-bold text-blue-700 uppercase tracking-wider whitespace-nowrap">
              {location.city}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
