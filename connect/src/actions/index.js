import axios from 'axios';
import {
  CREATE_COMMENT,
  FETCH_POSTS,
  FETCH_COMMENTS,
  FETCH_EVENTS,
  FETCH_POSTS_BY_ID
} from './types';

export function fetchPosts() {
  return function(dispatch) {
    axios.get('http://localhost:5000/api/post/')
    .then((res) => {
      dispatch({
        type: FETCH_POSTS,
        payload: res.data,
      });
    });
  }
}

export function fetchEvents() {
  return function(dispatch) {
    axios.get('http://localhost:5000/api/event/')
    .then((res) => {
      dispatch({
        type: FETCH_EVENTS,
        payload: res.data,
      });
    });
  }
}

export const showLoader = () => dispatch => {
  dispatch({
    type:"SHOW_LOADER"
  })
}

export const hideLoader = () => dispatch => {
  dispatch({
    type:"HIDE_LOADER"
  })
}

export const showaccountCreated = () => dispatch => {
  dispatch({
    type:"SHOW_ACCOUNT_CREATED"
  })
}

export const hideaccountCreated = () => dispatch => {
  dispatch({
    type:"HIDE_ACCOUNT_CREATED"
  })
}

export function createComment({ comment, postId }, clearTextEditor, historyReplace) {

  return function(dispatch) {
    axios.post('http://localhost:5000/api/createcomment', { content: comment , postid : postId }, {
      headers: {authorization: localStorage.getItem('token')},  // require auth
    })
      .then((response) => {  // If success, clear the text editor
        dispatch({
          type: CREATE_COMMENT,
          payload: response.data,
        });
        clearTextEditor();  // - Clear text editor (UI)
        // historyReplace(`/posts/${postId}`, null);  // - clear alert message
      })
      .catch(({response}) => {  // If fail, render alert message

        // failure reason: un-authenticated
        if (!response.data.message) {
          return historyReplace(`/posts/${postId}`, {
            time: new Date().toLocaleString(),
            message: 'You must sign in before you can post new comment.',
          });
        }

        // failure reason: comment is empty
        historyReplace(`/posts/${postId}`, {
          time: new Date().toLocaleString(),
          message: response.data.message,
        });
      });
  }
}

export function fetchComments(postId) {
  return function(dispatch) {
    axios.get(`http://localhost:5000/api/comments/${postId}`).then((response) => {
      dispatch({
        type: FETCH_COMMENTS,
        payload: response.data,
      });
    });
  }
}

export function fetchpostsbyid() {
  return function(dispatch) {
    axios.get('http://localhost:5000/userdetails', { headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` } })
    .then((res) => {
      axios.get(`http://localhost:5000/api/posts/${res.data._id}`).then((response) => {
      console.log(response)
      dispatch({
        type: FETCH_POSTS_BY_ID,
        payload: response.data,
      });
    });
    })
    
  }
}

export function fetchpostsbyid2(id) {
  return function(dispatch) {
      axios.get(`http://localhost:5000/api/posts/${id}`).then((response) => {
      console.log(response)
      dispatch({
        type: FETCH_POSTS_BY_ID,
        payload: response.data,
      });
    });
  }
}