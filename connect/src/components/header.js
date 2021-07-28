
import React, { Component ,useEffect} from "react";
import axios from 'axios';
import Welcome from "./welcome";
import { browserHistory as Router, useHistory} from 'react-router-dom';
import { connect } from "react-redux";
import jwt from "jsonwebtoken";
import "./destination/style.css";
import { Link } from "react-router-dom";
import Reload from "./Reload";
import { withRouter } from 'react-router';
import Searchtable from "./search_table";
import Helmet from 'react-helmet';
import "./headerstyle.css";

let uname = ''
class Header extends Component {

  constructor(props) {
    super(props)
    this.state = {
      searchval: '',
      data: [],
      id: ''
    }

    this.onchangesearchval = this.onchangesearchval.bind(this);
    this.signoutuser = this.signoutuser.bind(this);
  }
  

  // const uname = ''
  signoutuser (e) {
    localStorage.removeItem('token');
    axios.get('http://localhost:5000/deletecookie',{ withCredentials : true})
    .then(res => {
        console.log(res.data);
    })
    this.props.history.push({
      pathname : '/'
    });
    window.location.reload(false);
  };

  componentDidMount()
  {
    // window.location.reload(false);
    if(this.props.authenticated)
    {
      console.log('true')
      const token = localStorage.getItem('token')
      // const info = jwt.decode(token,process.env.JWT_SECRET)
      // // uname = info.uname;
      // console.log(info)
      // this.setState({
      //   id : info.uid
      // })
      // axios.get('http://localhost:5000/userdetails', { headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`} })
      // .then((res) => {
      //   this.setState({
      //     id: res.data._id
      //   })
      // })
    }
  }
  dataTable() {
    let details = this.state.data;
    return details.map((data,i) => {
      return (
        <div className = "user" key={i}>
          
          <p id = "searchp"><img class="h-12 w-12 rounded-full inline-block" src={`http://localhost:5000/public/img/users/user - ${data._id}.jpeg`} alt=""/><a href={`http://localhost:3000/profile/${data._id}`}>{data.Name}</a></p>
        </div>
      )
    });
  }

  onchangesearchval(e) {

    this.state.data = []

    this.setState({
      searchval: e.target.value
    })

    setTimeout(() => {
      if (this.state.searchval !== '') {
        axios.post('http://localhost:5000/search', {
          text: this.state.searchval
        })
          .then((res) => {
            
            this.setState({
              data: res.data
            })
          })
      }
    }, 20)
}
renderLinks() {
 
  if (this.props.authenticated) {
    console.log('true')
    
    // axios.get('http://localhost:5000/userdetails', { headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`} })

    // .then((res) => {
    //   setTimeout(() => {
    //     this.setState({
    //       id: res.data._id
    //     })
    //   }, 500);
    // })
    // // console.log(id);
    return (
      <div >
 
        <button type="button" class="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white " data-bs-toggle="dropdown" aria-expanded="false">
        <span class="sr-only">Open user menu</span>
                    {/* <img class="h-8 w-8 rounded-full" src={`http://localhost:5000/public/img/users/${id}`}  alt=""/> */}
                    <img class="h-8 w-8 rounded-full" src={`http://localhost:5000/public/img/users/user - ${this.props.id}.jpeg`} alt=""/>
                  </button>
        <ul class="dropdown-menu">
          <li><a class="dropdown-item" href="/userprofile">Your profile</a></li>
          <li><a class="dropdown-item" href="/settings">Reset Password</a></li>
          <li><a class="dropdown-item" href="/addPhoto">Upload userphoto</a></li>
          <li><a class="dropdown-item" href="/updateprofile">Update Profile</a></li>
          <li><hr class="dropdown-divider" /></li>
          <li><a class = "dropdown-item" ><button onClick = {this.signoutuser}> Sign out</button></a></li>
        </ul>

      </div>
    );
  } else {
    console.log("false")
    return (
    
      <div>
          <Link class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium sm:inline-block" to="/signin">
            Sign Up
          </Link>
          <Link class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium" to="/login">
            Sign In
          </Link>
      </div>
        
    );
  }
}

render() {
  return (
    <div>
    <nav class="bg-gray-800">
  <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
    <div class="relative flex items-center justify-between h-16">
      <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
        
        <button type="button" class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
          <span class="sr-only">Open main menu</span>
         
          <svg class="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
         
          <svg class="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
        <div class="flex-shrink-0 flex items-center">
          <img class="block h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg" alt="Workflow"/>
          <a href="/" class="text-gray-100 hover:text-gray-500 px-3 py-2 rounded-md text-base font-medium ">Home</a>
        </div>
        <div class="hidden sm:block sm:ml-6">
          <div class="flex space-x-4">
           
            <Link class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium" aria-current="page" to="/posts">Media</Link>

            <Link class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium" to="/events">Events</Link>

          </div>
        </div>
      </div>
      <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
        
       
        <input class="border-2 border-gray-700 text-gray-100 bg-gray-700 h-10 px-5 rounded-lg text-base focus:outline-none"
          type="text" onChange={this.onchangesearchval} value={this.state.searchval} placeholder=" &emsp; &emsp; &emsp; Search"/>
        <button type="submit" class="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white" onSubmit={this.onsubmitsearchval}>

        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        </button>
     

        <div class="ml-3 relative">
        <div>{this.renderLinks()}</div>
        </div>
      </div>
    </div>
  </div>

 
  <div class="sm:hidden" id="mobile-menu">
    <div class="px-2 pt-2 pb-3 space-y-1">
     
    <Link class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium" aria-current="page" to="/posts">Media</Link>

    <Link class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium" to="/events">Events</Link>

    </div>
  </div>
</nav>
        
        <table className="table table-striped table-dark" style={{width:"20%" , position:"absolute", left:"60%"}}>
          <tbody>
            {this.dataTable()}
          </tbody>
        </table>

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
</div>
  );
}
}

function mapStatetoProps(state) {
  // console.log(state);
  return {
    authenticated: state.auth.authenticated , 
    id : state.auth.id
  }
}

export default withRouter(connect(mapStatetoProps)(Header));
