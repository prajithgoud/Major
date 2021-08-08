import _ from 'lodash';
import React, { Component ,useEffect} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchPosts } from "../../actions/index"
import Header from "../header";
import Reload from "../Reload";
import Comments from "./posts_detail/comments"
import Commentnew from "./posts_detail/comment_new"
import Helmet from 'react-helmet';
import jwt from "jsonwebtoken";
import axios from 'axios';
import "./stylecontent.css";
import download from 'downloadjs';
import "./profileUpdateStyle.css";

class PostList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      verified: '',
      signedin: ''
    }
    this.decide = this.decide.bind(this);
  }


  componentDidMount() {
    this.decide();
    this.props.fetchPosts();
    
  }
  
  renderTags(tags) {
    return tags.map(tag => {
      return <span className="" key={tag}>{tag}</span>;
    });
  }

  renderPostSummary(post) {

    const downloadFile = async (id, path, mimetype) => {
      try {
        const result = await axios.get(`http://localhost:5000/download/${post._id}`, {
          responseType: 'blob'
        });
        // const split = path.split('/');
        const filename = path;
        // setErrorMsg('');
        console.log("sai");
        console.log(filename);
        return download(result.data, filename, mimetype);
      } catch (error) {
        // if (error.response && error.response.status === 400) {
        //   setErrorMsg('Error while downloading file. Try again later');
        // }
        console.log(error);
      }
    };

    return (
      <div key={post._id} class="relative bg-white px-10 pt-4 pb-10 rounded shadow-xl hover:shadow-2xl ">
        
        <h2 class="text-3xl font-bold mb-2 text-gray-700 flex justify-center">{post.title}</h2>
        
        <div class="absolute">
            <a href={`http://localhost:3000/profile/${post.authorId}`} class="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white" aria-expanded="false">
                <img class="h-9 w-9 rounded-full" src={`http://localhost:5000/public/img/users/user - ${post.authorId}.jpeg`} alt=""/>
            </a>
            
        </div>

        <a href={`http://localhost:3000/profile/${post.authorId}`} className="block ml-11 pb-3 font-bold text-md text-gray-700">{post.authorName}</a>
        {/* <br></br>
        <br></br> */}
        <span className="text-sm text-gray-900">{new Date(post.time).toLocaleString()}</span>
        <br></br><br></br>
        <h3>
          <div className="text-justify" dangerouslySetInnerHTML={{ __html: post.content }} />
        </h3>
        <br />
        { post.Photo !== undefined  &&
          <div class ="flex justify-center" > 
          <img src = {`http://localhost:5000/public/img/users/useruploadedpost - ${post.content}.jpeg`} class="h-1/2 w-1/2 rounded "/> 
        </div>}

        { post.post !== undefined &&
            <a href="#/" class="btn btn-primary absolute bottom-11 right-5" onClick={() =>
                            downloadFile(`${post._id}`, `${post.post}`, 'application/pdf')
                          }
            > Download file </a>
          }
          <br></br>
        {this.state.signedin === true && <Link className="link-without-underline font-bold" to={`/commentnew/${post._id}`}> Comment </Link>}
        <br />
        {<Link className="link-without-underline font-bold" to={`/comments/${post._id}`}> View Comments </Link>}
        
        <hr />
      </div>
    );
  }
  decide() {
    axios.get('http://localhost:5000/token', { headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` } })
      .then((res) => {
        if (res.data !== null) {
          this.setState({
            signedin : true
          })
        }
      })
      .catch((error) => {
        console.log(error)
      });
      setTimeout(() => {
        if(this.state.signedin === true) {
          axios.get('http://localhost:5000/userdetails', { headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` } })
                .then((res) => {
                  if (res.data.isverified === "true") {
                    this.setState({
                      verified : true
                    })
                  }
                })
            }
      }, 200);
    
    }

    
  render() {
    // console.log(this.state.verified)
      return (
        
        <div class="bg-gray-50">  
          <Header/>
          <Reload />

          <div className="post">
          
            <div class="flex justify-center pt-3">
                { this.state.verified === true && <Link className="font-bold py-2 px-4 rounded bg-blue-500 text-white hover:bg-blue-700" to={'/postnew'}>Publish A New Post</Link> }
                
            </div>
            
            <div class="style_post space-y-3">
                {_.map(this.props.posts, post => {
                  return this.renderPostSummary(post);
                })}
            </div>

          </div>
        </div>
      );
    
  }
}



function mapStateToProps(state) {
    // window.location.reload(false);
    console.log(state)

  return {
    authenticated: state.auth.authenticated, 
    posts: state.posts 
  };
}

export default connect(mapStateToProps , { fetchPosts })(PostList);

