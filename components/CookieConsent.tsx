
import React, { useState, useEffect } from 'react';

const CookieConsent: React.FC<{ onOpenPrivacy: () => void }> = ({ onOpenPrivacy }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('obra-limpa-cookie-consent');
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('obra-limpa-cookie-consent', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 left-6 right-6 z-[1000] animate-slide-up">
      <div className="max-w-5xl mx-auto bg-slate-900 border-4 border-slate-700 rounded-[2.5rem] p-6 md:p-10 shadow-[0_40px_100px_rgba(0,0,0,0.8)] flex flex-col lg:flex-row items-center justify-between gap-8 ring-2 ring-white/10">
        <div className="flex items-start gap-6">
          <div className="w-16 h-16 bg-blue-600 rounded-3xl flex items-center justify-center text-3xl shrink-0 shadow-lg border border-blue-400/30">✨</div>
          <div className="text-left">
            <h4 className="text-blue-400 font-black uppercase tracking-[0.2em] text-xs mb-2">Conformidade LGPD & Localização</h4>
            <h3 className="text-white font-bold text-xl mb-2 tracking-tight">Experiência Profissional</h3>
            <p className="text-slate-100 text-sm leading-relaxed max-w-2xl font-bold">
              Utilizamos geolocalização para fornecer o orçamento de limpeza <span className="text-white font-black underline decoration-blue-500 underline-offset-4">onde você está agora</span>. Ao continuar, você aceita nossa <button onClick={onOpenPrivacy} className="text-blue-300 font-black underline hover:text-blue-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded">Política de Privacidade</button>.
            </p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 shrink-0 w-full lg:w-auto">
          <button 
            onClick={handleAccept}
            aria-label="Aceitar e continuar"
            className="flex-grow lg:flex-none px-12 py-5 bg-blue-600 hover:bg-blue-500 text-white font-black uppercase tracking-widest text-xs rounded-2xl transition-all shadow-2xl border-b-4 border-blue-800"
          >
            Aceitar e Continuar
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
