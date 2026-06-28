import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface CinematicSceneProps {
  image: string;
  narratorText: string;
  isActive: boolean;
  isFirst?: boolean;
}

export function CinematicScene({ image, narratorText, isActive, isFirst }: CinematicSceneProps) {
  return (
    <AnimatePresence mode="wait">
      {isActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="fixed inset-0 w-full h-full overflow-hidden bg-black"
        >
          {/* Background Image with Zoom Effect */}
          <motion.div
            initial={{ scale: isFirst ? 1.2 : 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 10, ease: "linear" }}
            className="absolute inset-0 w-full h-full"
          >
            <img
              src={image}
              alt="Cinematic Scene"
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Overlays */}
          <div className="absolute inset-0 vignette pointer-events-none" />
          <div className="absolute inset-0 mist-overlay pointer-events-none" />
          
          {/* Grain Effect */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />

          {/* Subtitles / Narrator Text */}
          <div className="absolute bottom-12 left-0 right-0 flex justify-center px-6 pointer-events-none">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 1 }}
              className="max-w-3xl text-center text-white text-xl md:text-2xl font-garamond italic text-shadow-cinematic"
            >
              "{narratorText}"
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
