import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Grid, 
  Utensils, 
  Rocket, 
  Settings, 
  QrCode, 
  LogOut,
  Bell,
  Search,
  Plus,
  User,
  Smartphone,
  Clock,
  CheckCircle2,
  AlertTriangle,
  X,
  CreditCard,
  Zap,
  Target,
  Magnet,
  Hourglass,
  ArrowRight,
  Flame,
  Globe,
  MapPin,
  Calendar,
  Download,
  Printer,
  ChevronRight,
  Wifi,
  Eye,
  Heart,
  Edit3,
  Trash2,
  ShieldAlert,
  Menu,
  Upload,
  Check,
  Loader2,
  MoreVertical,
  Minus,
  Receipt,
  TrendingUp,
  Lock,
  MessageSquare
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  ResponsiveContainer, 
  Tooltip, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar 
} from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../components/Button';
import { MenuItem, HallTable, MarketingBoost, CATEGORIES, ALLERGEN_OPTIONS, PREFERENCE_OPTIONS, RestaurantProfile } from '../types';

// --- TYPES ---
export type PlanLevel = 'FREE' | 'ESENCIAL' | 'PRO' | 'ULTRA';

// --- MOCK DATA ---

const PULSE_DATA = [
  { time: '12:00', digital: 200, manual: 100 },
  { time: '13:00', digital: 450, manual: 150 },
  { time: '14:00', digital: 800, manual: 200 },
  { time: '15:00', digital: 600, manual: 180 },
  { time: '16:00', digital: 300, manual: 100 },
  { time: '17:00', digital: 200, manual: 120 },
  { time: '18:00', digital: 500, manual: 300 },
  { time: '19:00', digital: 900, manual: 400 },
];

const DNA_DATA = [
  { subject: 'Vegano', A: 65, fullMark: 100 },
  { subject: 'Picante', A: 90, fullMark: 100 },
  { subject: 'Sin Gluten', A: 45, fullMark: 100 },
  { subject: 'Keto', A: 30, fullMark: 100 },
  { subject: 'Gourmet', A: 85, fullMark: 100 },
];

const INITIAL_TABLES: HallTable[] = [
  { id: 't1', number: 1, status: 'OCCUPIED_DIGITAL', total: 145.50, timeActive: '42m', items: [], allergensAlert: ['nuts'] },
  { id: 't2', number: 2, status: 'AVAILABLE', total: 0, timeActive: '', items: [] },
  { id: 't3', number: 3, status: 'PAYMENT_REQUEST', total: 89.00, timeActive: '1h 12m', items: [], pin: '8821' },
  { id: 't4', number: 4, status: 'OCCUPIED_MANUAL', total: 0, timeActive: '15m', items: [] },
  { id: 't5', number: 5, status: 'AVAILABLE', total: 0, timeActive: '', items: [] },
  { id: 't6', number: 6, status: 'OCCUPIED_DIGITAL', total: 210.00, timeActive: '1h 30m', items: [] },
  { id: 't7', number: 7, status: 'AVAILABLE', total: 0, timeActive: '', items: [] },
  { id: 't8', number: 8, status: 'AVAILABLE', total: 0, timeActive: '', items: [] },
];

const INITIAL_BOOSTS: MarketingBoost[] = [
  { id: 'b1', title: 'Hyper Visibility', description: 'Top 1 en mapas y búsquedas.', cost: 5.00, active: true, timeLeft: '2h 15m', impact: 85, type: 'VISIBILITY' },
  { id: 'b2', title: 'Star Dish', description: 'Destaca un plato con video autoplay.', cost: 2.00, active: false, impact: 0, type: 'DISH' },
  { id: 'b3', title: 'Flash Promo', description: 'Push a usuarios a 500m.', cost: 8.50, active: false, impact: 0, type: 'PROMO' },
  { id: 'b4', title: 'Smart Retargeting', description: 'Email a clientes inactivos.', cost: 12.00, active: true, timeLeft: '4d', impact: 42, type: 'RETARGETING' },
];

const INITIAL_MENU: MenuItem[] = [
  { id: 'm1', name: 'Lomo Saltado', description: 'Clásico peruano al wok.', price: 45, image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=400&q=80', category: 'Fondos', tags: [], allergens: ['soy'], spiceLevel: 0, stockStatus: 'AVAILABLE', smartTags: [], popularity: 95, views: 1240, favorites: 150 },
  { id: 'm2', name: 'Ceviche Carretillero', description: 'Pesca del día con chicharrón de calamar.', price: 38, image: 'https://images.unsplash.com/photo-1562967677-4c07b789975b?auto=format&fit=crop&w=400&q=80', category: 'Entradas', tags: ['pescatarian'], allergens: ['fish', 'gluten'], spiceLevel: 2, stockStatus: 'AVAILABLE', smartTags: [], popularity: 98, views: 2100, favorites: 320 },
];

// --- COMPONENTS ---

const Sidebar = ({ currentView, setView, walletBalance, openWallet, currentPlan }: { currentView: string, setView: (v: any) => void, walletBalance: number, openWallet: () => void, currentPlan: PlanLevel }) => {
  const menuItems = [
    { id: 'PULSE', icon: LayoutDashboard, label: 'Pulse', requiredPlan: 'PRO' },
    { id: 'HALL', icon: Grid, label: 'Salón', requiredPlan: 'ESENCIAL' },
    { id: 'MENU', icon: Utensils, label: 'Menú', requiredPlan: 'FREE' },
    { id: 'WHATSAPP', icon: MessageSquare, label: 'WhatsApp', requiredPlan: 'ULTRA' },
    { id: 'MARKETING', icon: Rocket, label: 'Boosts', requiredPlan: 'PRO' },
    { id: 'CONFIG', icon: Settings, label: 'Config', requiredPlan: 'FREE' },
  ];

  const levels = ['FREE', 'ESENCIAL', 'PRO', 'ULTRA'];
  const hasAccess = (requiredPlan: string) => {
     return levels.indexOf(currentPlan) >= levels.indexOf(requiredPlan);
  };

  return (
    <aside className="hidden lg:flex w-20 hover:w-64 transition-all duration-300 h-screen bg-[#0A0A0A] border-r border-white/5 flex-col fixed z-50 group">
      <div className="h-20 flex items-center justify-center group-hover:justify-start group-hover:px-6 transition-all border-b border-white/5">
        <span className="font-serif text-xl text-white font-bold"><span className="text-powerred">L</span>c.</span>
      </div>
      
      <nav className="flex-1 px-3 space-y-2 py-6">
        {menuItems.map(item => {
           const access = hasAccess(item.requiredPlan);
           return (
             <button
               key={item.id}
               onClick={() => access && setView(item.id)}
               disabled={!access}
               className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all relative overflow-hidden group/btn 
                  ${!access ? 'opacity-50 cursor-not-allowed' : ''}
                  ${currentView === item.id ? 'bg-white/5 text-white' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}
             >
               {currentView === item.id && <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-powerred"></div>}
               <item.icon size={20} className="flex-shrink-0" />
               <span className="whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-medium text-sm flex-1 text-left">
                 {item.label}
               </span>
               {!access && (
                  <Lock size={14} className="text-powerred/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex-shrink-0" />
               )}
             </button>
           );
        })}
        
        {/* Wallet Widget in Sidebar */}
        <div className="mt-8 px-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
           <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-2">Créditos</div>
           <div className="flex items-center justify-between bg-white/5 p-3 rounded-xl border border-white/5">
              <span className="font-mono text-white text-sm font-bold">${walletBalance.toFixed(2)}</span>
              <button onClick={openWallet} className="w-6 h-6 rounded-full bg-powerred flex items-center justify-center text-white hover:scale-110 transition-transform">
                 <Plus size={12} />
              </button>
           </div>
        </div>
      </nav>

      <div className="p-3 border-t border-white/5">
        <button className="w-full flex items-center gap-3 p-3 rounded-xl text-gray-500 hover:text-red-500 hover:bg-red-500/10 transition-colors">
          <LogOut size={20} className="flex-shrink-0" />
          <span className="whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-medium text-sm">Salir</span>
        </button>
      </div>
    </aside>
  );
};

// --- SUB-VIEWS ---

// 1. HALL (GESTIÓN DE SALÓN)
const HallView = () => {
   const [tables, setTables] = useState(INITIAL_TABLES);
   const [selectedTable, setSelectedTable] = useState<HallTable | null>(null);

   const handleStatusChange = (id: string, status: any) => {
      setTables(prev => prev.map(t => t.id === id ? { ...t, status } : t));
      setSelectedTable(null);
   };

   return (
      <div className="flex h-full animate-in fade-in duration-300">
         <div className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto pb-32">
            <h2 className="text-2xl font-serif text-white mb-6">Salón Principal</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
               {tables.map(table => (
                  <div
                     key={table.id}
                     onClick={() => setSelectedTable(table)}
                     className={`aspect-square rounded-2xl p-4 relative cursor-pointer border transition-all flex flex-col justify-between hover:scale-[1.02]
                        ${table.status === 'AVAILABLE' ? 'bg-[#111] border-dashed border-white/10 text-gray-600 hover:border-white/30' : ''}
                        ${table.status === 'OCCUPIED_DIGITAL' ? 'bg-[#111] border-powerred text-white shadow-[0_0_15px_rgba(230,0,38,0.15)]' : ''}
                        ${table.status === 'OCCUPIED_MANUAL' ? 'bg-[#111] border-amber-500/50 text-amber-500' : ''}
                        ${table.status === 'PAYMENT_REQUEST' ? 'bg-white text-black border-white animate-pulse' : ''}
                     `}
                  >
                     <div className="flex justify-between items-start">
                        <span className="text-2xl font-serif font-bold">{table.number}</span>
                        {table.status === 'OCCUPIED_DIGITAL' && <Smartphone size={16} />}
                        {table.status === 'OCCUPIED_MANUAL' && <User size={16} />}
                        {table.status === 'AVAILABLE' && <Plus size={16} />}
                     </div>

                     {table.status === 'PAYMENT_REQUEST' && (
                        <div className="text-center">
                           <div className="text-[10px] font-bold uppercase tracking-widest mb-1">Solicita Cuenta</div>
                           <div className="text-3xl font-mono font-bold">{table.pin}</div>
                        </div>
                     )}

                     {(table.status === 'OCCUPIED_DIGITAL' || table.status === 'OCCUPIED_MANUAL') && (
                        <div>
                           <div className="text-xl font-mono font-bold mb-1">${table.total.toFixed(2)}</div>
                           <div className="flex items-center gap-1 text-[10px] opacity-70">
                              <Clock size={10} /> {table.timeActive}
                           </div>
                           {table.allergensAlert && table.allergensAlert.length > 0 && (
                              <div className="absolute top-3 right-3 text-powerred animate-pulse" title="Alergia en Mesa">
                                 <ShieldAlert size={16} />
                              </div>
                           )}
                        </div>
                     )}
                  </div>
               ))}
            </div>
         </div>

         {/* Side Drawer for Table Detail */}
         <AnimatePresence>
            {selectedTable && (
               <motion.div
                  initial={{ x: '100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '100%' }}
                  className="w-full md:w-80 bg-[#111] border-l border-white/5 h-full absolute right-0 top-0 z-40 p-6 shadow-2xl flex flex-col"
               >
                  <div className="flex justify-between items-center mb-8">
                     <h3 className="text-xl font-serif text-white">Mesa {selectedTable.number}</h3>
                     <button onClick={() => setSelectedTable(null)} className="p-1 hover:bg-white/10 rounded-full text-white">
                        <X size={18} />
                     </button>
                  </div>

                  {selectedTable.status === 'AVAILABLE' && (
                     <div className="flex-1 flex flex-col justify-center items-center text-center">
                        <Button onClick={() => handleStatusChange(selectedTable.id, 'OCCUPIED_MANUAL')} className="w-full text-sm">
                           Apertura Manual
                        </Button>
                     </div>
                  )}

                  {selectedTable.status === 'PAYMENT_REQUEST' && (
                     <div className="flex-1 flex flex-col justify-center">
                        <div className="bg-white text-black p-6 rounded-2xl text-center mb-6">
                           <div className="text-[10px] font-bold uppercase tracking-widest mb-2">PIN DE SEGURIDAD</div>
                           <div className="text-5xl font-mono font-bold tracking-tighter">{selectedTable.pin}</div>
                        </div>
                        <Button onClick={() => handleStatusChange(selectedTable.id, 'AVAILABLE')} className="w-full bg-green-500 hover:bg-green-600 border-none text-black">
                           CONFIRMAR
                        </Button>
                     </div>
                  )}

                  {(selectedTable.status === 'OCCUPIED_DIGITAL' || selectedTable.status === 'OCCUPIED_MANUAL') && (
                     <div className="mt-auto pt-6 border-t border-white/10 space-y-4">
                        <div className="flex justify-between items-end">
                           <span className="text-gray-400 text-xs">Total Parcial</span>
                           <span className="text-2xl font-mono text-white font-bold">${selectedTable.total.toFixed(2)}</span>
                        </div>
                        <Button onClick={() => handleStatusChange(selectedTable.id, 'AVAILABLE')} variant="secondary" className="w-full text-xs">
                           Cerrar Mesa
                        </Button>
                     </div>
                  )}
               </motion.div>
            )}
         </AnimatePresence>
      </div>
   );
};

// 2. PULSE (HOME/ANALYTICS)
const PulseView = ({ currentPlan, setPlan }: { currentPlan: PlanLevel, setPlan: (p: PlanLevel) => void }) => {
   const levels = ['FREE', 'ESENCIAL', 'PRO', 'ULTRA'];
   const isProOrUltra = levels.indexOf(currentPlan) >= levels.indexOf('PRO');

   return (
      <div className="p-4 md:p-6 lg:p-8 space-y-6 animate-in fade-in duration-300 pb-32">
         <div className="flex justify-between items-center">
             <h2 className="text-2xl font-serif text-white">Pulse Overview</h2>
             <div className="flex gap-2 text-xs font-bold text-gray-500 uppercase tracking-wide">
                <span className="text-white">Hoy</span>
                <span>Semana</span>
             </div>
         </div>
         
         {!isProOrUltra ? (
            // FREE / ESENCIAL VIEW
            <div className="space-y-6">
               <div className="bg-gradient-to-br from-powerred/20 to-black border border-powerred/30 rounded-2xl p-6 md:p-8 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-powerred/10 blur-[80px] group-hover:bg-powerred/20 transition-colors"></div>
                  <div className="relative z-10 max-w-md">
                     <h3 className="text-2xl font-serif text-white mb-2">Desbloquea el Poder de tus Datos</h3>
                     <p className="text-sm text-gray-400 mb-6">Descubre qué platos miran más tus clientes, gestiona tu stock en tiempo real y aumenta tus ventas con analíticas avanzadas.</p>
                     <Button onClick={() => setPlan('PRO')} className="shadow-[0_0_20px_rgba(230,0,38,0.4)]">
                        Mejorar Plan a PRO
                     </Button>
                  </div>
               </div>

               {/* Paywall Strategy: Blurred Top Platos */}
               <div className="bg-[#111] border border-white/5 rounded-2xl p-6">
                  <h3 className="text-white font-bold text-xs uppercase tracking-widest mb-6 flex items-center gap-2">
                     <Flame size={16} className="text-powerred"/> Platos Más Buscados
                  </h3>
                  <div className="space-y-4 relative">
                     {/* Blurred Content */}
                     <div className="space-y-4 blur-sm select-none opacity-50">
                        {[1, 2, 3].map(i => (
                           <div key={i} className="flex items-center justify-between p-3 bg-black/50 rounded-xl border border-white/5">
                              <div className="flex items-center gap-3">
                                 <div className="w-10 h-10 bg-gray-800 rounded-lg"></div>
                                 <div>
                                    <div className="h-4 w-32 bg-gray-700 rounded mb-1"></div>
                                    <div className="h-3 w-20 bg-gray-800 rounded"></div>
                                 </div>
                              </div>
                              <div className="h-6 w-12 bg-gray-800 rounded-full"></div>
                           </div>
                        ))}
                     </div>
                     
                     {/* Overlay CTA */}
                     <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                        <Lock size={32} className="text-powerred mb-4 drop-shadow-[0_0_10px_rgba(230,0,38,0.8)]" />
                        <p className="text-white font-bold text-center mb-4 max-w-xs">¿Quieres saber qué plato es el favorito de tus clientes?</p>
                        <Button onClick={() => setPlan('PRO')} variant="secondary" className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20">
                           Cambia a PRO
                        </Button>
                     </div>
                  </div>
               </div>
            </div>
         ) : (
            // PRO / ULTRA VIEW
            <>
               {/* Stats Row */}
               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                   <div className="bg-[#111] border border-white/5 p-4 rounded-2xl">
                       <div className="text-[10px] text-gray-500 uppercase font-bold mb-1">Ventas Hoy</div>
                       <div className="text-2xl font-mono text-white">$2,845</div>
                   </div>
                   <div className="bg-[#111] border border-white/5 p-4 rounded-2xl">
                       <div className="text-[10px] text-gray-500 uppercase font-bold mb-1">Ticket Promedio</div>
                       <div className="text-2xl font-mono text-white">$42.50</div>
                   </div>
                   <div className="bg-[#111] border border-white/5 p-4 rounded-2xl">
                       <div className="text-[10px] text-gray-500 uppercase font-bold mb-1">DNA Match</div>
                       <div className="text-2xl font-mono text-powerred">87%</div>
                   </div>
               </div>

               <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 bg-[#111] border border-white/5 rounded-2xl p-6 relative overflow-hidden h-72">
                     <div className="flex justify-between items-center mb-4">
                        <h3 className="text-white font-bold text-xs uppercase tracking-widest">Atribución de Ventas</h3>
                     </div>
                     <div className="h-full w-full pb-6">
                        <ResponsiveContainer width="100%" height="100%">
                           <AreaChart data={PULSE_DATA}>
                              <defs>
                                 <linearGradient id="colorDigital" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#E60026" stopOpacity={0.3}/>
                                    <stop offset="95%" stopColor="#E60026" stopOpacity={0}/>
                                 </linearGradient>
                              </defs>
                              <Tooltip contentStyle={{ backgroundColor: '#111', border: '1px solid #333' }} />
                              <Area type="monotone" dataKey="digital" stroke="#E60026" strokeWidth={2} fill="url(#colorDigital)" />
                              <Area type="monotone" dataKey="manual" stroke="#444" strokeWidth={2} strokeDasharray="4 4" fill="transparent" />
                           </AreaChart>
                        </ResponsiveContainer>
                     </div>
                  </div>

                  <div className="bg-[#111] border border-white/5 rounded-2xl p-6 h-72">
                     <h3 className="text-white font-bold text-xs uppercase tracking-widest mb-4">DNA Heatmap</h3>
                     <div className="h-48 w-full relative">
                        <ResponsiveContainer width="100%" height="100%">
                           <RadarChart cx="50%" cy="50%" outerRadius="70%" data={DNA_DATA}>
                              <PolarGrid stroke="#333" />
                              <PolarAngleAxis dataKey="subject" tick={{ fill: '#888', fontSize: 9 }} />
                              <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                              <Radar name="DNA" dataKey="A" stroke="#E60026" strokeWidth={2} fill="#E60026" fillOpacity={0.3} />
                           </RadarChart>
                        </ResponsiveContainer>
                     </div>
                  </div>
               </div>
               
               {/* Platos más buscados Widget */}
               <div className="bg-[#111] border border-white/5 rounded-2xl p-6">
                  <h3 className="text-white font-bold text-xs uppercase tracking-widest mb-6 flex items-center gap-2">
                     <Flame size={16} className="text-powerred"/> Platos Más Buscados (Top Interest)
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     {INITIAL_MENU.map((item, idx) => (
                        <div key={item.id} className="flex items-center justify-between p-3 bg-black/50 rounded-xl border border-white/5 hover:border-white/20 transition-colors">
                           <div className="flex items-center gap-4">
                              <span className="text-xl font-serif font-bold text-gray-600 w-4">{idx + 1}</span>
                              <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover" />
                              <div>
                                 <div className="font-bold text-white text-sm">{item.name}</div>
                                 <div className="text-xs text-gray-500">{item.views} vistas</div>
                              </div>
                           </div>
                           <div className="text-right">
                              <div className="text-powerred font-mono font-bold">{item.popularity}%</div>
                              <div className="text-[10px] text-gray-500 uppercase">Conversión</div>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            </>
         )}
      </div>
   );
};

// 3. BOOSTS (MARKETING) - LUXURY RESTORATION
const MarketingView = ({ walletBalance, openWallet }: { walletBalance: number, openWallet: () => void }) => {
   const [boosts, setBoosts] = useState(INITIAL_BOOSTS);

   const toggleBoost = (id: string) => {
      setBoosts(prev => prev.map(b => b.id === id ? { ...b, active: !b.active } : b));
   };

   return (
      <div className="p-4 md:p-6 lg:p-8 pb-32 space-y-12 animate-in fade-in duration-300">
         
         {/* Top Section: Wallet & History */}
         <div className="flex flex-col xl:flex-row gap-8 items-start border-b border-white/5 pb-12">
            
            {/* Wallet Pro Card */}
            <div className="w-full xl:w-auto space-y-6">
               <div className="flex justify-between items-end">
                  <h2 className="text-2xl font-serif text-white">Marketing Wallet</h2>
                  <Button onClick={openWallet} className="text-xs !py-2 h-10 shadow-lg shadow-powerred/20">
                     <Plus size={16} /> Cargar Saldo
                  </Button>
               </div>
               
               <div className="w-full md:w-96 h-56 bg-gradient-to-br from-[#1a1a1a] to-black border border-white/10 rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden group shadow-2xl">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-powerred/10 blur-[80px] group-hover:bg-powerred/20 transition-colors"></div>
                  <div className="flex justify-between items-start relative z-10">
                     <span className="font-serif font-bold text-white text-xl italic">LaCarta <span className="text-powerred">Black</span></span>
                     <Wifi size={20} className="text-gray-500 rotate-90" />
                  </div>
                  <div className="relative z-10">
                     <div className="text-xs text-gray-500 uppercase tracking-widest mb-1">Saldo Disponible</div>
                     <div className="text-4xl font-mono text-white tracking-tighter">${walletBalance.toFixed(2)}</div>
                  </div>
                  <div className="flex justify-between items-end relative z-10">
                     <div className="text-xs font-mono text-gray-400">**** **** **** 8821</div>
                     <div className="w-8 h-5 bg-white/10 rounded flex"></div>
                  </div>
               </div>
            </div>

            {/* Transaction History */}
            <div className="flex-1 w-full bg-[#111] p-6 rounded-3xl border border-white/5 self-stretch">
               <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6">Últimos Movimientos</h3>
               <div className="space-y-4">
                  <div className="flex justify-between items-center text-sm group cursor-pointer hover:bg-white/5 p-2 rounded-xl transition-colors">
                     <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-green-900/20 text-green-500 flex items-center justify-center border border-green-500/20"><ArrowRight size={16} className="-rotate-45"/></div>
                        <div>
                           <div className="text-white font-medium">Recarga de Fondos</div>
                           <div className="text-xs text-gray-500">Tarjeta **** 4242</div>
                        </div>
                     </div>
                     <span className="font-mono text-green-500 font-bold">+$200.00</span>
                  </div>
                  <div className="flex justify-between items-center text-sm group cursor-pointer hover:bg-white/5 p-2 rounded-xl transition-colors">
                     <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-red-900/20 text-powerred flex items-center justify-center border border-powerred/20"><TrendingUp size={16}/></div>
                        <div>
                           <div className="text-white font-medium">Hyper Visibility</div>
                           <div className="text-xs text-gray-500">Campaña de fin de semana</div>
                        </div>
                     </div>
                     <span className="font-mono text-white">-$15.00</span>
                  </div>
                  <div className="flex justify-between items-center text-sm group cursor-pointer hover:bg-white/5 p-2 rounded-xl transition-colors opacity-50">
                     <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-gray-800 text-gray-500 flex items-center justify-center border border-gray-700"><Receipt size={16}/></div>
                        <div>
                           <div className="text-white font-medium">Factura Mensual</div>
                           <div className="text-xs text-gray-500">Servicio Base (Gratis)</div>
                        </div>
                     </div>
                     <span className="font-mono text-gray-400">$0.00</span>
                  </div>
               </div>
               <button className="w-full mt-6 py-3 text-xs text-center border border-white/10 rounded-xl hover:bg-white/5 text-gray-400 hover:text-white transition-colors">
                  Ver Extracto Completo
               </button>
            </div>
         </div>

         {/* Boost Marketplace */}
         <div>
            <h2 className="text-2xl font-serif text-white mb-6">Boost Marketplace</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
               {boosts.map(boost => (
                  <div key={boost.id} className={`p-6 rounded-[2rem] border flex flex-col justify-between min-h-[320px] transition-all relative overflow-hidden group ${boost.active ? 'bg-[#111] border-powerred shadow-[0_0_30px_rgba(230,0,38,0.15)]' : 'bg-[#111] border-white/5 hover:border-white/20'}`}>
                     <div>
                        <div className="flex justify-between items-start mb-6">
                           <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border border-white/5 ${boost.active ? 'bg-powerred text-white shadow-lg shadow-powerred/30' : 'bg-white/5 text-gray-400'}`}>
                              {boost.type === 'VISIBILITY' && <Rocket size={24} />}
                              {boost.type === 'DISH' && <Target size={24} />}
                              {boost.type === 'PROMO' && <Zap size={24} />}
                              {boost.type === 'RETARGETING' && <Magnet size={24} />}
                           </div>
                           <div onClick={() => toggleBoost(boost.id)} className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors ${boost.active ? 'bg-green-500' : 'bg-gray-800'}`}>
                              <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${boost.active ? 'translate-x-6' : 'translate-x-0'}`}></div>
                           </div>
                        </div>
                        <h4 className="font-bold text-white text-lg mb-2">{boost.title}</h4>
                        <p className="text-xs text-gray-500 leading-relaxed mb-6">{boost.description}</p>
                        <div className="flex items-center gap-2 mb-6">
                           <span className="text-xs font-mono text-gray-300 font-bold bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">${boost.cost.toFixed(2)} / día</span>
                        </div>
                     </div>

                     <div className="space-y-3 bg-black/20 -mx-6 -mb-6 p-6 border-t border-white/5">
                        {boost.active && boost.timeLeft && (
                           <div className="text-[10px] text-powerred font-bold uppercase tracking-widest mb-1 flex items-center gap-1 animate-pulse">
                              <Clock size={10} /> Expira: {boost.timeLeft}
                           </div>
                        )}
                        <div className="flex justify-between text-[10px] uppercase font-bold text-gray-500">
                           <span>Impacto (CTR)</span>
                           <span className={boost.active ? "text-white" : ""}>{boost.active ? `${boost.impact}%` : '0%'}</span>
                        </div>
                        <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                           <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: boost.active ? `${boost.impact}%` : '0%' }}
                              className="h-full bg-gradient-to-r from-powerred to-orange-500 shadow-[0_0_10px_rgba(230,0,38,0.5)]"
                           />
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </div>
   );
};

// 4. MENU EDITOR (PLATO EDITOR PRO)
const MenuEditorView = ({ currentPlan }: { currentPlan: PlanLevel }) => {
   const [menu, setMenu] = useState(INITIAL_MENU);
   const [editingDish, setEditingDish] = useState<MenuItem | null>(null);

   const levels = ['FREE', 'ESENCIAL', 'PRO', 'ULTRA'];
   const isProOrUltra = levels.indexOf(currentPlan) >= levels.indexOf('PRO');

   const DishRow: React.FC<{ item: MenuItem }> = ({ item }) => (
      <div className="group flex items-center gap-4 p-3 bg-[#111] border border-white/5 rounded-xl hover:border-white/20 transition-all">
          <div className="w-12 h-12 rounded-lg bg-gray-800 overflow-hidden flex-shrink-0">
             <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 min-w-0">
             <div className="flex items-center gap-3 mb-1">
                <h4 className="font-bold text-white text-sm truncate">{item.name}</h4>
                <span className="font-mono text-powerred text-xs font-bold">${item.price}</span>
             </div>
             <p className="text-[10px] text-gray-500 truncate">{item.description}</p>
          </div>
          {/* DNA Badges Compact */}
          <div className="hidden md:flex gap-1">
             {item.allergens.slice(0,3).map(a => (
                <span key={a} className="w-5 h-5 rounded-full bg-red-900/20 border border-red-900/50 text-red-500 text-[8px] flex items-center justify-center uppercase">{a[0]}</span>
             ))}
             {item.tags.slice(0,2).map(t => (
                <span key={t} className="w-5 h-5 rounded-full bg-green-900/20 border border-green-900/50 text-green-500 text-[8px] flex items-center justify-center uppercase">{t[0]}</span>
             ))}
          </div>
          
          <div className="flex items-center gap-3 border-l border-white/5 pl-4">
             {isProOrUltra ? (
                <div className="flex flex-col items-center cursor-pointer">
                   <div className={`w-8 h-4 rounded-full p-0.5 transition-colors ${item.stockStatus === 'AVAILABLE' ? 'bg-green-500' : 'bg-gray-700'}`}>
                      <div className={`w-3 h-3 rounded-full bg-white shadow-sm transition-transform ${item.stockStatus === 'AVAILABLE' ? 'translate-x-4' : 'translate-x-0'}`}></div>
                   </div>
                   <span className="text-[8px] text-gray-500 font-bold mt-1">{item.stockStatus === 'AVAILABLE' ? 'STOCK' : 'OUT'}</span>
                </div>
             ) : (
                <div className="flex flex-col items-center opacity-50 cursor-not-allowed" title="Gestión de stock requiere plan PRO">
                   <Lock size={14} className="text-powerred mb-1"/>
                   <span className="text-[8px] text-gray-500 font-bold">STOCK</span>
                </div>
             )}
             <button onClick={() => setEditingDish(item)} className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white">
                <Edit3 size={16} />
             </button>
          </div>
      </div>
   );

   return (
      <div className="p-4 md:p-6 lg:p-8 h-full flex flex-col animate-in fade-in duration-300">
         <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-serif text-white">Inventario Inteligente</h2>
            <Button onClick={() => setEditingDish({} as MenuItem)} className="text-xs !py-2 !px-4">
               <Plus size={16} /> Nuevo Plato
            </Button>
         </div>

         <div className="space-y-2 overflow-y-auto pb-32">
            {menu.map(item => <DishRow key={item.id} item={item} />)}
         </div>

         {/* Slide Over Editor */}
         <AnimatePresence>
            {editingDish && (
               <>
                  <motion.div 
                     initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                     onClick={() => setEditingDish(null)}
                     className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
                  />
                  <motion.div 
                     initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
                     transition={{ type: "spring", damping: 30 }}
                     className="fixed inset-y-0 right-0 w-full md:w-[400px] bg-[#111] border-l border-white/10 z-50 shadow-2xl flex flex-col"
                  >
                     <div className="p-6 border-b border-white/5 flex justify-between items-center bg-[#111]">
                        <h3 className="font-serif text-xl text-white">{editingDish.id ? 'Editar Plato' : 'Nuevo Plato'}</h3>
                        <button onClick={() => setEditingDish(null)}><X className="text-gray-500 hover:text-white"/></button>
                     </div>
                     
                     <div className="flex-1 overflow-y-auto p-6 space-y-6">
                        <div className="space-y-4">
                           <div className="space-y-1">
                              <label className="text-[10px] font-bold text-gray-500 uppercase">Nombre del Plato</label>
                              <input type="text" defaultValue={editingDish.name} className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-sm text-white focus:border-powerred outline-none" />
                           </div>
                           <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-1">
                                 <label className="text-[10px] font-bold text-gray-500 uppercase">Precio</label>
                                 <input type="number" defaultValue={editingDish.price} className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-sm text-white focus:border-powerred outline-none" />
                              </div>
                              <div className="space-y-1">
                                 <label className="text-[10px] font-bold text-gray-500 uppercase">Categoría</label>
                                 <select className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-sm text-white outline-none">
                                    {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                                 </select>
                              </div>
                           </div>
                           <div className="space-y-1">
                              <label className="text-[10px] font-bold text-gray-500 uppercase">Descripción Corta</label>
                              <textarea defaultValue={editingDish.description} rows={3} className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-sm text-white focus:border-powerred outline-none"></textarea>
                           </div>
                        </div>

                        <div className="space-y-3">
                           <label className="text-[10px] font-bold text-gray-500 uppercase flex items-center gap-2">
                              <ShieldAlert size={12}/> DNA Matcher (Alergias & Dietas)
                           </label>
                           <div className="grid grid-cols-2 gap-2">
                              {[...ALLERGEN_OPTIONS, ...PREFERENCE_OPTIONS].map(opt => (
                                 <div key={opt.id} className="flex items-center gap-2 p-2 rounded-lg border border-white/5 bg-white/5 hover:bg-white/10 cursor-pointer">
                                    <div className="w-4 h-4 rounded border border-gray-600 flex items-center justify-center">
                                       {/* Checkbox mock */}
                                    </div>
                                    <span className="text-xs text-gray-300">{opt.label}</span>
                                 </div>
                              ))}
                           </div>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                           <span className="text-xs font-bold text-white">Estado del Plato</span>
                           <div className="flex items-center gap-2">
                              <span className="text-[10px] text-gray-500">AGOTADO</span>
                              <div className={`w-10 h-6 rounded-full p-1 cursor-pointer transition-colors bg-green-500`}>
                                 <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform translate-x-4`}></div>
                              </div>
                              <span className="text-[10px] text-white font-bold">DISPONIBLE</span>
                           </div>
                        </div>
                     </div>

                     <div className="p-6 border-t border-white/5 bg-[#111]">
                        <Button className="w-full shadow-lg shadow-powerred/20">Guardar Cambios</Button>
                     </div>
                  </motion.div>
               </>
            )}
         </AnimatePresence>
      </div>
   );
};

// 5. CONFIG HUB (PROFILE, LOCATION, HOURS, QRS)
const ConfigView = () => {
   const [activeTab, setActiveTab] = useState<'PROFILE' | 'LOCATION' | 'HOURS' | 'QR'>('PROFILE');
   const [tableCount, setTableCount] = useState(12);

   const Tabs = () => (
      <div className="flex gap-2 mb-8 border-b border-white/5 pb-1 overflow-x-auto no-scrollbar">
         {['PROFILE', 'LOCATION', 'HOURS', 'QR'].map(tab => (
            <button
               key={tab}
               onClick={() => setActiveTab(tab as any)}
               className={`px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all border-b-2 whitespace-nowrap ${activeTab === tab ? 'text-powerred border-powerred' : 'text-gray-500 border-transparent hover:text-white'}`}
            >
               {tab === 'QR' ? 'QR Studio' : tab}
            </button>
         ))}
      </div>
   );

   return (
      <div className="p-4 md:p-6 lg:p-8 h-full flex flex-col animate-in fade-in duration-300">
         <h2 className="text-2xl font-serif text-white mb-6">Configuración del Local</h2>
         <Tabs />

         <div className="flex-1 overflow-y-auto max-w-3xl pb-32">
            {activeTab === 'PROFILE' && (
               <div className="space-y-6">
                  <div className="space-y-2">
                     <label className="text-xs font-bold text-gray-500 uppercase">Foto de Portada</label>
                     <div className="h-40 w-full bg-gray-800 rounded-xl relative flex items-center justify-center border border-white/10 hover:border-white/30 cursor-pointer transition-all group">
                        <Upload className="text-gray-500 group-hover:text-white" />
                     </div>
                  </div>
                  <div className="flex flex-col md:flex-row gap-6">
                     <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase">Logo</label>
                        <div className="w-24 h-24 rounded-full bg-gray-800 border border-white/10 hover:border-white/30 cursor-pointer flex items-center justify-center">
                           <User className="text-gray-500"/>
                        </div>
                     </div>
                     <div className="flex-1 space-y-4">
                        <div className="space-y-1">
                           <label className="text-xs font-bold text-gray-500 uppercase">Nombre del Local</label>
                           <input type="text" defaultValue="La Mar Cebichería" className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-sm text-white focus:border-powerred outline-none" />
                        </div>
                        <div className="space-y-1">
                           <label className="text-xs font-bold text-gray-500 uppercase">Bio / Descripción</label>
                           <textarea rows={2} className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-sm text-white focus:border-powerred outline-none"></textarea>
                        </div>
                     </div>
                  </div>
               </div>
            )}

            {activeTab === 'LOCATION' && (
               <div className="space-y-6">
                  <div className="bg-[#111] p-4 rounded-xl border border-white/5 flex items-center gap-4">
                     <MapPin className="text-powerred" />
                     <div className="flex-1">
                        <div className="text-white text-sm font-bold">Av. La Mar 770, Miraflores</div>
                        <div className="text-gray-500 text-xs">Lima, Perú</div>
                     </div>
                     <Button variant="secondary" className="text-xs !py-2 !px-4">Editar Mapa</Button>
                  </div>
                  <div className="h-64 w-full bg-gray-800 rounded-xl opacity-50 flex items-center justify-center">
                     <span className="text-xs text-gray-400">Map Integration Placeholder</span>
                  </div>
               </div>
            )}

            {activeTab === 'HOURS' && (
               <div className="space-y-3">
                  {['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom'].map(day => (
                     <div key={day} className="flex items-center justify-between p-3 bg-[#111] border border-white/5 rounded-xl">
                        <div className="flex items-center gap-4">
                           <span className="text-sm font-bold text-white w-8">{day}</span>
                           <div className="flex items-center gap-2">
                              <span className="text-xs text-gray-500 bg-black/30 px-2 py-1 rounded">12:00 PM</span>
                              <span className="text-gray-600">-</span>
                              <span className="text-xs text-gray-500 bg-black/30 px-2 py-1 rounded">11:00 PM</span>
                           </div>
                        </div>
                        <div className={`w-8 h-4 rounded-full p-0.5 cursor-pointer ${day === 'Dom' ? 'bg-gray-700' : 'bg-green-500'}`}>
                            <div className={`w-3 h-3 rounded-full bg-white shadow-sm transition-transform ${day === 'Dom' ? 'translate-x-0' : 'translate-x-4'}`}></div>
                        </div>
                     </div>
                  ))}
               </div>
            )}

            {activeTab === 'QR' && (
               <div className="space-y-8">
                  <div className="bg-[#111] p-6 rounded-2xl border border-white/5 text-center">
                     <label className="text-xs font-bold text-gray-500 uppercase mb-4 block">¿Cuántas mesas tienes?</label>
                     <div className="flex items-center justify-center gap-4">
                        <button onClick={() => setTableCount(Math.max(1, tableCount - 1))} className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center hover:bg-white/10 text-white"><Minus/></button>
                        <span className="text-4xl font-mono text-white font-bold w-20 text-center">{tableCount}</span>
                        <button onClick={() => setTableCount(tableCount + 1)} className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center hover:bg-white/10 text-white"><Plus/></button>
                     </div>
                  </div>

                  <div>
                     <h3 className="text-white text-sm font-bold mb-4">Vista Previa de QRs</h3>
                     <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {Array.from({ length: Math.min(8, tableCount) }).map((_, i) => (
                           <div key={i} className="bg-white p-4 rounded-xl flex flex-col items-center gap-2">
                              <QrCode className="text-black w-full h-full" />
                              <span className="text-black text-xs font-bold">Mesa {i + 1}</span>
                           </div>
                        ))}
                     </div>
                     <Button className="w-full mt-6">Descargar Pack Completo (SVG)</Button>
                  </div>
               </div>
            )}
         </div>
      </div>
   );
};

// --- MAIN DASHBOARD ---

const TopBar = ({ currentPlan, setPlan }: { currentPlan: PlanLevel, setPlan: (p: PlanLevel) => void }) => {
   const levels = ['FREE', 'ESENCIAL', 'PRO', 'ULTRA'];
   const isProOrUltra = levels.indexOf(currentPlan) >= levels.indexOf('PRO');

   return (
      <div className="flex flex-col border-b border-white/5 bg-[#0A0A0A] sticky top-0 z-30">
         <div className="h-20 flex items-center justify-between px-4 md:px-8">
            <div className="flex items-center gap-4 lg:hidden">
               <span className="font-serif text-xl text-white font-bold"><span className="text-powerred">L</span>c.</span>
            </div>
            <div className="hidden lg:block">
               {/* Breadcrumbs or Title */}
            </div>
            <div className="flex items-center gap-4 ml-auto">
               {/* Plan Selector for demo purposes */}
               <select 
                  value={currentPlan} 
                  onChange={(e) => setPlan(e.target.value as PlanLevel)}
                  className="bg-[#111] text-xs text-white border border-white/10 rounded-lg px-2 py-1 outline-none cursor-pointer"
               >
                  <option value="FREE">Free</option>
                  <option value="ESENCIAL">Esencial</option>
                  <option value="PRO">Pro</option>
                  <option value="ULTRA">Ultra</option>
               </select>

               <div className="px-3 py-1.5 rounded-full bg-powerred text-white text-[10px] font-bold uppercase tracking-widest shadow-[0_0_15px_rgba(230,0,38,0.4)] border border-red-400/50">
                  {currentPlan} Member
               </div>
               <div className="w-10 h-10 rounded-full bg-gray-800 border border-white/10 flex items-center justify-center overflow-hidden">
                  <User size={18} className="text-gray-400" />
               </div>
            </div>
         </div>
         {/* Mobile Quick Actions */}
         <div className="flex lg:hidden gap-3 px-4 pb-4">
            <Button className="flex-1 text-xs !py-2 bg-white text-black hover:bg-gray-200">
               <Eye size={14} className="mr-2"/> Ver Carta
            </Button>
            {isProOrUltra && (
               <Button className="flex-1 text-xs !py-2 bg-powerred text-white shadow-[0_0_15px_rgba(230,0,38,0.3)]">
                  <Zap size={14} className="mr-2"/> Stock Rápido
               </Button>
            )}
         </div>
      </div>
   );
};

const MobileNav = ({ currentView, setView, currentPlan }: { currentView: string, setView: (v: any) => void, currentPlan: PlanLevel }) => {
   const menuItems = [
      { id: 'PULSE', icon: LayoutDashboard, label: 'Pulse', requiredPlan: 'PRO' },
      { id: 'HALL', icon: Grid, label: 'Salón', requiredPlan: 'ESENCIAL' },
      { id: 'MENU', icon: Utensils, label: 'Menú', requiredPlan: 'FREE' },
      { id: 'MARKETING', icon: Rocket, label: 'Boosts', requiredPlan: 'PRO' },
   ];

   const levels = ['FREE', 'ESENCIAL', 'PRO', 'ULTRA'];
   const hasAccess = (requiredPlan: string) => {
      return levels.indexOf(currentPlan) >= levels.indexOf(requiredPlan);
   };

   return (
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-[#0A0A0A]/90 backdrop-blur-md border-t border-white/5 flex justify-around items-center p-3 z-50 pb-4">
         {menuItems.map(item => {
            const access = hasAccess(item.requiredPlan);
            return (
               <button
                  key={item.id}
                  onClick={() => access && setView(item.id)}
                  className={`flex flex-col items-center gap-1 p-2 rounded-xl relative ${!access ? 'opacity-50' : ''} ${currentView === item.id ? 'text-powerred' : 'text-gray-500'}`}
               >
                  <item.icon size={20} />
                  <span className="text-[10px] font-medium">{item.label}</span>
                  {!access && <Lock size={10} className="absolute top-1 right-1 text-powerred/50" />}
               </button>
            );
         })}
      </div>
   );
};

const RestaurantDashboard: React.FC = () => {
  const [currentView, setCurrentView] = useState('MENU');
  const [currentPlan, setCurrentPlan] = useState<PlanLevel>('FREE');
  const [walletBalance, setWalletBalance] = useState(120.00);
  
  // Wallet Modal State
  const [isWalletOpen, setIsWalletOpen] = useState(false);
  const [rechargeStep, setRechargeStep] = useState<'SELECT' | 'PROCESSING' | 'SUCCESS'>('SELECT');
  const [rechargeAmount, setRechargeAmount] = useState(0);

  const handleRecharge = (amount: number) => {
     setRechargeAmount(amount);
     setRechargeStep('PROCESSING');
     setTimeout(() => {
        setRechargeStep('SUCCESS');
        setTimeout(() => {
           setWalletBalance(prev => prev + amount);
           setTimeout(() => {
              setIsWalletOpen(false);
              setRechargeStep('SELECT');
           }, 1500);
        }, 1000);
     }, 2000);
  };

  return (
    <div className="flex h-[100dvh] bg-[#0A0A0A] text-white font-sans overflow-hidden selection:bg-powerred selection:text-white">
      <Sidebar 
         currentView={currentView} 
         setView={setCurrentView} 
         walletBalance={walletBalance}
         openWallet={() => setIsWalletOpen(true)}
         currentPlan={currentPlan}
      />
      
      <main className="flex-1 lg:ml-20 h-full overflow-hidden relative flex flex-col">
         <TopBar currentPlan={currentPlan} setPlan={setCurrentPlan} />
         
         <AnimatePresence mode="wait">
            <motion.div
               key={currentView}
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               transition={{ duration: 0.2 }}
               className="flex-1 overflow-hidden h-full"
            >
               {/* Container for scrollable content */}
               <div className="h-full overflow-y-auto w-full custom-scrollbar">
                  <div className="max-w-7xl mx-auto w-full">
                     {currentView === 'HALL' && <HallView />}
                     {currentView === 'PULSE' && <PulseView currentPlan={currentPlan} setPlan={setCurrentPlan} />}
                     {currentView === 'MARKETING' && <MarketingView walletBalance={walletBalance} openWallet={() => setIsWalletOpen(true)} />}
                     {currentView === 'MENU' && <MenuEditorView currentPlan={currentPlan} />}
                     {currentView === 'CONFIG' && <ConfigView />}
                  </div>
               </div>
            </motion.div>
         </AnimatePresence>
      </main>

      <MobileNav currentView={currentView} setView={setCurrentView} currentPlan={currentPlan} />

      {/* Wallet Modal */}
      <AnimatePresence>
         {isWalletOpen && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
               <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                  onClick={() => setIsWalletOpen(false)}
               />
               <motion.div 
                  initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
                  className="bg-[#111] border border-white/10 rounded-3xl p-8 w-full max-w-sm relative z-10 shadow-2xl"
               >
                  {rechargeStep === 'SELECT' && (
                     <>
                        <div className="flex justify-between items-center mb-6">
                           <h3 className="font-serif text-xl text-white">Recargar Wallet</h3>
                           <button onClick={() => setIsWalletOpen(false)}><X className="text-gray-500 hover:text-white"/></button>
                        </div>
                        <div className="grid grid-cols-3 gap-3 mb-6">
                           {[10, 25, 50].map(amt => (
                              <button 
                                 key={amt} 
                                 onClick={() => handleRecharge(amt)}
                                 className="py-4 rounded-xl border border-white/10 bg-white/5 hover:border-powerred hover:bg-powerred/10 transition-all font-mono font-bold text-lg text-white"
                              >
                                 ${amt}
                              </button>
                           ))}
                        </div>
                        <div className="bg-black/40 p-3 rounded-xl border border-white/5 flex items-center gap-3 mb-6">
                           <CreditCard size={16} className="text-gray-400" />
                           <div className="text-xs text-gray-400 flex-1">Visa ending in 8821</div>
                           <span className="text-xs text-powerred font-bold cursor-pointer">Cambiar</span>
                        </div>
                        <p className="text-[10px] text-gray-600 text-center">Transacción segura encriptada.</p>
                     </>
                  )}

                  {rechargeStep === 'PROCESSING' && (
                     <div className="py-10 flex flex-col items-center justify-center text-center">
                        <div className="relative w-16 h-16 mb-6">
                           <div className="absolute inset-0 border-4 border-white/10 rounded-full"></div>
                           <div className="absolute inset-0 border-4 border-powerred border-t-transparent rounded-full animate-spin"></div>
                        </div>
                        <h4 className="text-white font-bold mb-1">Procesando</h4>
                        <p className="text-xs text-gray-500">Conectando con el banco...</p>
                     </div>
                  )}

                  {rechargeStep === 'SUCCESS' && (
                     <div className="py-10 flex flex-col items-center justify-center text-center">
                        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(34,197,94,0.4)] animate-bounce">
                           <Check className="text-black w-8 h-8" strokeWidth={3} />
                        </div>
                        <h4 className="text-white font-bold text-xl mb-1">¡Recarga Exitosa!</h4>
                        <div className="text-xs text-gray-500 font-mono">
                           Nuevo Saldo: <span className="text-white font-bold">${(walletBalance + rechargeAmount).toFixed(2)}</span>
                        </div>
                     </div>
                  )}
               </motion.div>
            </div>
         )}
      </AnimatePresence>
      
      {/* Mobile Nav */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-[#0A0A0A]/95 backdrop-blur-xl border-t border-white/10 p-2 flex justify-around z-50 pb-safe">
          {['HALL', 'PULSE', 'MENU', 'MARKETING', 'CONFIG'].map(id => (
             <button key={id} onClick={() => setCurrentView(id)} className={`p-4 ${currentView === id ? 'text-powerred' : 'text-gray-500'}`}>
                {id === 'HALL' && <Grid size={20} />}
                {id === 'PULSE' && <LayoutDashboard size={20} />}
                {id === 'MENU' && <Utensils size={20} />}
                {id === 'MARKETING' && <Rocket size={20} />}
                {id === 'CONFIG' && <Settings size={20} />}
             </button>
          ))}
      </div>

    </div>
  );
};

export default RestaurantDashboard;