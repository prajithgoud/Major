import _ from 'lodash';
import {
    FETCH_POSTS,
    FETCH_POSTS_BY_ID
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
      case FETCH_POSTS_BY_ID:
        return _.mapKeys(action.payload, '_id');
      default:
        return state;
    }
  } 

  