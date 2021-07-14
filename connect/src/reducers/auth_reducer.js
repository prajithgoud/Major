import { accountCreated } from '../actions';
import { AUTH_USER } from '../actions/types'
  
const initialState = {
  authenticated: false,
  loading : false,
  accountCreated : false
}
  export default function(state = initialState, action) {
    // Attention!!! The state object here refers to state.auth, instead of the application state.
  
    switch(action.type) {
      case AUTH_USER:
        return { ...state, authenticated: true };
      // case UNAUTH_USER:
        // return { ...state, authenticated: false, username: '' };
    //   case CHECK_AUTHORITY:  // check if the user has the authority to make change to a specific post
        // return { ...state, allowChange: action.payload };
  
       case "SHOW_LOADER":
         return { ...state , loading : true};
       case "HIDE_LOADER":
         return { ...state , loading : false};
       case "HIDE_ACCOUNT_CREATED":
         return { ...state , accountCreated : false};
       case "SHOW_ACCOUNT_CREATED":
        return { ...state , accountCreated : true};
        
      default:
        return state;
    }
  }