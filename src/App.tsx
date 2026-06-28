import { useState, useEffect, useCallback, useRef } from "react";
import { CinematicScene } from "./components/CinematicScene";
import { AmbientSoundtrack } from "./components/AmbientSoundtrack";
import { ChevronDown, ChevronUp, Share2, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

const storyData = [
  {
    id: 1,
    image: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/fda123c2-b46f-4edb-9f36-fd1799586241/scene-1--call-of-the-wild-6b90a0c8-1782644973603.webp",
    text: "Hidden deep within Scotland's mist-covered Highlands lived a man who abandoned civilization... and chose the wild instead.",
  },
  {
    id: 2,
    image: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/fda123c2-b46f-4edb-9f36-fd1799586241/scene-2--the-rescue-7f1fffb6-1782644973818.webp",
    text: "At only twenty years old, Ewan made a choice that would change his life forever. He rescued a dying wolf pup... never knowing they would become family.",
  },
  {
    id: 3,
    image: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/fda123c2-b46f-4edb-9f36-fd1799586241/scene-3--brothers-of-the-forest-1dc9f546-1782644973810.webp",
    text: "Days became months. Months became years. The wolf, Skoll, never left his side.",
  },
  {
    id: 4,
    image: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/fda123c2-b46f-4edb-9f36-fd1799586241/scene-4--becoming-the-wolf-569f2a26-1782644974640.webp",
    text: "He no longer lived like ordinary men. He hunted with a spear, slept beneath the stars, and learned the silent language of wolves.",
  },
  {
    id: 5,
    image: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/fda123c2-b46f-4edb-9f36-fd1799586241/scene-5--spirit-of-the-north-a1388d7e-1782644974980.webp",
    text: "Though born in Scotland, Ewan admired the fearless warriors of the North. To him, courage, loyalty, and honor were worth more than gold.",
  },
  {
    id: 6,
    image: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/fda123c2-b46f-4edb-9f36-fd1799586241/scene-6--the-legend-f6dc84ee-1782644975000.webp",
    text: "Then came the winter no one forgot. Hunters searching for wolves instead found something impossible... A man accepted as one of the pack.",
  },
  {
    id: 7,
    image: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/fda123c2-b46f-4edb-9f36-fd1799586241/scene-7--the-mystery-22f32e4f-1782644977254.webp",
    text: "Years later, Ewan disappeared without a trace. Some believe he died in the Highlands... Others swear that on cold, moonlit nights, a lone warrior still walks beside a great gray wolf.",
  },
  {
    id: 8,
    image: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/fda123c2-b46f-4edb-9f36-fd1799586241/ending--the-wolf-s-gaze-a091b8f9-1782644976912.webp",
    text: "And when the wind carries a distant howl... they say the Wolf of Scotland is still guarding the forest.",
  },
];

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const touchStartY = useRef<number | null>(null);

  const nextScene = useCallback(() => {
    if (currentIndex < storyData.length - 1 && !isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex((prev) => prev + 1);
      setTimeout(() => setIsTransitioning(false), 1500);
    }
  }, [currentIndex, isTransitioning]);

  const prevScene = useCallback(() => {
    if (currentIndex > 0 && !isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex((prev) => prev - 1);
      setTimeout(() => setIsTransitioning(false), 1500);
    }
  }, [currentIndex, isTransitioning]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "ArrowRight" || e.key === " ") nextScene();
      if (e.key === "ArrowUp" || e.key === "ArrowLeft") prevScene();
    };

    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > 50) {
        if (e.deltaY > 0) nextScene();
        else prevScene();
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (touchStartY.current === null) return;
      const touchEndY = e.changedTouches[0].clientY;
      const deltaY = touchStartY.current - touchEndY;
      if (Math.abs(deltaY) > 50) {
        if (deltaY > 0) nextScene();
        else prevScene();
      }
      touchStartY.current = null;
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("wheel", handleWheel);
    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchend", handleTouchEnd);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [nextScene, prevScene]);

  return (
    <div className="min-h-screen bg-black text-white font-cinzel overflow-hidden">
      <AmbientSoundtrack />

      {/* Story Scenes */}
      {storyData.map((scene, index) => (
        <CinematicScene
          key={scene.id}
          image={scene.image}
          narratorText={scene.text}
          isActive={index === currentIndex}
          isFirst={index === 0}
        />
      ))}

      {/* Sound Reminder (First Scene only) */}
      <AnimatePresence>
        {currentIndex === 0 && (
          <motion.div exit={{ opacity: 0 }} className="fixed top-24 right-8 z-40 text-white/40 text-[10px] uppercase tracking-widest font-sans flex items-center gap-2">
            <span>Enable Sound</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation Indicators */}
      <div className="fixed left-6 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-40">
        {storyData.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (!isTransitioning) {
                setIsTransitioning(true);
                setCurrentIndex(index);
                setTimeout(() => setIsTransitioning(false), 1500);
              }
            }}
            className={`w-1 h-12 transition-all duration-500 rounded-full ${
              index === currentIndex ? "bg-white scale-x-150" : "bg-white/20 hover:bg-white/40"
            }`}
          />
        ))}
      </div>

      {/* Interaction Hints */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-2">
        <AnimatePresence>
          {currentIndex < storyData.length - 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="flex flex-col items-center cursor-pointer"
              onClick={nextScene}
            >
              <p className="text-[10px] uppercase tracking-[0.3em] mb-1">Scroll to begin</p>
              <ChevronDown size={24} className="animate-bounce" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Final Call to Action */}
      <AnimatePresence>
        {currentIndex === storyData.length - 1 && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 1 }}
            className="fixed inset-0 flex flex-col items-center justify-center z-50 bg-black/60 backdrop-blur-sm px-6"
          >
            <h2 className="text-4xl md:text-6xl font-cinzel text-center mb-8 tracking-wider">
              Would you leave civilization behind to live among wolves?
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-white text-black hover:bg-white/80 font-cinzel text-lg px-8 py-6">
                <MessageCircle className="mr-2" /> Comment Below
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 font-cinzel text-lg px-8 py-6">
                <Share2 className="mr-2" /> Subscribe for More
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
