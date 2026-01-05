
import React, { useState, useEffect, useRef } from 'react';
import { getMedicalOrientation } from '../services/geminiService';
import { Message, UserLocation } from '../types';

interface MedicalAssistantProps {
  location: UserLocation;
  onClose?: () => void;
}

const MedicalAssistant: React.FC<MedicalAssistantProps> = ({ location, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: `Olá! Sou o assistente técnico da OBRA LIMPA SP. Precisa de orçamento para ${location.specialty || 'sua obra'} em ${location.city} perto de você agora? Posso te dar uma estimativa de preço e prazo em segundos.` }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    const history = messages.map(m => ({ role: m.role, text: m.text }));
    const response = await getMedicalOrientation(userMsg, history);
    
    setMessages(prev => [...prev, { role: 'model', text: response }]);
    setIsLoading(false);
  };

  const sendToWhatsApp = () => {
    // Captura o histórico completo para enviar ao WhatsApp
    const summary = messages.map(m => {
      const label = m.role === 'user' ? '*Cliente*:' : '*Consultor Técnico obralimpa.sp*:';
      return `${label}\n${m.text}`;
    }).join('\n\n---\n\n');
    
    const intro = `*NOVO PROJETO DE ORÇAMENTO EM ${location.city.toUpperCase()}*\nLocalidade: ${location.city}, SP\nServiço: ${location.specialty || 'Geral'}\n\n*HISTÓRICO DA CONVERSA:*`;
    
    const encoded = encodeURIComponent(`${intro}\n\n${summary}\n\n_Desejo finalizar meu orçamento e agendar a visita técnica._`);
    window.open(`https://wa.me/5511932046970?text=${encoded}`, '_blank');
  };

  return (
    <div className="bg-white flex flex-col h-[600px] w-full max-h-[85vh] shadow-2xl">
      <div className="bg-blue-700 p-5 text-white flex items-center justify-between shrink-0 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center font-bold text-lg">OL</div>
          <div>
            <h2 className="text-sm font-black uppercase tracking-widest leading-tight">Orçamento Próximo a Mim</h2>
            <p className="text-xs text-blue-100 font-bold uppercase tracking-tighter opacity-90">{location.city} • São Paulo SP</p>
          </div>
        </div>
        {onClose && (
          <button 
            onClick={onClose} 
            aria-label="Minimizar chat"
            className="p-2 hover:bg-white/10 rounded-xl transition-all"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
          </button>
        )}
      </div>

      <div ref={scrollRef} className="flex-grow overflow-y-auto p-5 space-y-5 bg-slate-50 custom-scrollbar">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}>
            <div className={`max-w-[88%] p-4 rounded-2xl text-xs leading-relaxed shadow-sm ${
              msg.role === 'user' 
                ? 'bg-blue-700 text-white rounded-tr-none font-medium' 
                : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none font-medium'
            }`}>
              <p className="whitespace-pre-wrap">{msg.text}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 rounded-tl-none">
              <div className="flex gap-1.5">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-100"></div>
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-200"></div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 bg-white border-t border-slate-200 shrink-0 space-y-3">
        {messages.length > 2 && (
          <button 
            onClick={sendToWhatsApp}
            className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-black uppercase tracking-widest text-[10px] rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-200"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.94 3.675 1.438 5.662 1.439h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            Finalizar Orçamento no WhatsApp
          </button>
        )}
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Informe m², bairro ou dúvida técnica..."
            className="flex-grow p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-700 outline-none text-xs font-bold text-slate-900"
          />
          <button 
            onClick={handleSend}
            disabled={isLoading}
            className="p-4 bg-blue-700 text-white rounded-2xl hover:bg-blue-800 transition-all flex items-center justify-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MedicalAssistant;
