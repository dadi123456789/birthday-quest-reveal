import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Lock, Unlock, Heart, Instagram, MessageCircle, Facebook, Send } from "lucide-react";
import { toast } from "sonner";

interface Location {
  id: number;
  name: string;
  icon: typeof Instagram;
  color: string;
  isUnlocked: boolean;
  message: string;
  secretPhrase: string;
  hint: string;
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
      message: "مادامت تضحكين و مادمت سعيدة فأنا دائما سعيد 😊\nابتسامتك تضيء أيامي وتجعل كل شيء أجمل 🌟",
      secretPhrase: "مادامت تضحكين و مادمت سعيدة فأنا دائما سعيد",
      hint: "ابحثي في آخر منشور لي على Instagram... 📸",
    },
    {
      id: 2,
      name: "Snapchat",
      icon: MessageCircle,
      color: "from-yellow-400 to-yellow-600",
      isUnlocked: false,
      message: "الحياة قصيرة و قد نتوه في مشاكلها لكن ما سأقوله لك هو شيء واحد لا تتركي أبدا ابتسامتك فهي حقا تبعث بشعور جميل 😊\nابتسامتك هي أثمن ما فيكِ 💛",
      secretPhrase: "الحياة قصيرة و قد نتوه في مشاكلها لكن ما سأقوله لك هو شيء واحد لا تتركي أبدا ابتسامتك فهي حقا تبعث بشعور جميل",
      hint: "انظري في وصف حالتي على Snapchat... 👻",
    },
    {
      id: 3,
      name: "Facebook",
      icon: Facebook,
      color: "from-blue-500 to-blue-700",
      isUnlocked: false,
      message: "كنت من افضل الناس التي تعرفت عليهم و كنت من الافضل للأن فكوني دائما الافضل لا تتغيري 💙\nأنتِ مميزة بطريقتك الخاصة 🌟",
      secretPhrase: "كنت من افضل الناس التي تعرفت عليهم و كنت من الافضل للأن فكوني دائما الافضل لا تتغيري",
      hint: "تفقدي قصتي الأخيرة على Facebook... 💙",
    },
    {
      id: 4,
      name: "Telegram",
      icon: Send,
      color: "from-cyan-400 to-blue-500",
      isUnlocked: false,
      message: "اتعلمين لما أحب العينين؟ لأنهما اكثر المناطق صدقا في الانسان و انت عندك من أجمل عينين صدقا اتمنى لك عيد ميلاد سعيد 🎂\nعيونك تحكي قصة جميلة ✨",
      secretPhrase: "اتعلمين لما أحب العينين؟ لأنهما اكثر المناطق صدقا في الانسان و انت عندك من أجمل عينين صدقا اتمنى لك عيد ميلاد سعيد",
      hint: "شاهدي رسالتي المثبتة على Telegram... 💌",
    },
  ]);

  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [showMessage, setShowMessage] = useState(false);
  const [showPhraseInput, setShowPhraseInput] = useState(false);
  const [userInput, setUserInput] = useState("");

  const handleLocationClick = (location: Location) => {
    if (!location.isUnlocked) {
      setSelectedLocation(location);
      setShowPhraseInput(true);
      setUserInput("");
    }
  };

  const handlePhraseSubmit = () => {
    if (!selectedLocation) return;
    
    if (userInput.trim().toLowerCase() === selectedLocation.secretPhrase.toLowerCase()) {
      setLocations((prev) =>
        prev.map((loc) =>
          loc.id === selectedLocation.id ? { ...loc, isUnlocked: true } : loc
        )
      );
      setShowPhraseInput(false);
      setShowMessage(true);
      toast.success(`اكتشفتِ رسالة في ${selectedLocation.name}! 💝`);
    } else {
      toast.error("الجملة غير صحيحة! حاولي مرة أخرى 🔒");
    }
  };

  const allUnlocked = locations.every((loc) => loc.isUnlocked);

  const closeMessage = () => {
    setShowMessage(false);
    setSelectedLocation(null);
  };

  const closePhraseInput = () => {
    setShowPhraseInput(false);
    setSelectedLocation(null);
    setUserInput("");
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

      {/* Phrase input modal */}
      {showPhraseInput && selectedLocation && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-6 animate-fade-in">
          <div className="bg-card p-8 rounded-3xl shadow-magical max-w-lg border-2 border-primary/20 space-y-6">
            <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${selectedLocation.color}`}>
              {(() => {
                const Icon = selectedLocation.icon;
                return <Icon className="w-10 h-10 text-white" />;
              })()}
            </div>
            <h3 className="text-2xl font-bold text-card-foreground">
              🔒 {selectedLocation.name}
            </h3>
            <p className="text-lg leading-relaxed text-card-foreground">
              {selectedLocation.hint}
            </p>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                اكتبي الجملة السرية التي وجدتيها:
              </p>
              <Textarea
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="اكتبي الجملة هنا..."
                className="min-h-[100px] text-lg"
                dir="rtl"
              />
            </div>
            <div className="flex gap-3">
              <Button
                onClick={handlePhraseSubmit}
                className="flex-1 bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90"
              >
                <Unlock className="ml-2" />
                تحقق
              </Button>
              <Button
                onClick={closePhraseInput}
                variant="outline"
                className="flex-1"
              >
                إلغاء
              </Button>
            </div>
          </div>
        </div>
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