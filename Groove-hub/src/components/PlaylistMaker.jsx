// src/components/PlaylistMaker.jsx (With Create Playlist Modal)
import React, { useState } from 'react';

// Dummy data for the playlist items (remains the same)
const DUMMY_PLAYLIST_TRACKS = [
  { id: 'track1', imageUrl: 'https://via.placeholder.com/60/FF6347/FFFFFF?text=Track1', title: 'Track Title One', artist: 'Artist Name A' },
  { id: 'track2', imageUrl: 'https://via.placeholder.com/60/4682B4/FFFFFF?text=Track2', title: 'Song of the Night', artist: 'Artist Name B' },
  { id: 'track3', imageUrl: 'https://via.placeholder.com/60/3CB371/FFFFFF?text=Track3', title: 'Echoes in the Dark', artist: 'Artist Name C' },
  { id: 'track4', imageUrl: 'https://via.placeholder.com/60/BA55D3/FFFFFF?text=Track4', title: 'Rhythm Divine', artist: 'Artist Name D' },
  { id: 'track5', imageUrl: 'https://via.placeholder.com/60/FFD700/000000?text=Track5', title: 'Journey to the Stars', artist: 'Artist Name E' },
  { id: 'track6', imageUrl: 'https://via.placeholder.com/60/6A5ACD/FFFFFF?text=Track6', title: 'Melody of Life', artist: 'Artist Name F' },
];

function PlaylistMaker() {
  const [showCreatePlaylistModal, setShowCreatePlaylistModal] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState('');

  const handleCreatePlaylistClick = () => {
    setShowCreatePlaylistModal(true);
  };

  const handleModalClose = () => {
    setShowCreatePlaylistModal(false);
    setNewPlaylistName(''); // Clear input when closing
  };

  const handleCreatePlaylistSubmit = (e) => {
    e.preventDefault(); // Prevent form submission
    if (newPlaylistName.trim()) {
      alert(`Playlist "${newPlaylistName.trim()}" created! (Functionality to save not implemented)`);
      // In a real app, you would send this name to your backend API
      handleModalClose();
    } else {
      alert('Playlist name cannot be empty.');
    }
  };

  return (
    <div className="p-6 bg-black min-h-screen text-white">
      <h2 className="text-3xl font-bold mb-8 text-center">Playlist Maker</h2>

      <div className="max-w-xl mx-auto bg-gray-900 rounded-lg shadow-xl overflow-hidden">
        {DUMMY_PLAYLIST_TRACKS.map((track, index) => (
          <React.Fragment key={track.id}>
            <div className="flex items-center p-4">
              <img
                src={track.imageUrl}
                alt={track.title}
                className="w-16 h-16 rounded-md object-cover mr-4"
              />
              <div className="flex-grow">
                <p className="text-lg font-semibold">{track.title}</p>
                <p className="text-sm text-gray-400">{track.artist}</p>
              </div>
            </div>
            {/* Orange separator line */}
            {index < DUMMY_PLAYLIST_TRACKS.length - 1 && (
              <hr className="border-t border-orange-600 my-0 mx-4" />
            )}
          </React.Fragment>
        ))}
      </div>

      <div className="mt-8 text-center">
        <button
          onClick={handleCreatePlaylistClick}
          className="px-6 py-3 bg-orange-500 text-white font-semibold rounded-full hover:bg-orange-600 transition-colors"
        >
          Create New Playlist
        </button>
      </div>

      {/* Create Playlist Modal */}
      {showCreatePlaylistModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 p-8 rounded-lg shadow-xl max-w-sm w-full border border-gray-700">
            <h3 className="text-2xl font-bold text-gray-100 mb-6 text-center">Create New Playlist</h3>
            <form onSubmit={handleCreatePlaylistSubmit}>
              <div className="mb-6">
                <label htmlFor="playlistName" className="block text-sm font-medium text-gray-300 mb-2">
                  Playlist Name
                </label>
                <input
                  type="text"
                  id="playlistName"
                  value={newPlaylistName}
                  onChange={(e) => setNewPlaylistName(e.target.value)}
                  placeholder="e.g., My Awesome Playlist"
                  className="w-full px-4 py-3 bg-gray-700 rounded-md text-white placeholder-gray-400
                             focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={handleModalClose}
                  className="px-5 py-2 rounded-md text-gray-300 bg-gray-700 hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-md bg-orange-500 text-white font-semibold hover:bg-orange-600 transition-colors"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default PlaylistMaker;