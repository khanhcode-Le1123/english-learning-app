import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';
import Flashcard from './components/Flashcard';
import QuizEngine from './components/QuizEngine';

const MALE_AVATAR = 'https://api.dicebear.com/7.x/adventurer/svg?seed=Sophia&backgroundColor=b6e3f4';
const FEMALE_AVATAR = 'https://api.dicebear.com/7.x/adventurer/svg?seed=Leo&backgroundColor=ffd5dc';

function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [selectedTopic, setSelectedTopic] = useState('Traffic');
  const [selectedLevel, setSelectedLevel] = useState('Intermediate');
  const [user, setUser] = useState(null);
  const [wordsLearned, setWordsLearned] = useState(0);
  const [learnedWordIds, setLearnedWordIds] = useState(new Set());

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    const savedWordsLearned = localStorage.getItem('wordsLearned');
    if (savedWordsLearned) {
      setWordsLearned(parseInt(savedWordsLearned, 10));
    }
    const savedLearnedIds = localStorage.getItem('learnedWordIds');
    if (savedLearnedIds) {
      setLearnedWordIds(new Set(JSON.parse(savedLearnedIds)));
    }
  }, []);

  const handleLogin = (userData) => {
    const avatar = userData.gender === 'female' ? FEMALE_AVATAR : MALE_AVATAR;
    const fullUser = { ...userData, avatar };
    setUser(fullUser);
    localStorage.setItem('user', JSON.stringify(fullUser));
  };

  const handleLogout = () => {
    setUser(null);
    setWordsLearned(0);
    setLearnedWordIds(new Set());
    localStorage.removeItem('user');
    localStorage.removeItem('wordsLearned');
    localStorage.removeItem('learnedWordIds');
  };

  const handleWordLearned = (wordId) => {
    if (!learnedWordIds.has(wordId)) {
      const newSet = new Set(learnedWordIds);
      newSet.add(wordId);
      setLearnedWordIds(newSet);
      const newCount = wordsLearned + 1;
      setWordsLearned(newCount);
      localStorage.setItem('wordsLearned', newCount.toString());
      localStorage.setItem('learnedWordIds', JSON.stringify([...newSet]));
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50/50 font-sans">
      <Navigation 
        currentView={currentView} 
        setCurrentView={setCurrentView} 
        user={user}
        onLogin={handleLogin}
        onLogout={handleLogout}
        wordsLearned={wordsLearned}
      />
      
      <main className="flex-1 md:ml-64 overflow-y-auto min-h-screen">
        <AnimatePresence mode="wait">
          {currentView === 'dashboard' && (
            <Dashboard 
              key="dashboard"
              user={user}
              selectedTopic={selectedTopic}
              setSelectedTopic={setSelectedTopic}
              selectedLevel={selectedLevel}
              setSelectedLevel={setSelectedLevel}
              setCurrentView={setCurrentView}
              learnedWordIds={learnedWordIds}
            />
          )}
          {currentView === 'learn' && (
            <Flashcard 
              key="learn"
              selectedTopic={selectedTopic} 
              selectedLevel={selectedLevel}
              onWordLearned={handleWordLearned}
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
