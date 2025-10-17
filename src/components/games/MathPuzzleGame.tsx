import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calculator, ArrowRight } from "lucide-react";
import { toast } from "sonner";

interface MathPuzzleGameProps {
  onComplete: () => void;
}

const MathPuzzleGame = ({ onComplete }: MathPuzzleGameProps) => {
  const [currentPuzzle, setCurrentPuzzle] = useState({ question: "", answer: 0 });
  const [userAnswer, setUserAnswer] = useState("");
  const [solvedCount, setSolvedCount] = useState(0);
  const totalPuzzles = 5;

  const generatePuzzle = () => {
    const puzzleTypes = [
      () => {
        const a = Math.floor(Math.random() * 20) + 10;
        const b = Math.floor(Math.random() * 20) + 10;
        return { question: `${a} + ${b} = ?`, answer: a + b };
      },
      () => {
        const a = Math.floor(Math.random() * 30) + 20;
        const b = Math.floor(Math.random() * 15) + 5;
        return { question: `${a} - ${b} = ?`, answer: a - b };
      },
      () => {
        const a = Math.floor(Math.random() * 12) + 2;
        const b = Math.floor(Math.random() * 12) + 2;
        return { question: `${a} × ${b} = ?`, answer: a * b };
      },
      () => {
        const b = Math.floor(Math.random() * 9) + 2;
        const answer = Math.floor(Math.random() * 15) + 5;
        const a = b * answer;
        return { question: `${a} ÷ ${b} = ?`, answer };
      },
      () => {
        const a = Math.floor(Math.random() * 10) + 5;
        const b = Math.floor(Math.random() * 10) + 5;
        const c = Math.floor(Math.random() * 10) + 5;
        return { question: `${a} + ${b} - ${c} = ?`, answer: a + b - c };
      },
    ];

    const randomPuzzle = puzzleTypes[Math.floor(Math.random() * puzzleTypes.length)]();
    setCurrentPuzzle(randomPuzzle);
    setUserAnswer("");
  };

  useEffect(() => {
    generatePuzzle();
  }, []);

  const handleSubmit = () => {
    const answer = parseInt(userAnswer);
    if (isNaN(answer)) {
      toast.error("الرجاء إدخال رقم صحيح");
      return;
    }

    if (answer === currentPuzzle.answer) {
      toast.success("إجابة صحيحة!");
      const newCount = solvedCount + 1;
      setSolvedCount(newCount);

      if (newCount >= totalPuzzles) {
        toast.success("رائع! لقد حللت جميع الألغاز!");
        setTimeout(onComplete, 1500);
      } else {
        setTimeout(generatePuzzle, 1000);
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
          <Calculator className="w-16 h-16 text-accent mx-auto pulse-soft" />
          <h2 className="text-4xl font-bold text-foreground">لعبة الألغاز الرياضية</h2>
          <p className="text-lg text-muted-foreground">حلي العمليات الحسابية بسرعة</p>
          <div className="text-sm text-muted-foreground">التقدم: {solvedCount}/{totalPuzzles}</div>
        </div>

        <div className="bg-card p-8 rounded-3xl shadow-magical border-2 border-primary/20 space-y-6">
          <div className="text-center p-12 bg-muted/50 rounded-2xl">
            <p className="text-5xl font-bold text-foreground mb-8">
              {currentPuzzle.question}
            </p>
            <Input
              type="number"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSubmit()}
              placeholder="أدخلي الإجابة"
              className="text-center text-2xl h-16 border-2"
              autoFocus
            />
          </div>

          <Button
            onClick={handleSubmit}
            className="w-full py-6 text-lg shine"
            size="lg"
            disabled={!userAnswer}
          >
            <ArrowRight className="ml-2" />
            تحقق من الإجابة
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MathPuzzleGame;
