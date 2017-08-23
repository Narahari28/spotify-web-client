/* Presentational component of the user page: renders information about user and redirects to playlist pages on click */

import React from 'react';
import {browserHistory} from 'react-router';


var User = React.createClass({
	componentWillMount: function () {
		var urlExtension = this.props.location.hash; // URL extension that contains access token
		var regExForToken = new RegExp("=([^&]+)");
		var matches = urlExtension.match(regExForToken); // Find and store all matches for the access token
		this.props.onAuth(matches[1]);
	},
	onLogout: function () {
		window.location.href = "https://spotify.com/logout";
	},
	appLogout: function () {
		browserHistory.replace('/'); // browserHistory forgets all past links
	},
	render: function () {
		var user = this.props.user;
		if(user) {
			if (!user.error) {
				var playlists = this.props.playlists;
				var renderedPlaylists = [];
				if (playlists && playlists.items) {
					for(let i = 0; i < playlists.items.length; i++) {
						var albumObj = playlists.items[i];
						renderedPlaylists.push(<PlaylistThumbnail key={i} image={albumObj.images[0].url} name={albumObj.name} href={albumObj.href}/>);
					}
				}
				var userTopTracks = this.props.userTopTracks;
				var renderedTopTracks = [];
				if (userTopTracks && userTopTracks.items) {
					for(let i = 0; i < 5; i++) {
						let trackObj = userTopTracks.items[i];
						renderedTopTracks.push(<TrackThumbnail key={i} uri={trackObj.uri} />);
					}
				}
				var userRecent = this.props.userRecent;
				var renderedRecent = [];
				if (userRecent && userRecent.items) {
					for(let i = 0; i < 5; i++) {
						let trackObj = userRecent.items[i].track;
						renderedRecent.push(<TrackThumbnail key={i} uri={trackObj.uri} />);
					}
				}
				return ( // Styling here is awful, will need to be fixed at some point
					<div className="wrapper">
					  	<div className="user">
					  		<img src={user.images[0].url} style={{float: 'left', marginLeft: '10%', marginRight: '3%', marginTop: '-1%', height: '117px', width: 'auto'}} />
						    <div className="user-content" style={{float: 'right', marginRight: '3%', width: '35%'}}>
						      <ul style={{listStyle: 'none', marginTop: '-2px'}}>
						        <li> <span style={{color: 'black', fontWeight: 'bold'}}> Display name: </span> <span>{user.display_name} </span> </li>
						        <li> <span style={{color: 'black', fontWeight: 'bold'}}> Spotify ID: </span> <span>{user.id} </span> </li>
						        <li><span style={{color: 'black', fontWeight: 'bold'}}> Country: </span> <span>{user.country} </span> </li>
						        <li><span style={{color: 'black', fontWeight: 'bold'}}> Product Type: </span> <span>{user.product.charAt(0).toUpperCase() + user.product.substring(1)} </span> </li>
						        <li><span style={{color: 'black', fontWeight: 'bold'}}> URI: </span> <span><a href={user.external_urls.spotify}>{user.external_urls.spotify}</a> </span> </li>
				      		  </ul>
						    </div>
						    <div className="logged-in-as">
							    <h2 style={{marginLeft: '38%', marginRight: '38%'}}> Logged in as </h2>
							    <h2 style={{marginLeft: '38%', marginRight: '38%', marginTop: '-1.2%'}}> {user.display_name} </h2>
						    </div>
					  	</div>
					  	<div className="playlists" style={{float: 'left', marginLeft: '8%'}}>
					  		{renderedPlaylists}
					  	</div>
					  	<div className="userTopTracks" style={{float: 'left', marginTop: '-380px'}}>
				  			<h2 style={{marginTop: '-5%', marginBottom: '21%', color: 'black'}}> Top Tracks </h2>
					  		<div style={{marginLeft: '15%'}}> {renderedTopTracks} </div>
					  	</div>
					  	<div className="userRecent" style={{float: 'right', marginTop: '-380px'}}>
				  			<h2 style={{marginTop: '-5%', marginBottom: '21%', color: 'black'}}> Recently Played </h2>
					  		<div style={{marginLeft: '15%'}}> {renderedRecent} </div>
					  	</div>
					  	<div className="buttons">
				            <button type="button" onClick={this.appLogout} style={{float: 'left', marginTop: '2%', marginLeft: '18%', marginRight: '1%', backgroundColor: 'green', color: 'white', borderRadius: "70%", width: "70px", height: "50px", fontWeight: 'bold', fontSize: '13px'}}> App Logout </button>
				            <button type="button" onClick={this.onLogout} style={{float: 'left', marginTop: '2%', marginLeft: '1%', marginRight: '10%', backgroundColor: 'green', color: 'white', borderRadius: "70%", width: "70px", height: "50px", fontWeight: 'bold', fontSize: '13px'}}> Spotify Logout </button>
				  		</div>
				  	</div>
				);
			} else {
				return (
					<button onClick={browserHistory.push('/error/Improper%20Authorization')}> </button>
					/* The redirect is automatically triggered because we invoke push instead of specifying a wrapper function */
				);
			}
		}
		else { // No user yet, we are still waiting for the authorization to complete
			return (
				<div className="loading">
					<h2> Waiting for authorization to complete... </h2>
				</div>
			);
		}
	}
});


var PlaylistThumbnail = React.createClass({
	handleClick: function () {
		var href = this.props.href; // URL extension that contains access token
		var regExForUserAndID = new RegExp("/users/(.+)/playlists/(.+)");
		var matches = href.match(regExForUserAndID); // Find and store all matches for the access token
		var link = 'playlist/user/' + matches[1] + '/' + matches[2] + '/' + this.props.name; // matches[1] is user and matches[2] is playlist
		browserHistory.push(link); // Redirection using react-router
	},
	render: function () {
		return (
			<div className="playlist">
				<div className= "playlistImage">
					<img src={this.props.image} style={{float: 'left', width: "20%", marginRight: "1%", marginBottom: "1%"}}
					title={this.props.name} onClick={this.handleClick}/>
				</div>
			</div>
		);
	}
});

var TrackThumbnail = React.createClass({
	render: function () {
		var link = "https://open.spotify.com/embed?uri=" + this.props.uri
		return (
			<div className="track">
				<div className= "trackiframe">
					<iframe style={{float: 'left', marginTop: '-60px'}} src={link} width="80%" height="8%" frameBorder="0" allowTransparency="false"></iframe>
				</div>
			</div>
		);
	}
});

export default User;