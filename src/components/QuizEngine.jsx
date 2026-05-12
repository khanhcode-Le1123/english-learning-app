import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, RotateCcw, Award } from 'lucide-react';
import { wordData } from '../data/WordData';

export default function QuizEngine({ selectedTopic, selectedLevel }) {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    // Generate questions
    const pool = wordData.filter(w => w.topic === selectedTopic && w.level === selectedLevel);
    const generated = pool.map(word => {
      // Get 3 random wrong answers
      const wrongAnswers = wordData
        .filter(w => w.id !== word.id)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3)
        .map(w => w.meaning);
      
      const options = [word.meaning, ...wrongAnswers].sort(() => 0.5 - Math.random());
      
      return {
        ...word,
        options,
        correctAnswer: word.meaning
      };
    });
    
    setQuestions(generated);
  }, [selectedTopic, selectedLevel]);

  const handleSelect = (option) => {
    if (selectedAnswer) return; // Prevent multiple clicks
    
    setSelectedAnswer(option);
    
    if (option === questions[currentIndex].correctAnswer) {
      setScore(s => s + 1);
    }

    setTimeout(() => {
      if (currentIndex < questions.length - 1) {
        setCurrentIndex(c => c + 1);
        setSelectedAnswer(null);
      } else {
        setIsFinished(true);
      }
    }, 1500);
  };

  const restartQuiz = () => {
    setCurrentIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setIsFinished(false);
  };

  if (questions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[60vh]">
        <p className="text-xl text-slate-500 font-medium">No quiz available for this topic and level.</p>
      </div>
    );
  }

  if (isFinished) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md mx-auto mt-20 text-center bg-white p-12 rounded-[3rem] shadow-soft border-2 border-slate-100"
      >
        <div className="w-24 h-24 bg-sunny-yellow rounded-full flex items-center justify-center mx-auto mb-8 shadow-sm">
          <Award size={48} className="text-vibrant-yellow" />
        </div>
        <h2 className="text-4xl font-extrabold text-slate-800 mb-4">Quiz Complete!</h2>
        <p className="text-slate-500 mb-8 text-lg">You scored</p>
        <div className="text-7xl font-black text-vibrant-blue mb-12">
          {score} <span className="text-4xl text-slate-300">/ {questions.length}</span>
        </div>
        <button 
          onClick={restartQuiz}
          className="w-full py-4 bg-slate-800 text-white rounded-2xl font-bold text-lg hover:bg-slate-700 transition-colors shadow-hover flex justify-center items-center gap-2"
        >
          <RotateCcw size={20} />
          Play Again
        </button>
      </motion.div>
    );
  }

  const currentQuestion = questions[currentIndex];

  return (
    <motion.div
      key={currentIndex}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="max-w-2xl mx-auto py-12 px-4 flex flex-col min-h-[80vh]"
    >
      <div className="flex justify-between items-center mb-12">
        <h2 className="text-2xl font-bold text-slate-800">Quiz <span className="text-slate-400 font-medium">({selectedTopic})</span></h2>
        <span className="bg-slate-100 text-slate-600 px-4 py-1.5 rounded-full font-bold">
          {currentIndex + 1} / {questions.length}
        </span>
      </div>

      <div className="bg-white rounded-[2.5rem] p-10 shadow-soft border-2 border-slate-100 mb-8 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-soft-blue rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <span className="text-xl font-bold text-slate-400 mb-2 block">{currentQuestion.type}</span>
        <h3 className="text-5xl font-extrabold text-slate-800 mb-4 relative z-10">{currentQuestion.word}</h3>
        <p className="text-slate-500 font-medium">What is the correct meaning?</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {currentQuestion.options.map((option, idx) => {
          let stateClass = "bg-white border-slate-100 hover:border-soft-blue hover:bg-slate-50 text-slate-700";
          let Icon = null;

          if (selectedAnswer) {
            if (option === currentQuestion.correctAnswer) {
              stateClass = "bg-mint-green border-vibrant-green text-vibrant-green shadow-sm";
              Icon = CheckCircle2;
            } else if (option === selectedAnswer) {
              stateClass = "bg-coral-pink border-vibrant-pink text-vibrant-pink shadow-sm";
              Icon = XCircle;
            } else {
              stateClass = "bg-white border-slate-100 opacity-50";
            }
          }

          return (
            <button
              key={idx}
              disabled={!!selectedAnswer}
              onClick={() => handleSelect(option)}
              className={`p-6 rounded-2xl border-2 text-lg font-bold transition-all duration-300 flex items-center justify-between group ${stateClass}`}
            >
              <span>{option}</span>
              {Icon && <Icon size={24} className="ml-2" />}
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}
