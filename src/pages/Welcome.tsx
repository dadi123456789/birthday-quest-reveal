import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles, Heart, Gift } from "lucide-react";

interface WelcomeProps {
  onStart: () => void;
}

const Welcome = ({ onStart }: WelcomeProps) => {
  const [showMessage, setShowMessage] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 sparkle">
          <Sparkles className="text-primary w-8 h-8" />
        </div>
        <div className="absolute top-40 right-20 sparkle animation-delay-500">
          <Heart className="text-secondary w-6 h-6" fill="currentColor" />
        </div>
        <div className="absolute bottom-32 left-32 float">
          <Gift className="text-accent w-10 h-10" />
        </div>
        <div className="absolute bottom-20 right-16 sparkle animation-delay-1000">
          <Sparkles className="text-primary w-6 h-6" />
        </div>
      </div>

      <div className="text-center space-y-8 max-w-2xl relative z-10">
        <div className="space-y-4">
          <div className="inline-block pulse-soft">
            <Gift className="w-20 h-20 text-primary mx-auto" />
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            عيد ميلاد سعيد! 🎉
          </h1>
          
          <p className="text-2xl text-muted-foreground">
            لديك مغامرة خاصة تنتظرك...
          </p>
        </div>

        {!showMessage && (
          <Button
            onClick={() => setShowMessage(true)}
            size="lg"
            className="shine bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white px-12 py-6 text-xl rounded-2xl shadow-magical transition-all hover:scale-105"
          >
            <Heart className="ml-2" fill="currentColor" />
            افتحي هديتك
          </Button>
        )}

        {showMessage && (
          <div className="space-y-6 animate-fade-in">
            <div className="bg-card p-8 rounded-3xl shadow-magical border-2 border-primary/20">
              <p className="text-lg leading-relaxed text-card-foreground">
                هذه ليست مجرد هدية عادية... 
                <br />
                بل رحلة مليئة بالمفاجآت والذكريات الجميلة ✨
                <br /><br />
                عليكِ أن تكملي بعض المراحل الممتعة
                <br />
                للوصول إلى هديتك الخاصة 🎁
              </p>
            </div>

            <Button
              onClick={onStart}
              size="lg"
              className="shine bg-gradient-to-r from-accent to-primary hover:opacity-90 text-white px-12 py-6 text-xl rounded-2xl shadow-magical transition-all hover:scale-105"
            >
              <Sparkles className="ml-2" />
              لنبدأ المغامرة!
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Welcome;