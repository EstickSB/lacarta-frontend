import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Loader2, ArrowLeft, CheckCircle2 } from 'lucide-react';
import Button from '../components/Button';

interface ForgotPasswordProps {
  onNavigateToLogin: () => void;
}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({ onNavigateToLogin }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSent(true);
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
          <p className="text-gray-500 text-sm tracking-wide uppercase">Recuperar Acceso</p>
        </div>

        {/* Glassmorphism Card */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-10 rounded-[2rem] shadow-2xl">
          {!isSent ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <p className="text-gray-400 text-sm text-center mb-4">
                Ingresa tu correo personal o usuario profesional para recibir las instrucciones de
                recuperación.
              </p>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">
                  Correo o Usuario
                </label>
                <div className="relative group">
                  <Mail
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-white transition-colors"
                    size={18}
                  />
                  <input
                    type="text"
                    required
                    placeholder="tu-local@lacarta.pe"
                    className="w-full bg-black/40 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder-gray-600 focus:border-powerred focus:ring-1 focus:ring-powerred outline-none transition-all"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-powerred hover:bg-red-600 border-none shadow-[0_0_20px_rgba(230,0,38,0.4)] hover:shadow-[0_0_30px_rgba(230,0,38,0.6)]"
              >
                {isLoading ? <Loader2 className="animate-spin" /> : 'Enviar Instrucciones'}
              </Button>

              <button
                type="button"
                onClick={onNavigateToLogin}
                className="w-full flex items-center justify-center gap-2 text-sm text-gray-500 hover:text-white transition-colors pt-2"
              >
                <ArrowLeft size={16} />
                Volver al inicio de sesión
              </button>
            </form>
          ) : (
            <div className="text-center space-y-6 py-4">
              <div className="flex justify-center">
                <div className="w-20 h-20 bg-powerred/20 rounded-full flex items-center justify-center border border-powerred/30">
                  <CheckCircle2 size={40} className="text-powerred" />
                </div>
              </div>
              <div className="space-y-2">
                <h2 className="text-white text-xl font-serif">¡Correo Enviado!</h2>
                <p className="text-gray-400 text-sm">
                  Hemos enviado un enlace de recuperación a <b>{email}</b>. Revisa tu bandeja de
                  entrada y spam.
                </p>
              </div>
              <Button
                onClick={onNavigateToLogin}
                className="w-full bg-white text-black hover:bg-gray-200 border-none"
              >
                Volver al Login
              </Button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
