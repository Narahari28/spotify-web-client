Spotify Web Client

Author: Narahari Bharadwaj, adapted from Robin Wieruch's Soundcloud Client

Version: 0.1

Description: A web client written using React and Redux that allows users to log in to their Spotify accounts and displays their profile information and playlists.

<div align="center">
  <img src="https://github.com/Narahari28/spotify-web-client/blob/master/Login.png" alt="Login Page" width="500">
</div>

<div align="center">
  <img src="https://github.com/Narahari28/spotify-web-client/blob/master/Profile.png" alt="User Profile" width="425"> <img src="https://github.com/Narahari28/spotify-web-client/blob/master/Playlist.png" alt="User Playlist" width="425">
</div>

File structure:
1. dist/index.html is the main HTML file
2. The main code is in src, where actions, components, and reducers are specified.
3. test sets up the testing environment by globally exposing the window an an HTML document, for use with Mocha and Enzyme. These tests will be migrated to Jest and Enzyme.
4. __tests__ specifies tests to be used using Enzyme and Jest

To do: Restyle using Flexbox, apply React Toolbox, and write tests in Enzyme + Jest

Instructions to run: Clone the repository and save it to your local machine. Navigate to the directory you saved the project to and run the code using the following set of commands:

1. git clone https://github.com/Narahari28/spotify-web-client
2. cd spotify-web-client
3. npm install
4. npm start

You should be able to view the app from http://localhost:8080. If this doesn't work, check the output in the terminal- it will tell you where the project is running. If the port number is different, this means you already have a program running on port 8080 and need to kill that first.