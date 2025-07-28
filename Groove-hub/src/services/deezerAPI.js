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
          artist: { id: 2, name: 'The Weeknd', picture_small: './public/blinding.jpg', picture_medium: './public/blinding.jpg' },
          album: { id: 2, title: 'After Hours', cover_small: '/./public/blinding.jpg', cover_medium: './public/blinding.jpg' },
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
          cover_small: '/placeholder.svg?height=200&width=200&text=Album',
          cover_medium: '/placeholder.svg?height=200&width=200&text=Album',
          artist: { id: 1, name: 'Miley Cyrus' },
        },
        {
          id: 2,
          title: 'After Hours',
          cover_small: '/placeholder.svg?height=200&width=200&text=Album',
          cover_medium: '/placeholder.svg?height=200&width=200&text=Album',
          artist: { id: 2, name: 'The Weeknd' },
        },
        {
          id: 3,
          title: '÷ (Divide)',
          cover_small: '/placeholder.svg?height=200&width=200&text=Album',
          cover_medium: '/placeholder.svg?height=200&width=200&text=Album',
          artist: { id: 3, name: 'Ed Sheeran' },
        },
        {
          id: 4,
          title: '8 Mile',
          cover_small: '/placeholder.svg?height=200&width=200&text=Album',
          cover_medium: '/placeholder.svg?height=200&width=200&text=Album',
          artist: { id: 4, name: 'Eminem' },
        },
        {
          id: 5,
          title: 'The Marshall Mathers LP',
          cover_small: '/placeholder.svg?height=200&width=200&text=Album',
          cover_medium: '/placeholder.svg?height=200&width=200&text=Album',
          artist: { id: 4, name: 'Eminem' },
        },
        {
          id: 6,
          title: 'The Eminem Show',
          cover_small: '/placeholder.svg?height=200&width=200&text=Album',
          cover_medium: '/placeholder.svg?height=200&width=200&text=Album',
          artist: { id: 4, name: 'Eminem' },
        },
        {
          id: 7,
          title: 'Folklore',
          cover_small: '/placeholder.svg?height=200&width=200&text=Album',
          cover_medium: '/placeholder.svg?height=200&width=200&text=Album',
          artist: { id: 5, name: 'Taylor Swift' },
        },
        {
          id: 8,
          title: 'Lover',
          cover_small: '/placeholder.svg?height=200&width=200&text=Album',
          cover_medium: '/placeholder.svg?height=200&width=200&text=Album',
          artist: { id: 5, name: 'Taylor Swift' },
        },
        {
          id: 9,
          title: 'Midnights',
          cover_small: '/placeholder.svg?height=200&width=200&text=Album',
          cover_medium: '/placeholder.svg?height=200&width=200&text=Album',
          artist: { id: 5, name: 'Taylor Swift' },
        },
        {
          id: 10,
          title: 'Dua Lipa',
          cover_small: '/placeholder.svg?height=200&width=200&text=Album',
          cover_medium: '/placeholder.svg?height=200&width=200&text=Album',
          artist: { id: 6, name: 'Dua Lipa' },
        },
      ],
    },
    artists: {
      data: [
        {
          id: 1,
          name: 'Miley Cyrus',
          picture_small: '/placeholder.svg?height=120&width=120&text=Artist',
          picture_medium: '/placeholder.svg?height=120&width=120&text=Artist',
        },
        {
          id: 2,
          name: 'The Weeknd',
          picture_small: '/placeholder.svg?height=120&width=120&text=Artist',
          picture_medium: '/placeholder.svg?height=120&width=120&text=Artist',
        },
        {
          id: 3,
          name: 'Ed Sheeran',
          picture_small: '/placeholder.svg?height=120&width=120&text=Artist',
          picture_medium: '/placeholder.svg?height=120&width=120&text=Artist',
        },
        {
          id: 4,
          name: 'Eminem',
          picture_small: '/placeholder.svg?height=120&width=120&text=Artist',
          picture_medium: '/placeholder.svg?height=120&width=120&text=Artist',
        },
        {
          id: 5,
          name: 'Taylor Swift',
          picture_small: '/placeholder.svg?height=120&width=120&text=Artist',
          picture_medium: '/placeholder.svg?height=120&width=120&text=Artist',
        },
        {
          id: 6,
          name: 'Dua Lipa',
          picture_small: '/placeholder.svg?height=120&width=120&text=Artist',
          picture_medium: '/placeholder.svg?height=120&width=120&text=Artist',
        },
        {
          id: 7,
          name: 'Drake',
          picture_small: '/placeholder.svg?height=120&width=120&text=Artist',
          picture_medium: '/placeholder.svg?height=120&width=120&text=Artist',
        },
        {
          id: 8,
          name: 'Billie Eilish',
          picture_small: '/placeholder.svg?height=120&width=120&text=Artist',
          picture_medium: '/placeholder.svg?height=120&width=120&text=Artist',
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
        picture_small: '/placeholder.svg?height=120&width=120&text=Artist',
        picture_medium: '/placeholder.svg?height=120&width=120&text=Artist',
        artist: { id: 5, name: 'Taylor Swift' },
      },
      {
        id: 8,
        title: 'Lover',
        picture_small: '/placeholder.svg?height=120&width=120&text=Artist',
        picture_medium: '/placeholder.svg?height=120&width=120&text=Artist',
        artist: { id: 5, name: 'Taylor Swift' },
      },
      {
        id: 9,
        title: 'Midnights',
        picture_small: '/placeholder.svg?height=120&width=120&text=Artist',
        picture_medium: '/placeholder.svg?height=120&width=120&text=Artist',
        artist: { id: 5, name: 'Taylor Swift' },
      },
      {
        id: 10,
        title: 'Dua Lipa',
        cover_small: '/placeholder.svg?height=200&width=200&text=Album',
        cover_medium: '/placeholder.svg?height=200&width=200&text=Album',
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
          artist: { id: 6, name: 'Dua Lipa', picture_small: '/placeholder.svg?height=60&width=60&text=Artist', picture_medium: '/placeholder.svg?height=60&width=60&text=Artist' },
          album: { id: 10, title: 'Dua Lipa', cover_small: '/placeholder.svg?height=200&width=200&text=Album', cover_medium: '/placeholder.svg?height=200&width=200&text=Album' },
        },
        {
          id: 11,
          title: 'God’s Plan',
          duration: 199,
          preview: 'https://cdns-preview-d.dzcdn.net/stream/c-deda7fa9316d9e7fcbecc6e2556e3ede-7.mp3',
          artist: { id: 7, name: 'Drake', picture_small: '/placeholder.svg?height=60&width=60&text=Artist', picture_medium: '/placeholder.svg?height=60&width=60&text=Artist' },
          album: { id: 11, title: 'Scorpion', cover_small: '/placeholder.svg?height=200&width=200&text=Album', cover_medium: '/placeholder.svg?height=200&width=200&text=Album' },
        },
        {
          id: 12,
          title: 'Bad Guy',
          duration: 194,
          preview: 'https://cdns-preview-d.dzcdn.net/stream/c-deda7fa9316d9e7fcbecc6e2556e3ede-8.mp3',
          artist: { id: 8, name: 'Billie Eilish', picture_small: '/placeholder.svg?height=60&width=60&text=Artist', picture_medium: '/placeholder.svg?height=60&width=60&text=Artist' },
          album: { id: 12, title: 'When We All Fall Asleep', cover_small: '/placeholder.svg?height=200&width=200&text=Album', cover_medium: '/placeholder.svg?height=200&width=200&text=Album' },
        },
      ],
    },
  };
};