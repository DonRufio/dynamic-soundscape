import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX, Play, Square } from 'lucide-react';
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";
import { fetchRadioMetadata, type RadioMetadata } from '@/utils/radioMetadata';
import { fetchAlbumArtwork } from '@/utils/albumArtwork';
import { fetchStreamHistory, type StreamHistory } from '@/utils/streamHistory';

const STREAM_URL = 'https://therock-airserv.radioca.st/;stream.mp3';
const METADATA_CHECK_INTERVAL = 5000; // Poll every 5 seconds

const AudioPlayer = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5); // Default volume to 50%
  const [isMuted, setIsMuted] = useState(false);
  const [playStartTime, setPlayStartTime] = useState<number | null>(null); // Tracks playback start time
  const { toast } = useToast();
  const [currentTrack, setCurrentTrack] = useState<RadioMetadata>({
    title: 'Loading...',
    artist: 'The Rock Radio',
  });
  const [albumArtwork, setAlbumArtwork] = useState<string>('./placeholder.svg');
  const [streamHistory, setStreamHistory] = useState<StreamHistory>([]); // State for stream history
  const metadataIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const updateMetadataAndHistory = async () => {
    try {
      const metadata = await fetchRadioMetadata();
      console.log('Fetched new metadata:', metadata);

      const history = await fetchStreamHistory();
      console.log('Fetched stream history:', history);

      // Skip if it's still in the "Loading..." state
      if (metadata.title === 'Loading...' && metadata.artist === 'The Rock Radio') {
        console.log('Skipping update, metadata is still loading...');
        return;
      }

      // Normalize strings to avoid issues with leading/trailing spaces or casing
      const normalizedTitle = metadata.title.trim().toLowerCase();
      const normalizedArtist = metadata.artist.trim().toLowerCase();
      const currentNormalizedTitle = currentTrack.title.trim().toLowerCase();
      const currentNormalizedArtist = currentTrack.artist.trim().toLowerCase();

      // Check if the track has changed
      const hasTrackChanged =
        normalizedTitle !== currentNormalizedTitle ||
        normalizedArtist !== currentNormalizedArtist;

      if (hasTrackChanged) {
        console.log('Track changed, updating metadata:', metadata);

        // Determine if a delay should be applied
        const now = Date.now();
        if (playStartTime && now - playStartTime >= 30000) {
          // Apply delay only if the stream has been playing for at least 30 seconds
          await new Promise(resolve => setTimeout(resolve, 35000));
        }

        // Update current track state
        setCurrentTrack(metadata);

        // Update stream history
        setStreamHistory(history);

        // Fetch album artwork if artist and title are valid
        if (metadata.artist !== 'The Rock Radio' && metadata.title !== 'Loading...') {
          const artwork = await fetchAlbumArtwork(metadata.artist, metadata.title);
          setAlbumArtwork(artwork);
        }
      }
    } catch (error) {
      console.error('Failed to update metadata or stream history:', error);
    }
  };

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
        setPlayStartTime(null); // Reset playback start time
        toast({
          title: 'Playback stopped',
          description: 'The Rock Radio stream has been paused',
        });
      } else {
        if (audioRef.current.paused) {
          audioRef.current
            .play()
            .then(() => {
              setPlayStartTime(Date.now()); // Record playback start time
              updateMetadataAndHistory(); // Update metadata immediately when play is clicked
              setIsPlaying(true);
            })
            .catch(error => {
              console.error('Playback failed:', error);
              toast({
                variant: 'destructive',
                title: 'Playback failed',
                description: 'Unable to play the radio stream. Please try again.',
              });
            });
        }
      }
    }
  };

  const handleVolumeChange = (newValue: number[]) => {
    const volumeValue = newValue[0];
    setVolume(volumeValue);
    if (audioRef.current) {
      audioRef.current.volume = volumeValue;
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(STREAM_URL);
      audioRef.current.volume = volume;
    }

    if (isPlaying) {
      metadataIntervalRef.current = setInterval(updateMetadataAndHistory, METADATA_CHECK_INTERVAL);
    }

    return () => {
      if (metadataIntervalRef.current) {
        clearInterval(metadataIntervalRef.current);
      }
    };
  }, [volume, isPlaying]);

  return (
    <div className="w-full max-w-8xl bg-rock-dark p-8 rounded-lg shadow-xl flex flex-col lg:flex-row gap-10">
      {/* Player Section */}
      <div className="w-full lg:w-1/2 flex-shrink-0 pr-8">
        <div className="mb-6">
          <img
            src={albumArtwork}
            alt="Album Art"
            className="w-full aspect-square object-cover rounded-lg mb-4 shadow-lg"
          />
          <h2 className="text-white font-bold text-xl truncate mb-1">{currentTrack.title}</h2>
          <p className="text-gray-400 text-sm truncate">{currentTrack.artist}</p>
        </div>

        <div className="flex items-center justify-between gap-4">
          <button
            onClick={togglePlay}
            className="bg-primary hover:bg-primary-dark text-white p-3 rounded-full transition-colors"
          >
            {isPlaying ? <Square size={24} /> : <Play size={24} />}
          </button>

          <div className="flex items-center gap-4 flex-1">
            <button
              onClick={toggleMute}
              className="text-white hover:text-primary transition-colors"
            >
              {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
            </button>
            <Slider
              value={[volume]}
              max={1}
              step={0.01}
              onValueChange={handleVolumeChange}
              className="flex-1"
            />
          </div>
        </div>
      </div>

      {/* Stream History Section */}
      <div className="w-full lg:w-1/2 bg-rock-light p-8 rounded-lg shadow-md overflow-hidden">
  <h3 className="text-white font-bold text-lg mb-4">Recently Played</h3>
  <div className="space-y-2 text-xs max-h-64 ">
    {streamHistory.slice(1).map((entry, index) => (
      <div
        key={index}
        className="p-1 bg-rock-dark rounded-md shadow-sm flex items-center"
      >
        <span className="text-gray-400 font-medium truncate mr-2 w-1/4">{entry.time}</span>
        <span className="text-white truncate flex-1 w-3/4" >{entry.title}</span>
      </div>
    ))}
  </div>
</div>
    </div>
  );
  
  
};

export default AudioPlayer;

