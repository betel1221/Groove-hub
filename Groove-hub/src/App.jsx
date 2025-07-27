// src/App.js
import { useState, useCallback } from 'react';
import { AudioProvider } from './context/AudioContext.jsx';
import { ToastProvider } from './context/ToastContext';

import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Search from './pages/Search';
import AudioPlayer from './components/AudioPlayer';
import PlaylistMaker from './components/PlaylistMaker';
import LikedSongs from './pages/LikedSongs';


function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [likedTracks, setLikedTracks] = useState([]);
  const [playlists, setPlaylists] = useState(() => {
    // Load from localStorage if available
    try {
      const stored = localStorage.getItem('userPlaylists');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });
  const [selectedPlaylistId, setSelectedPlaylistId] = useState(null);

  // Persist playlists to localStorage
  const savePlaylists = (pls) => {
    setPlaylists(pls);
    localStorage.setItem('userPlaylists', JSON.stringify(pls));
  };

  // Add or remove a track from likedTracks
  const toggleLikeTrack = useCallback((track) => {
    setLikedTracks((prev) => {
      const exists = prev.some((t) => t.id === track.id);
      if (exists) {
        return prev.filter((t) => t.id !== track.id);
      } else {
        return [...prev, track];
      }
    });
  }, []);

  // Add a new playlist
  const createPlaylist = useCallback((name) => {
    const newPlaylist = {
      id: `playlist-${Date.now()}`,
      name,
      songs: [],
    };
    const updated = [...playlists, newPlaylist];
    savePlaylists(updated);
    setSelectedPlaylistId(newPlaylist.id);
  }, [playlists]);

  // Add a track to a specific playlist
  const addToPlaylist = useCallback((track, playlistId) => {
    const updated = playlists.map((pl) => {
      if (pl.id === playlistId) {
        if (pl.songs.some((t) => t.id === track.id)) return pl;
        return { ...pl, songs: [...pl.songs, track] };
      }
      return pl;
    });
    savePlaylists(updated);
  }, [playlists]);

  // Remove a track from a playlist
  const removeFromPlaylist = useCallback((trackId, playlistId) => {
    const updated = playlists.map((pl) => {
      if (pl.id === playlistId) {
        return { ...pl, songs: pl.songs.filter((t) => t.id !== trackId) };
      }
      return pl;
    });
    savePlaylists(updated);
  }, [playlists]);

  return (
    <AudioProvider>
      <ToastProvider>
        <div className="bg-black min-h-screen text-white flex">
          <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
          <div className="flex-1 flex flex-col">
            <main className="flex-1 pb-20">
              {currentPage === 'home' && <Home likedTracks={likedTracks} toggleLikeTrack={toggleLikeTrack} playlists={playlists} addToPlaylist={addToPlaylist} selectedPlaylistId={selectedPlaylistId} setSelectedPlaylistId={setSelectedPlaylistId} />}
              {currentPage === 'search' && <Search likedTracks={likedTracks} toggleLikeTrack={toggleLikeTrack} playlists={playlists} addToPlaylist={addToPlaylist} selectedPlaylistId={selectedPlaylistId} setSelectedPlaylistId={setSelectedPlaylistId} />}
              {currentPage === 'playlistmaker' && <PlaylistMaker playlists={playlists} createPlaylist={createPlaylist} removeFromPlaylist={removeFromPlaylist} setSelectedPlaylistId={setSelectedPlaylistId} />}
              {currentPage === 'likedsongs' && <LikedSongs likedTracks={likedTracks} toggleLikeTrack={toggleLikeTrack} />}
            </main>
            <AudioPlayer />
          </div>
        </div>
      </ToastProvider>
    </AudioProvider>
  );
}

export default App;