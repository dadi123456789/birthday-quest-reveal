import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Gift, Heart, Sparkles } from "lucide-react";
import { toast } from "sonner";

interface GiftBoxProps {
  onUnlock: () => void;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  size: number;
}

const GiftBox = ({ onUnlock }: GiftBoxProps) => {
  const [isLocked, setIsLocked] = useState(true);
  const [showCanvas, setShowCanvas] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const [strokeCount, setStrokeCount] = useState(0);
  const [message, setMessage] = useState("ارسمي قلباً من قلبك... 💕");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number>();

  const handleBoxClick = () => {
    if (isLocked) {
      toast.info("هذه الهدية لا تفتح بالضغط، ولا بالكود... 💝", {
        description: "بل فقط عندما ترسمين قلباً من قلبك ✨",
      });
    }
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.beginPath();
      ctx.moveTo(x, y);
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.lineTo(x, y);
      ctx.strokeStyle = '#ff1493';
      ctx.lineWidth = 4;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.stroke();
      
      setStrokeCount(prev => prev + 1);
      
      if (strokeCount > 100 && strokeCount < 150) {
        setMessage("رائع! استمري... 💖");
      } else if (strokeCount >= 150) {
        setMessage("قلب جميل! 🌟");
      }
    }
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    
    if (strokeCount >= 150) {
      setTimeout(() => {
        toast.success("رأيت قلبك الجميل! 😊");
        createParticleExplosion();
        setTimeout(() => {
          setIsLocked(false);
          setShowCanvas(false);
          setTimeout(onUnlock, 1500);
        }, 2000);
      }, 300);
    }
  };

  const createParticleExplosion = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    for (let i = 0; i < 50; i++) {
      const angle = (Math.PI * 2 * i) / 50;
      const velocity = 2 + Math.random() * 3;
      particlesRef.current.push({
        x: centerX,
        y: centerY,
        vx: Math.cos(angle) * velocity,
        vy: Math.sin(angle) * velocity,
        life: 1,
        size: 4 + Math.random() * 6,
      });
    }

    animateParticles();
  };

  const animateParticles = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particlesRef.current = particlesRef.current.filter(particle => {
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.life -= 0.02;

      if (particle.life > 0) {
        ctx.save();
        ctx.globalAlpha = particle.life;
        ctx.fillStyle = '#ff1493';
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
        return true;
      }
      return false;
    });

    if (particlesRef.current.length > 0) {
      animationFrameRef.current = requestAnimationFrame(animateParticles);
    }
  };

  const handleStartDrawing = () => {
    setShowCanvas(true);
    setStrokeCount(0);
    setMessage("ارسمي قلباً من قلبك... 💕");
    
    setTimeout(() => {
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
      }
    }, 100);
  };

  const handleCancel = () => {
    setShowCanvas(false);
    setStrokeCount(0);
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
  };

  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

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
                بل فقط عندما ترسمين قلباً من قلبك." 💝
              </p>
            </div>

            <div className="flex justify-center">
              <Button
                onClick={handleStartDrawing}
                size="lg"
                disabled={showCanvas}
                className="shine bg-gradient-to-r from-primary to-secondary text-white px-8 py-6 text-lg rounded-2xl shadow-magical hover:scale-105 transition-all"
              >
                <Heart className="ml-2" />
                ارسمي قلباً 💖
              </Button>
            </div>
          </div>
        )}

        {/* Canvas view */}
        {showCanvas && (
          <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
            <div className="space-y-6 text-center">
              <div className="relative">
                <canvas
                  ref={canvasRef}
                  width={600}
                  height={600}
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  onTouchStart={startDrawing}
                  onTouchMove={draw}
                  onTouchEnd={stopDrawing}
                  className="bg-white rounded-3xl shadow-magical border-4 border-primary cursor-crosshair touch-none"
                  style={{ maxWidth: '90vw', maxHeight: '60vh' }}
                />
              </div>
              
              <div className="space-y-4">
                <p className="text-white text-2xl font-bold flex items-center justify-center gap-2">
                  <Heart className="text-pink-500 animate-pulse" />
                  {message}
                </p>
                
                <Button
                  onClick={handleCancel}
                  variant="outline"
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                >
                  إلغاء
                </Button>
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
