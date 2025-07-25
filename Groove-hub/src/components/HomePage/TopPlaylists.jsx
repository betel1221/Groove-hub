// src/components/TopPlaylists.js (Updated)
import React from 'react';

function TopPlaylists({ playlists }) { // Accept playlists as a prop
  if (!playlists || playlists.length === 0) {
    return <p className="text-gray-400">No featured playlists found.</p>;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
      {playlists.map(playlist => (
        <div key={playlist.id} className="bg-gray-800 rounded-lg p-4 cursor-pointer hover:bg-gray-700 transition-colors duration-200">
          <img
            src={playlist.imageUrl}
            alt={playlist.name}
            className="w-full h-auto rounded-md mb-3 aspect-square object-cover"
          />
          <h3 className="text-lg font-semibold truncate">{playlist.name}</h3>
          <p className="text-sm text-gray-400 truncate">{playlist.description}</p> {/* Using description for playlists */}
        </div>
      ))}
    </div>
  );
}

export default TopPlaylists;