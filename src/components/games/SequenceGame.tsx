import { useState, useEffect } from "react";
import { Heart, Star, Circle, Square, Triangle, Sparkles } from "lucide-react";
import { toast } from "sonner";

interface SequenceGameProps {
  onComplete: () => void;
}

type CardIcon = {
  id: number;
  icon: typeof Heart;
  color: string;
};

const SequenceGame = ({ onComplete }: SequenceGameProps) => {
  const [cards, setCards] = useState<CardIcon[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedCards, setMatchedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [isChecking, setIsChecking] = useState(false);

  const icons = [
    { icon: Heart, color: "text-red-500" },
    { icon: Star, color: "text-yellow-500" },
    { icon: Circle, color: "text-blue-500" },
    { icon: Square, color: "text-green-500" },
    { icon: Triangle, color: "text-purple-500" },
    { icon: Sparkles, color: "text-pink-500" },
  ];

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    const gameIcons = icons.slice(0, 6);
    const duplicatedCards = [...gameIcons, ...gameIcons].map((item, index) => ({
      id: index,
      icon: item.icon,
      color: item.color,
    }));
    
    // Shuffle cards
    const shuffled = duplicatedCards.sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setFlippedCards([]);
    setMatchedCards([]);
    setMoves(0);
  };

  const handleCardClick = (cardId: number) => {
    if (isChecking || flippedCards.includes(cardId) || matchedCards.includes(cardId)) {
      return;
    }

    const newFlipped = [...flippedCards, cardId];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setIsChecking(true);
      setMoves(moves + 1);

      const [firstId, secondId] = newFlipped;
      const firstCard = cards.find(c => c.id === firstId);
      const secondCard = cards.find(c => c.id === secondId);

      if (firstCard?.icon === secondCard?.icon) {
        // Match found
        setTimeout(() => {
          setMatchedCards([...matchedCards, firstId, secondId]);
          setFlippedCards([]);
          setIsChecking(false);
          toast.success("رائع! وجدت زوجاً متطابقاً! 🎉");

          // Check if game is complete
          if (matchedCards.length + 2 === cards.length) {
            setTimeout(() => {
              toast.success("مذهل! أكملت اللعبة! 🌟");
              setTimeout(onComplete, 1500);
            }, 500);
          }
        }, 800);
      } else {
        // No match
        setTimeout(() => {
          setFlippedCards([]);
          setIsChecking(false);
        }, 1000);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5" />
      
      <div className="max-w-4xl w-full space-y-8 relative z-10 animate-fade-in">
        <div className="text-center space-y-4">
          <Sparkles className="w-16 h-16 text-accent mx-auto pulse-soft" />
          <h2 className="text-4xl font-bold text-foreground">لعبة الأزواج المتطابقة</h2>
          <p className="text-lg text-muted-foreground">اعثري على جميع الأزواج المتطابقة</p>
          <div className="text-sm text-muted-foreground">عدد المحاولات: {moves}</div>
        </div>

        <div className="bg-card p-8 rounded-3xl shadow-magical border-2 border-primary/20">
          <div className="grid grid-cols-4 gap-4 max-w-2xl mx-auto">
            {cards.map((card) => {
              const isFlipped = flippedCards.includes(card.id);
              const isMatched = matchedCards.includes(card.id);
              const Icon = card.icon;

              return (
                <button
                  key={card.id}
                  onClick={() => handleCardClick(card.id)}
                  disabled={isChecking || isFlipped || isMatched}
                  className={`
                    aspect-square rounded-2xl transition-all duration-300 transform
                    ${isMatched ? 'bg-green-500/20 scale-95' : isFlipped ? 'bg-primary/10' : 'bg-muted hover:bg-muted/80'}
                    ${!isMatched && !isFlipped ? 'hover:scale-105' : ''}
                    disabled:cursor-not-allowed
                    flex items-center justify-center
                    border-2 ${isMatched ? 'border-green-500/50' : 'border-border'}
                  `}
                >
                  {(isFlipped || isMatched) && (
                    <Icon className={`w-12 h-12 ${card.color} animate-scale-in`} />
                  )}
                  {!isFlipped && !isMatched && (
                    <div className="w-12 h-12 bg-primary/20 rounded-lg" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SequenceGame;
