import { Play, Heart, Plus } from 'lucide-react';

function AlbumCard({ album, likedTracks = [], toggleLikeTrack, addToPlaylist, selectedPlaylistId, setCurrentPage }) {
  const isLiked = likedTracks.some((t) => t.album?.id === album.id);
  return (
    <div className="bg-gray-800 p-4 rounded cursor-pointer hover:bg-gray-700">
      <h3 className="text-lg font-medium text-white">{album.title || 'Unknown Album'}</h3>
      <p className="text-gray-400">{album.artist.name || 'Unknown Artist'}</p>
      {album.cover_medium && (
        <img
          src={album.cover_medium}
          alt={album.title}
          className="w-full h-32 object-cover mt-2 rounded"
        />
      )}
      <div className="flex space-x-4 mt-2 items-center">
        <Heart
          size={24}
          className={isLiked ? 'text-orange-500' : 'text-white hover:text-orange-500'}
          fill={isLiked ? '#f43f5e' : 'none'}
          color={isLiked ? '#f43f5e' : 'white'}
          onClick={() => toggleLikeTrack && toggleLikeTrack({ ...album, id: album.id, album })}
        />
        <button
          className={`hover:bg-gray-700 rounded-full p-1 transition ${!selectedPlaylistId ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            if (!selectedPlaylistId) return;
            addToPlaylist && addToPlaylist(album, selectedPlaylistId);
            setCurrentPage && setCurrentPage('playlistmaker');
          }}
          aria-label="Add Album to Playlist"
          title={selectedPlaylistId ? "Add Album to Playlist" : "Select a playlist first"}
          disabled={!selectedPlaylistId}
        >
          <Plus size={20} color="#fbbf24" />
        </button>
      </div>
    </div>
  );
}

export default AlbumCard;