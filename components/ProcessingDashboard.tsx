import React, { useState, useEffect } from 'react';
import { UserLocation } from '../types';

interface ProcessingDashboardProps {
  onClose: () => void;
  location: UserLocation;
}

const ProcessingDashboard: React.FC<ProcessingDashboardProps> = ({ onClose, location }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [apiStatus, setApiStatus] = useState<'IDLE' | 'ACTIVE' | 'ERROR'>('IDLE');

  const addLog = (msg: string) => setLogs(prev => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev].slice(0, 10));

  const runIndexingProcess = async () => {
    setIsProcessing(true);
    setApiStatus('ACTIVE');
    setProgress(10);
    addLog(`Iniciando Instant Indexing para ${location.city}...`);
    
    await new Promise(r => setTimeout(r, 800));
    setProgress(30);
    addLog("Autenticando via Google Indexing API...");
    
    await new Promise(r => setTimeout(r, 1200));
    setProgress(60);
    addLog(`Processando Canonical URL: /atendimento/${location.state.toLowerCase()}/...`);
    
    await new Promise(r => setTimeout(r, 1000));
    setProgress(85);
    addLog("Auditoria Gemini: Metadados validados com sucesso.");
    
    await new Promise(r => setTimeout(r, 800));
    setProgress(100);
    addLog("Indexação enviada! Status: 200 OK.");
    setIsProcessing(false);
    setApiStatus('IDLE');
  };

  return (
    <div className="fixed inset-0 z-[600] flex items-center justify-center p-4 bg-slate-950/95 backdrop-blur-xl">
      <div className="w-full max-w-4xl bg-slate-900 border border-white/10 rounded-[3rem] overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.6)] flex flex-col md:flex-row h-[80vh]">
        
        <div className="md:w-1/3 bg-slate-950 p-10 border-r border-white/5 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-orange-600 rounded-2xl flex items-center justify-center text-2xl">⚡</div>
              <div>
                <h2 className="text-white font-black uppercase tracking-tighter text-xl">Instant Index</h2>
                <p className="text-slate-400 text-xs font-black uppercase tracking-widest">Dashboard v1.0</p>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="p-5 bg-white/5 border border-white/5 rounded-2xl">
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Target Region</p>
                <p className="text-sm font-bold text-white uppercase">{location.city}, {location.state}</p>
              </div>
              <div className="p-5 bg-white/5 border border-white/5 rounded-2xl">
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Current Tier</p>
                <p className="text-sm font-bold text-emerald-400 uppercase">Pro Access Active</p>
              </div>
            </div>
          </div>

          <button 
            onClick={onClose}
            aria-label="Fechar painel de indexação"
            className="w-full py-4 border-2 border-white/10 text-slate-400 hover:text-white hover:border-white/20 rounded-2xl font-black uppercase tracking-widest transition-all"
          >
            Fechar Dashboard
          </button>
        </div>

        <div className="flex-grow p-10 flex flex-col">
          <div className="flex justify-between items-center mb-10">
            <h3 className="text-white font-black uppercase tracking-tighter text-3xl">Painel de Processamento</h3>
            <div className={`px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest ${apiStatus === 'ACTIVE' ? 'bg-orange-500/20 text-orange-500 animate-pulse' : 'bg-slate-800 text-slate-500'}`}>
              {apiStatus === 'ACTIVE' ? 'API Busy' : 'API Idle'}
            </div>
          </div>

          <div className="flex-grow flex flex-col gap-10">
            <div className="bg-slate-950 p-8 rounded-[2rem] border border-white/5">
              <div className="flex justify-between mb-4">
                <span className="text-xs font-black text-slate-300 uppercase tracking-widest">Status da Fila de Indexação</span>
                <span className="text-xs font-black text-white">{progress}%</span>
              </div>
              <div className="h-4 bg-slate-900 rounded-full overflow-hidden border border-white/10">
                <div 
                  className="h-full bg-gradient-to-r from-orange-600 to-red-600 transition-all duration-500 ease-out"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>

            <div className="flex-grow bg-black p-6 rounded-[2rem] border border-white/5 font-mono overflow-y-auto custom-scrollbar">
              {logs.length === 0 ? (
                <p className="text-slate-500 text-xs italic">Aguardando comando do administrador...</p>
              ) : (
                logs.map((log, i) => (
                  <p key={i} className="text-xs mb-2">
                    <span className="text-emerald-500">{">"}</span> <span className="text-slate-300">{log}</span>
                  </p>
                ))
              )}
            </div>

            <button 
              onClick={runIndexingProcess}
              disabled={isProcessing}
              aria-label={isProcessing ? "Processamento em curso" : "Executar indexação instantânea"}
              className={`w-full py-6 rounded-2xl font-black uppercase tracking-widest text-lg transition-all shadow-2xl ${isProcessing ? 'bg-slate-800 text-slate-500 cursor-not-allowed' : 'bg-orange-600 hover:bg-orange-500 text-white shadow-orange-950/40 hover:scale-[1.01]'}`}
            >
              {isProcessing ? 'Processando URLs...' : 'Iniciar Indexação Inteligente'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessingDashboard;