// backend/server.js
const express = require('express');
const request = require('request'); // For making HTTP requests
const cors = require('cors'); // To handle Cross-Origin requests
const querystring = require('querystring'); // To handle query string parsing/formatting
const cookieParser = require('cookie-parser'); // To parse cookies

// --- IMPORTANT: REPLACE THESE WITH YOUR ACTUAL SPOTIFY APP CREDENTIALS ---
const CLIENT_ID = 'YOUR_SPOTIFY_CLIENT_ID'; // Get this from your Spotify Developer Dashboard
const CLIENT_SECRET = 'YOUR_SPOTIFY_CLIENT_SECRET'; // Get this from your Spotify Developer Dashboard
// -------------------------------------------------------------------------

// This is the URI where Spotify will redirect the user AFTER they authorize your app.
// It MUST be listed in your Spotify Dashboard App Settings -> "Redirect URIs".
// It should be the URL of your FRONTEND + a path for the callback.
const REDIRECT_URI = 'http://localhost:3000/callback'; // Make sure this matches your React app's URL

const app = express();
const port = 8888; // This is the port your backend server will run on.
                  // It MUST be different from your React app's port (usually 3000).

// Middleware setup
app.use(cors()) // Enable CORS for all routes
   .use(cookieParser()); // Enable cookie parsing

// Helper function to generate a random string for 'state' parameter (security)
const generateRandomString = length => {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

// A key for storing the state in cookies to prevent CSRF attacks
const stateKey = 'spotify_auth_state';

/**
 * Route to initiate Spotify login.
 * When the frontend calls this, it redirects the user to Spotify's authorization page.
 */
app.get('/login', (req, res) => {
  const state = generateRandomString(16);
  res.cookie(stateKey, state); // Store the state in a cookie

  // Define the permissions (scopes) your app needs
  const scope = 'user-read-private user-read-email playlist-read-private playlist-read-collaborative user-top-read user-read-playback-state user-modify-playback-state'; // Add more as needed

  // Redirect user to Spotify's authorization page
  res.redirect('http://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',    // We are requesting an authorization code
      client_id: CLIENT_ID,     // Your Spotify Client ID
      scope: scope,             // Requested permissions
      redirect_uri: REDIRECT_URI, // Where Spotify redirects after authorization
      state: state              // Security parameter to prevent CSRF
    }));
});

/**
 * Callback route after user authorizes/denies your app on Spotify.
 * Spotify redirects to this URI with an authorization code or an error.
 */
app.get('/callback', (req, res) => {
  const code = req.query.code || null; // The authorization code from Spotify
  const state = req.query.state || null; // The state parameter returned by Spotify
  const storedState = req.cookies ? req.cookies[stateKey] : null; // The state we stored in cookie

  // Check if the state matches to prevent CSRF
  if (state === null || state !== storedState) {
    res.redirect('/#' + // Redirect to frontend with an error
      querystring.stringify({
        error: 'state_mismatch'
      }));
  } else {
    res.clearCookie(stateKey); // Clear the state cookie

    // Exchange the authorization code for an Access Token and Refresh Token
    const authOptions = {
      url: 'http://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: REDIRECT_URI,
        grant_type: 'authorization_code' // This type of grant
      },
      headers: {
        // Your Client ID and Client Secret, base64 encoded for authentication
        'Authorization': 'Basic ' + (Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64'))
      },
      json: true // Parse the response as JSON
    };

    request.post(authOptions, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        const access_token = body.access_token;
        const refresh_token = body.refresh_token;

        // Redirect back to your frontend with tokens in the URL hash
        // The frontend will extract these.
        res.redirect('http://localhost:3000/#' + // Frontend URL
          querystring.stringify({
            access_token: access_token,
            refresh_token: refresh_token // Provide refresh token too
          }));
      } else {
        res.redirect('/#' + // Redirect to frontend with error
          querystring.stringify({
            error: 'invalid_token'
          }));
      }
    });
  }
});

/**
 * Route to refresh the Access Token using the Refresh Token.
 * The frontend can call this when its access token expires.
 */
app.get('/refresh_token', (req, res) => {
  const refresh_token = req.query.refresh_token; // Refresh token from frontend

  const authOptions = {
    url: 'http://accounts.spotify.com/api/token',
    headers: { 'Authorization': 'Basic ' + (Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64')) },
    form: {
      grant_type: 'refresh_token', // This type of grant
      refresh_token: refresh_token
    },
    json: true
  };

  request.post(authOptions, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      const access_token = body.access_token;
      res.send({ 'access_token': access_token }); // Send new access token back to frontend
    } else {
      res.status(response.statusCode || 500).send({ error: 'refresh_failed' });
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Spotify Auth Backend listening on http://localhost:${port}`);
});