
import React, { useState } from 'react';
import { UserLocation, ZONES_SP } from '../types';

interface HeroProps {
  location: UserLocation;
  onStartChat?: () => void;
  onLocationChange?: (loc: UserLocation) => void;
}

const Hero: React.FC<HeroProps> = ({ location, onStartChat, onLocationChange }) => {
  const [showZones, setShowZones] = useState(false);

  return (
    <section id="inicio" className="relative pt-32 pb-20 md:pt-48 md:pb-40 overflow-hidden bg-white">
      {/* Dynamic Location indicator */}
      <div className="absolute top-24 left-1/2 -translate-x-1/2 md:left-auto md:right-12 md:translate-x-0 z-20">
        <div className="bg-emerald-50 border border-emerald-200 px-4 py-2 rounded-full shadow-lg flex items-center gap-3 animate-bounce">
          <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
          <span className="text-[10px] font-black text-emerald-700 uppercase tracking-widest">Atendimento Ativo em {location.city}</span>
        </div>
      </div>

      <div className="absolute top-0 right-0 -z-10 w-2/3 h-full bg-gradient-to-l from-blue-50/40 to-transparent blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-8 text-center md:text-left">
            <h1 className="text-5xl md:text-7xl lg:text-9xl font-black text-slate-900 leading-[0.85] mb-8 tracking-tighter">
              {location.specialty || 'Limpeza Pós-Obra'} <br/>
              <span className="text-blue-600 italic">Perto de Mim</span> <br/>
              em <span className="underline decoration-blue-500 underline-offset-4">{location.city}</span>
            </h1>
            
            <p className="text-xl md:text-3xl text-slate-600 mb-10 leading-tight max-w-3xl font-medium tracking-tight">
              Sua obra ou imóvel em boas mãos <span className="text-slate-900 font-bold">perto de você agora</span>. Limpeza técnica, dedetização e logística de entulho com agilidade total em São Paulo.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <button 
                onClick={onStartChat}
                className="group relative px-12 py-6 bg-blue-600 hover:bg-blue-700 text-white font-black uppercase tracking-widest rounded-3xl shadow-2xl shadow-blue-500/30 transition-all flex items-center justify-center gap-4 overflow-hidden text-sm"
              >
                Orçamento Perto de Mim Aqui
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
              </button>
              
              <button 
                onClick={() => setShowZones(!showZones)}
                className="px-10 py-6 bg-slate-900 text-white font-black uppercase tracking-widest rounded-3xl transition-all shadow-xl hover:bg-black text-sm flex items-center justify-center gap-2"
              >
                Localizar Outro Bairro SP
                <svg className={`w-4 h-4 transition-transform ${showZones ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7"></path></svg>
              </button>
            </div>

            {showZones && (
              <div className="mt-12 p-10 bg-slate-50 border border-slate-200 rounded-[3.5rem] shadow-2xl animate-slide-up grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 text-left relative z-30 max-h-[400px] overflow-y-auto custom-scrollbar">
                {Object.entries(ZONES_SP).map(([zone, neighborhoods]) => (
                  <div key={zone}>
                    <h4 className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-4 border-b border-blue-100 pb-2">{zone}</h4>
                    <div className="flex flex-col gap-2">
                      {neighborhoods.map(nb => (
                        <button 
                          key={nb} 
                          onClick={() => {
                            onLocationChange?.({ ...location, city: nb });
                            setShowZones(false);
                          }}
                          className="text-[11px] font-bold text-slate-500 hover:text-blue-600 transition-colors text-left flex items-center gap-2"
                        >
                          <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                          {nb}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="lg:col-span-4 hidden lg:block">
            <div className="bg-slate-900 p-1 rounded-[3.5rem] shadow-2xl rotate-2">
              <div className="bg-white p-10 rounded-[3.3rem] space-y-8">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-2xl border border-blue-100 group cursor-default">
                    <span className="text-xs font-black text-blue-700 uppercase">Limpeza aqui perto</span>
                    <span className="text-[10px] bg-blue-600 text-white px-2 py-1 rounded-full font-black animate-pulse">ONLINE</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-rose-50 rounded-2xl border border-rose-100 group cursor-default">
                    <span className="text-xs font-black text-rose-700 uppercase">Dedetização próxima</span>
                    <span className="text-[10px] bg-rose-600 text-white px-2 py-1 rounded-full font-black">CERTIFICADO</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-emerald-50 rounded-2xl border border-emerald-100 group cursor-default">
                    <span className="text-xs font-black text-emerald-700 uppercase">Caçamba em {location.city}</span>
                    <span className="text-[10px] bg-emerald-600 text-white px-2 py-1 rounded-full font-black">RÁPIDO</span>
                  </div>
                </div>
                <div className="text-center pt-4">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Equipes Geolocalizadas SP</p>
                  <div className="flex justify-center gap-6 text-3xl">
                    <span className="grayscale hover:grayscale-0 transition-all cursor-help" title="Equipe Certificada">👷‍♂️</span>
                    <span className="grayscale hover:grayscale-0 transition-all cursor-help" title="Logística Rápida">🚛</span>
                    <span className="grayscale hover:grayscale-0 transition-all cursor-help" title="Atendimento Próximo">🏢</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
