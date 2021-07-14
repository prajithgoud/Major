import './App.css';

import React , {useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, } from "react-router-dom";
import { Provider } from "react-redux"
import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";
import axios from 'axios';
import Modal from './Modal'

import Header from "./components/header"
import CreateUser from "./components/create-user.component";
import Users from "./components/users.component";
import dataTable from "./components/data-table"
import Login from "./components/login";
import EventList from "./components/events/eventlist";
import EventNew from "./components/events/event_new"
import Resetpwd from "./components/enterresetpwd";
import Checkotp from "./components/checkotp";
import Welcome from "./components/welcome";
import PostList from "./components/posts/posts_list";
import Postnew from "./components/posts/posts_new";
import Forgotpwd from "./components/forgotpassword";
import CommentNew from "./components/posts/posts_detail/comment_new";
import Comments from "./components/posts/posts_detail/comments";
import UserProfile from "./components/profile_view";
import Updateprofile from "./components/profile_update"
import Settings from "./components/settings";
import reducers from "./reducers/root_reducer";
import { AUTH_USER } from "./actions/types";
import Pageloader from './components/PageLoader';
import Signupsuccess from './components/Signupsuccess';
import addPhoto from './components/addPhoto'
// import { Token } from '../server/server';

// import Cookies from 'js-cookie';
// import  { Cookies } from 'react-cookie';


import Cookies from 'universal-cookie';
const cookies = new Cookies();

const BUTTON_WRAPPER_STYLES = {
  position: 'relative',
  zIndex: 1
}

const OTHER_CONTENT_STYLES = {
  position: 'relative',
  zIndex: 2,
  backgroundColor: 'red',
  padding: '10px'
}

const Errhandling = (error) => {
  console.log(error.response.data)
  const [isOpen, setIsOpen] = useState(false)
return (
<>
  <div style={BUTTON_WRAPPER_STYLES} onClick={() => console.log('clicked')}>
    <button onClick={() => setIsOpen(true)}>Open Modal</button>

    <Modal open={isOpen} onClose={() => setIsOpen(false)}>
      Fancy Modal
    </Modal>
  </div>

  <div style={OTHER_CONTENT_STYLES}>Other Content</div>
</>
)
}; 
// cookies.set('jwt','token',{path : '/'});

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

const token = localStorage.getItem("token");
// const token = cookies.get('jwt');

if (token !== null) {
  console.log(token);
  axios.get('http://localhost:5000/token', { headers: { "Authorization": `Bearer ${token}` } })
    .then((res) => {
      if (res.data === true) {
        store.dispatch({ type: AUTH_USER })
      }
    })
    .catch(error =>{
      console.log(error.response.data);
    }
    )
}
else{
  console.log(token + "  po");
  console.log("bekaar");
}

function App() {

  return (
    <Provider store={store} >
      <Router>
        <div>
          {/* <Header /> */}
          <div>
            <Route exact path="/" component={Welcome} />
          </div>
          <div clasname="container" id="content">
            <switch>
              <Route path="/signin" component={CreateUser} />
              <Route path="/login" component={Login} />
              <Route path="/admin" component={Users} />
              <Route path="/checkotp" component={Checkotp} />
              <Route path="/posts" component={PostList} />
              <Route path="/postnew" component={Postnew} />
              <Route path="/commentnew/:id" component={CommentNew} />
              <Route path="/settings" component={Settings} />
              <Route path="/comments/:id" component={Comments} />
              <Route path="/forgotpwd" component={Forgotpwd} />
              <Route path="/resetpwd" component={Resetpwd} />
              <Route path="/userprofile" component={UserProfile} />
              <Route path="/updateprofile" component={Updateprofile} />
              <Route path="/addPhoto" component={addPhoto} />
              <Route path="/events" component={EventList} />
              <Route path="/eventnew" component={EventNew} />
              <Pageloader />
              <Signupsuccess />
            </switch>
          </div>
        </div>
      </Router>
    </Provider>
  )
}

export default App;