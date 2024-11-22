import { useState, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

const AudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="bg-rock-dark p-6 rounded-lg shadow-lg">
      <audio
        ref={audioRef}
        src="https://stream-url-here" // Replace with actual stream URL
        className="hidden"
      />
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={togglePlay}
            className="bg-primary hover:bg-primary-dark transition-colors duration-200 rounded-full p-4"
          >
            {isPlaying ? (
              <Pause className="text-white" size={24} />
            ) : (
              <Play className="text-white" size={24} />
            )}
          </button>
          <div>
            <p className="text-white font-bold">Now Playing</p>
            <div className="flex items-center space-x-2">
              <span className="animate-pulse h-2 w-2 bg-primary rounded-full" />
              <span className="text-gray-400">Live Stream</span>
            </div>
          </div>
        </div>
        <button
          onClick={toggleMute}
          className="text-white hover:text-primary transition-colors duration-200"
        >
          {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
        </button>
      </div>
    </div>
  );
};

export default AudioPlayer;