// src/components/SearchPage.jsx (Updated to use iTunes Search API)
import React, { useState, useEffect } from 'react';

function SearchPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to perform the search
  const performSearch = async (term) => {
    if (term.trim() === '') {
      setSearchResults([]); // Clear results if search term is empty
      return;
    }

    setLoading(true);
    setError(null); // Clear previous errors

    try {
      // Use the iTunes Search API endpoint
      const response = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(term)}&entity=song&limit=20`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setSearchResults(data.results);
    } catch (err) {
      console.error("Failed to fetch search results:", err);
      setError("Failed to fetch search results. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Effect to trigger search when searchTerm changes (e.g., as user types)
  // Or you can trigger it only on button click, see the alternative below.
  useEffect(() => {
    const handler = setTimeout(() => {
      performSearch(searchTerm);
    }, 500); // Debounce search to prevent too many API calls while typing

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]); // Re-run effect when searchTerm changes


  // Alternative: Trigger search only on button click or Enter key
  const handleSearchButtonClick = () => {
    performSearch(searchTerm);
  };


  return (
    <div className="p-6 bg-black min-h-screen text-white">
      <h2 className="text-3xl font-bold mb-8 text-center">Search Music</h2>

      {/* Search Bar */}
      <div className="mb-8 max-w-lg mx-auto">
        <div className="relative flex items-center">
          <input
            type="text"
            placeholder="Search for songs, artists, albums..."
            className="w-full px-5 py-3 pr-12 bg-gray-800 rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => { // Optional: Search on Enter key press
              if (e.key === 'Enter') {
                handleSearchButtonClick();
              }
            }}
          />
          <button
            onClick={handleSearchButtonClick}
            className="absolute right-3 p-2 bg-orange-500 rounded-full text-white hover:bg-orange-600 transition-colors"
            aria-label="Perform Search"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 1110 0 10-12 0zM14.293 14.293a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>

      {/* Search Results Display */}
      <div className="max-w-xl mx-auto">
        {loading && (
          <p className="text-center text-gray-400">Loading search results...</p>
        )}

        {error && (
          <p className="text-center text-red-500">{error}</p>
        )}

        {!loading && !error && searchResults.length === 0 && searchTerm.trim() !== '' && (
          <p className="text-center text-gray-400">No results found for "{searchTerm}".</p>
        )}
        
        {!loading && !error && searchResults.length === 0 && searchTerm.trim() === '' && (
          <p className="text-center text-gray-400">Start typing to search for music.</p>
        )}

        {!loading && !error && searchResults.length > 0 && (
          <div className="grid grid-cols-1 gap-4">
            {searchResults.map((result) => (
              <div key={result.trackId} className="flex items-center bg-gray-900 rounded-lg p-3 hover:bg-gray-800 transition-colors">
                <img
                  src={result.artworkUrl100} // Using 100x100 artwork
                  alt={result.trackName}
                  className="w-16 h-16 rounded-md object-cover mr-4"
                />
                <div className="flex-grow">
                  <p className="text-lg font-semibold">{result.trackName}</p>
                  <p className="text-sm text-gray-400">{result.artistName}</p>
                  {result.collectionName && ( // Show album name if available
                    <p className="text-xs text-gray-500">{result.collectionName}</p>
                  )}
                </div>
                {/* Optional: Add a play button or more info button here */}
                {result.previewUrl && (
                  <audio controls src={result.previewUrl} className="ml-4 w-24 h-8">
                    Your browser does not support the audio element.
                  </audio>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Categories section (keep for now, but will need to be rethought for iTunes API if it's not removed) */}
      <section className="mt-12">
        {/*
        <h2 className="text-2xl font-semibold mb-6 text-center">Browse Categories</h2>
        <div className="flex justify-center space-x-4 mb-8">
          <button className="px-5 py-2 rounded-full bg-orange-500 text-white font-semibold">Popular</button>
          <button className="px-5 py-2 rounded-full bg-gray-700 text-white hover:bg-gray-600">Genre</button>
          <button className="px-5 py-2 rounded-full bg-gray-700 text-white hover:bg-gray-600">Artists</button>
          <button className="px-5 py-2 rounded-full bg-gray-700 text-white hover:bg-gray-600">Playlists</button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          // ... your existing circular items from dummy data ...
        </div>
        */}
      </section>

      {/* You may also like section (keep for now, but will need to be rethought for iTunes API if it's not removed) */}
      <section className="mt-12">
        {/*
        <h2 className="text-2xl font-semibold mb-6 text-center">You May Also Like</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          // ... your existing rectangular items from dummy data ...
        </div>
        */}
      </section>
    </div>
  );
}

export default SearchPage;