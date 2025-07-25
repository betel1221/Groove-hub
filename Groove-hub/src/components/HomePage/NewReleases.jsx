// src/components/NewReleases.js (Updated)
import React from 'react';

function NewReleases({ releases }) { // Accept releases as a prop
  if (!releases || releases.length === 0) {
    return <p className="text-gray-400">No new releases found.</p>;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
      {releases.map(release => (
        <div key={release.id} className="bg-gray-800 rounded-lg p-4 cursor-pointer hover:bg-gray-700 transition-colors duration-200">
          <img
            src={release.imageUrl}
            alt={release.title}
            className="w-full h-auto rounded-md mb-3 aspect-square object-cover"
          />
          <h3 className="text-lg font-semibold truncate">{release.title}</h3>
          <p className="text-sm text-gray-400 truncate">{release.artist}</p>
        </div>
      ))}
    </div>
  );
}

export default NewReleases;