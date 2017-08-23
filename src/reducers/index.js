/* Main file for reducers that specifies all of them */

import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import auth from './auth';

export default combineReducers({
  auth,
  routing: routerReducer
});