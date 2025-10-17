import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Heart, Check, X } from "lucide-react";
import { toast } from "sonner";

interface QuizGameProps {
  onComplete: () => void;
}

const questions = [
  {
    question: "ما هو اللون المفضل لديّ؟",
    options: ["الأزرق", "الأحمر", "الأسود", "الأخضر"],
    correct: 2,
  },
  {
    question: "ما هو الطعام المفضل لديّ؟",
    options: ["الشاورما", "البيتزا", "البرجر", "المعكرونة"],
    correct: 0,
  },
  {
    question: "أين تقابلنا لأول مرة؟",
    options: ["في المدرسة", "في الجامعة", "مواقع التواصل الاجتماعي", "في حفلة"],
    correct: 2,
  },
  {
    question: "ما الذي أحبه في البنت؟",
    options: ["الابتسامة", "العينين", "الشعر", "الصوت"],
    correct: 1,
  },
  {
    question: "ما هو طولي؟",
    options: ["165 سم", "170 سم", "175 سم", "180 سم"],
    correct: 1,
  },
  {
    question: "ما أكثر شيء أكرهه في الإنسان؟",
    options: ["الكذب", "الغرور", "الكسل", "التذمر"],
    correct: 0,
  },
];

const QuizGame = ({ onComplete }: QuizGameProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);

  const handleAnswer = (index: number) => {
    setSelectedAnswer(index);
    setShowResult(true);

    const isCorrect = index === questions[currentQuestion].correct;
    if (isCorrect) {
      setCorrectAnswers((prev) => prev + 1);
      toast.success("إجابة صحيحة! 🎉");
    } else {
      toast.error("حاولي مرة أخرى في المرة القادمة 💕");
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion((prev) => prev + 1);
        setSelectedAnswer(null);
        setShowResult(false);
      }
    }, 1500);
  };

  const isComplete = currentQuestion === questions.length - 1 && showResult;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="text-center space-y-6 mb-8 max-w-2xl">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
          سؤال وجواب 💭
        </h2>
        <p className="text-lg text-muted-foreground">
          السؤال {currentQuestion + 1} من {questions.length}
        </p>

        <div className="bg-card p-8 rounded-3xl shadow-magical border-2 border-primary/20">
          <p className="text-2xl font-medium mb-8 text-card-foreground">
            {questions[currentQuestion].question}
          </p>

          <div className="space-y-4">
            {questions[currentQuestion].options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrect = index === questions[currentQuestion].correct;
              const showCorrect = showResult && isCorrect;
              const showWrong = showResult && isSelected && !isCorrect;

              return (
                <button
                  key={index}
                  onClick={() => !showResult && handleAnswer(index)}
                  disabled={showResult}
                  className={`w-full p-4 rounded-xl text-lg font-medium transition-all ${
                    showCorrect
                      ? "bg-gradient-to-r from-green-500 to-green-600 text-white"
                      : showWrong
                      ? "bg-gradient-to-r from-red-500 to-red-600 text-white"
                      : "bg-gradient-to-r from-muted to-muted/50 hover:from-primary/20 hover:to-secondary/20 border-2 border-border hover:border-primary"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{option}</span>
                    {showCorrect && <Check className="w-6 h-6" />}
                    {showWrong && <X className="w-6 h-6" />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {isComplete && (
          <div className="space-y-4 animate-fade-in">
            <p className="text-xl text-muted-foreground">
              أجبتِ بشكل صحيح على {correctAnswers} من {questions.length} أسئلة!
            </p>
            <Button
              onClick={onComplete}
              size="lg"
              className="shine bg-gradient-to-r from-secondary to-accent text-white px-10 py-6 text-lg rounded-2xl shadow-magical hover:scale-105 transition-all"
            >
              <Heart className="ml-2" fill="currentColor" />
              التالي
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizGame;