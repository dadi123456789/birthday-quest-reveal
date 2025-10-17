import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Heart, Sparkles, Star, Gift, Sun, Moon, Cloud, Zap, Music, Camera, Trophy, Crown, Flame, Gem, Rocket, Coffee } from "lucide-react";
import { toast } from "sonner";

interface MemoryGameProps {
  onComplete: () => void;
}

const icons = [Heart, Sparkles, Star, Gift, Sun, Moon, Cloud, Zap, Music, Camera, Trophy, Crown, Flame, Gem, Rocket, Coffee, Trophy, Crown];
const colors = [
  "text-primary", "text-secondary", "text-accent", "text-pink-500",
  "text-purple-500", "text-blue-500", "text-green-500", "text-yellow-500",
  "text-orange-500", "text-red-500", "text-indigo-500", "text-teal-500",
  "text-cyan-500", "text-rose-500", "text-fuchsia-500", "text-lime-500",
  "text-amber-500", "text-emerald-500"
];

interface Card {
  id: number;
  icon: typeof Heart;
  color: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const MemoryGame = ({ onComplete }: MemoryGameProps) => {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [canFlip, setCanFlip] = useState(true);

  useEffect(() => {
    initGame();
  }, []);

  const initGame = () => {
    const gameCards: Card[] = [];
    icons.forEach((icon, idx) => {
      gameCards.push(
        {
          id: idx * 2,
          icon,
          color: colors[idx],
          isFlipped: false,
          isMatched: false,
        },
        {
          id: idx * 2 + 1,
          icon,
          color: colors[idx],
          isFlipped: false,
          isMatched: false,
        }
      );
    });
    setCards(gameCards.sort(() => Math.random() - 0.5));
  };

  const handleCardClick = (id: number) => {
    if (!canFlip || flippedCards.length >= 2) return;
    
    const card = cards.find((c) => c.id === id);
    if (!card || card.isFlipped || card.isMatched) return;

    const newCards = cards.map((c) =>
      c.id === id ? { ...c, isFlipped: true } : c
    );
    setCards(newCards);

    const newFlipped = [...flippedCards, id];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setCanFlip(false);
      const [first, second] = newFlipped;
      const firstCard = cards.find((c) => c.id === first);
      const secondCard = cards.find((c) => c.id === second);

      if (firstCard?.icon === secondCard?.icon) {
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) =>
              c.id === first || c.id === second ? { ...c, isMatched: true } : c
            )
          );
          setFlippedCards([]);
          setCanFlip(true);
          toast.success("رائع! 🎉");
        }, 500);
      } else {
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) =>
              c.id === first || c.id === second ? { ...c, isFlipped: false } : c
            )
          );
          setFlippedCards([]);
          setCanFlip(true);
        }, 1000);
      }
    }
  };

  const allMatched = cards.length > 0 && cards.every((c) => c.isMatched);

  useEffect(() => {
    if (allMatched) {
      setTimeout(() => {
        toast.success("أحسنتِ! أكملتِ المرحلة الأولى 🎊");
      }, 500);
    }
  }, [allMatched]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="text-center space-y-6 mb-8">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          لعبة الذاكرة 🎮
        </h2>
        <p className="text-lg text-muted-foreground">
          اعثري على الأزواج المتطابقة!
        </p>
      </div>

      <div className="grid grid-cols-6 gap-3 max-w-3xl mb-8">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <button
              key={card.id}
              onClick={() => handleCardClick(card.id)}
              disabled={!canFlip || card.isFlipped || card.isMatched}
              className={`aspect-square rounded-2xl transition-all duration-500 transform ${
                card.isFlipped || card.isMatched
                  ? "bg-gradient-to-br from-primary/20 to-secondary/20 border-2 border-primary rotate-0"
                  : "bg-gradient-to-br from-muted to-muted/50 border-2 border-border hover:scale-105 rotate-180"
              } ${card.isMatched ? "opacity-50" : ""}`}
              style={{
                transformStyle: "preserve-3d",
              }}
            >
              {(card.isFlipped || card.isMatched) && (
                <Icon className={`w-12 h-12 mx-auto ${card.color}`} fill="currentColor" />
              )}
            </button>
          );
        })}
      </div>

      {allMatched && (
          <Button
            onClick={onComplete}
            size="lg"
            className="shine bg-gradient-to-r from-primary to-secondary text-white px-10 py-6 text-lg rounded-2xl shadow-magical hover:scale-105 transition-all animate-fade-in"
          >
            <Heart className="ml-2" fill="currentColor" />
            التالي
          </Button>
      )}
    </div>
  );
};

export default MemoryGame;