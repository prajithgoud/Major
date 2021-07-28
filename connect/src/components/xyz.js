import _ from 'lodash';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchpostsbyid } from "../../actions/index"
import axios from 'axios';

class Postsbyid extends Component {

  constructor(props) {
    super(props)
    this.state = {
      verified: '',
      signedin: ''
    }
    this.decide = this.decide.bind(this);
    this.deletepost = this.deletepost.bind(this);
  }

  componentDidMount() {
    this.decide();
    this.props.fetchpostsbyid();
  }

  renderPostSummary(post) {
    return (
      <div key={post._id}>

        {/* {this.renderTags(post.categories)} */}
        <span>Title: {post.title}</span><br />
        <span className="span-with-margin text-grey"> • </span>
        <span className="span-with-margin text-grey">Author: {post.authorName}</span><br />
        <span className="span-with-margin text-grey"> • </span>
        <span className="span-with-margin text-grey">{new Date(post.time).toLocaleString()}</span>
        <div className="text-justify" dangerouslySetInnerHTML={{ __html: post.content }} />
        <button onclick = {this.deletepost(post._id)}>Delete</button>
        <br />
        <Link className="link-without-underline" to={`/comments/${post._id}`}> View Comments </Link>
        <hr />
      </div>
    );
  }

  deletepost(postid)
  {
    axios.post(`http://localhost:5000/deletepost/${postid}`)
    .then((res)=> {
      console.log(res)
    })
  }

  decide() {
    console.log('entered')
    axios.get('http://localhost:5000/token', { headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` } })
      .then((res) => {
        if (res.data !== null) {
          console.log('2nd entered')
          this.setState({
            signedin: true
          })
        }
      })
      .catch((error) => {
        // this.state.message = error.response.data.message
      });


    setTimeout(() => {
      if (this.state.signedin === true) {
        console.log('3rd')
        axios.get('http://localhost:5000/userdetails', { headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` } })
          .then((res) => {
            if (res.data.isverified === "true") {
              console.log('4th entered')
              this.setState({
                verified: true
              })
            }
          })
      }
    }, 200);
  }

  render() {
    return (
      <div>
        <br />
        <br />
        <h3 className="mt-5 mb-4">Your Posts</h3>
        {_.map(this.props.posts, postsbyid => {
          return this.renderPostSummary(postsbyid);
        })}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { 
      authenticated: state.auth.authenticated,
      id : state.auth.id,
      posts : state.posts
   }
}

export default connect(mapStateToProps, { fetchpostsbyid })(Postsbyid);