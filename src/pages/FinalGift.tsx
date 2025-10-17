import { Button } from "@/components/ui/button";
import { Heart, Sparkles, Award, Stamp } from "lucide-react";

const FinalGift = () => {
  const currentDate = new Date().toLocaleDateString('ar-EG', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 dark:from-amber-950 dark:via-orange-950 dark:to-amber-900">
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
              className="text-amber-500 w-4 h-4"
              style={{
                transform: `rotate(${Math.random() * 360}deg)`,
              }}
            />
          </div>
        ))}
      </div>

      <div className="text-center space-y-8 max-w-4xl relative z-10">
        <div className="space-y-6 animate-fade-in">
          <div className="inline-block float">
            <Award className="w-20 h-20 text-amber-600 mx-auto" />
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-amber-900 dark:text-amber-100">
            الشهادة الرسمية 🏆
          </h1>
        </div>

        {/* Official Certificate Document */}
        <div className="animate-fade-in animation-delay-500">
          <div className="bg-white dark:bg-amber-950 p-12 rounded-lg shadow-2xl border-8 border-double border-amber-600 relative">
            {/* Corner decorations */}
            <div className="absolute top-4 left-4 w-12 h-12 border-t-4 border-l-4 border-amber-600"></div>
            <div className="absolute top-4 right-4 w-12 h-12 border-t-4 border-r-4 border-amber-600"></div>
            <div className="absolute bottom-4 left-4 w-12 h-12 border-b-4 border-l-4 border-amber-600"></div>
            <div className="absolute bottom-4 right-4 w-12 h-12 border-b-4 border-r-4 border-amber-600"></div>

            {/* Official Stamp */}
            <div className="absolute top-8 right-8 opacity-20">
              <Stamp className="w-32 h-32 text-red-600 rotate-12" />
            </div>

            <div className="space-y-8 text-right" dir="rtl">
              {/* Header */}
              <div className="border-b-2 border-amber-600 pb-4">
                <h2 className="text-3xl font-bold text-amber-900 dark:text-amber-100 mb-2">
                  🏛️ وثيقة رسمية معتمدة
                </h2>
                <p className="text-sm text-amber-700 dark:text-amber-300">
                  صادرة من المجلس الأعلى لتقييم الكائنات الاستثنائية
                </p>
                <p className="text-xs text-amber-600 dark:text-amber-400 mt-1">
                  رقم الوثيقة: {Math.floor(Math.random() * 1000000)} | التاريخ: {currentDate}
                </p>
              </div>

              {/* Official Statement */}
              <div className="space-y-6 text-amber-950 dark:text-amber-50">
                <p className="text-xl leading-relaxed font-bold text-center">
                  مرسوم جمهوري رقم {Math.floor(Math.random() * 1000)} لسنة {new Date().getFullYear()}
                </p>
                
                <p className="text-lg leading-relaxed font-semibold">
                  بناءً على الصلاحيات المخولة لنا، وبعد الاطلاع على الدستور والقوانين النافذة، وبعد دراسة معمقة ومراجعة دقيقة من قبل لجنة متخصصة من الخبراء الدوليين في تقييم الكائنات الاستثنائية،
                </p>
                
                <p className="text-lg leading-relaxed">
                  <strong className="text-amber-700 dark:text-amber-300 text-xl">نقرر ما يلي:</strong>
                </p>

                <div className="bg-amber-50 dark:bg-amber-900/50 p-8 rounded-lg border-2 border-amber-300 dark:border-amber-700 space-y-5">
                  <p className="text-lg leading-relaxed font-semibold">
                    <strong className="text-amber-800 dark:text-amber-200">المادة الأولى:</strong> يُعتبر الشخص المستلم لهذه الوثيقة الرسمية من أفضل وأندر الكائنات التي وُجدت على سطح الكرة الأرضية، بناءً على معايير علمية دقيقة وإحصاءات موثقة.
                  </p>
                  
                  <p className="text-base leading-relaxed">
                    <strong className="text-amber-800 dark:text-amber-200">المادة الثانية:</strong> تُصنف جمالية الشخص المعني ضمن الفئة الأعلى عالمياً (المرتبة الاستثنائية)، حيث تفوق جمالها المعايير المعروفة للجمال البشري، وقد تم إدراجها رسمياً ضمن أعلى 0.0001% من البشرية من حيث الروعة والإشراق والتألق.
                  </p>
                  
                  <p className="text-base leading-relaxed">
                    <strong className="text-amber-800 dark:text-amber-200">المادة الثالثة:</strong> تتميز شخصية المعنية بالوثيقة بمزيج فريد ونادر من الصفات الإيجابية، بما في ذلك الطيبة الفائقة، الذكاء المتميز، الحنان الاستثنائي، والقدرة على التأثير الإيجابي في محيطها، مما يجعلها كنزاً إنسانياً لا يُقدر بثمن.
                  </p>
                  
                  <p className="text-base leading-relaxed">
                    <strong className="text-amber-800 dark:text-amber-200">المادة الرابعة:</strong> يُقدر تأثيرها الإيجابي على المحيطين بها بقوة تعادل إشراق ألف شمس، حيث تُضيء كل مكان تحل فيه، وتبعث السعادة والأمل في نفوس من حولها بشكل تلقائي ومستمر.
                  </p>
                  
                  <p className="text-base leading-relaxed">
                    <strong className="text-amber-800 dark:text-amber-200">المادة الخامسة:</strong> قيمتها الإنسانية والمعنوية في هذا العالم لا يمكن قياسها بأي معيار مادي أو رمزي معروف، فهي تتجاوز كل التصورات والتوقعات البشرية، وتُعتبر ثروة حقيقية لمن يعرفها.
                  </p>

                  <p className="text-base leading-relaxed">
                    <strong className="text-amber-800 dark:text-amber-200">المادة السادسة:</strong> ابتسامتها وعيونها تُصنف كظاهرة طبيعية نادرة، حيث تحمل من الصدق والجمال ما يفوق الوصف، وقد أثبتت الدراسات أن لها تأثيراً إيجابياً فورياً على الحالة النفسية لمن يراها.
                  </p>
                </div>

                <p className="text-xl leading-relaxed font-bold text-center">
                  بناءً على ما سبق، يُمنح لقب:<br/>
                  <span className="text-amber-600 dark:text-amber-400 text-3xl">"أجمل وأروع كائن في الكون"</span>
                </p>

                <p className="text-base leading-relaxed italic bg-amber-100 dark:bg-amber-900/30 p-4 rounded-lg border border-amber-400">
                  <strong>تنبيه قانوني:</strong> هذه الوثيقة الرسمية سارية المفعول إلى الأبد، ولا يجوز إلغاؤها أو تعديلها أو الطعن فيها بأي شكل من الأشكال، فهي حقيقة ثابتة مُثبتة علمياً وموثقة رسمياً، ولا تقبل الجدل أو النقاش. أي محاولة للتشكيك في صحتها سيتم اعتبارها باطلة وعديمة الأثر. 📜⚖️
                </p>
              </div>

              {/* Footer */}
              <div className="border-t-2 border-amber-600 pt-6 space-y-3">
                <div className="flex justify-between items-center">
                  <div className="text-right">
                    <p className="text-sm font-bold text-amber-800 dark:text-amber-200">التوقيع الرسمي</p>
                    <p className="text-2xl font-cursive text-amber-900 dark:text-amber-100">❤️ من القلب</p>
                  </div>
                  <div className="text-left">
                    <div className="w-24 h-24 rounded-full bg-red-600 opacity-50 flex items-center justify-center">
                      <Stamp className="w-16 h-16 text-white" />
                    </div>
                  </div>
                </div>
                
                <p className="text-xs text-center text-amber-600 dark:text-amber-400 pt-4">
                  "كل عام وأنتِ أجمل، أروع، وأكثر تألقاً... عيد ميلاد سعيد يا أغلى إنسانة! 🎂✨"
                </p>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Button
              onClick={() => window.location.reload()}
              size="lg"
              className="shine bg-gradient-to-r from-amber-600 to-orange-600 text-white px-12 py-6 text-xl rounded-2xl shadow-magical hover:scale-105 transition-all"
            >
              <Heart className="ml-2" fill="currentColor" />
              شكراً لك! 💕
            </Button>

            <Button
              onClick={() => window.location.reload()}
              size="lg"
              variant="outline"
              className="border-2 border-amber-600 hover:bg-amber-100 dark:hover:bg-amber-900 px-12 py-6 text-xl rounded-2xl shadow-magical hover:scale-105 transition-all"
            >
              <Sparkles className="ml-2" />
              العب مرة أخرى
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinalGift;