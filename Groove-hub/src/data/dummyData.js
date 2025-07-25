// src/data/dummyData.js

// --- Import Images from src/assets/images folder ---
import img1 from '../assets/images/img1.jfif';
import img2 from '../assets/images/img2.jfif';
import img3 from '../assets/images/img3.jfif';
import img4 from '../assets/images/img4.jfif';
import img5 from '../assets/images/img5.jfif';
import img6 from '../assets/images/img6.jfif';
// You have img7.jfif, img8.jfif, img9.png but only 6 are needed for DUMMY_PLAYLISTS
// If DUMMY_RELEASES (currently unused) were to be re-enabled and use these,
// you would import img7, img8, img9 here too.

// --- Import Audio files from src/assets/audio folder ---
// (These are currently NOT used by DUMMY_PLAYLISTS, but would be for DUMMY_RELEASES if re-enabled)
// import audioA from '../assets/audio/a.mp4';
// import audioB from '../assets/audio/b.mp4';
// import audioC from '../assets/audio/c.mp4';
// import audioD from '../assets/audio/d.mp4';
// import audioE from '../assets/audio/e.mp4';
// import audioF from '../assets/audio/f.mp4';
// import audioG from '../assets/audio/g.mp4';
// import audioH from '../assets/audio/h.mp4';
// import audioI from '../assets/audio/i.mp4';


export const DUMMY_PLAYLISTS = [
  { id: 'dummy-playlist-1', name: 'Chill Vibes', description: 'Relaxing tunes for winding down.', imageUrl: img1 },
  { id: 'dummy-playlist-2', name: 'Morning Coffee', description: 'Acoustic tracks to start your day.', imageUrl: img2 },
  { id: 'dummy-playlist-3', name: 'Workout Mix', description: 'High energy for your exercise routine.', imageUrl: img3 },
  { id: 'dummy-playlist-4', name: 'Focus Flow', description: 'Instrumentals for concentration.', imageUrl: img4 },
  { id: 'dummy-playlist-5', name: 'Evening Jazz', description: 'Smooth jazz for a relaxed evening.', imageUrl: img5 },
  { id: 'dummy-playlist-6', name: 'Road Trip Jams', description: 'Sing-along classics for the open road.', imageUrl: img6 },
];

// --- IMPORTANT NOTE REGARDING DUMMY_RELEASES ---
// This array is currently **NOT used** by your App.js for "New Releases,"
// as "New Releases" are now fetched dynamically from the iTunes API.
// You can remove or comment out this entire DUMMY_RELEASES export if it's no longer needed anywhere else.
/*
export const DUMMY_RELEASES = [
  { id: 'dummy-release-1', title: 'New Age Anthem', artist: 'Future Echoes', imageUrl: img7, previewUrl: audioA },
  { id: 'dummy-release-2', title: 'Silent Whispers', artist: 'Ambient Soundscapes', imageUrl: img8, previewUrl: audioB },
  { id: 'dummy-release-3', title: 'Rhythmic Heartbeat', artist: 'Beat Masters', imageUrl: img9, previewUrl: audioC },
  { id: 'dummy-release-4', title: 'Digital Dream', artist: 'SynthWave Collective', imageUrl: img1, previewUrl: audioD }, // Reusing images & audio
  { id: 'dummy-release-5', title: 'Forest Lullaby', artist: 'Nature Sounds', imageUrl: img2, previewUrl: audioE },
  { id: 'dummy-release-6', title: 'City Lights', artist: 'Urban Grooves', imageUrl: img3, previewUrl: audioF },
];
*/