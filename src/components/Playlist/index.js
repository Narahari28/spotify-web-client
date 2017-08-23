/* Renders an iframe Spotify player that allows you to play songs from the specific playlist */

import {browserHistory} from 'react-router';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actions from '../../actions';
import Playlist from './presenter';
import {push} from 'react-router-redux';

function mapStateToProps(state) {
	const {accessToken, playlistTracks, playlistArtists} = state.auth;
	return {
		accessToken,
		playlistTracks,
		playlistArtists
	};
}

function mapDispatchToProps(dispatch) {
	return {
    	onLogout: onLogout,
	    appLogout: appLogout,
	    goBack: goBack,
	    getTracks: bindActionCreators(actions.playlist, dispatch)
  	};
}

function onLogout() {
	window.location.href = "https://spotify.com/logout";
}

function appLogout() {
	browserHistory.replace('/');
}

function goBack() {
	browserHistory.goBack();
}

export default connect(mapStateToProps, mapDispatchToProps)(Playlist);