import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, User, Loader2 } from 'lucide-react';
import Button from '../components/Button';

interface LoginProps {
  onLoginSuccess: () => void;
  onNavigateToRegister: () => void;
  onNavigateToForgotPassword: () => void;
}

const Login: React.FC<LoginProps> = ({
  onLoginSuccess,
  onNavigateToRegister,
  onNavigateToForgotPassword,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate Login API
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess();
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-richblack flex items-center justify-center p-6 relative overflow-hidden font-sans">
      {/* Ambient Background Effects */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-powerred/10 rounded-full blur-[120px] pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-blue-900/10 rounded-full blur-[100px] pointer-events-none"></div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="text-center mb-10">
          <h1 className="font-serif text-white text-4xl mb-2">LaCarta.</h1>
          <p className="text-gray-500 text-sm tracking-wide">TU CENTRO DE MANDO</p>
        </div>

        {/* Glassmorphism Card */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-10 rounded-[2rem] shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">
                Usuario Profesional
              </label>
              <div className="relative group">
                <User
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-white transition-colors"
                  size={18}
                />
                <input
                  type="text"
                  placeholder="tu-local@lacarta.pe"
                  className="w-full bg-black/40 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder-gray-600 focus:border-powerred focus:ring-1 focus:ring-powerred outline-none transition-all"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Contraseña
                </label>
                <button
                  type="button"
                  onClick={onNavigateToForgotPassword}
                  className="text-xs text-gray-500 hover:text-white transition-colors"
                >
                  ¿Olvidaste tu clave?
                </button>
              </div>
              <div className="relative group">
                <Lock
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-white transition-colors"
                  size={18}
                />
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full bg-black/40 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder-gray-600 focus:border-powerred focus:ring-1 focus:ring-powerred outline-none transition-all"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
              </div>
            </div>

            {/* Remember Me Toggle */}
            <div className="flex items-center gap-3">
              <div className="relative inline-block w-10 h-6 align-middle select-none transition duration-200 ease-in">
                <input
                  type="checkbox"
                  name="toggle"
                  id="toggle"
                  className="toggle-checkbox absolute block w-4 h-4 rounded-full bg-white border-4 appearance-none cursor-pointer left-1 top-1 peer checked:translate-x-4 transition-transform"
                />
                <label
                  htmlFor="toggle"
                  className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-800 cursor-pointer border border-gray-700 peer-checked:bg-powerred peer-checked:border-powerred transition-colors"
                ></label>
              </div>
              <label htmlFor="toggle" className="text-xs text-gray-400 cursor-pointer">
                Mantener sesión iniciada
              </label>
            </div>

            <Button
              type="submit"
              className="w-full bg-powerred hover:bg-red-600 border-none shadow-[0_0_20px_rgba(230,0,38,0.4)] hover:shadow-[0_0_30px_rgba(230,0,38,0.6)]"
            >
              {isLoading ? <Loader2 className="animate-spin" /> : 'Entrar al Dashboard'}
            </Button>
          </form>
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm">
            ¿No tienes identidad?{' '}
            <button onClick={onNavigateToRegister} className="text-white font-bold hover:underline">
              Regístrate aquí
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
