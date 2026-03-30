import React, { useState } from 'react';
import Landing from './views/Landing';
import RestaurantDashboard from './views/RestaurantDashboard';
import DinerMenu from './views/DinerMenu';
import Register from './views/Register';
import Login from './views/Login';
import ForgotPassword from './views/ForgotPassword';
import { UserViewMode } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<UserViewMode>('LANDING');

  // Helper for demo navigation purposes
  const DemoNavigator = () => (
    <div className="fixed top-4 right-4 z-50 flex gap-2 opacity-20 hover:opacity-100 transition-opacity">
      <button 
        onClick={() => setCurrentView('LANDING')}
        className="bg-black text-white text-xs px-2 py-1 rounded"
      >
        Landing
      </button>
      <button 
        onClick={() => setCurrentView('REGISTER')}
        className="bg-black text-white text-xs px-2 py-1 rounded"
      >
        Register
      </button>
      <button 
        onClick={() => setCurrentView('LOGIN')}
        className="bg-black text-white text-xs px-2 py-1 rounded"
      >
        Login
      </button>
      <button 
        onClick={() => setCurrentView('FORGOT_PASSWORD')}
        className="bg-black text-white text-xs px-2 py-1 rounded"
      >
        Forgot
      </button>
      <button 
        onClick={() => setCurrentView('RESTAURANT_DASHBOARD')}
        className="bg-black text-white text-xs px-2 py-1 rounded"
      >
        Dashboard
      </button>
      <button 
        onClick={() => setCurrentView('DINER_MENU')}
        className="bg-black text-white text-xs px-2 py-1 rounded"
      >
        Diner
      </button>
    </div>
  );

  return (
    <>
      <DemoNavigator />
      {currentView === 'LANDING' && (
        <Landing onEnterApp={() => setCurrentView('REGISTER')} />
      )}
      {currentView === 'REGISTER' && (
        <Register 
          onRegisterSuccess={() => setCurrentView('RESTAURANT_DASHBOARD')}
          onNavigateToLogin={() => setCurrentView('LOGIN')} 
        />
      )}
      {currentView === 'LOGIN' && (
        <Login 
          onLoginSuccess={() => setCurrentView('RESTAURANT_DASHBOARD')} 
          onNavigateToRegister={() => setCurrentView('REGISTER')}
          onNavigateToForgotPassword={() => setCurrentView('FORGOT_PASSWORD')}
        />
      )}
      {currentView === 'FORGOT_PASSWORD' && (
        <ForgotPassword 
          onNavigateToLogin={() => setCurrentView('LOGIN')}
        />
      )}
      {currentView === 'RESTAURANT_DASHBOARD' && (
        <RestaurantDashboard />
      )}
      {currentView === 'DINER_MENU' && (
        <DinerMenu />
      )}
    </>
  );
};

export default App;