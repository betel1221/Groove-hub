// src/App.js (Error fixed: Conditional rendering structure in <main>)
import React, { useEffect, useState } from 'react';
// FaSearch removed from here as it's now in NavBar

// Import components
import LoginPage from './components/LoginPage';
import SearchPage from './components/SearchPage';
import PlaylistMaker from './components/PlaylistMaker';
import NavBar from './components/NavBar';

import TopPlaylists from './components/HomePage/TopPlaylists';
import NewReleases from './components/HomePage/NewReleases';
import NowPlayingBar from './components/HomePage/NowPlayingBar';

// Import dummy data
import { DUMMY_PLAYLISTS, DUMMY_RELEASES } from './data/dummyData';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const storedLoginStatus = localStorage.getItem('isLoggedIn');
    return storedLoginStatus === 'true';
  });

  // State to control which view is active: 'home', 'search', or 'playlistMaker'
  const [currentView, setCurrentView] = useState('home');

  const [featuredPlaylists, setFeaturedPlaylists] = useState([]);
  const [newReleases, setNewReleases] = useState([]);
  const [loading, setLoading] = useState(true);

  // Effect to load dummy data only for the home view
  useEffect(() => {
    if (isLoggedIn && currentView === 'home') {
      setLoading(true); // Ensure loading state is true when navigating TO home
      const timer = setTimeout(() => {
        setFeaturedPlaylists(DUMMY_PLAYLISTS);
        setNewReleases(DUMMY_RELEASES);
        setLoading(false);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setLoading(false); // No loading needed for login page or other views
    }
  }, [isLoggedIn, currentView]); // Depend on both isLoggedIn and currentView

  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
    setCurrentView('home'); // Go to home after login
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn'); // It's good practice to clear it fully
    // localStorage.setItem('isLoggedIn', 'false'); // This is redundant with removeItem
    setFeaturedPlaylists([]);
    setNewReleases([]);
    setLoading(true);
    setCurrentView('home'); // Go back to home view on logout
  };

  const handleNavigate = (view) => {
    setCurrentView(view);
  };


  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  // Show loading indicator when transitioning to home or initially loading after login
  if (loading && currentView === 'home') {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-xl">Loading content...</p>
      </div>
    );
  }

  // Determine which component to render in the main section
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
          <NewReleases releases={newReleases} />
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
        <h1 className="text-3xl font-bold">Your Music App</h1>
        <button
          className="px-4 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors"
          onClick={handleLogout}
        >
          Logout
        </button>
      </header>

      <main className="px-6 pb-32"> {/* Increased padding-bottom to account for NavBar and NowPlayingBar */}
        {contentToRender} {/* Render the determined content */}
      </main>

      <NowPlayingBar /> {/* Now playing bar should be above the nav bar */}
      <NavBar currentView={currentView} onNavigate={handleNavigate} /> {/* Navigation Bar */}
    </div>
  );
}

export default App;