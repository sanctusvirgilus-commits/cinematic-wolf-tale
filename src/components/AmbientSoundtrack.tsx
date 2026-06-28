import { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX, Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

export function AmbientSoundtrack() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.4);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Using a royalty free cinematic atmospheric track
  const trackUrl = "https://assets.mixkit.co/music/preview/mixkit-cinematic-horror-atmosphere-593.mp3";

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.error("Audio playback failed", e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="fixed top-6 right-6 z-50 flex items-center gap-4 bg-black/40 backdrop-blur-md p-3 rounded-full border border-white/10">
      <audio ref={audioRef} src={trackUrl} loop />
      
      <Button
        variant="ghost"
        size="icon"
        onClick={togglePlay}
        className="text-white hover:bg-white/20 rounded-full"
      >
        {isPlaying ? <Pause size={20} /> : <Play size={20} />}
      </Button>

      <div className="flex items-center gap-2 w-24">
        {volume === 0 ? <VolumeX size={16} className="text-white/60" /> : <Volume2 size={16} className="text-white/60" />}
        <Slider
          value={[volume * 100]}
          onValueChange={(vals) => setVolume(vals[0] / 100)}
          max={100}
          step={1}
          className="w-full"
        />
      </div>
    </div>
  );
}
