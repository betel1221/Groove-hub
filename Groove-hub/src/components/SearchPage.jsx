// src/HomePage/SearchPage.jsx
import React from 'react';
import { FaSearch } from 'react-icons/fa'; // Import search icon

// Dummy data for the search page sections
const DUMMY_SEARCH_CATEGORIES = ['Popular', 'Genre', 'Artists', 'Playlists'];

const DUMMY_CIRCULAR_ITEMS = [
  { id: 'c1', imageUrl: 'https://via.placeholder.com/100/F08080/FFFFFF?text=Item1' },
  { id: 'c2', imageUrl: 'https://via.placeholder.com/100/87CEEB/FFFFFF?text=Item2' },
  { id: 'c3', imageUrl: 'https://via.placeholder.com/100/90EE90/FFFFFF?text=Item3' },
  { id: 'c4', imageUrl: 'https://via.placeholder.com/100/DA70D6/FFFFFF?text=Item4' },
  { id: 'c5', imageUrl: 'https://via.placeholder.com/100/FFD700/000000?text=Item5' },
  { id: 'c6', imageUrl: 'https://via.placeholder.com/100/6A5ACD/FFFFFF?text=Item6' },
];

const DUMMY_YOU_MAY_ALSO_LIKE = [
  { id: 'y1', imageUrl: 'https://via.placeholder.com/180x100/FF6347/FFFFFF?text=Like1', title: 'Greatest Hits', subtitle: 'Various Artists' },
  { id: 'y2', imageUrl: 'https://via.placeholder.com/180x100/4682B4/FFFFFF?text=Like2', title: 'Chill Instrumentals', subtitle: 'Relaxation' },
  { id: 'y3', imageUrl: 'https://via.placeholder.com/180x100/3CB371/FFFFFF?text=Like3', title: 'Focus Music', subtitle: 'Study Beats' },
  { id: 'y4', imageUrl: 'https://via.placeholder.com/180x100/BA55D3/FFFFFF?text=Like4', title: 'Party Anthems', subtitle: 'Dance Floor' },
];

// This component expects an onBack prop to go back to the home page
function SearchPage({ onBack }) {
  // State for active category tab (e.g., 'Popular' by default)
  const [activeCategory, setActiveCategory] = React.useState('Popular');

  return (
    <div className="p-6 bg-black min-h-screen text-white">
      {/* Search Bar */}
      <div className="relative mb-8">
        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
        <input
          type="text"
          placeholder="Search..."
          className="w-full pl-12 pr-4 py-3 rounded-full bg-gray-800 text-white placeholder-gray-400
                     focus:outline-none focus:ring-2 focus:ring-gray-700 focus:border-transparent"
        />
      </div>

      {/* Featured Section (WSJ Magazine Cover from image_5729e6.jpg) */}
      <div className="mb-10">
        <img
          src="http://googleusercontent.com/file_content/0" /* Use the provided image for the featured section */
          alt="Featured Content"
          className="w-full rounded-lg shadow-lg"
          style={{ maxHeight: '250px', objectFit: 'cover' }} // Adjust size as needed
        />
      </div>

      {/* Category Tabs */}
      <div className="flex space-x-4 mb-8 overflow-x-auto pb-2 scrollbar-hide">
        {DUMMY_SEARCH_CATEGORIES.map((category) => (
          <button
            key={category}
            className={`px-5 py-2 rounded-full text-sm font-semibold whitespace-nowrap
                        ${activeCategory === category
                          ? 'bg-orange-500 text-white shadow-md' // Active tab uses orange
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600' // Inactive tabs remain dark
                        } transition-colors duration-200`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Circular Items (e.g., Popular artists/genres) */}
      <h3 className="text-xl font-semibold mb-4">Trending Now</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-10">
        {DUMMY_CIRCULAR_ITEMS.map((item) => (
          <div key={item.id} className="flex flex-col items-center text-center">
            <img
              src={item.imageUrl}
              alt="Circular Item"
              className="w-24 h-24 rounded-full object-cover shadow-md mb-2"
            />
            <p className="text-sm font-medium text-gray-300">Item Name</p>
          </div>
        ))}
      </div>

      {/* You May Also Like Section */}
      <h3 className="text-xl font-semibold mb-4">You may also like</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {DUMMY_YOU_MAY_ALSO_LIKE.map((item) => (
          <div key={item.id} className="bg-gray-800 rounded-lg overflow-hidden shadow-md flex">
            <img
              src={item.imageUrl}
              alt={item.title}
              className="w-24 h-24 object-cover"
            />
            <div className="p-4 flex-grow">
              <p className="font-semibold text-lg">{item.title}</p>
              <p className="text-sm text-gray-400">{item.subtitle}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Optional: Back button if user explicitly wants to go back */}
      {/* <button
        onClick={onBack}
        className="mt-10 px-6 py-2 bg-gray-700 text-white rounded-full hover:bg-gray-600 transition-colors"
      >
        Back to Home
      </button> */}
    </div>
  );
}

export default SearchPage;