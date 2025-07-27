"use client"

import { useState, useEffect } from "react"
import SearchBar from "../components/SearchBar"
import TrackCard from "../components/TrackCard"
import SkeletonLoader from "../components/SkeletonLoader"
import { fetchGenres, searchTracks } from "../services/deezerAPI"

export default function Search({ setCurrentTrack, setIsPlaying, likedTracks = [], toggleLikeTrack, addToPlaylist, playlists = [], selectedPlaylistId, setSelectedPlaylistId, setCurrentPage }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState(null)
  const [loading, setLoading] = useState(false)
  const [activeFilter, setActiveFilter] = useState("all")
  const [genres, setGenres] = useState([])

  useEffect(() => {
    const loadGenres = async () => {
      try {
        const data = await fetchGenres()
        setGenres(data.data?.slice(0, 8) || [])
      } catch (error) {
        console.error("Error fetching genres:", error)
      }
    }

    loadGenres()
  }, [])

  const handleSearch = async (query) => {
    if (!query.trim()) {
      setSearchResults(null)
      return
    }

    setLoading(true)
    try {
      const data = await searchTracks(query)
      setSearchResults(data)
    } catch (error) {
      console.error("Error searching:", error)
      setSearchResults({ data: [] })
    } finally {
      setLoading(false)
    }
  }

  const handleTrackPlay = (track) => {
    setCurrentTrack(track)
    setIsPlaying(true)
  }

  const filters = [
    { id: "all", label: "All" },
    { id: "track", label: "Tracks" },
    { id: "artist", label: "Artists" },
    { id: "album", label: "Albums" },
  ]

  return (
    <div className="p-6">
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} onSearch={handleSearch} />

      {!searchResults && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-6">Browse Genres</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {genres.map((genre, index) => (
              <div
                key={genre.id}
                className={`bg-gradient-to-br rounded-lg p-6 cursor-pointer hover:scale-105 transition-transform ${
                  index % 4 === 0
                    ? "from-orange-700 to-purple-300"
                    : index % 4 === 1
                      ?"from-purple-200 to-orange-700"
                      : index % 4 === 2
                        ? "from-orange-700 to-purple-300"
                        : "from-purple-200 to-orange-700"
                }`}
                onClick={() => {
                  setSearchQuery(genre.name)
                  handleSearch(genre.name)
                }}
              >
                <h3 className="text-black font-bold text-lg">{genre.name}</h3>
              </div>
            ))}
          </div>
        </div>
      )}

      {searchResults && (
        <div className="mt-8">
          <div className="flex space-x-4 mb-6 overflow-x-auto">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-4 py-2 rounded-full transition-colors whitespace-nowrap ${
                  activeFilter === filter.id ? "bg-orange-500 text-black" : "bg-gray-800 text-gray-300 hover:text-white"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>

          {loading ? (
            <SkeletonLoader />
          ) : (
            <div className="space-y-8">
              {(activeFilter === "all" || activeFilter === "track") &&
                searchResults.data &&
                searchResults.data.length > 0 && (
                  <section>
                    <h3 className="text-xl font-bold mb-4">Tracks</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {searchResults.data.slice(0, 6).map((track) => (
                        <TrackCard
                          key={track.id}
                          track={track}
                          onPlay={() => handleTrackPlay(track)}
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

              {searchResults.data && searchResults.data.length === 0 && (
                <div className="text-center py-12">
                  <h3 className="text-xl font-bold text-white mb-2">No results found</h3>
                  <p className="text-gray-400">Try searching for something else</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
