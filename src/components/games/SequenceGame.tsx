import { useState, useEffect, useRef } from "react";
import { Star, Zap, Trophy } from "lucide-react";
import { toast } from "sonner";

interface SequenceGameProps {
  onComplete: () => void;
}

type Position = {
  top: number;
  left: number;
};

const SequenceGame = ({ onComplete }: SequenceGameProps) => {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isPlaying, setIsPlaying] = useState(false);
  const [starPosition, setStarPosition] = useState<Position>({ top: 50, left: 50 });
  const [showStar, setShowStar] = useState(false);
  const targetScore = 15;
  const gameAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isPlaying) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsPlaying(false);
          if (score >= targetScore) {
            toast.success("مذهل! لقد فزت! 🎉");
            setTimeout(onComplete, 1500);
          } else {
            toast.error("حاولي مرة أخرى! 💪");
            resetGame();
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isPlaying, score, onComplete]);

  useEffect(() => {
    if (!isPlaying) return;

    const moveInterval = setInterval(() => {
      moveStarToRandomPosition();
    }, 1500);

    return () => clearInterval(moveInterval);
  }, [isPlaying]);

  const moveStarToRandomPosition = () => {
    if (!gameAreaRef.current) return;
    
    const container = gameAreaRef.current;
    const maxX = container.clientWidth - 60;
    const maxY = container.clientHeight - 60;
    
    const newTop = Math.random() * maxY;
    const newLeft = Math.random() * maxX;
    
    setStarPosition({ top: newTop, left: newLeft });
    setShowStar(true);
  };

  const handleStarClick = () => {
    if (!isPlaying) return;
    
    setScore((prev) => prev + 1);
    setShowStar(false);
    toast.success(`رائع! النقاط: ${score + 1}`, { duration: 500 });
    
    // Move star immediately after click
    setTimeout(() => {
      moveStarToRandomPosition();
    }, 100);
  };

  const startGame = () => {
    setIsPlaying(true);
    setScore(0);
    setTimeLeft(30);
    moveStarToRandomPosition();
  };

  const resetGame = () => {
    setIsPlaying(false);
    setScore(0);
    setTimeLeft(30);
    setShowStar(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5" />
      
      <div className="max-w-4xl w-full space-y-8 relative z-10 animate-fade-in">
        <div className="text-center space-y-4">
          <Zap className="w-16 h-16 text-accent mx-auto pulse-soft" />
          <h2 className="text-4xl font-bold text-foreground">لعبة اصطياد النجوم</h2>
          <p className="text-lg text-muted-foreground">اصطادي {targetScore} نجمة في 30 ثانية!</p>
        </div>

        <div className="bg-card p-8 rounded-3xl shadow-magical border-2 border-primary/20 space-y-6">
          <div className="flex justify-around items-center text-center">
            <div className="space-y-2">
              <Trophy className="w-8 h-8 text-yellow-500 mx-auto" />
              <div className="text-3xl font-bold text-foreground">{score}</div>
              <div className="text-sm text-muted-foreground">النقاط</div>
            </div>
            <div className="space-y-2">
              <Star className="w-8 h-8 text-primary mx-auto" />
              <div className="text-3xl font-bold text-foreground">{timeLeft}</div>
              <div className="text-sm text-muted-foreground">ثانية</div>
            </div>
          </div>

          {!isPlaying ? (
            <div className="text-center py-12">
              <button
                onClick={startGame}
                className="px-8 py-4 bg-gradient-to-r from-primary to-secondary text-primary-foreground rounded-2xl font-bold text-lg hover:scale-105 transition-transform shadow-lg"
              >
                ابدأي اللعبة! 🚀
              </button>
            </div>
          ) : (
            <div 
              ref={gameAreaRef}
              className="relative w-full h-96 bg-muted/30 rounded-2xl overflow-hidden cursor-crosshair"
            >
              {showStar && (
                <button
                  onClick={handleStarClick}
                  style={{
                    position: 'absolute',
                    top: `${starPosition.top}px`,
                    left: `${starPosition.left}px`,
                  }}
                  className="w-12 h-12 animate-bounce transition-all duration-300 hover:scale-125"
                >
                  <Star 
                    className="w-full h-full text-yellow-400 drop-shadow-glow" 
                    fill="currentColor"
                  />
                </button>
              )}
            </div>
          )}

          {isPlaying && (
            <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-primary to-secondary h-full transition-all duration-1000"
                style={{ width: `${(score / targetScore) * 100}%` }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SequenceGame;
