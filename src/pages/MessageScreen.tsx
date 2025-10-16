import { Button } from "@/components/ui/button";
import { Heart, Sparkles } from "lucide-react";

interface MessageScreenProps {
  message: string;
  onContinue: () => void;
}

const MessageScreen = ({ message, onContinue }: MessageScreenProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
      {/* Animated hearts */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute sparkle"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.3}s`,
            }}
          >
            <Heart className="text-primary/30 w-6 h-6" fill="currentColor" />
          </div>
        ))}
      </div>

      <div className="max-w-2xl space-y-8 text-center relative z-10 animate-fade-in">
        <div className="inline-block pulse-soft">
          <Sparkles className="w-16 h-16 text-accent mx-auto" />
        </div>

        <div className="bg-card p-10 rounded-3xl shadow-magical border-2 border-primary/20 backdrop-blur">
          <p className="text-2xl md:text-3xl leading-relaxed text-card-foreground font-medium whitespace-pre-line">
            {message}
          </p>
        </div>

        <Button
          onClick={onContinue}
          size="lg"
          className="shine bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white px-10 py-6 text-lg rounded-2xl shadow-magical transition-all hover:scale-105"
        >
          <Heart className="ml-2" fill="currentColor" />
          المرحلة التالية
        </Button>
      </div>
    </div>
  );
};

export default MessageScreen;