import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Brain, CheckCircle, Lightbulb } from "lucide-react";
import { toast } from "sonner";

interface LogicPuzzleGameProps {
  onComplete: () => void;
}

interface Puzzle {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const LogicPuzzleGame = ({ onComplete }: LogicPuzzleGameProps) => {
  const puzzles: Puzzle[] = [
    {
      question: "إذا كان 2 + 3 = 10، و 7 + 2 = 63، و 6 + 5 = 66، فما هو 8 + 4 = ؟",
      options: ["96", "88", "48", "32"],
      correctAnswer: 0,
      explanation: "القاعدة: الرقم الأول × الرقم الثاني، ثم نجمع الرقمين\n(8 × 4) + (8 + 4) = 32 + 12 = لكن القاعدة الصحيحة: (2×3=6) ثم (2+3=5) = 10 خاطئ\nالقاعدة الصحيحة: الرقم الأول × (الرقم الأول + الرقم الثاني)\n8 × (8 + 4) = 8 × 12 = 96"
    },
    {
      question: "في غرفة 4 زوايا، في كل زاوية قطة، أمام كل قطة 3 قطط، كم عدد القطط في الغرفة؟",
      options: ["4 قطط", "12 قطة", "16 قطة", "7 قطط"],
      correctAnswer: 0,
      explanation: "4 قطط فقط - لأن كل قطة تقف في زاوية وأمامها 3 قطط أخريات (في الزوايا الأخرى)"
    },
    {
      question: "إذا كانت ساعة تدق 6 دقات في 5 ثوانٍ، فكم ثانية تحتاج لتدق 12 دقة؟",
      options: ["11 ثانية", "10 ثوانٍ", "12 ثانية", "6 ثوانٍ"],
      correctAnswer: 0,
      explanation: "بين 6 دقات يوجد 5 فترات زمنية (5 ثوانٍ ÷ 5 فترات = ثانية واحدة لكل فترة)\nبين 12 دقة يوجد 11 فترة زمنية (11 × 1 = 11 ثانية)"
    },
    {
      question: "عائلة مكونة من 6 أخوات، كل أخت لها أخ واحد، كم عدد أفراد العائلة؟",
      options: ["7 أفراد", "12 فرد", "13 فرد", "8 أفراد"],
      correctAnswer: 0,
      explanation: "7 أفراد (6 أخوات + 1 أخ) - لأن كل الأخوات لديهن نفس الأخ الواحد"
    },
    {
      question: "إذا كان 1=5، 2=10، 3=15، 4=20، فما هو 5=؟",
      options: ["1", "25", "30", "5"],
      correctAnswer: 0,
      explanation: "إذا كان 1=5، إذن 5=1 (العكس)"
    }
  ];

  const [currentLevel, setCurrentLevel] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [solvedPuzzles, setSolvedPuzzles] = useState<boolean[]>(new Array(puzzles.length).fill(false));
  const totalLevels = puzzles.length;

  const currentPuzzle = puzzles[currentLevel];

  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleSubmit = () => {
    if (selectedAnswer === null) {
      toast.error("يرجى اختيار إجابة!");
      return;
    }

    const isCorrect = selectedAnswer === currentPuzzle.correctAnswer;
    
    if (isCorrect) {
      toast.success("إجابة صحيحة! ممتاز! 🎉");
      const newSolvedPuzzles = [...solvedPuzzles];
      newSolvedPuzzles[currentLevel] = true;
      setSolvedPuzzles(newSolvedPuzzles);
      setShowExplanation(true);
      
      setTimeout(() => {
        if (currentLevel >= totalLevels - 1) {
          toast.success("مذهل! لقد أكملت جميع الألغاز! 🏆");
          setTimeout(onComplete, 1500);
        } else {
          setCurrentLevel(currentLevel + 1);
          setSelectedAnswer(null);
          setShowExplanation(false);
        }
      }, 3000);
    } else {
      toast.error("إجابة خاطئة، فكر أكثر! 🤔");
      setShowExplanation(true);
    }
  };

  const handleNext = () => {
    if (currentLevel >= totalLevels - 1) {
      onComplete();
    } else {
      setCurrentLevel(currentLevel + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5" />
      
      <div className="max-w-3xl w-full space-y-8 relative z-10 animate-fade-in">
        <div className="text-center space-y-4">
          <Brain className="w-16 h-16 text-accent mx-auto pulse-soft" />
          <h2 className="text-4xl font-bold text-foreground">ألغاز منطقية 🧩</h2>
          <p className="text-lg text-muted-foreground">اختبر ذكاءك وقدرتك على التفكير المنطقي</p>
          <div className="flex justify-center gap-4 text-sm">
            <span className="text-muted-foreground">اللغز: {currentLevel + 1}/{totalLevels}</span>
            <span className="text-accent">✓ تم حلها: {solvedPuzzles.filter(Boolean).length}</span>
          </div>
        </div>

        <div className="bg-card p-8 rounded-3xl shadow-magical border-2 border-primary/20 space-y-8">
          <div className="text-center space-y-4">
            <h3 className="text-2xl font-bold text-foreground leading-relaxed">
              {currentPuzzle.question}
            </h3>
          </div>

          {/* الخيارات */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {currentPuzzle.options.map((option, index) => (
              <Button
                key={index}
                onClick={() => handleAnswer(index)}
                variant={selectedAnswer === index ? "default" : "outline"}
                className="min-h-[60px] text-lg relative"
                disabled={showExplanation}
              >
                {option}
                {showExplanation && index === currentPuzzle.correctAnswer && (
                  <CheckCircle className="w-5 h-5 text-green-500 absolute -top-2 -right-2" />
                )}
              </Button>
            ))}
          </div>

          {/* التفسير */}
          {showExplanation && (
            <div className="bg-accent/10 p-6 rounded-2xl border-2 border-accent/30 animate-fade-in">
              <div className="flex items-start gap-3">
                <Lightbulb className="w-6 h-6 text-accent mt-1 flex-shrink-0" />
                <div className="space-y-2">
                  <h4 className="text-lg font-bold text-foreground">التفسير:</h4>
                  <p className="text-foreground leading-relaxed whitespace-pre-line">
                    {currentPuzzle.explanation}
                  </p>
                  <p className="text-accent font-semibold mt-3">
                    الإجابة الصحيحة: {currentPuzzle.options[currentPuzzle.correctAnswer]}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* الأزرار */}
          <div className="flex gap-4 justify-center">
            {!showExplanation ? (
              <Button
                onClick={handleSubmit}
                disabled={selectedAnswer === null}
                className="min-w-[140px]"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                تحقق من الإجابة
              </Button>
            ) : (
              <Button
                onClick={handleNext}
                className="min-w-[140px]"
              >
                {currentLevel >= totalLevels - 1 ? "إنهاء" : "اللغز التالي"}
              </Button>
            )}
          </div>
        </div>

        {/* مؤشر التقدم */}
        <div className="flex justify-center gap-2">
          {puzzles.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full transition-all ${
                index < currentLevel
                  ? "bg-accent"
                  : index === currentLevel
                  ? "bg-primary scale-125"
                  : "bg-muted"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LogicPuzzleGame;