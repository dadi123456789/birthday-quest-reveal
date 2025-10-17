import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight } from "lucide-react";
import { toast } from "sonner";

interface WordArrangementGameProps {
  onComplete: () => void;
}

const WordArrangementGame = ({ onComplete }: WordArrangementGameProps) => {
  const correctSentence = "الصداقة كنز لا يقدر بثمن";
  const words = ["كنز", "لا", "يقدر", "بثمن", "الصداقة"];
  const [shuffledWords, setShuffledWords] = useState(
    [...words].sort(() => Math.random() - 0.5)
  );
  const [selectedWords, setSelectedWords] = useState<string[]>([]);

  const handleWordClick = (word: string, index: number) => {
    setSelectedWords([...selectedWords, word]);
    setShuffledWords(shuffledWords.filter((_, i) => i !== index));
  };

  const handleRemoveWord = (word: string, index: number) => {
    setShuffledWords([...shuffledWords, word]);
    setSelectedWords(selectedWords.filter((_, i) => i !== index));
  };

  const checkAnswer = () => {
    const userSentence = selectedWords.join(" ");
    if (userSentence === correctSentence) {
      toast.success("رائع! لقد رتبت الجملة بشكل صحيح!");
      setTimeout(onComplete, 1500);
    } else {
      toast.error("حاولي مرة أخرى!");
      setShuffledWords([...shuffledWords, ...selectedWords].sort(() => Math.random() - 0.5));
      setSelectedWords([]);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5" />
      
      <div className="max-w-3xl w-full space-y-8 relative z-10 animate-fade-in">
        <div className="text-center space-y-4">
          <Sparkles className="w-16 h-16 text-accent mx-auto pulse-soft" />
          <h2 className="text-4xl font-bold text-foreground">لعبة ترتيب الكلمات</h2>
          <p className="text-lg text-muted-foreground">رتبي الكلمات لتكوين جملة صحيحة</p>
        </div>

        <div className="bg-card p-8 rounded-3xl shadow-magical border-2 border-primary/20 space-y-6">
          <div className="min-h-[100px] p-4 bg-muted/50 rounded-2xl border-2 border-dashed border-primary/30">
            {selectedWords.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">اضغطي على الكلمات لترتيبها هنا</p>
            ) : (
              <div className="flex flex-wrap gap-2 justify-center">
                {selectedWords.map((word, index) => (
                  <Button
                    key={index}
                    onClick={() => handleRemoveWord(word, index)}
                    variant="secondary"
                    className="text-lg px-6 py-3 hover:scale-105 transition-transform"
                  >
                    {word}
                  </Button>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-3 justify-center">
            {shuffledWords.map((word, index) => (
              <Button
                key={index}
                onClick={() => handleWordClick(word, index)}
                variant="outline"
                className="text-lg px-6 py-3 hover:scale-105 transition-transform border-2"
              >
                {word}
              </Button>
            ))}
          </div>

          <Button
            onClick={checkAnswer}
            disabled={selectedWords.length !== words.length}
            className="w-full py-6 text-lg shine"
            size="lg"
          >
            <ArrowRight className="ml-2" />
            تحقق من الإجابة
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WordArrangementGame;
