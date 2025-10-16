import { useState } from "react";
import Welcome from "./Welcome";
import MessageScreen from "./MessageScreen";
import MemoryGame from "@/components/games/MemoryGame";
import PuzzleGame from "@/components/games/PuzzleGame";
import QuizGame from "@/components/games/QuizGame";
import GiftBox from "./GiftBox";
import TreasureMap from "./TreasureMap";
import FinalGift from "./FinalGift";

const messages = [
  "أنتِ شخص مميز جداً في حياتي... 💕\nكل لحظة معكِ هي ذكرى جميلة أحتفظ بها في قلبي ✨",
  "رحلتك لم تنتهي بعد... 🌟\nما زال هناك المزيد من المفاجآت!",
  "كل مرحلة أكملتيها تقربك أكثر من هديتك الخاصة... 🎁\nأنتِ تقومين بعمل رائع! 💪",
  "الآن جاء وقت الحصول على هديتك! 🎉\nلكن... هل أنتِ مستعدة؟ 💝",
];

type Stage =
  | "welcome"
  | "message1"
  | "game1"
  | "message2"
  | "game2"
  | "message3"
  | "game3"
  | "message4"
  | "giftbox"
  | "treasuremap"
  | "finalgift";

const Index = () => {
  const [currentStage, setCurrentStage] = useState<Stage>("welcome");

  const nextStage = () => {
    const stages: Stage[] = [
      "welcome",
      "message1",
      "game1",
      "message2",
      "game2",
      "message3",
      "game3",
      "message4",
      "giftbox",
      "treasuremap",
      "finalgift",
    ];
    const currentIndex = stages.indexOf(currentStage);
    if (currentIndex < stages.length - 1) {
      setCurrentStage(stages[currentIndex + 1]);
    }
  };

  return (
    <>
      {currentStage === "welcome" && <Welcome onStart={nextStage} />}
      {currentStage === "message1" && (
        <MessageScreen message={messages[0]} onContinue={nextStage} />
      )}
      {currentStage === "game1" && <MemoryGame onComplete={nextStage} />}
      {currentStage === "message2" && (
        <MessageScreen message={messages[1]} onContinue={nextStage} />
      )}
      {currentStage === "game2" && <PuzzleGame onComplete={nextStage} />}
      {currentStage === "message3" && (
        <MessageScreen message={messages[2]} onContinue={nextStage} />
      )}
      {currentStage === "game3" && <QuizGame onComplete={nextStage} />}
      {currentStage === "message4" && (
        <MessageScreen message={messages[3]} onContinue={nextStage} />
      )}
      {currentStage === "giftbox" && <GiftBox onUnlock={nextStage} />}
      {currentStage === "treasuremap" && <TreasureMap onComplete={nextStage} />}
      {currentStage === "finalgift" && <FinalGift />}
    </>
  );
};

export default Index;