// Mock searchTracks for Search.jsx
export const searchTracks = async (query) => {
  // Use the chart data as a base for mock search
  const chart = await fetchChartData();
  const allTracks = chart.tracks.data;
  const lowerQuery = query.toLowerCase();
  return {
    data: allTracks.filter(track =>
      track.title.toLowerCase().includes(lowerQuery) ||
      track.artist?.name?.toLowerCase().includes(lowerQuery) ||
      track.album?.title?.toLowerCase().includes(lowerQuery)
    ),
  };
};
// Mock genre data for search page
export const fetchGenres = async () => {
  return {
    data: [
      { id: 1, name: 'Pop' },
      { id: 2, name: 'Hip-Hop' },
      { id: 3, name: 'Rock' },
      { id: 4, name: 'R&B' },
      { id: 5, name: 'Electronic' },
      { id: 6, name: 'Afrobeats' },
      { id: 7, name: 'Jazz' },
      { id: 8, name: 'Indie' },
    ],
  };
};
// src/services/deezerAPI.js
export const fetchChartData = async () => {
  return {
    tracks: {
      data: [
        {
          id: 1,
          title: 'Flowers',
          duration: 200,
          preview: 'https://cdns-preview-d.dzcdn.net/stream/c-deda7fa9316d9e7fcbecc6e2556e3ede-3.mp3',
          artist: { id: 1, name: 'Miley Cyrus', picture_small: './public/flower.jpg', picture_medium: './public/flower.jpg' },
          album: { id: 1, title: 'Endless Summer Vacation', cover_small: './public/flower.jpg', cover_medium: './public/flower.jpg' },
        },
        {
          id: 2,
          title: 'Blinding Lights',
          duration: 200,
          preview: 'https://cdns-preview-d.dzcdn.net/stream/c-deda7fa9316d9e7fcbecc6e2556e3ede-4.mp3',
          artist: { id: 2, name: 'The Weeknd', picture_small: './public/OIP.webp', picture_medium: './public/blinding.jpg' },
          album: { id: 2, title: 'After Hours', cover_small: './public/OIP.webp', cover_medium: './public/blinding.jpg' },
        },
        {
          id: 3,
          title: 'Shape of You',
          duration: 233,
          preview: 'https://cdns-preview-d.dzcdn.net/stream/c-deda7fa9316d9e7fcbecc6e2556e3ede-5.mp3',
          artist: { id: 3, name: 'Ed Sheeran', picture_small: './public/ed.jpg', picture_medium: './public/ed.jpg' },
          album: { id: 3, title: '÷ (Divide)', cover_small: './public/ed.jpg', cover_medium: './public/ed.jpg' },
        },
        {
          id: 4,
          title: 'Lose Yourself',
          duration: 326,
          preview: 'https://cdns-preview-d.dzcdn.net/stream/c-deda7fa9316d9e7fcbecc6e2556e3ede-1.mp3',
          artist: { id: 4, name: 'Eminem', picture_small: './public/lose.jpg', picture_medium: './public/lose.jpg' },
          album: { id: 4, title: '8 Mile', cover_small: './public/lose.jpg', cover_medium: './public/lose.jpg' },
        },
        {
          id: 5,
          title: 'The Real Slim Shady',
          duration: 284,
          preview: 'https://cdns-preview-d.dzcdn.net/stream/c-deda7fa9316d9e7fcbecc6e2556e3ede-2.mp3',
          artist: { id: 4, name: 'Eminem', picture_small: './public/real.jpg', picture_medium: './public/real.jpg' },
          album: { id: 5, title: 'The Marshall Mathers LP', cover_small: './public/real.jpg', cover_medium: './public/real.jpg' },
        },
        {
          id: 6,
          title: 'Without Me',
          duration: 290,
          preview: 'https://cdns-preview-d.dzcdn.net/stream/c-deda7fa9316d9e7fcbecc6e2556e3ede-3.mp3',
          artist: { id: 4, name: 'Eminem', picture_small: './public/without.jpg', picture_medium: './public/without.jpg' },
          album: { id: 6, title: 'The Eminem Show', cover_small: './public/without.jpg', cover_medium: './public/without.jpg' },
        },
      ],
    },
    albums: {
      data: [
        {
          id: 1,
          title: 'Endless Summer Vacation',
          cover_small: './public/flower.jpg',
          cover_medium: './public/flower.jpg',
          artist: { id: 1, name: 'Miley Cyrus' },
        },
        {
          id: 2,
          title: 'After Hours',
          cover_small: './public/blinding.jpg',
          cover_medium: './public/blinding.jpg',
          artist: { id: 2, name: 'The Weeknd' },
        },
        {
          id: 3,
          title: '÷ (Divide)',
          cover_small: './public/ed.jpg',
          cover_medium: './public/ed.jpg',
          artist: { id: 3, name: 'Ed Sheeran' },
        },
        {
          id: 4,
          title: '8 Mile',
          cover_small: './public/lose.jpg',
          cover_medium: './public/lose.jpg',
          artist: { id: 4, name: 'Eminem' },
        },
        {
          id: 5,
          title: 'The Marshall Mathers LP',
          cover_small: './public/lose.jpg',
          cover_medium: './public/lose.jpg',
          artist: { id: 4, name: 'Eminem' },
        },
        {
          id: 6,
          title: 'The Eminem Show',
          cover_small: './public/real.jpg',
          cover_medium: './public/real.jpg',
          artist: { id: 4, name: 'Eminem' },
        },
        {
          id: 7,
          title: 'Folklore',
          cover_small: './public/flower.jpg',
          cover_medium: './public/flower.jpg',
          artist: { id: 5, name: 'Taylor Swift' },
        },
        {
          id: 8,
          title: 'Lover',
          cover_small: '/public/Taylor Swift.jpg',
          cover_medium: '/public/Taylor Swift.jpg',
          artist: { id: 5, name: 'Taylor Swift' },
        },
        {
          id: 9,
          title: 'Midnights',
          cover_small: './public/OIP (3).jpg',
          cover_medium: './public/OIP (3).jpg',
          artist: { id: 5, name: 'The Weekend' },
        },
        {
          id: 10,
          title: 'Dua Lipa',
          cover_small: '/public/80280240-7df0-46c6-ab1d-6830ccf448d3.jpg',
          cover_medium: '/public/80280240-7df0-46c6-ab1d-6830ccf448d3.jpg',
          artist: { id: 6, name: 'Dua Lipa' },
        },
      ],
    },
    artists: {
      data: [
        {
          id: 1,
          name: 'Miley Cyrus',
          picture_small: '/public/cfdcfdd8-dd6c-4086-9d9c-5c4904b5f92f.jpg',
          picture_medium: '/public/cfdcfdd8-dd6c-4086-9d9c-5c4904b5f92f.jpg',
        },
        {
          id: 2,
          name: 'The Weeknd',
          picture_small: '/public/OIP (3).jpg',
          picture_medium: '/public/OIP (3).jpg',
        },
        {
          id: 3,
          name: 'Ed Sheeran',
          picture_small: '/public/Ed Sheeran in Houston, Texas 📍.jpg',
          picture_medium: '/public/Ed Sheeran in Houston, Texas 📍.jpg',
        },
        {
          id: 4,
          name: 'Eminem',
          picture_small: '/public/2af1b9e4-e2a0-4212-be17-f6f391fcacb0.jpg',
          picture_medium: '/public/2af1b9e4-e2a0-4212-be17-f6f391fcacb0.jpg',
        },
        {
          id: 5,
          name: 'Taylor Swift',
          picture_small: '/public/Taylor Swift.jpg',
          picture_medium: '/public/Taylor Swift.jpg',
        },
        {
          id: 6,
          name: 'Dua Lipa',
          picture_small: '/public/80280240-7df0-46c6-ab1d-6830ccf448d3.jpg',
          picture_medium: '/public/80280240-7df0-46c6-ab1d-6830ccf448d3.jpg',
        },
        {
          id: 7,
          name: 'Drake',
          picture_small: '/public/4a2ef845-fed2-4014-bdab-f0f2c776d054.jpg',
          picture_medium: '/public/4a2ef845-fed2-4014-bdab-f0f2c776d054.jpg',
        },
        {
          id: 8,
          name: 'Billie Eilish',
          picture_small: '/public/71fa8f90-a462-4189-bc5b-9762e7956944.jpg',
          picture_medium: '/public/71fa8f90-a462-4189-bc5b-9762e7956944.jpg',
        },
      ],
    },
  };
};

export const fetchEditorial = async () => {
  return {
    data: [
      {
        id: 7,
        title: 'Folklore',
        picture_small: '/public/Taylor Swift.jpg',
        picture_medium: '/public/Taylor Swift.jpg',
        artist: { id: 5, name: 'Taylor Swift' },
      },
      {
        id: 8,
        title: 'After Hour',
        picture_small: '/public/OIP (3).jpg',
        picture_medium: '/public/OIP (3).jpgt',
        artist: { id: 5, name: 'The Weekend' },
      },
      {
        id: 9,
        title: 'Midnights',
        picture_small: './public/A concept album conceived from her thoughts during… (1).jpg',
        picture_medium: './public/A concept album conceived from her thoughts during… (1).jpg',
        artist: { id: 5, name: 'Taylor Swift' },
      },
      {
        id: 10,
        title: 'Dua Lipa',
        cover_small: '/public/80280240-7df0-46c6-ab1d-6830ccf448d3.jpg',
        cover_medium: '/public/80280240-7df0-46c6-ab1d-6830ccf448d3.jpg',
        artist: { id: 6, name: 'Dua Lipa' },
      },
    ],
  };
};

export const fetchPlaylist = async (playlistId) => {
  return {
    tracks: {
      data: [
        {
          id: 10,
          title: 'New Rules',
          duration: 210,
          preview: 'https://cdns-preview-d.dzcdn.net/stream/c-deda7fa9316d9e7fcbecc6e2556e3ede-6.mp3',
          artist: { id: 6, name: 'Dua Lipa', picture_small: '/public/80280240-7df0-46c6-ab1d-6830ccf448d3.jpg', picture_medium: '/public/80280240-7df0-46c6-ab1d-6830ccf448d3.jpg' },
          album: { id: 10, title: 'Dua Lipa', cover_small: '/public/80280240-7df0-46c6-ab1d-6830ccf448d3.jpg' },
        },
        {
          id: 11,
          title: 'God’s Plan',
          duration: 199,
          preview: 'https://cdns-preview-d.dzcdn.net/stream/c-deda7fa9316d9e7fcbecc6e2556e3ede-7.mp3',
          artist: { id: 7, name: 'Drake', picture_small: '/public/4a2ef845-fed2-4014-bdab-f0f2c776d054.jpg', picture_medium: '/public/4a2ef845-fed2-4014-bdab-f0f2c776d054.jpg' },
          album: { id: 11, title: 'Scorpion', cover_small: '/public/4a2ef845-fed2-4014-bdab-f0f2c776d054.jpg' },
        },
        
      ],
    },
  };
};