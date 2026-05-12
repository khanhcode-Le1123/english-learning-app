import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Play, ChevronLeft, ChevronRight, List } from 'lucide-react';
import TopicSelector from './TopicSelector';
import { wordData } from '../data/WordData';

const DailyActivity = () => {
  const [dailyWords] = useState(() => [...wordData].sort(() => Math.random() - 0.5).slice(0, 3));
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleNext = () => {
    if (currentIndex < dailyWords.length - 1) {
      setCurrentIndex(c => c + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(c => c - 1);
    }
  };
  
  if (isCompleted) {
    return (
      <div className="mb-8">
        <h3 className="font-bold text-slate-800 text-lg mb-4">Daily Activity</h3>
        <div className="h-64 bg-mint-green/10 rounded-3xl border border-mint-green/20 flex flex-col items-center justify-center p-6 text-center shadow-sm">
          <div className="w-16 h-16 bg-mint-green text-white rounded-full flex items-center justify-center mb-4 shadow-md">
            <Sparkles size={32} />
          </div>
          <h4 className="font-bold text-slate-800 text-xl mb-2">Great Job!</h4>
          <p className="text-slate-600 font-medium text-sm">You have successfully completed your daily activity.</p>
        </div>
      </div>
    );
  }

  const currentWord = dailyWords[currentIndex];

  return (
    <div className="mb-8">
      <h3 className="font-bold text-slate-800 text-lg mb-4">Daily Activity</h3>
      <div className="relative h-64 flex items-center justify-center">
        {/* Decorative pagination dots */}
        <div className="absolute top-0 flex gap-1.5 z-20">
           {dailyWords.map((_, idx) => (
              <div key={idx} className={`h-1.5 rounded-full transition-all duration-300 ${currentIndex === idx ? 'w-4 bg-mint-green' : 'w-1.5 bg-slate-200'}`}></div>
           ))}
        </div>
        
        {/* Back card (Shows meaning) */}
        <div className="absolute w-[200px] h-[220px] bg-mint-green rounded-3xl shadow-sm rotate-[12deg] translate-x-8 translate-y-4 flex items-center justify-center p-4 text-center">
          <span className="font-bold text-slate-800 text-xl rotate-[-12deg]">{currentWord.meaning}</span>
        </div>
        
        {/* Front card */}
        <div className="absolute w-[200px] h-[220px] bg-white rounded-3xl shadow-hover z-10 flex flex-col items-center justify-center p-6 border border-slate-50 transition-all">
          <h4 className="text-3xl font-extrabold text-slate-800 mb-4">{currentWord.word}</h4>
          <div className="flex gap-2">
            <span className="px-2 py-1 bg-mint-green/20 text-vibrant-green text-xs font-bold rounded-md">{currentWord.type}</span>
          </div>
        </div>

        {/* Arrows */}
        <button 
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="absolute left-0 p-2 text-slate-400 hover:text-slate-600 bg-white rounded-full shadow-sm z-20 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronLeft size={20} />
        </button>
        <button 
          onClick={handleNext}
          className="absolute right-0 p-2 text-slate-400 hover:text-slate-600 bg-white rounded-full shadow-sm z-20"
        >
          <ChevronRight size={20} />
        </button>

        {/* Decorative pagination dots bottom */}
        <div className="absolute bottom-0 flex gap-1.5 z-20">
           {dailyWords.map((_, idx) => (
              <div key={idx} className={`h-1.5 rounded-full transition-all duration-300 ${currentIndex === idx ? 'w-4 bg-mint-green' : 'w-1.5 bg-slate-200'}`}></div>
           ))}
        </div>
      </div>
    </div>
  );
};

const WeeklyProgress = () => {
  const data = [65, 35, 60, 50, 70, 45, 75];
  const days = ['Sun', 'Mo', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-50 mb-8">
      <h3 className="font-bold text-slate-800 text-lg mb-6">Weekly Progress</h3>
      <div className="relative h-40 flex items-end justify-between gap-2">
        {/* Y Axis labels */}
        <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-slate-400 pb-6">
          <span>80</span>
          <span>60</span>
          <span>40</span>
          <span>20</span>
          <span>0</span>
        </div>
        
        {/* Bars */}
        <div className="w-full flex justify-between items-end h-full pl-6 pb-6">
          {data.map((val, idx) => (
            <div key={idx} className="w-[10%] bg-mint-green rounded-t-md" style={{ height: `${val}%` }}></div>
          ))}
        </div>
        
        {/* X Axis labels */}
        <div className="absolute bottom-0 left-6 right-0 flex justify-between text-xs text-slate-400 font-medium">
          {days.map((day, idx) => (
             <span key={idx} className="w-[10%] text-center">{day}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

const QuizCorner = () => {
  return (
    <div>
      <h3 className="font-bold text-slate-800 text-lg mb-4">Quiz Corner</h3>
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-50 flex items-start gap-4">
        <div className="w-12 h-12 bg-soft-blue text-vibrant-blue rounded-2xl flex items-center justify-center shrink-0">
          <List size={24} />
        </div>
        <div>
          <h4 className="font-bold text-slate-800 text-sm mb-2">Q. | Multiple choice question for english words?</h4>
          <div className="flex gap-4 mt-3">
             <label className="flex items-center gap-2 text-xs font-medium text-slate-500 cursor-pointer">
                <div className="w-4 h-4 rounded bg-mint-green/20 border border-mint-green/50"></div> [n]
             </label>
             <label className="flex items-center gap-2 text-xs font-medium text-slate-500 cursor-pointer">
                <div className="w-4 h-4 rounded bg-coral-pink/20 border border-coral-pink/50"></div> [v]
             </label>
          </div>
        </div>
      </div>
    </div>
  );
}

const BadgeShowcase = () => {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-end mb-4">
        <h3 className="font-bold text-slate-800 text-lg">Badges</h3>
        <span className="text-vibrant-blue text-xs font-bold cursor-pointer">View All</span>
      </div>
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-50 flex justify-between">
        <div className="flex flex-col items-center gap-2">
          <div className="w-14 h-14 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-full flex items-center justify-center shadow-md border-4 border-white text-2xl">🔥</div>
          <span className="text-xs font-bold text-slate-600">7 Days</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="w-14 h-14 bg-gradient-to-br from-blue-300 to-indigo-400 rounded-full flex items-center justify-center shadow-md border-4 border-white text-2xl">📚</div>
          <span className="text-xs font-bold text-slate-600">Scholar</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="w-14 h-14 bg-gradient-to-br from-green-300 to-emerald-400 rounded-full flex items-center justify-center shadow-md border-4 border-white text-2xl">🏆</div>
          <span className="text-xs font-bold text-slate-600">Champion</span>
        </div>
      </div>
    </div>
  );
};

export default function Dashboard({ selectedTopic, setSelectedTopic, selectedLevel, setSelectedLevel, setCurrentView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="p-8 max-w-[1600px] mx-auto"
    >
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
        
        {/* Left Column (Hero & Topics) */}
        <div className="xl:col-span-2">
          {/* Hero Banner */}
          <div className="bg-gradient-to-r from-soft-blue via-mint-green to-white rounded-[2.5rem] p-10 mb-10 shadow-sm relative overflow-hidden h-64 flex flex-col justify-center">
            {/* Wavy background decoration */}
            <svg className="absolute bottom-0 left-0 w-full h-full object-cover opacity-50 pointer-events-none" viewBox="0 0 1000 300" preserveAspectRatio="none">
              <path d="M0,150 C300,300 700,0 1000,150 L1000,300 L0,300 Z" fill="#D1FAE5" />
              <path d="M0,200 C400,350 600,50 1000,200 L1000,300 L0,300 Z" fill="#10B981" opacity="0.2" />
            </svg>
            {/* Floating balls */}
            <div className="absolute top-10 right-32 w-4 h-4 bg-coral-pink rounded-full blur-[1px]"></div>
            <div className="absolute bottom-12 right-24 w-8 h-8 bg-vibrant-yellow rounded-full blur-[2px]"></div>
            <div className="absolute top-20 right-64 w-6 h-6 bg-vibrant-pink rounded-full blur-[1px]"></div>
            <div className="absolute bottom-4 right-1/3 w-5 h-5 bg-vibrant-pink rounded-full blur-[1px]"></div>
            
            <div className="relative z-10 max-w-lg">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/60 backdrop-blur-md rounded-full text-vibrant-blue font-bold text-xs mb-4 shadow-sm border border-white/50">
                <Sparkles size={14} />
                <span>Welcome back, Learner!</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-800 mb-6 leading-tight">
                Ready to Level Up Your <br/> English Journey, Khanh?
              </h1>
              <button 
                onClick={() => setCurrentView('learn')}
                className="bg-slate-800 text-white px-6 py-3 rounded-full font-bold text-sm hover:bg-slate-700 transition-colors shadow-hover flex items-center gap-2 w-max"
              >
                Start Learning
                <Play size={16} fill="currentColor" />
              </button>
            </div>
          </div>

          <TopicSelector
            selectedTopic={selectedTopic}
            setSelectedTopic={setSelectedTopic}
            selectedLevel={selectedLevel}
            setSelectedLevel={setSelectedLevel}
            setCurrentView={setCurrentView}
          />
        </div>

        {/* Right Column (Widgets) */}
        <div className="xl:col-span-1 pl-0 xl:pl-6 xl:border-l xl:border-slate-100 flex flex-col">
           <DailyActivity />
           <WeeklyProgress />
           <BadgeShowcase />
           <QuizCorner />
        </div>
      </div>
    </motion.div>
  );
}
