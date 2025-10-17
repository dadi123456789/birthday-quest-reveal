import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { toast } from "sonner";

interface PatternRecognitionGameProps {
  onComplete: () => void;
}

const PatternRecognitionGame = ({ onComplete }: PatternRecognitionGameProps) => {
  const symbols = ["🌟", "🌙", "☀️", "⭐", "💫", "✨"];
  const [pattern, setPattern] = useState<string[]>([]);
  const [options, setOptions] = useState<string[]>([]);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [level, setLevel] = useState(1);
  const maxLevel = 5;

  useEffect(() => {
    generatePattern();
  }, [level]);

  const generatePattern = () => {
    const patternLength = 3 + level;
    const symbol1 = symbols[Math.floor(Math.random() * symbols.length)];
    const symbol2 = symbols.filter(s => s !== symbol1)[Math.floor(Math.random() * (symbols.length - 1))];
    
    const newPattern: string[] = [];
    for (let i = 0; i < patternLength; i++) {
      newPattern.push(i % 2 === 0 ? symbol1 : symbol2);
    }
    
    const answer = newPattern.length % 2 === 0 ? symbol1 : symbol2;
    setPattern(newPattern);
    setCorrectAnswer(answer);
    
    const wrongOptions = symbols.filter(s => s !== answer);
    const shuffledOptions = [answer, ...wrongOptions.slice(0, 2)].sort(() => Math.random() - 0.5);
    setOptions(shuffledOptions);
  };

  const handleAnswer = (selectedSymbol: string) => {
    if (selectedSymbol === correctAnswer) {
      toast.success("ممتاز! إجابة صحيحة!");
      
      if (level >= maxLevel) {
        toast.success("رائع! لقد أكملت جميع المستويات!");
        setTimeout(onComplete, 1500);
      } else {
        setLevel(level + 1);
      }
    } else {
      toast.error("حاولي مرة أخرى!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5" />
      
      <div className="max-w-3xl w-full space-y-8 relative z-10 animate-fade-in">
        <div className="text-center space-y-4">
          <Sparkles className="w-16 h-16 text-accent mx-auto pulse-soft" />
          <h2 className="text-4xl font-bold text-foreground">لعبة التعرف على الأنماط</h2>
          <p className="text-lg text-muted-foreground">اكتشفي الرمز التالي في السلسلة</p>
          <div className="text-sm text-muted-foreground">المستوى: {level}/{maxLevel}</div>
        </div>

        <div className="bg-card p-8 rounded-3xl shadow-magical border-2 border-primary/20 space-y-8">
          <div className="text-center p-8 bg-muted/50 rounded-2xl">
            <p className="text-sm text-muted-foreground mb-4">النمط:</p>
            <div className="flex justify-center items-center gap-3 flex-wrap">
              {pattern.map((symbol, index) => (
                <span key={index} className="text-5xl">
                  {symbol}
                </span>
              ))}
              <span className="text-5xl text-muted-foreground">❓</span>
            </div>
          </div>

          <div>
            <p className="text-center text-muted-foreground mb-4">ما هو الرمز التالي؟</p>
            <div className="grid grid-cols-3 gap-4">
              {options.map((symbol, index) => (
                <Button
                  key={index}
                  onClick={() => handleAnswer(symbol)}
                  variant="outline"
                  className="text-6xl py-12 hover:scale-105 transition-transform border-2"
                >
                  {symbol}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatternRecognitionGame;
