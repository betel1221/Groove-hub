// src/components/NowPlayingBar.js
import React from 'react';
import { FaPlay, FaForwardStep, FaBackwardStep } from 'react-icons/fa6'; // You'll need to install react-icons

function NowPlayingBar() {
  // Install react-icons: npm install react-icons
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 flex items-center justify-between shadow-lg z-50">
      {/* Song Info */}
      <div className="flex items-center space-x-4">
        <img
          src="https://via.placeholder.com/60/FF6347/FFFFFF?text=AlbumArt" // Placeholder for current song album art
          alt="Album Art"
          className="w-16 h-16 rounded-md"
        />
        <div>
          <h3 className="text-lg font-semibold">CHIHIRO</h3>
          <p className="text-sm text-gray-400">Dito Etou</p>
        </div>
      </div>

      {/* Playback Controls */}
      <div className="flex items-center space-x-6">
        <button className="text-gray-300 hover:text-white transition-colors duration-200">
          <FaBackwardStep className="text-2xl" />
        </button>
        <button className="bg-orange-500 text-white p-3 rounded-full hover:bg-orange-600 transition-colors duration-200">
          <FaPlay className="text-xl" />
        </button>
        <button className="text-gray-300 hover:text-white transition-colors duration-200">
          <FaForwardStep className="text-2xl" />
        </button>
      </div>

      {/* Progress Bar (simple placeholder) */}
      <div className="hidden md:flex flex-grow items-center mx-8"> {/* Hide on small screens */}
        <span className="text-sm text-gray-400 mr-2">0:30</span>
        <div className="flex-grow bg-gray-700 rounded-full h-2">
          <div className="bg-orange-500 h-2 rounded-full" style={{ width: '30%' }}></div> {/* Example progress */}
        </div>
        <span className="text-sm text-gray-400 ml-2">3:45</span>
      </div>

      {/* Volume/Other Controls (Optional - you can add these) */}
      <div className="hidden lg:flex items-center space-x-4">
        {/* <button className="text-gray-300 hover:text-white"><FaVolumeUp /></button> */}
        {/* <input type="range" className="w-24 accent-orange-500" /> */}
      </div>
    </div>
  );
}

export default NowPlayingBar;