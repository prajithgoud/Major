import axios from 'axios';
import React, { Component } from 'react';
import "./profileUpdateStyle.css";
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import Header from "./header";
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { fetchpostsbyid } from "../actions/index"

class profile_view extends Component {

    constructor(props)
    {
        super(props)
       
          this.decide = this.decide.bind(this);
          this.deletepost = this.deletepost.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
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
      
        axios.get('http://localhost:5000/userdetails', { headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` } })
        .then((res)=>{
            console.log(res.data.Name)
            this.setState({
                name : res.data.Name,
                dob : res.data.dob,
                gender : res.data.gender,
                email : res.data.Email, 
                department : res.data.department,
                description : res.data.description,
                Photo: res.data.Photo
            })
        })
        this.decide();
        this.props.fetchpostsbyid();
    }

    onSubmit(e) {
        e.preventDefault()
        this.props.history.push({
            pathname: '/updateprofile',
        });
    }

    renderPostSummary(post) {
        return (
        <div key={post._id} class="relative bg-white px-10 pt-4 pb-10 rounded shadow-xl hover:shadow-2xl ">
    
        <h2 class="text-2xl font-bold mb-2 text-gray-700 flex justify-center">{post.title}</h2>
        
        <div class="absolute">
            <a href={`http://localhost:3000/profile/${post.authorId}`} class="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white" aria-expanded="false">
                <img class="h-6 w-6 rounded-full" src={`http://localhost:5000/public/img/users/user - ${post.authorId}.jpeg`} alt=""/>
            </a>
            
        </div>

        <span className="ml-7 font-bold text-sm text-gray-700">{post.authorName}</span>
        <br></br>
        
        <span className="text-sm text-gray-900">{new Date(post.time).toLocaleString()}</span>
        <br></br><br></br>
        <h3>
          <div className="text-justify" dangerouslySetInnerHTML={{ __html: post.content }} />
        </h3>
        <br />
        { post.Photo !== undefined  &&
          <div class ="flex justify-center" > 
          <img src = {`http://localhost:5000/public/img/users/useruploadedpost - ${post.content}.jpeg`} class="h-full w-full rounded "/> 
        </div>}

          <button className="btn btn-primary absolute bottom-12 right-5" value={post._id} onClick = {this.deletepost} >Delete</button>
          <br></br>
        {this.state.signedin === true && <Link className="link-without-underline" to={`/commentnew/${post._id}`}> Comment </Link>}
        <br />
        {<Link className="link-without-underline" to={`/comments/${post._id}`}> View Comments </Link>}
        
        <hr />
          </div>
        );
      }
    
      deletepost(e)
      {   
          e.preventDefault();
          console.log(e.target.value)
        axios.post(`http://localhost:5000/deletepost/${e.target.value}`)
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

            <React.Fragment>
            
            <div>
                <Header/>
            <div class="flex items-center justify-center bg-light p-5">

            <div class="relative bg-gray-300 p-5 rounded shadow-2xl w-5/12">

                <p class="text-3xl font-bold ml-7 text-gray-900">{this.state.name}</p>

                <div class = "image-preview3 float-left"> 
                        <img src = {`http://localhost:5000/public/img/users/${this.state.Photo}`} class = "image-preview__image"  alt = "Image Preview"/> 
                        
                </div>

                
                <div class="float-right">
                    <label class="block my-1 font-bold text-gray-500">DOB</label>
                    <span class="font-bold text-green-900 font-serif">{this.state.dob}</span>
                
                
                
                    <label class="block my-1 font-bold text-gray-500">EMAIL</label>
                    <span class="font-bold text-green-900 font-serif">{this.state.email}</span>
                

                
                    <label class="block my-1 font-bold text-gray-500">Department</label>
                    <span class="font-bold text-green-900 font-serif">{this.state.department}</span>
                

                
                    <label class="block my-1 font-bold text-gray-500">Description</label>
                    <span class="font-bold text-green-900 font-serif">{this.state.description}</span>
                </div>
               <br></br>

               <div class="flex justify-start absolute bottom-3">
                    <button class="font-bold py-2 px-4 rounded bg-blue-500 text-white hover:bg-blue-700" onClick={this.onSubmit}>Update profile</button>
                </div>

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
                
            </div>

        </div>
        </div>
            
      <section class="page-section bg-light pt-2" id="portfolio">
                  <div class="container">
                      <div class="row">
                          <div class="grid grid-cols-3 gap-6">
                          {_.map(this.props.posts, postsbyid => {
                            return this.renderPostSummary(postsbyid);
                            })}
                          </div>
                      </div>                 
                  </div>
      </section>
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
export default connect(mapStateToProps , {fetchpostsbyid})(profile_view);