import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User, Sparkles } from 'lucide-react';

export default function AuthModal({ isOpen, onClose, onLogin, hideClose }) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password || (!isLogin && !formData.name)) {
      alert("Please fill in all fields");
      return;
    }

    // Mock Login / Register
    const userName = isLogin ? formData.email.split('@')[0] : formData.name;
    const userData = {
      name: userName || 'Learner',
      email: formData.email,
      avatar: `https://api.dicebear.com/7.x/notionists/svg?seed=${formData.email}`
    };

    onLogin(userData);
    if (!hideClose) onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={!hideClose ? onClose : undefined}
          className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-white w-full max-w-md rounded-[2.5rem] p-8 relative z-10 shadow-2xl overflow-hidden"
        >
          {/* Decorative shapes */}
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-soft-blue rounded-full blur-3xl opacity-50"></div>
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-mint-green rounded-full blur-3xl opacity-50"></div>

          {!hideClose && (
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-full transition-colors z-20"
            >
              <X size={20} />
            </button>
          )}

          <div className="relative z-10">
            <div className="w-14 h-14 bg-mint-green/10 text-vibrant-green rounded-2xl flex items-center justify-center mb-6">
              <Sparkles size={28} />
            </div>
            
            <h2 className="text-3xl font-extrabold text-slate-800 mb-2">
              {isLogin ? 'Welcome Back!' : 'Create Account'}
            </h2>
            <p className="text-slate-500 font-medium mb-8">
              {isLogin ? 'Sign in to track your learning progress.' : 'Join us and start your English journey today!'}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                    <User size={20} />
                  </div>
                  <input 
                    type="text" 
                    placeholder="Full Name" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-100 text-slate-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-vibrant-blue/20 focus:border-vibrant-blue transition-all font-medium"
                  />
                </div>
              )}

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                  <Mail size={20} />
                </div>
                <input 
                  type="email" 
                  placeholder="Email Address" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-100 text-slate-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-vibrant-blue/20 focus:border-vibrant-blue transition-all font-medium"
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                  <Lock size={20} />
                </div>
                <input 
                  type="password" 
                  placeholder="Password" 
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-100 text-slate-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-vibrant-blue/20 focus:border-vibrant-blue transition-all font-medium"
                />
              </div>

              <button 
                type="submit"
                className="w-full bg-slate-800 text-white font-bold py-4 rounded-2xl shadow-hover hover:bg-slate-700 transition-colors mt-2"
              >
                {isLogin ? 'Sign In' : 'Create Account'}
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-slate-500 font-medium">
                {isLogin ? "Don't have an account?" : "Already have an account?"}
                <button 
                  onClick={() => setIsLogin(!isLogin)}
                  className="ml-2 text-vibrant-blue font-bold hover:underline"
                >
                  {isLogin ? 'Sign up' : 'Log in'}
                </button>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
