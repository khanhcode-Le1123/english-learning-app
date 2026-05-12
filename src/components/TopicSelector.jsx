import React from 'react';
import { motion } from 'framer-motion';

const topicUI = {
  'Traffic': { bg: 'bg-[#52B788]', text: 'text-emerald-900', emoji: '🚙', progress: 40 },
  'Sports': { bg: 'bg-[#FF8FAB]', text: 'text-rose-900', emoji: '🏅', progress: 60 },
  'Daily Life': { bg: 'bg-[#FFE66D]', text: 'text-yellow-900', emoji: '☕', progress: 50 },
  'Technology': { bg: 'bg-[#A2D2FF]', text: 'text-blue-900', emoji: '💻', progress: 12 },
  'Travel': { bg: 'bg-[#FFD6A5]', text: 'text-orange-900', emoji: '✈️', progress: 45 },
  'Food & Cooking': { bg: 'bg-[#FFB5A7]', text: 'text-red-900', emoji: '🍳', progress: 30 },
  'Work & Career': { bg: 'bg-[#CDB4DB]', text: 'text-purple-900', emoji: '💼', progress: 25 },
  'Health & Wellness': { bg: 'bg-[#FFAFCC]', text: 'text-pink-900', emoji: '💖', progress: 10 },
};

export default function TopicSelector({ selectedTopic, setSelectedTopic, selectedLevel, setSelectedLevel, setCurrentView }) {
  // Use the predefined topic list from topicUI keys to maintain order
  const availableTopics = Object.keys(topicUI);

  const handleSelectTopic = (topic) => {
    setSelectedTopic(topic);
    setCurrentView('learn');
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-extrabold text-slate-800">Choose a Topic</h2>
        <p className="text-slate-500 font-medium">What do you want to learn today?</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {availableTopics.map((topic, index) => {
          const ui = topicUI[topic];
          return (
            <motion.div
              key={topic}
              whileHover={{ y: -5, scale: 1.02 }}
              onClick={() => handleSelectTopic(topic)}
              className={`${ui.bg} rounded-3xl p-6 cursor-pointer relative overflow-hidden shadow-sm hover:shadow-md transition-shadow group h-40 flex flex-col justify-between`}
            >
              {/* Top part with icon and title */}
              <div className="flex justify-between items-start">
                <div className="bg-white/20 p-2 rounded-xl backdrop-blur-sm">
                  {/* Small icon outline can go here, but we'll use the big emoji */}
                  <span className="text-white font-bold opacity-80 text-xl leading-none">
                     {ui.emoji}
                  </span>
                </div>
                {/* Big 3D simulated image */}
                <span className="absolute -right-2 top-4 text-7xl drop-shadow-xl group-hover:scale-110 transition-transform duration-300">
                  {ui.emoji}
                </span>
              </div>

              {/* Bottom part with progress */}
              <div className="mt-auto relative z-10">
                <h3 className={`text-xl font-extrabold ${ui.text} mb-1 drop-shadow-sm`}>{topic}</h3>
                <p className={`${ui.text} opacity-80 text-xs font-bold mb-3`}>15 new words</p>
                
                {/* Progress bar */}
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-2 bg-white/40 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-white rounded-full transition-all duration-1000"
                      style={{ width: `${ui.progress}%` }}
                    />
                  </div>
                  <span className={`${ui.text} text-xs font-bold`}>{ui.progress}%</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
