/* Our main file for the User component that renders based off of the render function of the presenter */

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actions from '../../actions';
import User from './presenter';

function mapStateToProps(state) {
  const {user, playlists, userTopTracks, userRecent} = state.auth;
  return {
    user,
    playlists,
    userTopTracks,
    userRecent
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onAuth: bindActionCreators(actions.auth, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(User);