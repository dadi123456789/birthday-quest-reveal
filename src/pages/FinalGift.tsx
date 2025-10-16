import { Button } from "@/components/ui/button";
import { Heart, Sparkles, Gift } from "lucide-react";

const FinalGift = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
      {/* Animated confetti effect */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute sparkle"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.1}s`,
            }}
          >
            <Sparkles
              className="text-accent w-4 h-4"
              style={{
                transform: `rotate(${Math.random() * 360}deg)`,
              }}
            />
          </div>
        ))}
      </div>

      <div className="text-center space-y-10 max-w-3xl relative z-10">
        <div className="space-y-6 animate-fade-in">
          <div className="inline-block float">
            <Gift className="w-24 h-24 text-accent mx-auto" />
          </div>

          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-accent via-primary to-secondary bg-clip-text text-transparent">
            مبروك! وصلتِ للهدية النهائية! 🎊
          </h1>
        </div>

        <div className="space-y-6 animate-fade-in animation-delay-500">
          <div className="bg-card p-10 rounded-3xl shadow-magical border-2 border-accent/30 backdrop-blur">
            <p className="text-2xl md:text-3xl leading-relaxed text-card-foreground font-medium mb-6">
              هديتك الحقيقية هي... ✨
            </p>

            <div className="space-y-4 text-xl text-card-foreground">
              <p className="leading-relaxed">
                🎁 <strong className="text-primary">قسيمة تسوق خاصة</strong>
                <br />
                لشراء أي شيء تحبينه من المتجر المفضل لديكِ!
              </p>

              <p className="leading-relaxed mt-6">
                💝 <strong className="text-secondary">يوم مميز معاً</strong>
                <br />
                سنقضي يوماً كاملاً نفعل فيه كل ما تحبين!
              </p>

              <p className="leading-relaxed mt-6">
                💌 <strong className="text-accent">رسالة من القلب</strong>
                <br />
                أنتِ أغلى ما في حياتي، وكل لحظة معكِ هي هدية بحد ذاتها.
                <br />
                شكراً لوجودك في حياتي، وعيد ميلاد سعيد يا أجمل إنسانة! 🌟
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <Button
              onClick={() => window.location.reload()}
              size="lg"
              className="shine bg-gradient-to-r from-accent to-primary text-white px-12 py-6 text-xl rounded-2xl shadow-magical hover:scale-105 transition-all"
            >
              <Heart className="ml-2" fill="currentColor" />
              شكراً لك! 💕
            </Button>

            <Button
              onClick={() => window.location.reload()}
              size="lg"
              variant="outline"
              className="border-2 border-primary hover:bg-primary/10 px-12 py-6 text-xl rounded-2xl shadow-magical hover:scale-105 transition-all"
            >
              <Sparkles className="ml-2" />
              العب مرة أخرى
            </Button>
          </div>
        </div>

        <div className="pt-8 animate-fade-in animation-delay-1000">
          <p className="text-lg text-muted-foreground italic">
            "في كل عام، أنتِ تصبحين أكثر جمالاً وإشراقاً... 
            <br />
            عيد ميلاد سعيد يا حبيبتي! 🎂✨"
          </p>
        </div>
      </div>
    </div>
  );
};

export default FinalGift;