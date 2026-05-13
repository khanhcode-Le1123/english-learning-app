import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Volume2 } from 'lucide-react';
import { wordData } from '../data/WordData';

export default function Flashcard({ selectedTopic, selectedLevel, onWordLearned }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [filteredWords, setFilteredWords] = useState([]);
  const [maxReachedIndex, setMaxReachedIndex] = useState(0);

  useEffect(() => {
    const levelOrder = { 'Beginner': 0, 'Intermediate': 1, 'Advanced': 2 };
    const rawWords = wordData.filter(
      (w) => w.topic === selectedTopic
    );
    // Sort by level order: Beginner → Intermediate → Advanced
    rawWords.sort((a, b) => (levelOrder[a.level] || 0) - (levelOrder[b.level] || 0));
    setFilteredWords(rawWords);
    setCurrentIndex(0);
    setIsFlipped(false);
    setMaxReachedIndex(0);
  }, [selectedTopic]);

  const word = filteredWords[currentIndex];

  const handleNext = () => {
    if (currentIndex < filteredWords.length - 1) {
      const nextIndex = currentIndex + 1;
      setIsFlipped(false);
      setTimeout(() => {
        setCurrentIndex(nextIndex);
        // Only count as learned if this is a new card the user hasn't reached before
        if (nextIndex > maxReachedIndex) {
          setMaxReachedIndex(nextIndex);
          const nextWord = filteredWords[nextIndex];
          if (nextWord && onWordLearned) {
            onWordLearned(nextWord.word + '_' + nextWord.topic + '_' + nextWord.level);
          }
        }
      }, 150);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setIsFlipped(false);
      setTimeout(() => setCurrentIndex(c => c - 1), 150);
    }
  };

  if (!word) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[60vh]">
        <p className="text-xl text-slate-500 font-medium">No words found for this topic and level.</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="max-w-2xl mx-auto py-12 px-4 flex flex-col items-center justify-center min-h-[80vh]"
    >
      <div className="w-full flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-slate-800">{selectedTopic} <span className="text-slate-400 font-medium">({word.level})</span></h2>
        <span className="bg-slate-100 text-slate-600 px-4 py-1.5 rounded-full font-bold">
          {currentIndex + 1} / {filteredWords.length}
        </span>
      </div>

      <div className="relative w-full aspect-[4/3] max-h-[400px] perspective-1000 cursor-pointer" onClick={() => setIsFlipped(!isFlipped)}>
        <motion.div
          className="w-full h-full relative transform-style-3d transition-all duration-700"
          animate={{ rotateY: isFlipped ? 180 : 0 }}
        >
          {/* Front */}
          <div className="absolute inset-0 bg-gradient-to-br from-white via-soft-blue/20 to-mint-green/20 border-2 border-slate-100 rounded-[2.5rem] shadow-soft backface-hidden flex flex-col items-center justify-center p-10">
            <button 
              className="absolute top-6 right-6 p-3 bg-slate-50 text-slate-400 hover:text-vibrant-blue hover:bg-soft-blue rounded-2xl transition-colors"
              onClick={(e) => { e.stopPropagation(); /* Play sound logic */ }}
            >
              <Volume2 size={24} />
            </button>
            <div className="absolute top-8 left-8">
              <span className="px-4 py-2 bg-teal-50 text-teal-600 font-bold rounded-xl border border-teal-100">{word.type}</span>
            </div>
            
            <h3 className="text-5xl sm:text-7xl font-extrabold text-slate-700 mb-6 text-center tracking-tight">{word.word}</h3>
            
            {word.ipa && (
              <div className="bg-soft-blue/50 text-vibrant-blue px-6 py-2 rounded-full font-medium text-xl tracking-wider shadow-sm">
                {word.ipa}
              </div>
            )}
            
            <div className="mt-auto flex items-center gap-2 text-slate-400 font-medium">
              <span className="w-10 h-[2px] bg-slate-200 rounded-full"></span>
              Click to reveal meaning
              <span className="w-10 h-[2px] bg-slate-200 rounded-full"></span>
            </div>
          </div>

          {/* Back */}
          <div className="absolute inset-0 bg-gradient-to-br from-coral-pink to-rose-200 border-2 border-transparent rounded-[2.5rem] shadow-soft backface-hidden rotate-y-180 flex flex-col items-center justify-center p-10 relative overflow-hidden">
            {/* Decorative circle */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/20 rounded-full blur-3xl"></div>
            
            <div className="absolute top-8 left-8">
              <span className="px-4 py-2 bg-white/30 text-vibrant-pink font-bold rounded-xl">{word.type}</span>
            </div>

            <h3 className="text-3xl sm:text-4xl font-extrabold text-vibrant-pink mt-10 mb-6 px-2 text-center leading-tight z-10 drop-shadow-sm max-w-[90%] mx-auto">
              {word.meaning}
            </h3>
            
            {word.example && (
              <div className="w-full bg-white/40 backdrop-blur-sm rounded-2xl p-6 text-center shadow-sm border border-white/50 z-10 relative">
                <span className="absolute -top-4 left-6 text-4xl text-vibrant-pink/40 font-serif">"</span>
                <p className="text-lg sm:text-xl text-rose-900 font-medium italic leading-relaxed">
                  {word.example}
                </p>
                <span className="absolute -bottom-6 right-6 text-4xl text-vibrant-pink/40 font-serif">"</span>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      <div className="flex items-center gap-6 mt-12 w-full justify-center">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="p-5 bg-white border-2 border-slate-100 rounded-2xl hover:border-slate-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm group"
        >
          <ChevronLeft size={28} className="text-slate-600 group-hover:text-slate-800" />
        </button>
        <button
          onClick={handleNext}
          disabled={currentIndex === filteredWords.length - 1}
          className="p-5 bg-slate-800 text-white rounded-2xl hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-hover flex-1 max-w-[200px] flex justify-center items-center gap-2"
        >
          <span className="font-bold text-lg">Next Card</span>
          <ChevronRight size={24} />
        </button>
      </div>
    </motion.div>
  );
}
