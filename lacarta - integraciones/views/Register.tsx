import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Check, Shield, Mail, Lock, Store } from 'lucide-react';
import Button from '../components/Button';

interface RegisterProps {
  onRegisterSuccess: () => void;
  onNavigateToLogin: () => void;
}

const Register: React.FC<RegisterProps> = ({ onRegisterSuccess, onNavigateToLogin }) => {
  const [step, setStep] = useState<'FORM' | 'SUCCESS'>('FORM');
  const [formData, setFormData] = useState({
    restaurantName: '',
    email: '',
    password: ''
  });

  const generatedId = formData.restaurantName
    ? formData.restaurantName.toLowerCase().replace(/[^a-z0-9]/g, '')
    : 'tu-local';

  const generatedEmail = `${generatedId}@lacarta.pe`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      setStep('SUCCESS');
    }, 800);
  };

  return (
    <div className="min-h-screen flex font-sans bg-offwhite">
      {/* Left Column: Visuals (Desktop Only) */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-richblack items-center justify-center">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')] bg-cover bg-center opacity-40"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-richblack/80 to-transparent"></div>
        
        <div className="relative z-10 max-w-lg p-12 text-white">
           <h2 className="font-serif text-5xl mb-6">Tu nueva identidad digital.</h2>
           <p className="text-gray-300 text-lg leading-relaxed">
             Únete a los restaurantes que ya no imprimen papel. Gestiona tu carta, tus precios y tu identidad desde una sola cuenta maestra.
           </p>
        </div>
      </div>

      {/* Right Column: Interactive Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12 relative">
        <div className="max-w-md w-full">
          <AnimatePresence mode="wait">
            {step === 'FORM' ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <div className="mb-10">
                  <h1 className="font-serif text-4xl text-richblack mb-2">Crea tu Identidad</h1>
                  <p className="text-gray-500 text-sm">Empieza gratis. Sin tarjeta de crédito.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Field 1: Restaurant Name + Identity Gen */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">Nombre del Restaurante</label>
                    <div className="relative">
                      <Store className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <input 
                        type="text" 
                        required
                        placeholder="Ej. La Mar"
                        className="w-full bg-white border border-gray-200 rounded-2xl py-4 pl-12 pr-4 text-richblack focus:border-powerred focus:ring-1 focus:ring-powerred outline-none transition-all shadow-sm"
                        value={formData.restaurantName}
                        onChange={(e) => setFormData({...formData, restaurantName: e.target.value})}
                      />
                    </div>
                    
                    {/* Identity Card Component */}
                    <motion.div 
                       layout
                       className="bg-richblack rounded-xl p-4 mt-2 relative overflow-hidden group border border-gray-800"
                    >
                       <div className="absolute top-0 right-0 w-24 h-24 bg-powerred/20 blur-2xl rounded-full"></div>
                       <div className="relative z-10 flex justify-between items-center">
                          <div>
                            <span className="text-[10px] text-gray-500 uppercase tracking-wider font-bold block mb-1">Tu Identidad Profesional</span>
                            <motion.span 
                               key={generatedEmail}
                               initial={{ opacity: 0, y: 5 }}
                               animate={{ opacity: 1, y: 0 }}
                               className="font-mono text-powerred text-sm tracking-wide"
                            >
                               {generatedEmail}
                            </motion.span>
                          </div>
                          <Shield size={20} className="text-gray-600" />
                       </div>
                    </motion.div>
                  </div>

                  {/* Field 2: Personal Email */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">Tu Correo Personal</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <input 
                        type="email" 
                        required
                        placeholder="nombre@gmail.com"
                        className="w-full bg-white border border-gray-200 rounded-2xl py-4 pl-12 pr-4 text-richblack focus:border-powerred focus:ring-1 focus:ring-powerred outline-none transition-all shadow-sm"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                      />
                    </div>
                    <p className="text-[10px] text-gray-400 pl-2">Lo usaremos solo para reportes y seguridad.</p>
                  </div>

                   {/* Field 3: Password */}
                   <div className="space-y-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">Contraseña</label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <input 
                        type="password" 
                        required
                        placeholder="••••••••"
                        className="w-full bg-white border border-gray-200 rounded-2xl py-4 pl-12 pr-4 text-richblack focus:border-powerred focus:ring-1 focus:ring-powerred outline-none transition-all shadow-sm"
                        value={formData.password}
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="pt-4">
                     <Button type="submit" className="w-full justify-between group shadow-powerred/30">
                        <span>Crear mi Identidad</span>
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                     </Button>
                  </div>
                </form>

                <div className="mt-8 text-center">
                  <p className="text-sm text-gray-500">
                    ¿Ya tienes cuenta?{' '}
                    <button onClick={onNavigateToLogin} className="text-richblack font-bold hover:underline">
                      Inicia Sesión
                    </button>
                  </p>
                </div>
              </motion.div>
            ) : (
              /* Success View - 3D Card Animation */
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center"
              >
                 <div className="perspective-1000 mb-8 flex justify-center">
                    <motion.div 
                      initial={{ rotateY: 90 }}
                      animate={{ rotateY: 0 }}
                      transition={{ type: "spring", stiffness: 50, damping: 10, delay: 0.2 }}
                      className="w-80 h-48 bg-richblack rounded-2xl relative overflow-hidden shadow-2xl border border-gray-800 text-left p-6 flex flex-col justify-between"
                    >
                       {/* Card Design */}
                       <div className="absolute top-0 right-0 w-40 h-40 bg-powerred/20 blur-[50px] rounded-full"></div>
                       <div className="absolute bottom-0 left-0 w-20 h-20 bg-blue-500/10 blur-[30px] rounded-full"></div>
                       
                       <div className="relative z-10 flex justify-between items-start">
                          <span className="font-serif text-white text-xl font-bold">LaCarta.</span>
                          <div className="w-8 h-5 rounded bg-gradient-to-r from-yellow-200 to-yellow-500 opacity-80"></div>
                       </div>
                       
                       <div className="relative z-10">
                          <div className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">Access Identity</div>
                          <div className="font-mono text-powerred text-lg shadow-black drop-shadow-md">{generatedEmail}</div>
                          <div className="text-[10px] text-gray-500 mt-2 font-mono">**** **** **** 0001</div>
                       </div>
                    </motion.div>
                 </div>

                 <h2 className="font-serif text-3xl mb-4">¡Bienvenido a la élite!</h2>
                 <p className="text-gray-500 mb-8 max-w-sm mx-auto">
                   Tu llave de acceso <b>{generatedEmail}</b> ha sido activada. Hemos enviado un link de confirmación a tu correo personal.
                 </p>

                 <Button onClick={onRegisterSuccess} className="w-full">
                    Ir a mi Dashboard
                 </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Register;