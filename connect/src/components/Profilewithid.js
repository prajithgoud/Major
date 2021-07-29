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

            <br></br>
          {this.state.signedin === true && <Link className="link-without-underline" to={`/commentnew/${post._id}`}> Comment </Link>}
          <br />
          {<Link className="link-without-underline" to={`/comments/${post._id}`}> View Comments </Link>}
          
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

export default connect(mapStateToProps , {fetchpostsbyid2})(ProfilewithId);