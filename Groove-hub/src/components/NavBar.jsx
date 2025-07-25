// src/components/NavBar.jsx
import React from 'react';
import { FaHome, FaSearch, FaPlusSquare } from 'react-icons/fa'; // Icons for Home, Search, Playlist Maker

function NavBar({ currentView, onNavigate }) {
  const navItems = [
    { name: 'Home', icon: FaHome, view: 'home' },
    { name: 'Search', icon: FaSearch, view: 'search' },
    { name: 'Playlist Maker', icon: FaPlusSquare, view: 'playlistMaker' }, // Changed icon to FaPlusSquare
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-gray-900 bg-opacity-90 backdrop-filter backdrop-blur-lg p-3 border-t border-gray-700 z-50">
      <div className="flex justify-around items-center h-full max-w-lg mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon; // Get the icon component
          const isActive = currentView === item.view;
          return (
            <button
              key={item.name}
              className={`flex flex-col items-center px-4 py-2 rounded-lg transition-colors duration-200
                          ${isActive ? 'text-orange-500' : 'text-gray-400 hover:text-white'}`}
              onClick={() => onNavigate(item.view)}
            >
              <Icon className="text-xl mb-1" />
              <span className="text-xs font-medium">{item.name}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

export default NavBar;