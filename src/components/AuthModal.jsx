import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Calendar, Users, Sparkles } from 'lucide-react';

export default function AuthModal({ isOpen, onClose, onLogin, hideClose }) {
  const [formData, setFormData] = useState({ name: '', age: '', gender: '' });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.age || !formData.gender) {
      alert("Please fill in all fields");
      return;
    }

    const userData = {
      name: formData.name,
      age: formData.age,
      gender: formData.gender,
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
              Welcome!
            </h2>
            <p className="text-slate-500 font-medium mb-8">
              Tell us about yourself to get started.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                  <User size={20} />
                </div>
                <input 
                  type="text" 
                  placeholder="Your Name" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-100 text-slate-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-vibrant-blue/20 focus:border-vibrant-blue transition-all font-medium"
                />
              </div>

              {/* Age */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                  <Calendar size={20} />
                </div>
                <input 
                  type="number" 
                  placeholder="Your Age" 
                  min="1"
                  max="120"
                  value={formData.age}
                  onChange={(e) => setFormData({...formData, age: e.target.value})}
                  className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-100 text-slate-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-vibrant-blue/20 focus:border-vibrant-blue transition-all font-medium"
                />
              </div>

              {/* Gender - Select only */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                  <Users size={20} />
                </div>
                <select
                  value={formData.gender}
                  onChange={(e) => setFormData({...formData, gender: e.target.value})}
                  className={`w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-vibrant-blue/20 focus:border-vibrant-blue transition-all font-medium appearance-none cursor-pointer ${formData.gender ? 'text-slate-800' : 'text-slate-400'}`}
                >
                  <option value="" disabled>Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-slate-400">
                  <svg width="12" height="8" viewBox="0 0 12 8" fill="none"><path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
              </div>

              <button 
                type="submit"
                className="w-full bg-slate-800 text-white font-bold py-4 rounded-2xl shadow-hover hover:bg-slate-700 transition-colors mt-2"
              >
                Get Started
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
