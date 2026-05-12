import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';
import Flashcard from './components/Flashcard';
import QuizEngine from './components/QuizEngine';

function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [selectedTopic, setSelectedTopic] = useState('Traffic');
  const [selectedLevel, setSelectedLevel] = useState('Intermediate');

  return (
    <div className="flex min-h-screen bg-slate-50/50 font-sans">
      <Navigation currentView={currentView} setCurrentView={setCurrentView} />
      
      <main className="flex-1 md:ml-64 overflow-y-auto min-h-screen">
        <AnimatePresence mode="wait">
          {currentView === 'dashboard' && (
            <Dashboard 
              key="dashboard"
              selectedTopic={selectedTopic}
              setSelectedTopic={setSelectedTopic}
              selectedLevel={selectedLevel}
              setSelectedLevel={setSelectedLevel}
              setCurrentView={setCurrentView}
            />
          )}
          {currentView === 'learn' && (
            <Flashcard 
              key="learn"
              selectedTopic={selectedTopic} 
              selectedLevel={selectedLevel} 
            />
          )}
          {currentView === 'quiz' && (
            <QuizEngine 
              key="quiz"
              selectedTopic={selectedTopic} 
              selectedLevel={selectedLevel} 
            />
          )}
          {currentView === 'progress' && (
            <div key="progress" className="flex items-center justify-center h-full min-h-[60vh]">
              <p className="text-xl text-slate-500 font-medium">Progress tracking coming soon!</p>
            </div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;
