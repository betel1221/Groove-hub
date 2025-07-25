// src/HomePage/NewReleases.jsx (Updated to handle iTunes API data structure)
import React from 'react';

function NewReleases({ releases }) {
  if (!releases || releases.length === 0) {
    return (
      <div className="text-center text-gray-400">
        No new releases to display at the moment.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      {releases.map((release) => (
        <div
          key={release.trackId} // Using trackId as key for individual songs
          className="bg-gray-800 rounded-lg p-3 hover:bg-gray-700 transition-colors cursor-pointer"
        >
          <img
            src={release.artworkUrl100} // iTunes API provides artworkUrl100
            alt={release.trackName || release.collectionName} // Fallback for alt text
            className="w-full h-auto rounded-md mb-2 object-cover aspect-square"
          />
          <h3 className="text-sm font-semibold truncate">
            {release.trackName || release.collectionName} {/* Track or album name */}
          </h3>
          <p className="text-xs text-gray-400 truncate">
            {release.artistName}
          </p>
        </div>
      ))}
    </div>
  );
}

export default NewReleases;