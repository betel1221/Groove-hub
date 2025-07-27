export const DUMMY_PLAYLISTS = [
  {
    id: 1,
    title: "Top Hits 2025",
    description: "The hottest tracks of the year",
    tracks: {
      data: [
        {
          id: 1,
          title: "Blinding Lights",
          artist: { name: "The Weeknd" },
          album: { title: "After Hours", cover_medium: "/placeholder.svg?height=200&width=200" },
          duration: 200,
          preview: "https://example.com/preview/blinding-lights.mp3",
        },
        {
          id: 2,
          title: "Watermelon Sugar",
          artist: { name: "Harry Styles" },
          album: { title: "Fine Line", cover_medium: "/placeholder.svg?height=200&width=200" },
          duration: 174,
          preview: "https://example.com/preview/watermelon-sugar.mp3",
        },
      ],
    },
  },
  {
    id: 2,
    title: "Pop Favorites",
    description: "Your favorite pop anthems",
    tracks: {
      data: [
        {
          id: 3,
          title: "Levitating",
          artist: { name: "Dua Lipa" },
          album: { title: "Future Nostalgia", cover_medium: "/placeholder.svg?height=200&width=200" },
          duration: 203,
          preview: "https://example.com/preview/levitating.mp3",
        },
        {
          id: 4,
          title: "Good 4 U",
          artist: { name: "Olivia Rodrigo" },
          album: { title: "SOUR", cover_medium: "/placeholder.svg?height=200&width=200" },
          duration: 178,
          preview: "https://example.com/preview/good-4-u.mp3",
        },
      ],
    },
  },
];

export const DUMMY_ALBUMS = [
  {
    id: 1,
    title: "After Hours",
    artist: { name: "The Weeknd" },
    cover_medium: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 2,
    title: "Fine Line",
    artist: { name: "Harry Styles" },
    cover_medium: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 3,
    title: "Future Nostalgia",
    artist: { name: "Dua Lipa" },
    cover_medium: "/placeholder.svg?height=200&width=200",
  },
];