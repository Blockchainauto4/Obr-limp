import React from 'react';

interface LegalModalProps {
  title: string;
  type: 'privacy' | 'terms' | 'data';
  onClose: () => void;
}

const LegalModal: React.FC<LegalModalProps> = ({ title, type, onClose }) => {
  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md" onClick={onClose}></div>
      <div className="relative w-full max-w-4xl bg-white h-[85vh] rounded-[3rem] shadow-2xl flex flex-col overflow-hidden animate-fade-in border border-white/10">
        
        <div className="bg-slate-900 p-8 text-white flex justify-between items-center shrink-0">
          <div>
            <h2 className="text-2xl font-black uppercase tracking-tighter">{title}</h2>
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-1">IA Hospital • Protocolo de Transparência v2.0</p>
          </div>
          <button 
            onClick={onClose} 
            aria-label="Fechar documento"
            className="p-3 hover:bg-white/10 rounded-2xl text-slate-400 hover:text-white transition-all"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        <div className="flex-grow overflow-y-auto p-8 md:p-12 prose prose-slate max-w-none custom-scrollbar bg-slate-50">
          {/* ... resto do conteúdo igual ... */}
          {type === 'privacy' && <p className="text-sm">Política de Privacidade em vigor sob a LGPD.</p>}
          {type === 'terms' && <p className="text-sm">Termos de uso para orientação médica informativa.</p>}
          {type === 'data' && <p className="text-sm">Detalhes sobre processamento seguro de dados.</p>}
        </div>

        <div className="p-8 bg-white border-t border-slate-200 flex justify-end gap-4">
          <button 
            onClick={onClose}
            className="px-10 py-5 bg-slate-900 hover:bg-black text-white font-black uppercase tracking-widest rounded-2xl transition-all shadow-xl shadow-slate-200"
          >
            Entendido e Concordo
          </button>
        </div>
      </div>
    </div>
  );
};

export default LegalModal;