import React, { useState } from 'react';

interface AdminAuthModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

const AdminAuthModal: React.FC<AdminAuthModalProps> = ({ onClose, onSuccess }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'IAHOSPITAL#2024') {
      onSuccess();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-[500] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-sm">
      <div className="relative w-full max-w-sm bg-slate-900 border border-white/10 rounded-[2.5rem] p-8 shadow-2xl animate-fade-in">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-orange-600/20 text-orange-500 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
            🔥
          </div>
          <h2 className="text-white font-black uppercase tracking-tighter text-xl">Acesso Restrito</h2>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-2">Flame Work Local SEO Engine</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-black text-slate-300 uppercase tracking-widest ml-1">Senha Administrativa</label>
            <input 
              type="password"
              autoFocus
              className={`w-full p-4 bg-slate-950 border-2 rounded-2xl text-white outline-none transition-all ${error ? 'border-red-600' : 'border-white/5 focus:border-orange-600'}`}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p className="text-red-500 text-xs font-bold uppercase tracking-widest text-center mt-2 animate-bounce">Senha Incorreta</p>}
          </div>

          <div className="flex flex-col gap-3 pt-4">
            <button 
              type="submit"
              className="w-full py-5 bg-orange-600 hover:bg-orange-500 text-white font-black uppercase tracking-widest rounded-2xl transition-all shadow-xl shadow-orange-900/40"
            >
              Autenticar
            </button>
            <button 
              type="button"
              onClick={onClose}
              className="w-full py-4 bg-white/5 hover:bg-white/10 text-slate-400 font-bold uppercase tracking-widest rounded-2xl transition-all"
            >
              Cancelar
            </button>
          </div>
        </form>

        <p className="text-xs text-slate-600 text-center mt-8 uppercase font-bold tracking-tight">
          Sua conexão é criptografada e protegida.
        </p>
      </div>
    </div>
  );
};

export default AdminAuthModal;