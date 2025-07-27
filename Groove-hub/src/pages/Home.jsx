// src/components/Home.js
import { useState, useEffect, useContext } from 'react';
import { AudioContext } from '../context/AudioContext';
import { ToastContext } from '../context/ToastContext';
import AlbumCard from '../components/AlbumCard';
import ArtistCard from '../components/ArtistCard';
import TrackCard from '../components/TrackCard';
import SkeletonLoader from '../components/SkeletonLoader';
import { fetchChartData, fetchEditorial, fetchPlaylist } from '../services/deezerAPI';

export default function Home({ likedTracks = [], toggleLikeTrack, addToPlaylist, playlists = [], selectedPlaylistId, setSelectedPlaylistId, setCurrentPage }) {
  const { currentTrack, setCurrentTrack, isPlaying, setIsPlaying } = useContext(AudioContext);
  const { showToast } = useContext(ToastContext);
  const [chartData, setChartData] = useState(null);
  const [editorial, setEditorial] = useState(null);
  const [featuredPlaylist, setFeaturedPlaylist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [chartData, editorialData, playlistData] = await Promise.all([
          fetchChartData(),
          fetchEditorial(),
          fetchPlaylist('908622995'),
        ]);

        // Validate mock data
        if (
          !chartData?.tracks?.data?.length ||
          !chartData?.albums?.data?.length ||
          !chartData?.artists?.data?.length ||
          !editorialData?.data?.length ||
          !playlistData?.tracks?.data?.length
        ) {
          throw new Error('Invalid mock data');
        }

        setChartData(chartData);
        setEditorial(editorialData);
        setFeaturedPlaylist(playlistData);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load music data. Please try again later.');
        showToast('Failed to load music data', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [showToast]);

  const handleTrackPlay = (track) => {
    if (currentTrack?.id === track.id && isPlaying) {
      setIsPlaying(false);
    } else {
      setCurrentTrack(track);
      setIsPlaying(true);
      showToast(`Playing ${track.title}`, 'success');
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <SkeletonLoader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Oops! Something went wrong</h2>
          <p className="text-gray-400 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-orange-500 text-black px-6 py-3 rounded-full font-semibold hover:bg-orange-400 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8">
      {/* Playlist Selector */}
      <div className="mb-6 flex items-center gap-4">
        <label htmlFor="playlist-select" className="text-lg font-semibold text-white">Add to Playlist:</label>
        <select
          id="playlist-select"
          className="bg-gray-800 text-white rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
          value={selectedPlaylistId || ''}
          onChange={e => setSelectedPlaylistId(e.target.value)}
        >
          <option value="" disabled>Select a playlist</option>
          {playlists.length === 0 && <option value="" disabled>No playlists found</option>}
          {playlists.map(pl => (
            <option key={pl.id} value={pl.id}>{pl.name}</option>
          ))}
        </select>
      </div>
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-orange-500/20 to-transparent rounded-2xl p-8 overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Discover Your
            <span className="text-orange-500"> Sound</span>
          </h1>
          <p className="text-gray-300 text-lg mb-6 max-w-md">
            Explore millions of songs, create playlists, and discover new artists
          </p>
          <button className="bg-orange-500 text-black px-8 py-3 rounded-full font-semibold hover:bg-orange-400 transition-colors">
            Start Listening
          </button>
        </div>
      </div>

      {/* Top Charts */}
      {chartData && chartData.albums && (
        <section>
          <h2 className="text-2xl font-bold mb-6">Top Albums</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {chartData.albums.data.slice(0, 10).map((album) => (
              <AlbumCard
                key={album.id}
                album={album}
                likedTracks={likedTracks}
                toggleLikeTrack={toggleLikeTrack}
                addToPlaylist={addToPlaylist}
                selectedPlaylistId={selectedPlaylistId}
                setCurrentPage={setCurrentPage}
              />
            ))}
          </div>
        </section>
      )}

      {/* Top Tracks */}
      {chartData && chartData.tracks && (
        <section>
          <h2 className="text-2xl font-bold mb-6">Trending Tracks</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {chartData.tracks.data.slice(0, 6).map((track) => (
              <TrackCard
                key={track.id}
                track={track}
                onPlay={() => handleTrackPlay(track)}
                isPlaying={currentTrack?.id === track.id && isPlaying}
                likedTracks={likedTracks}
                toggleLikeTrack={toggleLikeTrack}
                addToPlaylist={addToPlaylist}
                selectedPlaylistId={selectedPlaylistId}
                setCurrentPage={setCurrentPage}
              />
            ))}
          </div>
        </section>
      )}

      {/* Top Artists */}
      {chartData && chartData.artists && (
        <section>
          <h2 className="text-2xl font-bold mb-6">Popular Artists</h2>
          <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-8 gap-4">
            {chartData.artists.data.slice(0, 8).map((artist) => (
              <ArtistCard key={artist.id} artist={artist} />
            ))}
          </div>
        </section>
      )}

      {/* Recently Played */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Recently Played</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {chartData &&
            chartData.tracks &&
            chartData.tracks.data
              .slice(3, 6)
              .map((track) => (
                <TrackCard
                  key={`recent-${track.id}`}
                  track={track}
                  onPlay={() => handleTrackPlay(track)}
                  isPlaying={currentTrack?.id === track.id && isPlaying}
                  likedTracks={likedTracks}
                  toggleLikeTrack={toggleLikeTrack}
                  addToPlaylist={addToPlaylist}
                  selectedPlaylistId={selectedPlaylistId}
                  setCurrentPage={setCurrentPage}
                />
              ))}
        </div>
      </section>

      {/* Editorial Picks */}
      {editorial && editorial.data && (
        <section>
          <h2 className="text-2xl font-bold mb-6">Editorial Picks</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {editorial.data.slice(0, 5).map((album) => (
              <AlbumCard key={album.id} album={album} likedTracks={likedTracks} toggleLikeTrack={toggleLikeTrack} />
            ))}
          </div>
        </section>
      )}

      {/* Featured Playlist */}
      {featuredPlaylist && featuredPlaylist.tracks && (
        <section>
          <h2 className="text-2xl font-bold mb-6">Featured Playlist</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {featuredPlaylist.tracks.data.slice(0, 6).map((track) => (
              <TrackCard
                key={track.id}
                track={track}
                onPlay={() => handleTrackPlay(track)}
                isPlaying={currentTrack?.id === track.id && isPlaying}
                likedTracks={likedTracks}
                toggleLikeTrack={toggleLikeTrack}
                addToPlaylist={addToPlaylist}
                selectedPlaylistId={selectedPlaylistId}
                setCurrentPage={setCurrentPage}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}