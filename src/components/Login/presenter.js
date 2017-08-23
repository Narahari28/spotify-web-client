import React from 'react';

var Login =  React.createClass({
  componentWillMount: function () {
    this.props.onPopular();
  },
  render: function () {
    if(this.props.popular) {
      var renderedTracks = [];
      var entries = this.props.popular.feed.entry; // A list of the 6 most popular tracks on iTunes currently
      for(let i = 0; i < entries.length; i++) {
        var trackObj = entries[i];
        var imageURL = trackObj["im:image"][2].label; // Largest album art photo
        var name = trackObj["im:name"].label; // Name of the track
        var link = trackObj.link[1].attributes.href;
        renderedTracks.push(<HomepagePlaylistIcon key={i} image={imageURL} name={name} link={link} />);
      }
      return (
        <div>
          <div className="login">
            <h1> Spotify Web Client </h1>
            <h2 style={{color: 'black'}}>Login to Spotify below!</h2>
            <button type="button" onClick={this.props.onAuth} style={{backgroundColor: 'green', color: 'white', borderRadius: "70%", width: "70px", height: "50px", fontWeight: 'bold', fontSize: '13px'}}> Login! </button>
          </div>
          <div style={{marginRight: '3%', width: "100%"}}> {/* Centers the list of tracks */}
            <h2 style={{color: 'black'}}> Preview Top Picks </h2>
            <p style={{marginLeft: '5%'}}> {renderedTracks} </p>
          </div> 
        </div>
      );
    }
    else {
      return (<div> <h1> Loading page! </h1> </div>);
    }
  },
});

// A wrapper class that renders an image that is formatted nicely and that can be used in an image grid
var HomepagePlaylistIcon = React.createClass({
  render: function () {
    return (
      <a href={this.props.link}>
        <img src={this.props.image} style={{float: 'left', width: "15%", marginRight: "1%", marginBottom: "1%"}}
        title={this.props.name}/>
      </a>
    );
  }
});

export default Login;