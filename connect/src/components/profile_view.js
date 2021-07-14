import axios from 'axios';
import React, { Component } from 'react';
import "./profileUpdateStyle.css";
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import Header from "./header";

class profile_view extends Component {

    constructor(props)
    {
        super(props)

        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            name : '',
            dob : '',
            gender : '',
            email : '',
            department : '',
            description : '',
            Photo: ''
        }
    }

    componentDidMount() {
        // if(this.props.authenticated){
            // if(!this.props.authenticated)
            // {
                // this.props.history.replace('/posts');
            // }
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
    }

    onSubmit(e) {
        e.preventDefault()
        this.props.history.push({
            pathname: '/updateprofile',
        });
    }

    render() {
        return (
            // <div>
            //     <br />
            //     <br />
            //     <br />
            //     <br />
            //     <p>Name: {this.state.name}</p>
            //     <p>DOB: {this.state.dob}</p>
            //     <p>Gender: {this.state.gender}</p>
            //     <p>Email: {this.state.email}</p>
            //     <p>Department: {this.state.department}</p>
            //     <p>Description: {this.state.description}</p>
            //     {/* <p>Photo : {this.state.Photo} </p> */}
            //     <img src = {this.state.Photo} class = "image-preview__image" alt="Profile_pic" />

            //     <button onClick={this.onSubmit}>Update profile</button>
            // </div>
            
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
                {/* <meta charSet="utf-8" /> */}
                {/* <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" integrity="sha512-iBBXm8fW90+nuLcSKlbmrPcLa0OT92xO1BIsZ+ywDWZCvqsWgccV3gFoRBv0z+8dLJgyAHIhR35VZc2oM/gI1w==" crossorigin="anonymous" /> */}
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
export default connect(mapStateToProps)(profile_view);