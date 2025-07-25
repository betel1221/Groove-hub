// src/App.js

import React, { useEffect, useState } from 'react';

// Import components
import SearchPage from './components/SearchPage';
import PlaylistMaker from './components/PlaylistMaker';
import NavBar from './components/NavBar';
import LoginPage from './components/LoginPage';
import TopPlaylists from './components/HomePage/TopPlaylists';
import NewReleases from './components/HomePage/NewReleases';
import NowPlayingBar from './components/HomePage/NowPlayingBar';
// Import dummy data
import { DUMMY_PLAYLISTS } from './data/dummyData';

// --- REMOVED: No longer import logo from 'assets' if it's in the 'public' folder ---
// import grooveHubLogo from './assets/images/groovehub_logo.png'; // This line is removed


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const storedLoginStatus = localStorage.getItem('isLoggedIn');
    return storedLoginStatus === 'true';
  });

  const [currentView, setCurrentView] = useState('home');

  const [featuredPlaylists, setFeaturedPlaylists] = useState([]);
  const [newReleasesData, setNewReleasesData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Effect to load data
  useEffect(() => {
    if (isLoggedIn) {
      if (currentView === 'home') {
        setLoading(true);

        setFeaturedPlaylists(DUMMY_PLAYLISTS);

        const fetchNewReleases = async () => {
          try {
            const response = await fetch(`https://itunes.apple.com/search?term=popular+music&entity=song&limit=10&sort=recent`);
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setNewReleasesData(data.results);
          } catch (error) {
            console.error("Failed to fetch new releases from iTunes:", error);
          } finally {
            setLoading(false);
          }
        };

        const timer = setTimeout(() => {
          fetchNewReleases();
        }, 1000);
        
        return () => clearTimeout(timer);

      } else {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, [isLoggedIn, currentView]);


  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
    setCurrentView('home');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
    setFeaturedPlaylists([]);
    setNewReleasesData([]);
    setLoading(true);
    setCurrentView('home');
  };

  const handleNavigate = (view) => {
    setCurrentView(view);
  };


  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  if (loading && currentView === 'home') {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-xl">Loading content...</p>
      </div>
    );
  }

  let contentToRender;
  if (currentView === 'home') {
    contentToRender = (
      <>
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Featured Playlists</h2>
          <TopPlaylists playlists={featuredPlaylists} />
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">New Releases</h2>
          <NewReleases releases={newReleasesData} />
        </section>
      </>
    );
  } else if (currentView === 'search') {
    contentToRender = <SearchPage />;
  } else if (currentView === 'playlistMaker') {
    contentToRender = <PlaylistMaker />;
  }


  return (
    <div className="min-h-screen bg-black text-white relative">
      <header className="px-6 pt-6 pb-4 flex justify-between items-center">
        {/* --- Updated App Name and Logo Here --- */}
        <div className="flex items-center space-x-3"> {/* Use flexbox to align logo and text */}
          <img
            // --- UPDATED: Directly reference the image from the 'public' folder ---
            src="/groovehub_logo.png" // The '/' means the root of your public folder
            alt="Groove Hub Logo" // Important for accessibility
            className="h-8 w-8 object-contain" // Adjust h- and w- for desired size
          />
          <h1 className="text-3xl font-bold">Groove Hub</h1> {/* Your app name */}
        </div>
        {/* --- End Updated App Name and Logo --- */}

        <button
          className="px-4 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors"
          onClick={handleLogout}
        >
          Logout
        </button>
      </header>

      <main className="px-6 pb-32">
        {contentToRender}
      </main>

      <NowPlayingBar />
      <NavBar currentView={currentView} onNavigate={handleNavigate} />
    </div>
  );
}

export default App;