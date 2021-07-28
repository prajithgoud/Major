import axios from 'axios';
import React, { Component } from 'react';
import Reload from "./Reload"
import Helmet from 'react-helmet';
import Header from "./header";
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchpostsbyid2 } from "../actions/index"

class ProfilewithId extends Component {

    constructor(props)
    {
        super(props)
       
          this.decide = this.decide.bind(this);
        
        this.state = {
            name : '',
            dob : '',
            gender : '',
            email : '',
            department : '',
            description : '',
            Photo: '',
            verified: '',
            signedin: ''
        }
    }

    componentDidMount() {
        var id = this.props.match.params.id
        axios.post('http://localhost:5000/find',{
            "_id" : id
        })
        .then((res)=>{
            this.setState({
                name : res.data[0].Name,
                dob : res.data[0].dob,
                gender : res.data[0].gender,
                email : res.data[0].Email, 
                department : res.data[0].department,
                description : res.data[0].description,
                Photo: res.data[0].Photo
            })
        })
        this.decide();
        this.props.fetchpostsbyid2(this.props.match.params.id);
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
            {/* <button onclick = {this.deletepost(post._id)}>Delete</button> */}
            <br />
            <Link className="link-without-underline" to={`/comments/${post._id}`}> View Comments </Link>
            <hr />
          </div>
        );
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
            <React.Fragment>
            
            <div>
                <Header/>
            <div class="min-h-screen flex items-center justify-center bg-blue-400">

            <div class="bg-white p-10 rounded shadow-2xl w-4/5 lg:w-1/4">
                <h2 class="text-3xl font-bold mb-10 text-gray-900 flex justify-center">Your Profile</h2>

                <div class = "image-preview" id = "imagePreview"> 
                        <img src = {`http://localhost:5000/public/img/users/${this.state.Photo}`} class = "image-preview__image"  alt = "Image Preview"/> 

                        {/* <span class="image-preview__default-text">Image Preview</span> */}
                </div>

                <div>
                    <label class="block my-1 font-bold text-gray-500">Name</label>
                    <span class="font-bold text-green-900 font-serif">{this.state.name}</span>
                </div>
                
                <div>
                    <label class="block my-1 font-bold text-gray-500">DOB</label>
                    <span class="font-bold text-green-900 font-serif">{this.state.dob}</span>
                </div>
                
                <div>
                    <label class="block my-1 font-bold text-gray-500">EMAIL</label>
                    <span class="font-bold text-green-900 font-serif">{this.state.email}</span>
                </div>

                <div>
                    <label class="block my-1 font-bold text-gray-500">Department</label>
                    <span class="font-bold text-green-900 font-serif">{this.state.department}</span>
                </div>

                <div>
                    <label class="block my-1 font-bold text-gray-500">Description</label>
                    <span class="font-bold text-green-900 font-serif">{this.state.description}</span>
                </div>
               <br></br>
                <Helmet>
             
                <script>
                    {`
                        const inpFile = document.getElementById("inpFile");
                        const previewContainer = document.getElementById("imagePreview");
                        const previewImage = previewContainer.querySelector(".image-preview__image");
                        const previewDefaultText = previewContainer.querySelector(".image-preview__default-text");
                        inpFile.addEventListener("change", function() {
                            const file = this.files[0];
                            if (file) {
                                const reader = new FileReader();
                                previewDefaultText.style.display = "none";
                                previewImage.style.display = "block";
                                reader.addEventListener("load", function() {
                                    console.log(this);
                                    previewImage.setAttribute("src",this.result);
                                });
                                reader.readAsDataURL(file);
                            }
                            else {
                                previewDefaultText.style.display = null;
                                previewImage.style.display = null;
                                previewImage.setAttribute("src","");
                            }
                            
                        })
                    `}
                </script>
                </Helmet>
                <div class="flex justify-center">
                    <button class="font-bold py-2 px-4 rounded bg-blue-500 text-white hover:bg-blue-700" onClick={this.onSubmit}>Update profile</button>
                </div>
            </div>

        </div>
        </div>
            
        <div>
        <br />
        <br />
        <h3 className="mt-5 mb-4">Your Posts</h3>
        {_.map(this.props.posts, postsbyid => {
          return this.renderPostSummary(postsbyid);
        })}
      </div>

        </React.Fragment>
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

export default connect(mapStateToProps , {fetchpostsbyid2})(ProfilewithId);