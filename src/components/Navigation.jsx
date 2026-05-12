import React from 'react';
import { Home, BookOpen, HelpCircle, LineChart, Bell, Settings, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Navigation({ currentView, setCurrentView }) {
  const navItems = [
    { id: 'dashboard', label: 'Home', icon: Home, color: 'text-vibrant-green', activeBg: 'bg-mint-green/50' },
    { id: 'learn', label: 'Library', icon: BookOpen, color: 'text-vibrant-pink', activeBg: 'bg-coral-pink/50' },
    { id: 'quiz', label: 'Help', icon: HelpCircle, color: 'text-slate-400', activeBg: 'bg-slate-100' },
    { id: 'progress', label: 'Chart', icon: LineChart, color: 'text-slate-400', activeBg: 'bg-slate-100' },
  ];

  return (
    <nav className="fixed inset-y-0 left-0 w-64 bg-white border-r border-slate-100 shadow-[10px_0_20px_rgba(0,0,0,0.02)] flex flex-col py-8 px-6 z-50 hidden md:flex">
      {/* Header Profile */}
      <div className="flex items-center justify-between mb-12">
        <div className="flex items-center gap-3">
          <img 
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100" 
            alt="Avatar" 
            className="w-10 h-10 rounded-full object-cover border-2 border-slate-100 shadow-sm"
          />
          <span className="font-bold text-slate-800 text-lg">Khanhdev</span>
        </div>
        <button className="text-slate-400 hover:text-slate-600 transition-colors">
          <Bell size={20} />
        </button>
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
        <div className="flex items-center gap-3 mb-6">
          <img 
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100" 
            alt="Avatar" 
            className="w-8 h-8 rounded-full object-cover"
          />
          <div>
            <h4 className="font-bold text-slate-800 text-sm">My Profile</h4>
          </div>
        </div>
        <div className="space-y-3 mb-8 px-2">
          <div className="flex justify-between text-sm">
            <span className="text-slate-500">Streak:</span>
            <span className="font-bold text-slate-700">7 Days</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-500">Words Learned:</span>
            <span className="font-bold text-slate-700">120</span>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-col gap-2">
          <button className="flex items-center gap-4 px-4 py-3 rounded-2xl text-slate-500 font-semibold hover:bg-slate-50 transition-colors">
            <Settings size={20} />
            <span>Settings</span>
          </button>
          <button className="flex items-center gap-4 px-4 py-3 rounded-2xl text-slate-500 font-semibold hover:bg-slate-50 transition-colors">
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
