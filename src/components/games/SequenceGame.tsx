import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Brain, Play } from "lucide-react";
import { toast } from "sonner";

interface SequenceGameProps {
  onComplete: () => void;
}

const SequenceGame = ({ onComplete }: SequenceGameProps) => {
  const [sequence, setSequence] = useState<number[]>([]);
  const [userSequence, setUserSequence] = useState<number[]>([]);
  const [isShowing, setIsShowing] = useState(false);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [highlightedButton, setHighlightedButton] = useState<number | null>(null);
  const maxLevel = 5;

  const buttons = [
    { id: 1, color: "bg-red-500 hover:bg-red-600" },
    { id: 2, color: "bg-blue-500 hover:bg-blue-600" },
    { id: 3, color: "bg-green-500 hover:bg-green-600" },
    { id: 4, color: "bg-yellow-500 hover:bg-yellow-600" },
  ];

  useEffect(() => {
    startNewRound();
  }, []);

  const startNewRound = () => {
    const newSequence = Array.from({ length: currentLevel + 2 }, () =>
      Math.floor(Math.random() * 4) + 1
    );
    setSequence(newSequence);
    setUserSequence([]);
    showSequence(newSequence);
  };

  const showSequence = async (seq: number[]) => {
    setIsShowing(true);
    for (const num of seq) {
      setHighlightedButton(num);
      await new Promise((resolve) => setTimeout(resolve, 600));
      setHighlightedButton(null);
      await new Promise((resolve) => setTimeout(resolve, 200));
    }
    setIsShowing(false);
  };

  const handleButtonClick = (buttonId: number) => {
    if (isShowing) return;

    const newUserSequence = [...userSequence, buttonId];
    setUserSequence(newUserSequence);

    const currentIndex = newUserSequence.length - 1;
    if (sequence[currentIndex] !== buttonId) {
      toast.error("خطأ! حاولي مرة أخرى");
      setTimeout(startNewRound, 1000);
      return;
    }

    if (newUserSequence.length === sequence.length) {
      if (currentLevel >= maxLevel) {
        toast.success("مذهل! لقد أكملت جميع المستويات!");
        setTimeout(onComplete, 1500);
      } else {
        toast.success("رائع! انتقلي للمستوى التالي");
        setCurrentLevel(currentLevel + 1);
        setTimeout(startNewRound, 1000);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5" />
      
      <div className="max-w-3xl w-full space-y-8 relative z-10 animate-fade-in">
        <div className="text-center space-y-4">
          <Brain className="w-16 h-16 text-accent mx-auto pulse-soft" />
          <h2 className="text-4xl font-bold text-foreground">لعبة التسلسل</h2>
          <p className="text-lg text-muted-foreground">تذكري التسلسل وأعيدي ترتيبه</p>
          <div className="text-sm text-muted-foreground">المستوى: {currentLevel}/{maxLevel}</div>
        </div>

        <div className="bg-card p-8 rounded-3xl shadow-magical border-2 border-primary/20 space-y-6">
          {isShowing && (
            <div className="text-center p-4 bg-muted/50 rounded-2xl">
              <Play className="w-8 h-8 mx-auto animate-pulse" />
              <p className="mt-2 text-muted-foreground">راقبي التسلسل بعناية...</p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-6 max-w-md mx-auto">
            {buttons.map((button) => (
              <button
                key={button.id}
                onClick={() => handleButtonClick(button.id)}
                disabled={isShowing}
                className={`
                  h-32 rounded-2xl transition-all transform
                  ${button.color}
                  ${highlightedButton === button.id ? "scale-110 shadow-2xl ring-4 ring-white" : ""}
                  ${isShowing ? "cursor-not-allowed opacity-50" : "hover:scale-105"}
                  disabled:cursor-not-allowed
                `}
              />
            ))}
          </div>

          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              التقدم: {userSequence.length}/{sequence.length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SequenceGame;
