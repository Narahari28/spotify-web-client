import React from 'react';

var Playlist = React.createClass({
	componentWillMount: function () {
		var accessToken = this.props.accessToken;
		var user = this.props.params.user;
		var playlist = this.props.params.playlist;
		var props = this.props;
		this.props.getTracks(accessToken, user, playlist);
	},
	render: function () {
		var uri =  "spotify:user:" + this.props.params.user + ":playlist:" + this.props.params.playlist;
		var embedLink = "https://open.spotify.com/embed?uri=" + uri;
		if(this.props.playlistArtists) {
			var artists = this.props.playlistArtists;
			var renderedArtists = [];
			for (var i = 0; i < artists.length; i++) {
				var images = artists[i][0].images;
				if(images) renderedArtists.push(<Artist key={i} href={artists[i][0].external_urls.spotify} name={artists[i][0].name} image={images[images.length - 1].url} popularity={artists[i][0].popularity} freq={artists[i][1]} />);
				else renderedArtists.push(<Artist key={i} href={window.location.href} name="error" image={"http://www.freeiconspng.com/uploads/failure-icon-2.png"} popularity="N/A" freq="N/A" />);
			}
		}
		return (
			<div>
				<div style={{textAlign: 'center'}}>
					<h1 style={{fontWeight: 'bold'}}> {this.props.params.name} </h1>
					<p style={{marginTop: '1%'}}> <iframe src={embedLink} width="480" height="470" frameBorder="0" allowTransparency="true"></iframe> </p>
					{this.props.playlistArtists ? <div style={{float: 'left', marginLeft: '2%', marginTop: '-550px'}}> {renderedArtists} </div> : ""}
				</div>
			  	<div className="buttons" style={{marginTop: '-1%', marginLeft: '40%', marginRight: '30%'}}>
		            <button type="button" onClick={this.props.appLogout} style={{marginLeft: '5%', marginRight: '1%', backgroundColor: 'green', color: 'white', borderRadius: "70%", width: "70px", height: "50px", fontWeight: 'bold', fontSize: '13px'}}> App Logout </button>
		            <button type="button" onClick={this.props.onLogout} style={{marginLeft: '1%', marginRight: '1%', backgroundColor: 'green', color: 'white', borderRadius: "70%", width: "70px", height: "50px", fontWeight: 'bold', fontSize: '13px'}}> Spotify Logout </button>
		            <button type="button" onClick={this.props.goBack} style={{marginLeft: "1%", marginRight: '25%', backgroundColor: 'green', color: 'white', borderRadius: "70%", width: "70px", height: "50px", fontWeight: 'bold', fontSize: '13px'}}> Return Home </button>
		  		</div>
	  		</div>
		);
	}
});

var Artist = React.createClass({
	changeURL: function () {
		window.location.href = this.props.href;
	},
	render: function () {
		console.log(this.props.href);
		return (
			<div className="artist">
				<div className= "artistImage">
					<figure>
					  <img src={this.props.image} onClick={this.changeURL} style={{width: "70px", marginBottom: "5px"}} title={this.props.name} />
					  <figcaption style={{fontWeight: 'bold', color: 'black'}}> Popularity: {this.props.popularity}%, Tracks: {this.props.freq} </figcaption>
					</figure>
				</div>
			</div>
		);
	}
});

export default Playlist;