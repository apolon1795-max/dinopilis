import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Leaf, MapPin, Phone, ArrowRight, Sparkles, RotateCcw } from 'lucide-react';
import { DinoResult, dinoProfiles, questions } from './data';

type GameState = 'intro' | 'quiz' | 'analyzing' | 'result' | 'gift';

export default function App() {
  const [gameState, setGameState] = useState<GameState>('intro');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [resultId, setResultId] = useState<DinoResult | null>(null);

  const handleStart = () => {
    setGameState('quiz');
    setCurrentQuestion(0);
    setScores({});
    setResultId(null);
  };

  const handleAnswer = (points: Partial<Record<DinoResult, number>>) => {
    const newScores: Record<string, number> = { ...scores };
    Object.entries(points).forEach(([dino, pts]) => {
      newScores[dino] = (newScores[dino] || 0) + (pts as number);
    });
    setScores(newScores);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setGameState('analyzing');
      // Calculate winner
      setTimeout(() => {
        let maxDino = 'trex' as DinoResult;
        let maxScore = -1;
        
        for (const dino in newScores) {
          const scoreVal = newScores[dino] as number;
          if (scoreVal > maxScore) {
            maxScore = scoreVal;
            maxDino = dino as DinoResult;
          }
        }

        setResultId(maxDino);
        setGameState('result');
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-n-bg font-sans text-n-text flex flex-col pt-10 sm:justify-center items-center overflow-x-hidden p-4 relative">
      {/* Decorative nature background elements */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden opacity-10">
        <Leaf className="absolute top-10 left-10 text-n-primary w-24 h-24 rotate-45" />
        <Leaf className="absolute -bottom-10 right-10 text-n-primary w-40 h-40 -rotate-12" />
        <Leaf className="absolute top-40 right-20 text-n-primary w-16 h-16 rotate-90" />
      </div>

      <main className="w-full max-w-2xl z-10 pb-10">
        <AnimatePresence mode="wait">
          {gameState === 'intro' && (
            <div key="intro">
              <IntroScreen onStart={handleStart} />
            </div>
          )}

          {gameState === 'quiz' && (
            <div key="quiz">
              <QuizScreen
                questionIndex={currentQuestion}
                onAnswer={handleAnswer}
              />
            </div>
          )}

          {gameState === 'analyzing' && (
            <div key="analyzing">
              <AnalyzingScreen />
            </div>
          )}

          {gameState === 'result' && resultId && (
            <div key="result">
              <ResultScreen 
                result={resultId} 
                onGetGift={() => setGameState('gift')} 
                onRestart={handleStart}
              />
            </div>
          )}

          {gameState === 'gift' && (
            <div key="gift">
              <GiftScreen onRestart={handleStart} />
            </div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

function IntroScreen({ onStart }: { onStart: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-n-card rounded-[24px] p-8 sm:p-12 shadow-[0_10px_30px_rgba(0,0,0,0.05)] border-2 border-n-primary flex flex-col items-center text-center"
    >
      <div className="font-serif text-2xl font-black text-n-primary mb-6 tracking-tight uppercase">DINOPOLIS</div>
      <h1 className="text-4xl sm:text-5xl font-serif font-black text-n-primary mb-4 leading-tight">
        Какой ты <br /> динозавр?
      </h1>
      <p className="text-n-text opacity-80 mb-8 max-w-sm">
        Пройди тест из 7 вопросов, узнай свой дино-характер и получи гарантированный подарок от парка «Динополис»!
      </p>
      <button
        onClick={onStart}
        className="w-full sm:w-auto px-10 py-4 bg-n-primary hover:scale-[1.02] active:scale-95 text-white font-bold text-lg rounded-full transition-transform flex items-center justify-center gap-2"
      >
        <span>Пройти тест</span>
        <ArrowRight className="w-5 h-5" />
      </button>
    </motion.div>
  );
}

function QuizScreen({
  questionIndex,
  onAnswer,
}: {
  questionIndex: number;
  onAnswer: (points: Partial<Record<DinoResult, number>>) => void;
}) {
  const q = questions[questionIndex];
  
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="w-full flex flex-col"
    >
      <div className="mb-8 flex justify-between items-center px-2">
        <span className="font-bold text-n-accent uppercase tracking-[1px] text-xs">
          Вопрос {questionIndex + 1} / {questions.length}
        </span>
        <div className="flex gap-2">
          {questions.map((_, i) => (
            <div
              key={i}
              className={`h-2 rounded-full transition-all ${
                i <= questionIndex ? 'bg-n-primary w-6' : 'bg-[#D1D8C5] w-2'
              }`}
            />
          ))}
        </div>
      </div>

      <div className="mb-8 p-2">
        <h2 className="text-3xl font-serif font-bold text-n-primary leading-tight">
          {q.question}
        </h2>
      </div>

      <div className="flex flex-col gap-4">
        {q.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => onAnswer(opt.points)}
            className="text-left w-full p-5 bg-n-card hover:bg-n-promo rounded-2xl border-2 border-n-primary shadow-[0_10px_30px_rgba(0,0,0,0.05)] active:scale-[0.98] transition-all font-semibold text-n-text"
          >
            {opt.text}
          </button>
        ))}
      </div>
    </motion.div>
  );
}

function AnalyzingScreen() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      className="flex flex-col items-center justify-center p-12 py-24 text-center bg-n-card rounded-[24px] shadow-[0_10px_30px_rgba(0,0,0,0.05)] border-2 border-n-primary"
    >
      <div className="w-20 h-20 bg-n-promo rounded-full flex items-center justify-center mb-6 animate-spin-slow">
        <Sparkles className="w-10 h-10 text-n-accent" />
      </div>
      <h2 className="text-3xl font-serif font-black text-n-primary">
        Изучаем ответы...
      </h2>
      <p className="text-n-text opacity-70 mt-2">
        Сверяемся с древними летописями
      </p>
    </motion.div>
  );
}

function ResultScreen({
  result,
  onGetGift,
  onRestart,
}: {
  result: DinoResult;
  onGetGift: () => void;
  onRestart: () => void;
}) {
  const profile = dinoProfiles[result];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-n-card rounded-[24px] p-8 sm:p-12 shadow-[0_10px_30px_rgba(0,0,0,0.05)] border-2 border-n-primary flex flex-col relative overflow-hidden text-center sm:text-left"
    >
      <div className="inline-block bg-n-accent text-white px-5 py-2 rounded-full text-sm font-semibold mb-8 uppercase tracking-wider self-center sm:self-start">
        Тест: Какой ты динозавр?
      </div>
      
      <h2 className="text-5xl sm:text-7xl font-serif font-black mb-6 leading-[0.9] text-n-primary">
        Ты —<br/> {profile.name}
      </h2>
      
      <div className="flex flex-col sm:flex-row gap-8 items-center sm:items-start mb-10">
        <div className={`w-32 h-32 ${profile.bgElementClass} rounded-full flex shrink-0 items-center justify-center text-7xl z-10`}>
          {profile.emoji}
        </div>
        <p className="text-[20px] leading-[1.6] opacity-80 text-n-text max-w-[500px]">
          {profile.description}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto self-center sm:self-start z-10">
        <button
          onClick={onGetGift}
          className="w-full sm:w-auto px-10 py-4 bg-n-primary hover:scale-[1.02] active:scale-[0.98] text-white font-bold text-lg rounded-full transition-transform flex items-center justify-center gap-2"
        >
          <span>Получить билет</span>
          <ArrowRight className="w-5 h-5" />
        </button>
        <button
          onClick={onRestart}
          className="w-full sm:w-auto px-8 py-4 bg-transparent border-2 border-n-primary hover:bg-n-promo text-n-primary active:scale-[0.98] font-bold text-lg rounded-full transition-all flex items-center justify-center gap-2"
        >
          <RotateCcw className="w-5 h-5" />
          <span>Пройти снова</span>
        </button>
      </div>
    </motion.div>
  );
}

function GiftScreen({ onRestart }: { onRestart: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full flex flex-col gap-6"
    >
      {/* Ticket Card */}
      <div className="bg-n-card p-8 sm:p-10 rounded-[24px] shadow-[0_10px_30px_rgba(0,0,0,0.05)] border-2 border-n-primary relative overflow-hidden text-center flex flex-col items-center">
        <div className="absolute -bottom-5 -right-5 w-10 h-10 bg-n-bg rounded-full border-t-2 border-l-2 border-n-primary"></div>
        <div className="absolute -top-5 -left-5 w-10 h-10 bg-n-bg rounded-full border-b-2 border-r-2 border-n-primary"></div>
        
        <div className="text-xs uppercase tracking-[1px] text-n-accent font-bold mb-4">
          Ваш Подарок
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-n-primary mb-6">
          Бесплатный вход в Динопарк
        </h2>
        
        <div className="inline-block bg-n-promo border-2 border-dashed border-n-primary px-8 py-3 text-center font-mono text-2xl tracking-[2px] text-n-primary mb-6 rounded-lg">
          DINO-7732-FREE
        </div>
        
        <p className="text-sm text-n-text opacity-70">
          Покажите этот код на кассе в Динополисе, чтобы получить свой билет. 
        </p>
      </div>

      {/* Contacts Card */}
      <div className="bg-n-card rounded-[24px] p-8 shadow-[0_10px_30px_rgba(0,0,0,0.05)] border-2 border-n-primary relative">
        <p className="text-sm opacity-70 mb-6 font-bold text-n-text">На связи в соцсетях и офлайн:</p>
        
        <div className="flex flex-col gap-5 mb-8">
          <a href="https://2gis.ru/izhevsk/firm/70000001076931834" target="_blank" rel="noreferrer" className="flex items-center gap-4 group">
            <div className="w-12 h-12 bg-n-primary rounded-full flex items-center justify-center text-white shrink-0 group-hover:scale-105 transition-transform">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-lg text-n-text">Парк Кирова, Ижевск</div>
            </div>
          </a>

          <a href="tel:+79124530026" className="flex items-center gap-4 group">
            <div className="w-12 h-12 bg-n-primary rounded-full flex items-center justify-center text-white shrink-0 group-hover:scale-105 transition-transform">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-lg text-n-text">+7 (912) 453-00-26</div>
            </div>
          </a>
        </div>

        <div className="flex gap-4">
          <a href="https://vk.com/dinopolis18" target="_blank" rel="noreferrer" className="w-12 h-12 bg-n-primary flex items-center justify-center text-white rounded-full font-bold text-sm tracking-wider hover:scale-105 transition-transform">
            VK
          </a>
          <a href="https://t.me/dinopolis_izhevsk" target="_blank" rel="noreferrer" className="w-12 h-12 bg-n-primary flex items-center justify-center text-white rounded-full font-bold text-sm tracking-wider hover:scale-105 transition-transform">
            TG
          </a>
        </div>
      </div>

      {/* Try Again Action */}
      <div className="flex justify-center mt-2">
        <button
          onClick={onRestart}
          className="px-8 py-3 bg-transparent border-2 border-dashed border-n-primary/50 text-n-primary hover:bg-n-primary/5 hover:border-n-primary active:scale-[0.98] font-bold text-sm uppercase tracking-wider rounded-full transition-all flex items-center justify-center gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Пройти тест заново</span>
        </button>
      </div>

    </motion.div>
  );
}