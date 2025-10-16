import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Gift, Camera, Hand, Heart, Sparkles } from "lucide-react";
import { toast } from "sonner";

interface GiftBoxProps {
  onUnlock: () => void;
}

const GiftBox = ({ onUnlock }: GiftBoxProps) => {
  const [isLocked, setIsLocked] = useState(true);
  const [showCamera, setShowCamera] = useState(false);
  const [showTouch, setShowTouch] = useState(false);
  const [touchProgress, setTouchProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleBoxClick = () => {
    if (isLocked) {
      toast.info("هذه الهدية لا تفتح بالضغط، ولا بالكود... 💝", {
        description: "بل فقط عندما ينبض قلبك من الصدق ✨",
      });
    }
  };

  const handleSmileAttempt = async () => {
    setShowCamera(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      
      setTimeout(() => {
        toast.success("رأيت ابتسامتك الجميلة! 😊");
        if (videoRef.current?.srcObject) {
          const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
          tracks.forEach((track) => track.stop());
        }
        setShowCamera(false);
        setIsLocked(false);
        setTimeout(onUnlock, 1000);
      }, 3000);
    } catch (error) {
      toast.error("لم نستطع الوصول للكاميرا، جربي اللمسة السحرية! 💫");
      setShowCamera(false);
      setShowTouch(true);
    }
  };

  const handleTouch = () => {
    setShowTouch(true);
    setTouchProgress(0);
  };

  useEffect(() => {
    if (showTouch && touchProgress < 100) {
      const interval = setInterval(() => {
        setTouchProgress((prev) => {
          const next = prev + 2;
          if (next >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              toast.success("أحسستُ بصدق قلبك! 💗");
              setIsLocked(false);
              setTimeout(onUnlock, 1000);
            }, 500);
          }
          return next;
        });
      }, 50);
      return () => clearInterval(interval);
    }
  }, [showTouch, touchProgress, onUnlock]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Animated sparkles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute sparkle"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.2}s`,
            }}
          >
            <Sparkles className="text-accent/40 w-6 h-6" />
          </div>
        ))}
      </div>

      <div className="text-center space-y-8 max-w-2xl relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-accent via-primary to-secondary bg-clip-text text-transparent">
          هديتك الخاصة 🎁
        </h2>

        {/* Gift Box */}
        <div className="relative inline-block">
          <button
            onClick={handleBoxClick}
            disabled={!isLocked}
            className={`relative group ${isLocked ? "cursor-pointer" : ""}`}
          >
            <div
              className={`w-64 h-64 rounded-3xl flex items-center justify-center transition-all duration-1000 ${
                isLocked
                  ? "bg-gradient-to-br from-primary via-secondary to-accent shadow-magical hover:shadow-glow hover:scale-105"
                  : "bg-gradient-to-br from-accent/30 to-primary/30 scale-110 animate-pulse-soft"
              }`}
            >
              <Gift className="w-32 h-32 text-white" />
            </div>
            
            {isLocked && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-full flex items-center justify-center pulse-soft">
                  <span className="text-4xl">🔒</span>
                </div>
              </div>
            )}
          </button>
        </div>

        {isLocked && (
          <div className="space-y-6 animate-fade-in">
            <div className="bg-card p-6 rounded-2xl shadow-magical border-2 border-primary/20">
              <p className="text-lg leading-relaxed text-card-foreground">
                "هذه الهدية لا تفتح بالضغط، ولا بالكود...
                <br />
                بل فقط عندما ينبض قلبك من الصدق." 💝
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={handleSmileAttempt}
                size="lg"
                className="shine bg-gradient-to-r from-primary to-secondary text-white px-8 py-6 text-lg rounded-2xl shadow-magical hover:scale-105 transition-all"
              >
                <Camera className="ml-2" />
                ابتسمي للكاميرا 😊
              </Button>

              <Button
                onClick={handleTouch}
                size="lg"
                variant="outline"
                className="border-2 border-primary hover:bg-primary/10 px-8 py-6 text-lg rounded-2xl shadow-magical hover:scale-105 transition-all"
              >
                <Hand className="ml-2" />
                اللمسة السحرية ✋
              </Button>
            </div>
          </div>
        )}

        {/* Camera view */}
        {showCamera && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
            <div className="space-y-6 text-center">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-96 h-96 object-cover rounded-3xl shadow-magical border-4 border-primary"
              />
              <p className="text-white text-xl">ابتسمي من القلب... 💕</p>
            </div>
          </div>
        )}

        {/* Touch progress */}
        {showTouch && (
          <div className="fixed inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
            <div className="space-y-8 text-center">
              <div className="relative w-64 h-64 mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary rounded-full opacity-20 pulse-soft" />
                <div
                  className="absolute inset-0 bg-gradient-to-br from-primary to-secondary rounded-full transition-opacity duration-300"
                  style={{ opacity: touchProgress / 200 }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Heart className="w-24 h-24 text-white sparkle" fill="currentColor" />
                </div>
              </div>
              <div className="space-y-4">
                <p className="text-2xl font-bold text-foreground">
                  ضعي يدك على الشاشة... 💗
                </p>
                <div className="w-64 h-4 bg-muted rounded-full mx-auto overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-300"
                    style={{ width: `${touchProgress}%` }}
                  />
                </div>
                <p className="text-lg text-muted-foreground">{Math.round(touchProgress)}%</p>
              </div>
            </div>
          </div>
        )}

        {!isLocked && (
          <div className="animate-fade-in">
            <p className="text-2xl font-bold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
              الصندوق يفتح الآن... ✨
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GiftBox;