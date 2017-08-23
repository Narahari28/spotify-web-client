/* Specifies actions involving retrieving data from user API endpoints */

import * as actionTypes from '../constants/actionTypes';

function setUser(user) {
  return {
    type: actionTypes.SET_USER,
    user
  };
}

function setPlaylists(playlists) {
  return {
    type: actionTypes.SET_PLAYLISTS,
    playlists
  }
}

function setPopular(popular) {
  return {
    type: actionTypes.SET_POPULAR,
    popular
  }
}

function setUserTopTracks(userTopTracks) {
  return {
    type: actionTypes.SET_USER_TOP_TRACKS,
    userTopTracks
  }
}

function setUserRecent(userRecent) {
  return {
    type: actionTypes.SET_USER_RECENT,
    userRecent
  }
}

function setToken(accessToken) {
  return {
    type: actionTypes.SET_TOKEN,
    accessToken
  }
}

function setPlaylistTracks(playlistTracks) {
  return {
    type: actionTypes.SET_PLAYLIST_TRACKS,
    playlistTracks
  }
}

function setPlaylistArtists(playlistArtists) {
  return {
    type: actionTypes.SET_PLAYLIST_ARTISTS,
    playlistArtists
  }
}


// Uses fetch API to access popular music from iTunes, which is then used to populate the login page
export function popular() {
  return function(dispatch) {
    fetch('https://itunes.apple.com/us/rss/topsongs/limit=12/json', {
      method: 'get'
    }).then(function(res) {
      return res.json();
    }).then(function(myJson) {
      dispatch(setPopular(myJson));
    });
  }
}


function getTopNArtists(n, dict) {
  var dictAsArray = Object.keys(dict).map(function(key) {
      return [key, dict[key]];
  });
  dictAsArray.sort(function(a, b) {
      return b[1] - a[1]; // A comparator for two elements a and b
  });
  return dictAsArray.slice(0, n);
}

export function playlist(accessToken, userID, playlistID) {
  return function(dispatch) {
    var playlistTrackEndpoint = 'https://api.spotify.com/v1/users/' + userID + '/playlists/' + playlistID + '/tracks';
    fetch(playlistTrackEndpoint, {
      method: 'get',
      headers: {
        'Authorization': 'Bearer ' + accessToken,
      }
    }).then(function(res) {
      return res.json();
    }).then(function(myJson) {
      dispatch(setPlaylistTracks(myJson));
      var artistsDict = {};
      myJson.items.forEach(function(trackObj) {
        var artistsObj = trackObj.track.artists;
        for (var i = 0; i < artistsObj.length; i++) {
          if (artistsObj[i].id in artistsDict) {
            artistsDict[artistsObj[i].id] += 1;
          }
          else {
            artistsDict[artistsObj[i].id] = 1;
          }
        }
      });
      var numToDisplay = Math.min(5, Object.keys(artistsDict).length);
      var topNArtists = getTopNArtists(numToDisplay, artistsDict);
      var fn = function asyncArtistFetch(artist){ // sample async action
        var artistEndpoint = 'https://api.spotify.com/v1/artists/' + artist[0];
        return fetch(artistEndpoint, {
          method: 'get',
          headers: {
            'Authorization': 'Bearer ' + accessToken,
          }
        }).then(function(res) {
          return res.json();
        });
      };
      var actions = topNArtists.map(fn);
      var results = Promise.all(actions);
      results.then(function(data) {
        for(var i = 0; i < data.length; i++) {
          topNArtists[i][0] = data[i];
        }
        return topNArtists;
      }).then(function(topNArtists) {
        dispatch(setPlaylistArtists(topNArtists));
      });
    });
  }
}

// Uses fetch API to access the API endpoint with Spotify user info, then resolves the resulting promise, and finally dispatches it to the store. Dispatch parameter passed in through the reducer.
export function auth(accessToken) {
  return function(dispatch) {
    dispatch(setToken(accessToken));
    fetch('https://api.spotify.com/v1/me', {
      method: 'get',
      headers: {
        'Authorization': 'Bearer ' + accessToken,
      }
    }).then(function(res) {
      return res.json();
    }).then(function(myJson) {
      dispatch(setUser(myJson));
    });
    fetch('https://api.spotify.com/v1/me/playlists', {
      method: 'get',
      headers: {
        'Authorization': 'Bearer ' + accessToken,
      }
    }).then(function(res) {
      return res.json();
    }).then(function(myJson) {
      dispatch(setPlaylists(myJson));
    });
    fetch('https://api.spotify.com/v1/me/top/tracks', {
      method: 'get',
      headers: {
        'Authorization': 'Bearer ' + accessToken,
      }
    }).then(function(res) {
      return res.json();
    }).then(function(myJson) {
      dispatch(setUserTopTracks(myJson));
    });
    fetch('https://api.spotify.com/v1/me/player/recently-played', {
      method: 'get',
      headers: {
        'Authorization': 'Bearer ' + accessToken,
      }
    }).then(function(res) {
      return res.json();
    }).then(function(myJson) {
      dispatch(setUserRecent(myJson));
    });
  }
}