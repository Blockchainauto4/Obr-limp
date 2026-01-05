import React, { useEffect, useRef, useState } from 'react';
import { GoogleGenAI, Modality, LiveServerMessage } from '@google/genai';
import { decode, decodeAudioData, createBlob } from '../services/audioUtils';
import { UserLocation } from '../types';

interface LiveAnalysisProps {
  onClose: () => void;
  location: UserLocation;
}

interface ChatTurn {
  role: 'user' | 'model';
  text: string;
}

const LiveAnalysis: React.FC<LiveAnalysisProps> = ({ onClose, location }) => {
  const [isActive, setIsActive] = useState(false);
  const [history, setHistory] = useState<ChatTurn[]>([]);
  const [currentInput, setCurrentInput] = useState('');
  const [currentOutput, setCurrentOutput] = useState('');
  const [status, setStatus] = useState<'conectando' | 'analisando' | 'erro'>('conectando');
  const [errorMessage, setErrorMessage] = useState('');
  
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [volumeLevel, setVolumeLevel] = useState(0);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sessionRef = useRef<any>(null);
  const videoIntervalRef = useRef<number | null>(null);
  const audioContextInRef = useRef<AudioContext | null>(null);
  const audioContextOutRef = useRef<AudioContext | null>(null);
  const nextStartTimeRef = useRef(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const transcriptionEndRef = useRef<HTMLDivElement>(null);

  const accumulatedInput = useRef('');
  const accumulatedOutput = useRef('');

  useEffect(() => {
    if (transcriptionEndRef.current) {
      transcriptionEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [history, currentInput, currentOutput]);

  const stopSession = () => {
    setIsActive(false);
    if (videoIntervalRef.current) window.clearInterval(videoIntervalRef.current);
    
    if (sessionRef.current) {
      try { sessionRef.current.close(); } catch(e){}
      sessionRef.current = null;
    }
    
    sourcesRef.current.forEach(source => {
      try { source.stop(); } catch (e) {}
    });
    sourcesRef.current.clear();
    
    if (audioContextInRef.current) audioContextInRef.current.close();
    if (audioContextOutRef.current) audioContextOutRef.current.close();
    
    if (videoRef.current?.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
    }
  };

  const startSession = async () => {
    try {
      setStatus('conectando');
      
      const apiKey = process.env.API_KEY;
      if (!apiKey) {
        throw new Error("API Key não encontrada. Por favor, selecione sua chave PRO.");
      }

      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: true, 
        video: { width: 640, height: 480 } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      audioContextInRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      audioContextOutRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      
      const outputNode = audioContextOutRef.current.createGain();
      outputNode.connect(audioContextOutRef.current.destination);

      const ai = new GoogleGenAI({ apiKey });
      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-09-2025',
        callbacks: {
          onopen: () => {
            setStatus('analisando');
            setIsActive(true);
            
            const source = audioContextInRef.current!.createMediaStreamSource(stream);
            const scriptProcessor = audioContextInRef.current!.createScriptProcessor(4096, 1, 1);
            
            scriptProcessor.onaudioprocess = (e) => {
              if (isMuted) return;
              const inputData = e.inputBuffer.getChannelData(0);
              
              let sum = 0;
              for(let i=0; i<inputData.length; i++) sum += inputData[i] * inputData[i];
              setVolumeLevel(Math.sqrt(sum / inputData.length));

              const pcmBlob = createBlob(inputData);
              sessionPromise.then(session => {
                session.sendRealtimeInput({ media: pcmBlob });
              }).catch(err => console.error("Erro ao enviar audio:", err));
            };
            
            source.connect(scriptProcessor);
            scriptProcessor.connect(audioContextInRef.current!.destination);

            videoIntervalRef.current = window.setInterval(() => {
              if (isVideoOff || !canvasRef.current || !videoRef.current) return;
              const ctx = canvasRef.current.getContext('2d');
              if (!ctx) return;
              
              canvasRef.current.width = 320;
              canvasRef.current.height = 240;
              ctx.drawImage(videoRef.current, 0, 0, 320, 240);
              
              canvasRef.current.toBlob(async (blob) => {
                if (blob) {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    const base64Data = (reader.result as string).split(',')[1];
                    sessionPromise.then(session => {
                      session.sendRealtimeInput({
                        media: { data: base64Data, mimeType: 'image/jpeg' }
                      });
                    }).catch(err => console.error("Erro ao enviar frame:", err));
                  };
                  reader.readAsDataURL(blob);
                }
              }, 'image/jpeg', 0.5);
            }, 1000);
          },
          onmessage: async (message: LiveServerMessage) => {
            if (message.serverContent?.outputTranscription) {
              accumulatedOutput.current += message.serverContent.outputTranscription.text;
              setCurrentOutput(accumulatedOutput.current);
            } 
            else if (message.serverContent?.inputTranscription) {
              accumulatedInput.current += message.serverContent.inputTranscription.text;
              setCurrentInput(accumulatedInput.current);
            }

            if (message.serverContent?.turnComplete) {
              const uText = accumulatedInput.current.trim();
              const mText = accumulatedOutput.current.trim();
              
              if (uText || mText) {
                setHistory(prev => {
                  const newEntries: ChatTurn[] = [];
                  if (uText) newEntries.push({ role: 'user', text: uText });
                  if (mText) newEntries.push({ role: 'model', text: mText });
                  return [...prev, ...newEntries];
                });
              }
              
              accumulatedInput.current = '';
              accumulatedOutput.current = '';
              setCurrentInput('');
              setCurrentOutput('');
            }

            const audioData = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
            if (audioData && audioContextOutRef.current) {
              try {
                const ctx = audioContextOutRef.current;
                nextStartTimeRef.current = Math.max(nextStartTimeRef.current, ctx.currentTime);
                const decodedBytes = decode(audioData);
                const audioBuffer = await decodeAudioData(decodedBytes, ctx, 24000, 1);
                const source = ctx.createBufferSource();
                source.buffer = audioBuffer;
                source.connect(outputNode);
                source.onended = () => sourcesRef.current.delete(source);
                source.start(nextStartTimeRef.current);
                nextStartTimeRef.current += audioBuffer.duration;
                sourcesRef.current.add(source);
              } catch (decodeErr) {
                console.error("Erro ao decodificar áudio recebido:", decodeErr);
              }
            }

            if (message.serverContent?.interrupted) {
              sourcesRef.current.forEach(s => { try { s.stop(); } catch(e) {} });
              sourcesRef.current.clear();
              nextStartTimeRef.current = 0;
              accumulatedOutput.current = '';
              setCurrentOutput('(Interrompido)');
            }
          },
          onerror: (e) => {
            console.error("Erro na sessão Live:", e);
            setStatus('erro');
            setErrorMessage('A conexão com o servidor médico PRO falhou.');
          },
          onclose: () => {
            setIsActive(false);
          }
        },
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } }
          },
          systemInstruction: `Você é um Médico Especialista Sênior do IA HOSPITAL em ${location.city}.`,
          outputAudioTranscription: {},
          inputAudioTranscription: {}
        }
      });

      sessionRef.current = await sessionPromise;
    } catch (err: any) {
      console.error("Falha ao iniciar sessão:", err);
      setStatus('erro');
      setErrorMessage(err.message || 'Erro ao inicializar hardware de mídia ou conexão.');
    }
  };

  useEffect(() => {
    startSession();
    return () => stopSession();
  }, []);

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-950/95 backdrop-blur-2xl p-0 sm:p-4">
      <div className="w-full max-w-7xl h-full sm:h-[92vh] flex flex-col bg-white rounded-none sm:rounded-[2.5rem] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.5)] border border-white/10">
        
        <div className="bg-slate-900 px-8 py-6 flex justify-between items-center shrink-0 border-b border-white/5">
          <div className="flex items-center gap-6">
            <div className="relative">
              <div className={`w-4 h-4 rounded-full ${isActive ? 'bg-blue-500 animate-ping' : 'bg-red-500'} absolute inset-0 opacity-40`}></div>
              <div className={`w-4 h-4 rounded-full ${isActive ? 'bg-blue-500' : 'bg-red-500'} relative z-10`}></div>
            </div>
            <div>
              <h2 className="text-white font-black uppercase tracking-[0.2em] text-xs">Consulta Pro</h2>
            </div>
          </div>
          <button 
            onClick={onClose} 
            aria-label="Fechar sala de triagem"
            className="p-3 hover:bg-white/10 rounded-2xl text-slate-400 hover:text-white transition-all"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        <div className="flex-grow flex flex-col lg:flex-row overflow-hidden">
          {status === 'erro' ? (
            <div className="w-full h-full flex flex-col items-center justify-center p-12 text-center bg-slate-50">
              <div className="w-20 h-20 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-3xl mb-6">⚠️</div>
              <h2 className="text-2xl font-black text-slate-900 mb-4 uppercase tracking-tighter">Falha na Conexão</h2>
              <p className="text-slate-500 max-w-md mb-8">{errorMessage}</p>
              <button 
                onClick={onClose}
                className="px-12 py-5 bg-slate-900 text-white font-black uppercase tracking-widest rounded-2xl hover:bg-black transition-all"
              >
                Voltar ao Início
              </button>
            </div>
          ) : (
            <>
              <div className="lg:w-[60%] relative bg-black flex items-center justify-center overflow-hidden border-r border-slate-100">
                <video ref={videoRef} autoPlay playsInline muted className={`w-full h-full object-cover transition-all duration-1000 ${isVideoOff ? 'opacity-0 scale-110 blur-2xl' : 'opacity-80'}`} />
                
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-4 bg-slate-950/40 backdrop-blur-2xl p-3 rounded-3xl border border-white/5">
                  <button 
                    onClick={() => setIsMuted(!isMuted)}
                    aria-label={isMuted ? "Ativar microfone" : "Silenciar microfone"}
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all shadow-2xl ${isMuted ? 'bg-red-600 text-white' : 'bg-white/10 text-white hover:bg-white/20'}`}
                  >
                    <span className="text-xl" aria-hidden="true">{isMuted ? '🔇' : '🎤'}</span>
                  </button>
                  <button 
                    onClick={() => setIsVideoOff(!isVideoOff)}
                    aria-label={isVideoOff ? "Ativar câmera" : "Desativar câmera"}
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all shadow-2xl ${isVideoOff ? 'bg-red-600 text-white' : 'bg-white/10 text-white hover:bg-white/20'}`}
                  >
                    <span className="text-xl" aria-hidden="true">{isVideoOff ? '🚫' : '📹'}</span>
                  </button>
                  <div className="w-[1px] bg-white/10 mx-2"></div>
                  <button 
                    onClick={onClose}
                    aria-label="Encerrar consulta"
                    className="w-14 h-14 bg-red-600/20 hover:bg-red-600 text-white rounded-2xl flex items-center justify-center transition-all shadow-2xl"
                  >
                    <span className="text-xl" aria-hidden="true">📞</span>
                  </button>
                </div>
              </div>

              <div className="lg:w-[40%] flex flex-col bg-slate-50 overflow-hidden">
                <div className="p-8 bg-white border-b border-slate-200">
                  <h3 className="text-slate-900 font-black uppercase text-xs tracking-widest">Triagem em Tempo Real</h3>
                </div>
                
                <div className="flex-grow overflow-y-auto p-8 space-y-6 custom-scrollbar">
                  {history.map((turn, i) => (
                    <div key={i} className={`flex flex-col ${turn.role === 'user' ? 'items-end' : 'items-start'}`}>
                      <p className="text-[9px] font-black mb-2 uppercase text-slate-400 tracking-widest">{turn.role === 'user' ? 'Você' : 'IA'}</p>
                      <div className={`max-w-[90%] p-5 rounded-3xl text-sm leading-relaxed border ${turn.role === 'user' ? 'bg-blue-600 text-white' : 'bg-white text-slate-700'}`}>
                        {turn.text}
                      </div>
                    </div>
                  ))}
                  {(currentInput || currentOutput) && (
                    <div className="flex flex-col space-y-4">
                      {currentInput && (
                        <div className="flex flex-col items-end opacity-50">
                          <p className="text-[9px] font-black mb-2 uppercase text-slate-400 tracking-widest">Você (ouvindo...)</p>
                          <div className="max-w-[90%] p-4 rounded-3xl text-sm leading-relaxed bg-blue-100 text-blue-900 border border-blue-200">
                            {currentInput}
                          </div>
                        </div>
                      )}
                      {currentOutput && (
                        <div className="flex flex-col items-start opacity-50">
                          <p className="text-[9px] font-black mb-2 uppercase text-slate-400 tracking-widest">IA (falando...)</p>
                          <div className="max-w-[90%] p-4 rounded-3xl text-sm leading-relaxed bg-white text-slate-700 border border-slate-200">
                            {currentOutput}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                  <div ref={transcriptionEndRef} />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LiveAnalysis;