import React, { Component } from 'react';
import "./welcome.css";
import Header from "./header";
import { Link } from "react-router-dom";
import jwt from "jsonwebtoken";
import axios from 'axios';
import { connect } from "react-redux";
import { withRouter } from 'react-router';

class Welcome extends Component {

    constructor(props) {
        super(props)
        this.signoutuser = this.signoutuser.bind(this);
      }

      signoutuser (e) {
        localStorage.removeItem('token');
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
      const info = jwt.decode(token,process.env.JWT_SECRET)
      // uname = info.uname;
    }
  }

  renderLinks() {
    if (this.props.authenticated) {
      console.log('true')
      var id = ""
      axios.get('http://localhost:5000/userdetails', { headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`} })
      .then((res) => {
         
        // this.setState({ id:res.data.Photo })
        // this.state.id = res.data.Photo
        setTimeout(() => {
          // this.setState({ id:res.data.Photo })
          id = res.data.Photo
        }, 500);
        // console.log(id);
      })
      console.log(id);
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
            <Link class="text-gray-100 hover:bg-yellow-400 hover:text-white px-3 py-2 rounded-md text-base font-medium sm:inline-block" to="/signin">
              Sign Up
            </Link>
            <Link class="text-gray-100 hover:bg-yellow-400 hover:text-white px-3 py-2 rounded-md text-base font-medium" to="/login">
              Sign In
            </Link>
        </div>
          
      );
    }
  }

    render(){
        return(
            <div>
               

<body id="page-top">
       
        <nav class="navbar navbar-expand-lg navbar-dark fixed-top" id="mainNav">
            <div class="container">
                <a class="navbar-brand" href="#page-top">
                   
                    <span class="hover:text-gray-300 text-base pr-1">Home</span>
                   
                    <div>{this.renderLinks()}</div>
                </a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    Menu
                    <i class="fas fa-bars ms-1"></i>
                </button>
                <div class="collapse navbar-collapse" id="navbarResponsive">
                    <ul class="navbar-nav text-uppercase ms-auto py-4 py-lg-0">
                        <li class="nav-item"><Link class="text-gray-100 hover:bg-yellow-400 hover:text-white px-3 py-2 rounded-md text-base font-medium" to="/posts">Media</Link></li>
                        <li class="nav-item"><Link class="text-gray-100 hover:bg-yellow-400 hover:text-white px-3 py-2 rounded-md text-base font-medium" to="/events">Events</Link></li>
                        <li class="nav-item"><a class="text-gray-100 hover:bg-yellow-400 hover:text-white px-3 py-2 rounded-md text-base font-medium" href="#about">About</a></li>
                        <li class="nav-item"><a class="text-gray-100 hover:bg-yellow-400 hover:text-white px-3 py-2 rounded-md text-base font-medium" href="#team">Team</a></li>
                        <li class="nav-item"><a class="text-gray-100 hover:bg-yellow-400 hover:text-white px-3 py-2 rounded-md text-base font-medium" href="#contact">Contact</a></li>
                    </ul>
                </div>
            </div>
        </nav>
        
        <header class="masthead">
            <div class="container">
                <div class="masthead-subheading">Welcome To Our Website!</div>
                <div class="masthead-heading text-uppercase">CONNECT</div>
                {/* <a class="btn btn-primary btn-xl text-uppercase" href="#services">Explore</a> */}
            </div>
        </header>
       
       
        <section class="page-section bg-light" id="team">
            <div class="container">
                <div class="text-center">
                    <h2 class="section-heading text-uppercase">Our Team</h2>
                    {/* <h3 class="section-subheading text-muted">Lorem ipsum dolor sit amet consectetur.</h3> */}
                </div>
                <div class="row">
                    <div class="col-lg-4">
                        <div class="team-member">
                            <img class="mx-auto rounded-circle" src={`http://localhost:5000/public/img/assets/img/team/1.png`} alt="..." />
                            <h4 class="text-xl font-bold">Malipatel Roshan</h4>
                            {/* <p class="text-muted">Lead Designer</p> */}
                            <a class="btn btn-dark btn-social mx-2" href="#!"><i class="fab fa-twitter"></i></a>
                            <a class="btn btn-dark btn-social mx-2" href="#!"><i class="fab fa-facebook-f"></i></a>
                            <a class="btn btn-dark btn-social mx-2" href="#!"><i class="fab fa-linkedin-in"></i></a>
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="team-member">
                            <img class="mx-auto rounded-circle" src={`http://localhost:5000/public/img/assets/img/team/2.png`} alt="..." />
                            <h4 class="text-xl font-bold">Prajith Goud</h4>
                            {/* <p class="text-muted">Lead Marketer</p> */}
                            <a class="btn btn-dark btn-social mx-2" href="#!"><i class="fab fa-twitter"></i></a>
                            <a class="btn btn-dark btn-social mx-2" href="#!"><i class="fab fa-facebook-f"></i></a>
                            <a class="btn btn-dark btn-social mx-2" href="#!"><i class="fab fa-linkedin-in"></i></a>
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="team-member">
                            <img class="mx-auto rounded-circle" src={`http://localhost:5000/public/img/assets/img/team/3.png`} alt="..." />
                            <h4 class="text-xl font-bold">Sai Prasad</h4>
                            {/* <p class="text-muted">Lead Developer</p> */}
                            <a class="btn btn-dark btn-social mx-2" href="#!"><i class="fab fa-twitter"></i></a>
                            <a class="btn btn-dark btn-social mx-2" href="#!"><i class="fab fa-facebook-f"></i></a>
                            <a class="btn btn-dark btn-social mx-2" href="#!"><i class="fab fa-linkedin-in"></i></a>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-8 mx-auto text-center"></div>
                </div>
            </div>
        </section>
        
        <section class="page-section" id="contact">
            <div class="container">
                <div class="text-center">
                    <h2 class="section-heading text-uppercase">Contact Us</h2>
                   
                </div>
                
                <form id="contactForm" data-sb-form-api-token="API_TOKEN" method="post" action="https://getform.io/f/cfeea3b9-7d1c-4d3f-9290-d742433d2bb9">
                    <div class="row align-items-stretch mb-5">
                        <div class="col-md-6">
                            <div class="form-group">
                                <input class="form-control" id="name" type="text" placeholder="Your Name *" />
                                <div class="invalid-feedback" data-sb-feedback="name:required">A name is required.</div>
                            </div>
                            <div class="form-group">
                                <input class="form-control" id="email" type="email" placeholder="Your Email *" />
                                <div class="invalid-feedback" data-sb-feedback="email:required">An email is required.</div>
                                <div class="invalid-feedback" data-sb-feedback="email:email">Email is not valid.</div>
                            </div>
                            <div class="form-group mb-md-0">
                                <input class="form-control" id="phone" type="tel" placeholder="Your Phone *" />
                                <div class="invalid-feedback" data-sb-feedback="phone:required">A phone number is required.</div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group form-group-textarea mb-md-0">
                                <textarea class="form-control" id="message" placeholder="Your Message *"></textarea>
                                <div class="invalid-feedback" data-sb-feedback="message:required">A message is required.</div>
                            </div>
                        </div>
                    </div>
                   
                    <div class="d-none" id="submitSuccessMessage">
                        <div class="text-center text-white mb-3">
                            <div class="fw-bolder">Form submission successful!</div>
                            To activate this form, sign up at
                            <br />
                            <a href="https://startbootstrap.com/solution/contact-forms">https://startbootstrap.com/solution/contact-forms</a>
                        </div>
                    </div>
                   
                    <div class="d-none" id="submitErrorMessage"><div class="text-center text-danger mb-3">Error sending message!</div></div>
                    <div class="text-center"><button class="btn btn-primary btn-xl text-uppercase" id="submitButton" type="submit">Send Message</button></div>
                </form>
            </div>
        </section>
        <footer class="footer py-4">
            <div class="container">
                <div class="row align-items-center">
                    <div class="col-lg-4 text-lg-start">Copyright &copy; Your Website 2021</div>
                    <div class="col-lg-4 my-3 my-lg-0">
                        <a class="btn btn-dark btn-social mx-2" href="#!"><i class="fab fa-twitter"></i></a>
                        <a class="btn btn-dark btn-social mx-2" href="#!"><i class="fab fa-facebook-f"></i></a>
                        <a class="btn btn-dark btn-social mx-2" href="#!"><i class="fab fa-linkedin-in"></i></a>
                    </div>
                    <div class="col-lg-4 text-lg-end">
                        <a class="link-dark text-decoration-none me-3" href="#!">Privacy Policy</a>
                        <a class="link-dark text-decoration-none" href="#!">Terms of Use</a>
                    </div>
                </div>
            </div>
        </footer>
        
        
       
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"></script>
       
        <script src="js/scripts.js"></script>
        
        <script src="https://cdn.startbootstrap.com/sb-forms-latest.js"></script>
    </body>
            </div>
        )
    }
}

function mapStatetoProps(state) {
    // console.log(state);
    return {
      authenticated: state.auth.authenticated,
      id : state.auth.id
    }
  }
  
  export default withRouter(connect(mapStatetoProps)(Welcome));