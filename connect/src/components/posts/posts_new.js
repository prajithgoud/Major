import React, { Component } from 'react';
import axios from 'axios';
// import Header from "./header";
import Helmet from 'react-helmet';
import { connect } from "react-redux";
import Header from "../header";

class CreateUser extends Component {

    constructor(props) {
        super(props)

        this.onChangetitle = this.onChangetitle.bind(this);
        this.onChangecategories = this.onChangecategories.bind(this);
        this.onChangecontent = this.onChangecontent.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handlePicupload = this.handlePicupload.bind(this);        
        this.state = {
            title : '',
            categories : '',
            content : '',
            Photo: '',
            post:''
        }
    }

    handleInputChange(e) {
        this.setState({
            post: e.target.files[0]
          })
    }
    handlePicupload(e) {
        this.setState({
            Photo: e.target.files[0]
          })
    }

    onChangetitle(e) {
        this.setState({ title: e.target.value })
    }

    onChangecategories(e) {
        this.setState({ categories: e.target.value })
    }

    onChangecontent(e){
        this.setState({ content: e.target.value })
    }

    changestringtoarray() {
        this.setState({
            categories : this.state.categories.split(',')
        })
    }

    onSubmit(e) {
        e.preventDefault()

        // console.log(this.state.title,this.state.categories,this.state.content)

        const formdet = {
            title : this.state.title,
            categories : this.state.categories,
            content : this.state.content
        }
        const token = localStorage.getItem("token")
        axios.get('http://localhost:5000/token/restriction', { headers: {"Authorization" : `Bearer ${token}`} })
        .then((res) => {
            console.log(res.data);
            axios.post('http://localhost:5000/api/createpost',formdet,{
                headers: { "Authorization": `Bearer ${token}` }})
            .then((res)=>{
                // console.log(res.data);
            })
            .catch((error)=>{
                console.log(error.response.data);
            })
        })
        .catch((error)=>{
            console.log(error.response.data);
        })
        var data = new FormData();
        data.append('post', this.state.post);
        console.log(this.state.post);
        axios.get('http://localhost:5000/userdetails', { headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` } })
      // axios.get('/userdetails', { headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` } })
      .then((res)=>{
          console.log(res.data);
          var name = res.data.Name;
          var content = this.state.content;
          console.log(name);
              axios.post(`http://localhost:5000/uploadpost/${name}/${content}`,data,{
                // headers: {
                //     'Content-Type': 'multipart/form-data'
                //   }
              })
              .then((res) => {
                  console.log(res.data);
              }).catch((err) => {
                  console.log(err);
              })
          })
      .catch((err) => {
          console.error(err);
      })
        
    //   PHOTO UPLOAD

      var data2 = new FormData();
      data2.append('Photo', this.state.Photo);
      console.log(this.state.Photo);
    //   console.warn(this.state.Photo);
      axios.get('http://localhost:5000/userdetails', { headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` } })
      // axios.get('/userdetails', { headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` } })
      .then((res)=>{
          var id = res.data._id
          var name = res.data.Name;
          var content = this.state.content;
          console.log(content);
          axios.post(`http://localhost:5000/uploadpic/${name}/${content}`,data2,{
          // axios.post(`/updatephoto/${id}`,data,{
              // headers: {
                
              //   'Content-Type': `multipart/form-data`
              // }
            }).then((res) => {
              console.log(res.data);
          }).catch((err) => {
              console.error(err);
          })
      })

      setTimeout(() => {
        this.props.history.push({
            pathname: '/posts',
        });
         },700);

    }
      

    render() {
        return (
            // <div>
            //     <div class="form-container">


            //         <form onSubmit={this.onSubmit} id="form">
            //             <h3>Add Post</h3>
            //             <div class="container">                          
            //                 <input type="text" value={this.state.title} onChange={this.onChangetitle} placeholder="title"></input>
            //             </div>
            //             <div class="container">                            
            //                 <input type="text" value={this.state.categories} onChange={this.onChangecategories} placeholder="categories"></input>                           
            //             </div>
            //             <div class="container">                           
            //                 <input type="text" value={this.state.content} onChange={this.onChangecontent} placeholder="content" />                           
            //             </div>                       
            //             <input type="submit" value="Submit" />
            //         </form>
            //     </div>
            // </div>

            <div>
                <Header/>
            <div class="min-h-screen flex items-center justify-center bg-blue-400">
            <div class="bg-white p-10 rounded shadow-2xl w-4/5 md:w-1/2 lg:w-1/4">

                <h2 class="text-3xl font-bold mb-6 text-gray-900 flex justify-center">Add Post</h2>
                
                <form class="space-y-5" onSubmit={this.onSubmit} id="form">
                <div>
                    <label class="block mb-1 font-bold text-gray-700">Title</label>
                    <input type="text" class="w-full h-9 border-2 border-gray-200 p-2 rounded outline-none focus:border-purple-500" value={this.state.title} onChange={this.onChangetitle} />
                </div>
                
                <div>
                    <label class="block mb-1 font-bold text-gray-700">Category</label>
                    <input type="text" class="w-full h-9 border-2 border-gray-200 p-2 rounded outline-none focus:border-purple-500" value={this.state.categories} onChange={this.onChangecategories} />
                </div>

                <div>
                    <label class="block mb-1 font-bold text-gray-700">Content</label>
                    <input type="text" class="w-full h-9 border-2 border-gray-200 p-2 rounded outline-none focus:border-purple-500" value={this.state.content} onChange={this.onChangecontent} />
                </div>

                
                <div class="flex flex-wrap justify-center">
                <div class="w-2/3">
                    <div class = "image-preview" id = "imagePreview"> 
                       <img src = "" alt = "Image Preview" class = "image-preview__image"/>
                        <span class="image-preview__default-text">Image Preview</span>
                    </div>
                    <br />
                    <input type = "file" name = "inpFile" id = "inpFile" accept = "image/*" onChange={this.handlePicupload} class="pt-4"/>
                </div>
                </div>
                <div>
                    <label class="block mb-1 font-bold text-gray-700">Attach a pdf</label>
                    <input type = "file" name = "inpFile"  accept = "application/pdf" onChange={this.handleInputChange} class="pt-4"/>
                </div>
            

                <div class="flex justify-center">
                <button class="font-bold py-2 px-4 rounded bg-blue-500 text-white hover:bg-blue-700" onClick={this.update}>Submit</button>
                </div>
    
                </form>
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
        )
    }
}

function mapStatetoProps(state) {
    // console.log(state)
    return {
        authenticated : state.auth.authenticated,
        username :state.auth.username
    }
}

export default connect(mapStatetoProps)(CreateUser);