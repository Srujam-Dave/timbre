## About

This is a project I developed over the summer of 2025 to learn more about APIs and stack development. This project contains a web app that allows a user to log in with their Spotify Account, sending them to a page that displays their top artists and songs over various time periods. 

The frontend of the app was built using React.js and the backend is powered by Express.js. I relied on the [Spotify Web API](https://developer.spotify.com/documentation/web-api) to retrive user information. 

Unfortunately, due to constrains on the Spotify API, this app can't yet be published publicly.

## Installation

1. To use the app, it's necessary to register an app on Spotify's [developer dashboard](https://developer.spotify.com/dashboard). 

2. After cloning the git repository, create a `.env` file in the `clients` folder (copying the `.env.example` file is fine here).

3. Similarly, create a `.env`in the `server` folder and fill in your client secret and client ID. 

4. In the terminal, enter the `client` folder, run `npm install`, and `npm run dev`. 

5. In a separate terminal window, navigate to the `server` folder, run `npm install`, and `node index.js`. Open your browser and navigate to `http://localhost:5173/`: the app should be visible.
