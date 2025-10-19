import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Clock, CheckCircle } from "lucide-react";
import { toast } from "sonner";

interface EventOrderingGameProps {
  onComplete: () => void;
}

interface EventSet {
  title: string;
  events: string[];
}

const EventOrderingGame = ({ onComplete }: EventOrderingGameProps) => {
  const eventSets: EventSet[] = [
    {
      title: "مراحل اليوم",
      events: ["الفجر", "الصباح", "الظهر", "المساء", "الليل"]
    },
    {
      title: "مراحل النمو",
      events: ["رضيع", "طفل", "مراهق", "شاب", "كبير السن"]
    },
    {
      title: "فصول السنة",
      events: ["الربيع", "الصيف", "الخريف", "الشتاء"]
    },
    {
      title: "خطوات الطبخ",
      events: ["شراء المكونات", "غسل الخضار", "تقطيع المكونات", "الطبخ", "التقديم"]
    },
    {
      title: "مراحل التعليم",
      events: ["الروضة", "الابتدائية", "المتوسطة", "الثانوية", "الجامعة"]
    }
  ];

  const [currentSet, setCurrentSet] = useState<EventSet | null>(null);
  const [shuffledEvents, setShuffledEvents] = useState<string[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<string[]>([]);
  const [level, setLevel] = useState(0);
  const totalLevels = 5;

  useEffect(() => {
    loadNewLevel();
  }, []);

  const loadNewLevel = () => {
    const set = eventSets[level];
    setCurrentSet(set);
    const shuffled = [...set.events].sort(() => Math.random() - 0.5);
    setShuffledEvents(shuffled);
    setSelectedOrder([]);
  };

  const handleEventClick = (event: string) => {
    if (selectedOrder.includes(event)) {
      // إزالة الحدث إذا كان مختاراً بالفعل
      setSelectedOrder(selectedOrder.filter(e => e !== event));
    } else {
      // إضافة الحدث إلى الترتيب
      setSelectedOrder([...selectedOrder, event]);
    }
  };

  const handleSubmit = () => {
    if (!currentSet) return;
    
    if (selectedOrder.length !== currentSet.events.length) {
      toast.error("يجب اختيار جميع الأحداث!");
      return;
    }

    // التحقق من الترتيب الصحيح
    const isCorrect = selectedOrder.every((event, index) => event === currentSet.events[index]);

    if (isCorrect) {
      toast.success("ترتيب صحيح! أحسنت!");
      
      if (level >= totalLevels - 1) {
        toast.success("رائع! لقد أكملت التحدي!");
        setTimeout(onComplete, 1500);
      } else {
        setLevel(level + 1);
        setTimeout(() => {
          loadNewLevel();
        }, 1000);
      }
    } else {
      toast.error("الترتيب غير صحيح، حاولي مرة أخرى!");
      setSelectedOrder([]);
    }
  };

  const handleReset = () => {
    setSelectedOrder([]);
  };

  if (!currentSet) return null;

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5" />
      
      <div className="max-w-3xl w-full space-y-8 relative z-10 animate-fade-in">
        <div className="text-center space-y-4">
          <Clock className="w-16 h-16 text-accent mx-auto pulse-soft" />
          <h2 className="text-4xl font-bold text-foreground">لعبة ترتيب الأحداث</h2>
          <p className="text-lg text-muted-foreground">رتبي الأحداث حسب تسلسلها الصحيح</p>
          <div className="flex justify-center gap-4 text-sm">
            <span className="text-muted-foreground">المستوى: {level + 1}/{totalLevels}</span>
          </div>
        </div>

        <div className="bg-card p-8 rounded-3xl shadow-magical border-2 border-primary/20 space-y-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-foreground mb-2">{currentSet.title}</h3>
            <p className="text-muted-foreground">اضغطي على الأحداث بالترتيب الصحيح</p>
          </div>

          {/* الأحداث المختلطة */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-muted-foreground text-center">الأحداث:</h4>
            <div className="flex flex-wrap gap-3 justify-center">
              {shuffledEvents.map((event, index) => {
                const orderIndex = selectedOrder.indexOf(event);
                const isSelected = orderIndex !== -1;
                
                return (
                  <Button
                    key={index}
                    onClick={() => handleEventClick(event)}
                    variant={isSelected ? "default" : "outline"}
                    className="min-w-[120px] relative text-lg py-6"
                  >
                    {event}
                    {isSelected && (
                      <span className="absolute -top-2 -right-2 w-7 h-7 bg-accent text-accent-foreground rounded-full flex items-center justify-center text-sm font-bold">
                        {orderIndex + 1}
                      </span>
                    )}
                  </Button>
                );
              })}
            </div>
          </div>

          {/* الترتيب المختار */}
          {selectedOrder.length > 0 && (
            <div className="bg-muted/50 p-6 rounded-2xl">
              <h4 className="text-sm font-medium text-muted-foreground text-center mb-4">الترتيب المختار:</h4>
              <div className="flex flex-wrap gap-2 justify-center">
                {selectedOrder.map((event, index) => (
                  <div key={index} className="flex items-center gap-2 bg-background px-4 py-2 rounded-lg">
                    <span className="w-6 h-6 bg-accent text-accent-foreground rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </span>
                    <span className="text-foreground">{event}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* الأزرار */}
          <div className="flex gap-4 justify-center">
            <Button
              onClick={handleReset}
              variant="outline"
              disabled={selectedOrder.length === 0}
              className="min-w-[120px]"
            >
              إعادة تعيين
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={selectedOrder.length !== currentSet.events.length}
              className="min-w-[120px]"
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              تحقق
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventOrderingGame;
