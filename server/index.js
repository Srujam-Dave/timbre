const express = require('express');
const cors = require('cors');
const session = require('express-session');
const querystring = require('querystring');
const dotenv = require('dotenv').config();

// Spotify application information
const client_id = process.env.CLIENT_ID;
const redirect_uri = process.env.CALLBACK_URL;
const client_secret = process.env.CLIENT_SECRET;
const scope = 'user-read-private user-top-read';
const allowedOrigins = process.env.ORIGINS?.split(",") || [];

// Initialize express application
const app = express();
app.use(cors({
  origin:  allowedOrigins,
  credentials: true
}));
app.use(express.json());
app.use(session({
    secret: 'placeholder',
    resave: false,
    saveUninitialized: false
}));
const port = 3000;

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

// Send login information to frontend
app.get('/login/url', (req, res) => {
  try {
    const login_url = 'https://accounts.spotify.com/authorize?' + querystring.stringify({
      client_id: client_id,
      response_type: 'code',
      redirect_uri: redirect_uri,
      scope: scope
    });
    res.send(login_url);
  } catch (err) {
    res.status(500).send('Failed to generate login URL');
  }
});

// retrieve access token after frontend sends authentication code
app.post('/login/code', async (req, res) => {
    const params = req.body;
    const code = params.code;

    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Authorization': 'Basic ' + Buffer.from(client_id + ":" + client_secret, 'utf-8').toString('base64'),
            'content-type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
          code: code,
          grant_type: 'authorization_code',
          redirect_uri: redirect_uri
        })
    });

    const data = await response.json();

    req.session.access_token = data.access_token;
    req.session.refresh_token = data.refresh_token;

    res.status(200).json({ message: "Authorization code received" });
});

app.get('/me/profile', async (req, res) => {
  const response = await fetch('https://api.spotify.com/v1/me', {
      method: 'GET',
      headers: {
          'Authorization' : 'Bearer ' + req.session.access_token
      }
  });
  const data = await response.json()
  res.send(data);
});

app.get('/me/top', async (req, res) => {
  const tracksPromise = await fetch(`https://api.spotify.com/v1/me/top/tracks?time_range=${req.query.time_range}&limit=50`, {
    method: 'GET',
    headers: {
      'Authorization' : 'Bearer ' + req.session.access_token
    }
  });

  const artistsPromise = await fetch(`https://api.spotify.com/v1/me/top/artists?time_range=${req.query.time_range}&limit=50`, {
    method: 'GET',
    headers: {
      'Authorization' : 'Bearer ' + req.session.access_token
    }
  });

  const data = {
    tracks: await tracksPromise.json(),
    artists: await artistsPromise.json()
  }

  res.send(data);
});