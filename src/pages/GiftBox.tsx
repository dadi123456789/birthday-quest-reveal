import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Gift, Camera, Sparkles, Loader2 } from "lucide-react";
import { toast } from "sonner";
import * as faceLandmarksDetection from '@tensorflow-models/face-landmarks-detection';
import '@tensorflow/tfjs-core';
import '@tensorflow/tfjs-backend-webgl';

interface GiftBoxProps {
  onUnlock: () => void;
}

const GiftBox = ({ onUnlock }: GiftBoxProps) => {
  const [isLocked, setIsLocked] = useState(true);
  const [showCamera, setShowCamera] = useState(false);
  const [isDetecting, setIsDetecting] = useState(false);
  const [detectionMessage, setDetectionMessage] = useState("ابتسمي من القلب... 💕");
  const videoRef = useRef<HTMLVideoElement>(null);
  const detectorRef = useRef<faceLandmarksDetection.FaceLandmarksDetector | null>(null);
  const animationFrameRef = useRef<number>();

  const handleBoxClick = () => {
    if (isLocked) {
      toast.info("هذه الهدية لا تفتح بالضغط، ولا بالكود... 💝", {
        description: "بل فقط عندما ينبض قلبك من الصدق ✨",
      });
    }
  };

  const detectSmile = (face: any) => {
    try {
      const keypoints = face.keypoints;
      
      // نقاط الشفاه العلوية والسفلية
      const upperLip = keypoints[13]; // نقطة الشفة العلوية الوسطى
      const lowerLip = keypoints[14]; // نقطة الشفة السفلية الوسطى
      const leftMouth = keypoints[61]; // زاوية الفم اليسرى
      const rightMouth = keypoints[291]; // زاوية الفم اليمنى
      
      // حساب المسافة العمودية بين الشفاه
      const lipDistance = Math.abs(upperLip.y - lowerLip.y);
      
      // حساب عرض الفم
      const mouthWidth = Math.abs(leftMouth.x - rightMouth.x);
      
      // الابتسامة تكون عندما يكون الفم عريضاً والشفاه قريبة من بعضها
      const smileRatio = mouthWidth / lipDistance;
      
      // إذا كان النسبة أكبر من 6، يعني هناك ابتسامة
      return smileRatio > 6;
    } catch (error) {
      return false;
    }
  };

  const startDetection = async () => {
    if (!videoRef.current) return;
    
    const detect = async () => {
      if (!videoRef.current || !detectorRef.current || !showCamera) return;
      
      try {
        const faces = await detectorRef.current.estimateFaces(videoRef.current, {
          flipHorizontal: false,
        });
        
        if (faces.length > 0) {
          setDetectionMessage("رائع! أراك... الآن ابتسمي! 😊");
          
          const isSmiling = detectSmile(faces[0]);
          
          if (isSmiling) {
            setDetectionMessage("ابتسامة جميلة! 🌟");
            
            // انتظر ثانية للتأكد من الابتسامة
            setTimeout(() => {
              toast.success("رأيت ابتسامتك الجميلة! 😊");
              stopCamera();
              setIsLocked(false);
              setTimeout(onUnlock, 1000);
            }, 1000);
            
            return;
          }
        } else {
          setDetectionMessage("من فضلك، انظري للكاميرا 👀");
        }
        
        animationFrameRef.current = requestAnimationFrame(detect);
      } catch (error) {
        console.error("Error detecting:", error);
        animationFrameRef.current = requestAnimationFrame(detect);
      }
    };
    
    detect();
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach((track) => track.stop());
    }
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    setShowCamera(false);
    setIsDetecting(false);
  };

  const handleSmileAttempt = async () => {
    setShowCamera(true);
    setIsDetecting(true);
    setDetectionMessage("جاري تحميل كاشف الابتسامة... ⏳");
    
    try {
      // تشغيل الكاميرا
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: 640, 
          height: 480,
          facingMode: 'user'
        } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        
        // انتظار تحميل الفيديو
        await new Promise((resolve) => {
          if (videoRef.current) {
            videoRef.current.onloadedmetadata = resolve;
          }
        });
        
        setDetectionMessage("جاري تحميل نموذج الكشف... 🤖");
        
        // تحميل نموذج كشف الوجه
        const model = faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh;
        const detectorConfig: faceLandmarksDetection.MediaPipeFaceMeshMediaPipeModelConfig = {
          runtime: 'mediapipe',
          solutionPath: 'https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh',
          refineLandmarks: true,
        };
        
        detectorRef.current = await faceLandmarksDetection.createDetector(model, detectorConfig);
        
        setDetectionMessage("جاهز! انظري للكاميرا... 👀");
        setIsDetecting(false);
        
        // بدء الكشف
        startDetection();
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("لم نستطع الوصول للكاميرا! تأكدي من منح الإذن 📷");
      stopCamera();
    }
  };

  useEffect(() => {
    return () => {
      stopCamera();
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
                بل فقط عندما ينبض قلبك من الصدق." 💝
              </p>
            </div>

            <div className="flex justify-center">
              <Button
                onClick={handleSmileAttempt}
                size="lg"
                disabled={showCamera}
                className="shine bg-gradient-to-r from-primary to-secondary text-white px-8 py-6 text-lg rounded-2xl shadow-magical hover:scale-105 transition-all"
              >
                <Camera className="ml-2" />
                ابتسمي للكاميرا 😊
              </Button>
            </div>
          </div>
        )}

        {/* Camera view */}
        {showCamera && (
          <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
            <div className="space-y-6 text-center">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full max-w-2xl h-auto object-cover rounded-3xl shadow-magical border-4 border-primary"
              />
              
              <div className="space-y-4">
                <p className="text-white text-2xl font-bold flex items-center justify-center gap-2">
                  {isDetecting && <Loader2 className="animate-spin" />}
                  {detectionMessage}
                </p>
                
                <Button
                  onClick={stopCamera}
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