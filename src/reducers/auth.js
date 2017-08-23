/* Reducer for API request actions */

import * as actionTypes from '../constants/actionTypes';

const initialState = {};

export default function(state = initialState, action) {
	switch(action.type) {
		case actionTypes.SET_USER:
			return setPerson(state, action);
		case actionTypes.SET_PLAYLISTS:
			return setPlaylists(state, action);
		case actionTypes.SET_POPULAR:
			return setPopular(state, action);
		case actionTypes.SET_USER_TOP_TRACKS:
			return setUserTopTracks(state, action);
		case actionTypes.SET_USER_RECENT:
			return setUserRecent(state, action);
		case actionTypes.SET_TOKEN:
			return setToken(state, action);
		case actionTypes.SET_PLAYLIST_TRACKS:
			return setPlaylistTracks(state, action);
		case actionTypes.SET_PLAYLIST_ARTISTS:
			return setPlaylistArtists(state, action);
	}
	return state;
}

function setPerson(state, action) {
	const {user} = action;
	return {...state, user};
}

function setPlaylists(state, action) {
	const {playlists} = action;
	return {...state, playlists};
}

function setPopular(state, action) {
	const {popular} = action;
	return {...state, popular};
}

function setUserTopTracks(state, action) {
	const {userTopTracks} = action;
	return {...state, userTopTracks};
}

function setUserRecent(state, action) {
	const {userRecent} = action;
	return {...state, userRecent};
}

function setToken(state, action) {
	const {accessToken} = action;
	return {...state, accessToken};
}

function setPlaylistTracks(state, action) {
	const {playlistTracks} = action;
	return {...state, playlistTracks};
}

function setPlaylistArtists(state, action) {
	const {playlistArtists} = action;
	return {...state, playlistArtists};
}