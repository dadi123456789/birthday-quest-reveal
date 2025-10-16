import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Heart, Check } from "lucide-react";
import { toast } from "sonner";

interface PuzzleGameProps {
  onComplete: () => void;
}

const PuzzleGame = ({ onComplete }: PuzzleGameProps) => {
  const [pieces, setPieces] = useState<number[]>([]);
  const [selectedPiece, setSelectedPiece] = useState<number | null>(null);

  useEffect(() => {
    const shuffled = [0, 1, 2, 3, 4, 5, 6, 7, 8].sort(() => Math.random() - 0.5);
    setPieces(shuffled);
  }, []);

  const handlePieceClick = (index: number) => {
    if (selectedPiece === null) {
      setSelectedPiece(index);
    } else {
      const newPieces = [...pieces];
      [newPieces[selectedPiece], newPieces[index]] = [
        newPieces[index],
        newPieces[selectedPiece],
      ];
      setPieces(newPieces);
      setSelectedPiece(null);
    }
  };

  const isSolved = pieces.every((piece, index) => piece === index);

  useEffect(() => {
    if (isSolved && pieces.length > 0) {
      toast.success("ممتاز! حللتِ اللغز 🎉");
    }
  }, [isSolved, pieces]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="text-center space-y-6 mb-8">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          لغز القلوب 💝
        </h2>
        <p className="text-lg text-muted-foreground">
          رتبي القطع بالترتيب الصحيح (من 1 إلى 9)
        </p>
      </div>

      <div className="grid grid-cols-3 gap-3 max-w-md mb-8">
        {pieces.map((piece, index) => (
          <button
            key={index}
            onClick={() => handlePieceClick(index)}
            className={`aspect-square rounded-xl flex items-center justify-center text-3xl font-bold transition-all ${
              selectedPiece === index
                ? "bg-gradient-to-br from-primary to-secondary text-white scale-95 shadow-glow"
                : "bg-gradient-to-br from-card to-muted hover:scale-105 shadow-magical"
            } ${isSolved ? "bg-gradient-to-br from-accent/30 to-primary/30" : ""}`}
          >
            {piece === index && isSolved ? (
              <Check className="w-12 h-12 text-primary" />
            ) : (
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {piece + 1}
              </span>
            )}
          </button>
        ))}
      </div>

      {isSolved && (
        <Button
          onClick={onComplete}
          size="lg"
          className="shine bg-gradient-to-r from-accent to-primary text-white px-10 py-6 text-lg rounded-2xl shadow-magical hover:scale-105 transition-all animate-fade-in"
        >
          <Heart className="ml-2" fill="currentColor" />
          التالي
        </Button>
      )}
    </div>
  );
};

export default PuzzleGame;