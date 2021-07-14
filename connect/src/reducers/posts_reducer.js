import _ from 'lodash';
import {
    FETCH_POSTS,
} from '../actions/types';

// const initialState = {
//   payload : "",
//   loading : false
// };

export default function(state = {}, action) {
    // Attention!!! The state object here refers to state.posts, instead of the application state.
  
    switch(action.type) {
      case FETCH_POSTS:
        return _.mapKeys(action.payload, '_id');
      default:
        return state;
    }
  } 