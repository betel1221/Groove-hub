// src/components/TrackCard.js
import { Play, Pause, Heart, Plus } from 'lucide-react';
import { useState } from 'react';

// selectedPlaylistId, setCurrentPage are now expected as props
export default function TrackCard({
  track,
  onPlay,
  isPlaying = false,
  likedTracks = [],
  toggleLikeTrack,
  addToPlaylist,
  selectedPlaylistId,
  setCurrentPage,
}) {
  const isLiked = likedTracks.some((t) => t.id === track.id);
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);

  const getImageSrc = () => {
    if (imageError) {
      return '/placeholder.svg?height=60&width=60&text=Music';
    }

    const albumCover = track.album?.cover_medium;
    const artistPicture = track.artist?.picture_medium;

    if (albumCover && !albumCover.includes('placeholder.svg')) {
      return albumCover;
    }

    if (artistPicture && !artistPicture.includes('placeholder.svg')) {
      return artistPicture;
    }

    return '/placeholder.svg?height=60&width=60&text=Music';
  };

  return (
    <div
      className="flex items-center bg-gray-900/50 rounded-lg p-4 hover:bg-gray-800/50 transition-all cursor-pointer group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative" onClick={onPlay}>
        <img
          src={getImageSrc() || '/placeholder.svg'}
          alt={track.title}
          className="w-15 h-15 rounded-lg"
          onError={() => setImageError(true)}
        />
        {(isHovered || isPlaying) && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg">
            <button className="bg-orange-500 text-black p-2 rounded-full hover:bg-orange-400 transition-colors">
              {isPlaying ? <Pause size={16} /> : <Play size={16} />}
            </button>
          </div>
        )}
      </div>

      <div className="ml-4 flex-1 min-w-0" onClick={onPlay}>
        <h3 className="font-semibold text-white truncate">{track.title || 'Unknown Track'}</h3>
        <p className="text-gray-400 text-sm truncate">{track.artist?.name || 'Unknown Artist'}</p>
      </div>

      <div className="flex items-center gap-2 ml-4">
        <span className="text-gray-400 text-sm min-w-[48px] text-right">
          {track.duration
            ? `${Math.floor(track.duration / 60)}:${(track.duration % 60).toString().padStart(2, '0')}`
            : '0:00'}
        </span>
        <div className="flex gap-2 bg-gray-800/80 rounded-full px-2 py-1 shadow-sm">
          <button
            className="hover:bg-gray-700 rounded-full p-1 transition"
            onClick={(e) => {
              e.stopPropagation();
              toggleLikeTrack && toggleLikeTrack(track);
            }}
            aria-label={isLiked ? 'Unlike' : 'Like'}
            title={isLiked ? 'Unlike' : 'Like'}
          >
            <Heart size={18} fill={isLiked ? '#f43f5e' : 'none'} color={isLiked ? '#f43f5e' : 'white'} />
          </button>
          <button
            className="hover:bg-gray-700 rounded-full p-1 transition"
            onClick={(e) => {
              e.stopPropagation();
              addToPlaylist && addToPlaylist(track);
            }}
            aria-label="Add to Playlist"
            title="Add to Playlist"
          >
            <Plus size={18} color="#fbbf24" />
          </button>
        </div>
      </div>
    </div>
  );
}