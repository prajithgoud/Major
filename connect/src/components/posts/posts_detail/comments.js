import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchComments } from '../../../actions';
import "../stylecontent.css";

class Comments extends Component {

  componentDidMount() {
    // console.log(this.props.match.params.id);
  this.props.fetchComments(this.props.match.params.id);
  }

  renderComment(comment) {
    return (
    
      <div key={comment._id} class="bg-white px-10 pt-4 pb-10 rounded shadow-xl hover:shadow-2xl ">
          
      <div class="absolute">
          <button type="button" class="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white" aria-expanded="false">
              <img class="h-6 w-6 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt=""/>
          </button>
          
      </div>

      <span className="ml-7 font-bold text-sm text-gray-700">{comment.authorName}</span>
      
      <br></br>
      {/* <span className="text-sm text-gray-900">{new Date(comment.time).toLocaleString()}</span> */}
      {/* <br></br> */}
      <br></br>
      <h3>
        <div className="text-justify" dangerouslySetInnerHTML={{ __html: comment.content }} />
      </h3>
      
      <hr />
    </div>
    );
  }

  render() {
    return (
      <div class="bg-blue-300 h-screen">
        <h3 className="font-bold text-3xl text-gray-700 flex justify-center">Comments</h3>
          
          <div class="style_post space-y-3">
              {_.map(this.props.comments, comment => {
                return this.renderComment(comment);
              })}
          </div>

      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log(state)
  return { comments: state.comments };
}

export default connect(mapStateToProps, { fetchComments })(Comments);