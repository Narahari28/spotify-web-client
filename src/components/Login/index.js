import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actions from '../../actions';
import Login from './presenter';
import {CLIENT_ID, REDIRECT_URI} from '../../constants/auth';

function mapStateToProps(state) {
  const {popular} = state.auth;
  return {
    popular
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onAuth: authorize,
    onPopular: bindActionCreators(actions.popular, dispatch)
  };
}

// Redirects site user to the Spotify Accounts service, which displays scopes and prompts
function authorize () {
  var scopes = "user-read-private user-read-recently-played playlist-read-private playlist-read-collaborative playlist-modify-public playlist-modify-private user-top-read";
  var state = genRand(16);
  var url = "https://accounts.spotify.com/authorize";
  url += "?client_id=" + encodeURIComponent(CLIENT_ID);
  url += "&redirect_uri=" + REDIRECT_URI;
  url += "&scope=" + encodeURIComponent(scopes);
  url += "&response_type=token";
  url += "&state=" + encodeURIComponent(state);
  url += "show_dialog=true";
  window.location.href = url;
}

// Used to generate a cookie which is used to ensure that the person that logged in is the same person that can view information
function genRand(length) {
  var ans = "";
  var alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < length; i++) {
    ans += alpha.charAt(Math.floor(Math.random()*alpha.length));
  }
  return ans;
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);