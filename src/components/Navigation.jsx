import React, { useState } from 'react';
import { Home, BookOpen, ListChecks, LineChart, Bell, LogOut, LogIn } from 'lucide-react';
import { motion } from 'framer-motion';
import AuthModal from './AuthModal';

export default function Navigation({ currentView, setCurrentView, user, onLogin, onLogout, wordsLearned }) {
  const [showAuthModal, setShowAuthModal] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Home', icon: Home, color: 'text-vibrant-green', activeBg: 'bg-mint-green/50' },
    { id: 'learn', label: 'Flash Card', icon: BookOpen, color: 'text-vibrant-pink', activeBg: 'bg-coral-pink/50' },
    { id: 'quiz', label: 'Multiple Choice', icon: ListChecks, color: 'text-vibrant-blue', activeBg: 'bg-soft-blue/50' },
    { id: 'progress', label: 'Chart', icon: LineChart, color: 'text-slate-400', activeBg: 'bg-slate-100' },
  ];

  return (
    <>
      <nav className="fixed inset-y-0 left-0 w-64 bg-white border-r border-slate-100 shadow-[10px_0_20px_rgba(0,0,0,0.02)] flex flex-col py-8 px-6 z-50 hidden md:flex">
        {/* Header Profile */}
        <div className="flex items-center justify-between mb-12">
          {user ? (
            <div className="flex items-center gap-3">
              <img 
                src={user.avatar} 
                alt="Avatar" 
                className="w-10 h-10 rounded-full object-cover border-2 border-slate-100 shadow-sm bg-slate-50"
              />
              <span className="font-bold text-slate-800 text-lg truncate max-w-[100px]">{user.name}</span>
            </div>
          ) : (
            <button 
              onClick={() => setShowAuthModal(true)}
              className="flex items-center gap-2 bg-vibrant-blue text-white px-4 py-2 rounded-full font-bold text-sm shadow-sm hover:shadow-md transition-all w-full justify-center"
            >
              <LogIn size={16} />
              Get Started
            </button>
          )}
          {user && (
            <button className="text-slate-400 hover:text-slate-600 transition-colors">
              <Bell size={20} />
            </button>
          )}
        </div>
        
        {/* Menu Items */}
        <div className="flex flex-col gap-2 flex-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id)}
                className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 relative ${
                  isActive ? item.color + ' font-bold' : 'text-slate-500 font-semibold hover:bg-slate-50'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="sidebarActive"
                    className={`absolute inset-0 rounded-2xl -z-10 ${item.activeBg}`}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <Icon size={22} strokeWidth={isActive ? 2.5 : 2} className={isActive ? '' : 'opacity-70'} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Profile Stats */}
        <div className="mt-auto pt-8 border-t border-slate-100">
          {user ? (
            <>
              <div className="flex items-center gap-3 mb-6">
                <img 
                  src={user.avatar} 
                  alt="Avatar" 
                  className="w-8 h-8 rounded-full object-cover bg-slate-50"
                />
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">My Profile</h4>
                </div>
              </div>
              <div className="space-y-3 mb-8 px-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Words Learned:</span>
                  <span className="font-bold text-slate-700">{wordsLearned}</span>
                </div>
              </div>
            </>
          ) : (
             <div className="mb-6 px-2 text-center text-slate-400 text-xs font-medium">
                Enter your info to start your English learning journey!
             </div>
          )}

          {/* Footer Actions */}
          <div className="flex flex-col gap-2">
            {user && (
              <button 
                onClick={onLogout}
                className="flex items-center gap-4 px-4 py-3 rounded-2xl text-rose-500 font-semibold hover:bg-rose-50 transition-colors"
              >
              <LogOut size={20} />
              <span>Logout</span>
              </button>
            )}
          </div>
        </div>
      </nav>
      
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
        onLogin={(userData) => {
          onLogin(userData);
          setShowAuthModal(false);
        }} 
      />
    </>
  );
}
