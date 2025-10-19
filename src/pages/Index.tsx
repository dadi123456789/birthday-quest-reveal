import { useState } from "react";
import Welcome from "./Welcome";
import MessageScreen from "./MessageScreen";
import MemoryGame from "@/components/games/MemoryGame";
import PuzzleGame from "@/components/games/PuzzleGame";
import QuizGame from "@/components/games/QuizGame";
import WordArrangementGame from "@/components/games/WordArrangementGame";
import LogicPuzzleGame from "@/components/games/LogicPuzzleGame";
import SequenceGame from "@/components/games/SequenceGame";
import MathPuzzleGame from "@/components/games/MathPuzzleGame";
import PatternRecognitionGame from "@/components/games/PatternRecognitionGame";
import GiftBox from "./GiftBox";
import TreasureMap from "./TreasureMap";
import FinalGift from "./FinalGift";

const messages = [
  "في عالم مليء بالوجوه، هناك وجوه تترك بصمة لا تُمحى ✨\nوأنتِ من تلك الوجوه التي أضاءت الدرب بطريقة ساحرة 🌟",
  "كل يوم هو صفحة جديدة في كتاب الحياة 📖\nوأنتِ تكتبين أجمل الفصول بابتسامتك وروحك المميزة 💫",
  "الجمال الحقيقي ليس في الظاهر فقط، بل في القلب والروح 💎\nوأنتِ تمتلكين من كليهما ما يجعلك استثنائية بكل معنى الكلمة ✨",
  "في زحمة الحياة، نادراً ما نلتقي بأشخاص حقيقيين 🌸\nوأنتِ من أولئك النادرين الذين يستحقون كل التقدير والاحترام 🎭",
  "الذكريات الجميلة هي كنوز نحتفظ بها في القلب 🏆\nوكل لحظة قضيتها معك كانت إضافة قيّمة لهذا الكنز الثمين 💝",
  "القوة الحقيقية تكمن في البقاء صادقاً مع نفسك 🦋\nوأنتِ تملكين هذه القوة بشكل يثير الإعجاب والإلهام 🌈",
  "في عالم يتغير باستمرار، الثابت الوحيد هو الأثر الذي نتركه 🌠\nوأنتِ تتركين أثراً جميلاً أينما ذهبتِ وفي كل من تلقينه 🎪",
  "الحياة ليست مجرد أيام تمر، بل لحظات نعيشها بصدق 🎨\nوكل لحظة معك كانت لوحة فنية رائعة الجمال 🖼️",
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
  | "game4"
  | "message5"
  | "game5"
  | "message6"
  | "game6"
  | "message7"
  | "game7"
  | "message8"
  | "game8"
  | "message9"
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
      "game4",
      "message5",
      "game5",
      "message6",
      "game6",
      "message7",
      "game7",
      "message8",
      "game8",
      "message9",
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
      {currentStage === "game4" && <WordArrangementGame onComplete={nextStage} />}
      {currentStage === "message5" && (
        <MessageScreen message={messages[4]} onContinue={nextStage} />
      )}
      {currentStage === "game5" && <LogicPuzzleGame onComplete={nextStage} />}
      {currentStage === "message6" && (
        <MessageScreen message={messages[5]} onContinue={nextStage} />
      )}
      {currentStage === "game6" && <SequenceGame onComplete={nextStage} />}
      {currentStage === "message7" && (
        <MessageScreen message={messages[6]} onContinue={nextStage} />
      )}
      {currentStage === "game7" && <MathPuzzleGame onComplete={nextStage} />}
      {currentStage === "message8" && (
        <MessageScreen message={messages[7]} onContinue={nextStage} />
      )}
      {currentStage === "game8" && <PatternRecognitionGame onComplete={nextStage} />}
      {currentStage === "message9" && (
        <MessageScreen message={messages[7]} onContinue={nextStage} />
      )}
      {currentStage === "giftbox" && <GiftBox onUnlock={nextStage} />}
      {currentStage === "treasuremap" && <TreasureMap onComplete={nextStage} />}
      {currentStage === "finalgift" && <FinalGift />}
    </>
  );
};

export default Index;