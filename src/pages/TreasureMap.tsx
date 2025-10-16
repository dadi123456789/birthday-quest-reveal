import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MapPin, Lock, Unlock, Heart, Instagram, MessageCircle, Mail, Music } from "lucide-react";
import { toast } from "sonner";

interface Location {
  id: number;
  name: string;
  icon: typeof Instagram;
  color: string;
  isUnlocked: boolean;
  message: string;
}

interface TreasureMapProps {
  onComplete: () => void;
}

const TreasureMap = ({ onComplete }: TreasureMapProps) => {
  const [locations, setLocations] = useState<Location[]>([
    {
      id: 1,
      name: "Instagram",
      icon: Instagram,
      color: "from-pink-500 to-purple-600",
      isUnlocked: false,
      message: "كل صورة نشرتها كانت تضيء يومي... 📸\nأنتِ أجمل ما في حياتي ✨",
    },
    {
      id: 2,
      name: "WhatsApp",
      icon: MessageCircle,
      color: "from-green-500 to-emerald-600",
      isUnlocked: false,
      message: "كل رسالة منك تجعل قلبي ينبض بسعادة 💚\nكلماتك تعني لي العالم 🌍",
    },
    {
      id: 3,
      name: "Gmail",
      icon: Mail,
      color: "from-red-500 to-orange-600",
      isUnlocked: false,
      message: "حتى في الرسائل الرسمية، كنتِ دائماً في تفكيري 💌\nكل تفصيلة تذكرني بكِ ❤️",
    },
    {
      id: 4,
      name: "Spotify",
      icon: Music,
      color: "from-green-400 to-green-700",
      isUnlocked: false,
      message: "كل أغنية استمعت لها كانت تحكي قصتنا 🎵\nأنتِ اللحن الأجمل في حياتي 🎶",
    },
  ]);

  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [showMessage, setShowMessage] = useState(false);

  const handleLocationClick = (location: Location) => {
    if (!location.isUnlocked) {
      setLocations((prev) =>
        prev.map((loc) =>
          loc.id === location.id ? { ...loc, isUnlocked: true } : loc
        )
      );
      setSelectedLocation(location);
      setShowMessage(true);
      toast.success(`اكتشفتِ رسالة في ${location.name}! 💝`);
    }
  };

  const allUnlocked = locations.every((loc) => loc.isUnlocked);

  const closeMessage = () => {
    setShowMessage(false);
    setSelectedLocation(null);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-10 left-10 w-32 h-32 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-secondary rounded-full blur-3xl" />
      </div>

      <div className="text-center space-y-6 mb-12 relative z-10">
        <div className="inline-block pulse-soft">
          <MapPin className="w-16 h-16 text-accent mx-auto" />
        </div>
        <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
          خريطة الكنز التفاعلية 🗺️
        </h2>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto">
          اذهبي إلى كل تطبيق واكتشفي الرسائل الخاصة التي تركتها لكِ... 💌
        </p>
      </div>

      <div className="grid grid-cols-2 gap-6 max-w-2xl mb-8 relative z-10">
        {locations.map((location) => {
          const Icon = location.icon;
          return (
            <button
              key={location.id}
              onClick={() => handleLocationClick(location)}
              className={`relative p-8 rounded-3xl shadow-magical transition-all hover:scale-105 ${
                location.isUnlocked
                  ? `bg-gradient-to-br ${location.color} opacity-70`
                  : `bg-gradient-to-br ${location.color} hover:shadow-glow`
              }`}
            >
              <div className="flex flex-col items-center space-y-4 text-white">
                <Icon className="w-12 h-12" />
                <span className="font-bold text-lg">{location.name}</span>
                {location.isUnlocked ? (
                  <Unlock className="w-6 h-6" />
                ) : (
                  <Lock className="w-6 h-6" />
                )}
              </div>
            </button>
          );
        })}
      </div>

      {allUnlocked && (
        <Button
          onClick={onComplete}
          size="lg"
          className="shine bg-gradient-to-r from-accent to-primary text-white px-12 py-6 text-xl rounded-2xl shadow-magical hover:scale-105 transition-all animate-fade-in relative z-10"
        >
          <Heart className="ml-2" fill="currentColor" />
          اكتشفي الهدية النهائية! 🎁
        </Button>
      )}

      {/* Message modal */}
      {showMessage && selectedLocation && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-6 animate-fade-in">
          <div className="bg-card p-8 rounded-3xl shadow-magical max-w-lg border-2 border-primary/20 space-y-6">
            <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${selectedLocation.color}`}>
              {(() => {
                const Icon = selectedLocation.icon;
                return <Icon className="w-10 h-10 text-white" />;
              })()}
            </div>
            <h3 className="text-2xl font-bold text-card-foreground">
              {selectedLocation.name}
            </h3>
            <p className="text-lg leading-relaxed text-card-foreground whitespace-pre-line">
              {selectedLocation.message}
            </p>
            <Button
              onClick={closeMessage}
              className="w-full bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90"
            >
              <Heart className="ml-2" fill="currentColor" />
              شكراً لكِ 💕
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TreasureMap;