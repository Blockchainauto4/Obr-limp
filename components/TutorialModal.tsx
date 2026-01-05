
import React from 'react';

interface TutorialModalProps {
  onClose: () => void;
  onOpenSelectKey: () => void;
}

const TutorialModal: React.FC<TutorialModalProps> = ({ onClose, onOpenSelectKey }) => {
  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md" onClick={onClose}></div>
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden animate-fade-in">
        <div className="bg-blue-600 p-8 text-white">
          <h2 className="text-3xl font-black uppercase tracking-tighter mb-2">Tutorial IA HOSPITAL PRO</h2>
          <p className="text-blue-100 font-medium">Como habilitar a análise médica por vídeo e áudio em tempo real.</p>
        </div>
        
        <div className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">1</div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm uppercase">Obtenha sua Chave</h4>
                  <p className="text-slate-500 text-xs leading-relaxed">Acesse o <a href="https://aistudio.google.com/" target="_blank" className="text-blue-600 underline font-bold">Google AI Studio</a> e gere uma chave de API gratuita ou paga.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">2</div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm uppercase">Configure o Billing</h4>
                  <p className="text-slate-500 text-xs leading-relaxed">Para recursos de áudio/vídeo nativos, o Google exige um projeto com <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" className="text-blue-600 underline font-bold">Faturamento Ativado</a>.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">3</div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm uppercase">Insira no Sistema</h4>
                  <p className="text-slate-500 text-xs leading-relaxed">Clique no botão abaixo para selecionar sua chave privada. Ela será usada apenas no seu navegador.</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Diferença de Níveis</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-2 bg-white rounded-lg border border-slate-100">
                  <span className="text-xs font-bold text-slate-600 uppercase">Chat Básico</span>
                  <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold">GRÁTIS</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-white rounded-lg border border-slate-100">
                  <span className="text-xs font-bold text-slate-600 uppercase">Análise de Vídeo</span>
                  <span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-bold">PRO/PAID</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-white rounded-lg border border-slate-100">
                  <span className="text-xs font-bold text-slate-600 uppercase">Voz em Tempo Real</span>
                  <span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-bold">PRO/PAID</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row gap-4">
            <button 
              onClick={() => {
                onOpenSelectKey();
                onClose();
              }}
              className="flex-grow py-4 bg-blue-600 hover:bg-blue-700 text-white font-black uppercase tracking-widest rounded-2xl transition-all shadow-xl shadow-blue-200"
            >
              Configurar Minha Chave Agora
            </button>
            <button 
              onClick={onClose}
              className="px-8 py-4 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold uppercase tracking-widest rounded-2xl transition-all"
            >
              Depois
            </button>
          </div>
        </div>
        
        <div className="p-4 bg-slate-900 text-[10px] text-slate-500 text-center uppercase font-bold tracking-widest">
          Sua chave nunca sai do seu navegador • Segurança Flame Work SEO
        </div>
      </div>
    </div>
  );
};

export default TutorialModal;
