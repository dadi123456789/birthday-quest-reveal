import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Palette, CheckCircle } from "lucide-react";
import { toast } from "sonner";

interface ColorMatchingGameProps {
  onComplete: () => void;
}

const ColorMatchingGame = ({ onComplete }: ColorMatchingGameProps) => {
  const colors = [
    { name: "أحمر", hex: "#EF4444", arabic: "أحمر" },
    { name: "أزرق", hex: "#3B82F6", arabic: "أزرق" },
    { name: "أخضر", hex: "#10B981", arabic: "أخضر" },
    { name: "أصفر", hex: "#F59E0B", arabic: "أصفر" },
    { name: "بنفسجي", hex: "#8B5CF6", arabic: "بنفسجي" },
    { name: "وردي", hex: "#EC4899", arabic: "وردي" },
  ];

  const [displayedColor, setDisplayedColor] = useState(colors[0]);
  const [displayedText, setDisplayedText] = useState(colors[0].arabic);
  const [options, setOptions] = useState<typeof colors>([]);
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(1);
  const totalRounds = 6;

  useEffect(() => {
    generateRound();
  }, []);

  const generateRound = () => {
    const colorForDisplay = colors[Math.floor(Math.random() * colors.length)];
    const textToShow = colors[Math.floor(Math.random() * colors.length)];
    
    setDisplayedColor(colorForDisplay);
    setDisplayedText(textToShow.arabic);
    
    // التأكد من أن اللون الصحيح موجود في الخيارات
    const otherColors = colors.filter(c => c.hex !== colorForDisplay.hex);
    const randomOthers = [...otherColors].sort(() => Math.random() - 0.5).slice(0, 2);
    const allOptions = [colorForDisplay, ...randomOthers].sort(() => Math.random() - 0.5);
    
    setOptions(allOptions);
  };

  const handleAnswer = (selectedColor: typeof colors[0]) => {
    if (selectedColor.hex === displayedColor.hex) {
      toast.success("إجابة صحيحة!");
      const newScore = score + 1;
      setScore(newScore);
      
      if (round >= totalRounds) {
        toast.success("أحسنت! لقد أكملت التحدي!");
        setTimeout(onComplete, 1500);
      } else {
        setRound(round + 1);
        generateRound();
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
          <Palette className="w-16 h-16 text-accent mx-auto pulse-soft" />
          <h2 className="text-4xl font-bold text-foreground">لعبة مطابقة الألوان</h2>
          <p className="text-lg text-muted-foreground">اختاري اللون الصحيح للنص المعروض</p>
          <div className="flex justify-center gap-4 text-sm">
            <span className="text-muted-foreground">الجولة: {round}/{totalRounds}</span>
            <span className="text-muted-foreground">النقاط: {score}</span>
          </div>
        </div>

        <div className="bg-card p-8 rounded-3xl shadow-magical border-2 border-primary/20 space-y-8">
          <div className="text-center p-12 bg-muted/50 rounded-2xl">
            <p 
              className="text-6xl font-bold"
              style={{ color: displayedColor.hex }}
            >
              {displayedText}
            </p>
            <p className="mt-4 text-muted-foreground">ما هو لون هذا النص؟</p>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {options.map((color, index) => (
              <Button
                key={index}
                onClick={() => handleAnswer(color)}
                variant="outline"
                className="p-8 text-lg hover:scale-105 transition-transform border-2 flex flex-col gap-2"
              >
                <div 
                  className="w-16 h-16 rounded-full mx-auto"
                  style={{ backgroundColor: color.hex }}
                />
                <span>{color.arabic}</span>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorMatchingGame;
