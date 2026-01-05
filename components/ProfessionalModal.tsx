
import React, { useState } from 'react';
import { BRAZIL_STATES, SPECIALTIES, CITIES_BY_STATE } from '../types';

interface ProfessionalModalProps {
  onClose: () => void;
}

const ProfessionalModal: React.FC<ProfessionalModalProps> = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    registro: '',
    especialidade: SPECIALTIES[0],
    estado: 'SP',
    cidade: ''
  });

  const whatsappUrl = "https://wa.me/5511932046970?text=Sou%20profissional%20e%20quero%20me%20cadastrar%20no%20IA%20Hospital";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simula envio para API
    setTimeout(() => {
      setIsSubmitting(false);
      setStep(3);
    }, 1500);
  };

  const cities = CITIES_BY_STATE[formData.estado] || [];

  return (
    <div className="fixed inset-0 z-[400] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-xl" onClick={onClose}></div>
      
      <div className="relative w-full max-w-xl bg-white rounded-[2.5rem] shadow-[0_0_100px_rgba(0,0,0,0.4)] overflow-hidden animate-fade-in border border-white/20">
        
        {step < 3 && (
          <div className="bg-slate-900 p-8 text-white flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-black uppercase tracking-tighter">Credenciamento IA Hospital</h2>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">Habilite sua unidade para receber encaminhamentos</p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors text-slate-400 hover:text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
          </div>
        )}

        <div className="p-8">
          {step === 1 && (
            <div className="space-y-6">
              <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100 flex gap-4">
                <div className="text-2xl">👨‍⚕️</div>
                <p className="text-[11px] leading-relaxed text-blue-800 font-bold uppercase tracking-tight">
                  Após a triagem inteligente, conectamos o paciente ao profissional mais qualificado na localidade. Cadastre-se para ser esse elo.
                </p>
              </div>

              <div className="space-y-4">
                <label className="block">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Nome Completo</span>
                  <input 
                    type="text" 
                    placeholder="Dr(a). Exemplo Sobrenome"
                    className="w-full mt-1 p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-blue-500 outline-none transition-all font-medium text-sm"
                    value={formData.nome}
                    onChange={e => setFormData({...formData, nome: e.target.value})}
                  />
                </label>
                <label className="block">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">CRM / CRN / Registro Profissional</span>
                  <input 
                    type="text" 
                    placeholder="000000-UF"
                    className="w-full mt-1 p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-blue-500 outline-none transition-all font-medium text-sm"
                    value={formData.registro}
                    onChange={e => setFormData({...formData, registro: e.target.value})}
                  />
                </label>
                <label className="block">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Especialidade Principal</span>
                  <select 
                    className="w-full mt-1 p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-blue-500 outline-none transition-all font-medium text-sm appearance-none"
                    value={formData.especialidade}
                    onChange={e => setFormData({...formData, especialidade: e.target.value})}
                  >
                    {SPECIALTIES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </label>
              </div>

              <div className="flex flex-col gap-3">
                <button 
                  onClick={() => setStep(2)}
                  disabled={!formData.nome || !formData.registro}
                  className="w-full py-5 bg-blue-600 hover:bg-blue-700 text-white font-black uppercase tracking-widest rounded-2xl transition-all shadow-xl shadow-blue-200 disabled:opacity-50"
                >
                  Próximo Passo
                </button>
                <div className="flex items-center gap-4 py-2">
                  <div className="h-[1px] bg-slate-100 flex-grow"></div>
                  <span className="text-[10px] font-black text-slate-300 uppercase">Ou</span>
                  <div className="h-[1px] bg-slate-100 flex-grow"></div>
                </div>
                <a 
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 bg-emerald-50 text-emerald-700 border-2 border-emerald-100 font-black uppercase tracking-widest rounded-2xl transition-all flex items-center justify-center gap-3 hover:bg-emerald-100"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.94 3.675 1.438 5.662 1.439h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  Cadastro Profissional
                </a>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-fade-in">
              <div className="space-y-4">
                <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest">Localidade do Atendimento</h3>
                <div className="grid grid-cols-2 gap-4">
                  <label className="block">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Estado</span>
                    <select 
                      className="w-full mt-1 p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-blue-500 outline-none transition-all font-medium text-sm"
                      value={formData.estado}
                      onChange={e => setFormData({...formData, estado: e.target.value})}
                    >
                      {BRAZIL_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </label>
                  <label className="block">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Cidade</span>
                    <select 
                      className="w-full mt-1 p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-blue-500 outline-none transition-all font-medium text-sm"
                      value={formData.cidade}
                      onChange={e => setFormData({...formData, cidade: e.target.value})}
                    >
                      <option value="">Selecione...</option>
                      {cities.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </label>
                </div>
              </div>

              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
                <p className="text-[10px] text-slate-500 uppercase font-bold text-center leading-relaxed">
                  Ao se cadastrar, você concorda com nossos termos de conduta médica e triagem educativa do IA Hospital.
                </p>
              </div>

              <div className="flex gap-4">
                <button 
                  onClick={() => setStep(1)}
                  className="flex-grow py-5 bg-slate-100 hover:bg-slate-200 text-slate-600 font-black uppercase tracking-widest rounded-2xl transition-all"
                >
                  Voltar
                </button>
                <button 
                  onClick={handleSubmit}
                  disabled={!formData.cidade || isSubmitting}
                  className="flex-[2] py-5 bg-blue-600 hover:bg-blue-700 text-white font-black uppercase tracking-widest rounded-2xl transition-all shadow-xl shadow-blue-200 flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : 'Finalizar Cadastro'}
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="py-12 text-center space-y-8 animate-fade-in">
              <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-4xl mx-auto shadow-lg shadow-green-100">
                ✓
              </div>
              <div>
                <h2 className="text-3xl font-black uppercase tracking-tighter text-slate-900">Cadastro Enviado!</h2>
                <p className="text-slate-500 font-medium mt-2">Nossa equipe entrará em contato em breve para validar seu acesso.</p>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed max-w-sm mx-auto font-bold uppercase tracking-tight">
                Em breve, pacientes em <span className="text-blue-600">{formData.cidade}</span> que realizarem triagem para <span className="text-blue-600">{formData.especialidade}</span> poderão ser conectados ao seu consultório.
              </p>
              <button 
                onClick={onClose}
                className="w-full py-5 bg-slate-900 hover:bg-black text-white font-black uppercase tracking-widest rounded-2xl transition-all shadow-2xl"
              >
                Concluir e Voltar ao Site
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfessionalModal;
