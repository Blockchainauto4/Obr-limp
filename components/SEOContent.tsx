
import React from 'react';
import { UserLocation } from '../types';

const SEOContent: React.FC<{ location: UserLocation }> = ({ location }) => {
  const spec = location.specialty || 'Limpeza Pós-Obra';
  const city = location.city;
  
  const pillars = [
    {
      id: 'limpeza',
      title: 'Limpeza de Obra Perto de Mim',
      icon: '🧹',
      color: 'bg-blue-600',
      textColor: 'text-blue-600',
      desc: `A melhor e mais próxima equipe de limpeza pós-obra em ${city} para acabamento fino e remoção técnica de resíduos de construção.`
    },
    {
      id: 'dedetizacao',
      title: 'Dedetizadora Próxima em SP',
      icon: '🐜',
      color: 'bg-rose-600',
      textColor: 'text-rose-600',
      desc: `Controle de pragas certificado exatamente na região de ${city}. Dedetização, desinsetização e controle de roedores imediato.`
    },
    {
      id: 'cacamba',
      title: 'Caçamba de Entulho aqui Perto',
      icon: '🚚',
      color: 'bg-emerald-600',
      textColor: 'text-emerald-600',
      desc: `Logística rápida de resíduos próxima à sua obra em ${city}. Aluguel de caçambas estacionárias com descarte ecológico em SP.`
    }
  ];

  const sendWhatsApp = (msg: string) => {
    window.open(`https://wa.me/5511932046970?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <section id="servicos" className="py-24 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-20">
          <h2 className="text-blue-500 font-black uppercase tracking-[0.4em] text-xs mb-4">Serviços Prediais em São Paulo</h2>
          <h3 className="text-3xl md:text-5xl lg:text-7xl font-black text-white uppercase tracking-tighter leading-none">
            Encontre <span className="italic text-blue-500 underline decoration-white underline-offset-8">Perto de Mim</span> <br className="hidden md:block"/> em {city}
          </h3>
          <p className="mt-8 text-slate-400 max-w-2xl mx-auto font-medium text-lg">
            Conectamos você aos profissionais de manutenção e finalização de obras mais próximos da sua localização atual em São Paulo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
          {pillars.map((p) => (
            <div key={p.id} className="group bg-white/5 border border-white/10 p-10 rounded-[3rem] hover:bg-white hover:border-white transition-all duration-500 shadow-2xl">
              <div className="w-20 h-20 bg-white/10 rounded-3xl flex items-center justify-center text-4xl mb-8 group-hover:bg-slate-900 group-hover:scale-110 transition-all">
                {p.icon}
              </div>
              <h4 className="text-xl font-black text-white group-hover:text-slate-900 uppercase tracking-tight mb-4 leading-tight">
                {p.title}
              </h4>
              <p className="text-slate-400 group-hover:text-slate-600 text-sm leading-relaxed mb-8 font-medium">
                {p.desc}
              </p>
              <button 
                onClick={() => sendWhatsApp(`Gostaria de orçamento para ${p.title} em ${city}`)}
                className={`w-full px-6 py-4 ${p.color} text-white font-black uppercase tracking-widest text-[10px] rounded-2xl shadow-xl group-hover:shadow-none transition-all flex items-center justify-center gap-2`}
              >
                Chamar no WhatsApp Próximo
              </button>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-[4rem] p-12 lg:p-24 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-12 text-blue-50 font-black text-[12rem] leading-none select-none opacity-20 pointer-events-none">SP</div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
            <div>
              <h3 className="text-4xl md:text-6xl font-black text-slate-900 uppercase tracking-tighter leading-none mb-10">
                Liderança Local em <br/> <span className="text-blue-600 italic">obralimpa.sp</span>
              </h3>
              <div className="prose prose-slate max-w-none text-slate-700 font-medium space-y-6">
                <p className="text-lg leading-relaxed">
                  Buscar por <span className="font-bold text-slate-900 underline decoration-blue-200">{spec} perto de mim em {city} SP</span> exige confiança e rapidez. O domínio <span className="text-blue-600 font-bold">obralimpa.sp</span> garante que você está falando com uma central inteligente que mapeia a logística de São Paulo em tempo real.
                </p>
                <p className="text-lg leading-relaxed">
                  Diferente de empresas generalistas, nós focamos na <span className="font-bold">hiper-localização</span>. Seja em Moema, Tatuapé ou Alphaville, nossas equipes de <span className="font-bold text-slate-900">limpeza técnica e dedetização</span> já conhecem as particularidades da sua região em SP, garantindo que o serviço seja feito com o menor deslocamento e maior eficiência.
                </p>
              </div>
              
              <div className="mt-12 flex flex-wrap gap-4">
                {['Empresa Registrada', 'Equipes Seguradas', 'Laudo Técnico SP', 'Perto de Mim', 'Orçamento pelo Whats'].map(tag => (
                  <div key={tag} className="px-6 py-3 bg-slate-100 text-slate-900 font-black uppercase tracking-widest text-[10px] rounded-2xl border border-slate-200">
                    {tag}
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { l: 'Limpeza Moema aqui perto', s: 'Ativo' },
                { l: 'Dedetização Itaim próxima', s: 'Ativo' },
                { l: 'Caçamba Pinheiros agora', s: 'Ativo' },
                { l: 'Limpeza Santana em SP', s: 'Ativo' },
                { l: 'Dedetização Tatuapé perto de mim', s: 'Ativo' },
                { l: 'Caçamba Butantã disponível', s: 'Ativo' }
              ].map((item, i) => (
                <div key={i} className="p-8 bg-slate-50 border border-slate-200 rounded-[2.5rem] hover:border-blue-500 transition-colors shadow-sm group">
                  <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-2 group-hover:animate-pulse">{item.s}</p>
                  <p className="text-xs font-bold text-slate-900 uppercase tracking-tight">{item.l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SEOContent;
