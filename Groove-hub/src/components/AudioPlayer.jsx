// src/components/AudioPlayer.js
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';
import { useState, useEffect, useContext, useRef } from 'react';
import { AudioContext } from '../context/AudioContext.jsx';

export default function AudioPlayer() {
  const { currentTrack, isPlaying, setIsPlaying } = useContext(AudioContext);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(50);
  const audioRef = useRef(null);

  useEffect(() => {
    if (currentTrack && currentTrack.preview) {
      audioRef.current = new Audio(currentTrack.preview);
      audioRef.current.volume = volume / 100;

      const updateProgress = () => {
        if (audioRef.current) {
          setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100 || 0);
        }
      };

      audioRef.current.addEventListener('timeupdate', updateProgress);
      return () => {
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.removeEventListener('timeupdate', updateProgress);
        }
      };
    }
  }, [currentTrack]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  if (!currentTrack) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 p-4">
      <div className="flex items-center justify-between max-w-screen-xl mx-auto">
        {/* Track Info */}
        <div className="flex items-center space-x-4 flex-1 min-w-0">
          <img
            src={
              currentTrack.album?.cover_small && !currentTrack.album.cover_small.includes('placeholder.svg')
                ? currentTrack.album.cover_small
                : currentTrack.artist?.picture_small && !currentTrack.artist.picture_small.includes('placeholder.svg')
                ? currentTrack.artist.picture_small
                : '/placeholder.svg?height=60&width=60&text=Music'
            }
            alt={currentTrack.title}
            className="w-15 h-15 rounded-lg"
          />
          <div className="min-w-0">
            <h4 className="font-semibold text-white truncate">{currentTrack.title}</h4>
            <p className="text-gray-400 text-sm truncate">{currentTrack.artist?.name}</p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col items-center space-y-2 flex-1">
          <div className="flex items-center space-x-4">
            <button className="text-gray-400 hover:text-white transition-colors">
              <SkipBack size={20} />
            </button>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="bg-orange-500 text-black p-2 rounded-full hover:bg-orange-400 transition-colors"
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </button>
            <button className="text-gray-400 hover:text-white transition-colors">
              <SkipForward size={20} />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="w-full max-w-md">
            <div className="bg-gray-700 rounded-full h-1">
              <div className="bg-orange-500 h-1 rounded-full transition-all" style={{ width: `${progress}%` }}></div>
            </div>
          </div>
        </div>

        {/* Volume */}
        <div className="flex items-center space-x-2 flex-1 justify-end">
          <Volume2 size={20} className="text-gray-400" />
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            className="w-24"
          />
        </div>
      </div>
    </div>
  );
}