
import React from 'react';
import { UserLocation, ZONES_SP } from '../types';

interface FooterProps {
  onAdminOpen?: () => void;
  onProfOpen?: () => void;
  onOpenLegal?: (type: 'privacy' | 'terms' | 'data', title: string) => void;
  location?: UserLocation;
  isAuthorized?: boolean;
}

const Footer: React.FC<FooterProps> = ({ onAdminOpen, onProfOpen, onOpenLegal, location, isAuthorized }) => {
  return (
    <footer className="bg-slate-950 text-white py-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Hub de Bairros Populares para SEO */}
        <div className="mb-20 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 border-b border-white/5 pb-16">
          {Object.entries(ZONES_SP).map(([zone, neighborhoods]) => (
            <div key={zone}>
              <h4 className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-4">{zone}</h4>
              <ul className="space-y-2">
                {neighborhoods.slice(0, 6).map(nb => (
                  <li key={nb}>
                    <a href={`/atendimento/sp/${nb.toLowerCase().replace(/ /g, '-')}/limpeza-pos-obra`} className="text-[11px] text-slate-400 hover:text-white transition-colors">
                      {nb}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center font-bold text-xl">OL</div>
              <span className="font-black text-2xl uppercase tracking-tighter">OBRA LIMPA SP</span>
            </div>
            <p className="text-slate-400 max-w-sm mb-8 leading-relaxed font-medium">
              Especialistas em finalização de obras e manutenção predial técnica. Cobertura total em São Paulo com suporte inteligente e equipes locais de prontidão.
            </p>
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-xl">🛡️</div>
              <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-xl">🥇</div>
              <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-xl">🏗️</div>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold mb-8 text-blue-400 text-xs uppercase tracking-[0.3em]">Principais Serviços</h4>
            <ul className="space-y-4 text-slate-400 text-xs font-bold uppercase tracking-widest">
              <li><a href="#" className="hover:text-white transition-colors">Limpeza Pós-Obra</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Dedetização Certificada</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Aluguel de Caçambas</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Limpeza de Vidros</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Pintura e Retoques</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-8 text-blue-400 text-xs uppercase tracking-[0.3em]">IA Studio & SEO</h4>
            <ul className="space-y-4 text-slate-400 text-xs font-bold uppercase tracking-widest">
              <li><button onClick={() => onOpenLegal?.('privacy', 'Política de Privacidade')} className="hover:text-white transition-colors">Privacidade</button></li>
              <li><button onClick={() => onOpenLegal?.('terms', 'Termos de Uso')} className="hover:text-white transition-colors">Contrato de Serviço</button></li>
              <li><button onClick={onAdminOpen} className="text-orange-500 hover:text-orange-400 transition-colors">Flame Engine Login</button></li>
              <li className="pt-4">
                <p className="text-[9px] text-slate-600 leading-none">Powered by obralimpa.sp</p>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-12 flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">
            © 2024 OBRA LIMPA SP • TECNOLOGIA PARA MANUTENÇÃO PREDIAL
          </p>
          <div className="flex gap-8 text-[10px] uppercase font-black tracking-[0.2em] text-slate-500">
            <span className="text-emerald-500">Atendimento Ativo em {location?.city || 'SP'}</span>
            <span className="text-slate-400">Certificado NR-35 & NR-33</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
