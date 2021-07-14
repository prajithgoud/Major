import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import "./Loginstyle.css"
import forgotpwd from "./forgotpassword";
import Header from "./header";
import Pageloader from './PageLoader';
import { hideLoader, showLoader } from '../actions';
import Cookies from 'universal-cookie';
const cookies = new Cookies();
axios.defaults.withCredentials = true;

class Login extends Component {
    componentDidMount()
    {
        if(this.props.authenticated)
        {
            this.props.history.replace('/posts');
        }
    }

    update = () => {
        this.props.dispatch(showLoader())
        setTimeout(() => {
            this.props.dispatch(hideLoader())
        },3000);
    }
    constructor(props) {
        super(props)

        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            Email: '',
            Password: '',
            isSignedin: false
        }
    }
    onChangeEmail(e) {
        this.setState({ Email: e.target.value })
    }

    onChangePassword(e) {
        this.setState({ Password: e.target.value })
    }

    onforgotpwd() {
        console.log("hello")
        this.props.history.push({
            pathname: '/forgotpwd',
        });
    }


    onSubmit(e) {
        e.preventDefault()

        const userObject = {
            Email: this.state.Email,
            Password: this.state.Password
        };
        
        axios.post('http://localhost:5000/find',{
            "Email": userObject.Email,
        })
        .then((res) => {
            if(res.data.length === 0 )
            {
                document.getElementById("incorrect").style.display = "block";
            }
            else
            {
                console.log(res.data);
                const userdet = {
                    enterpass : userObject.Password,
                    retpass : res.data[0].Password,
                    email : userObject.Email
                };
                axios.post('http://localhost:5000/login',userdet)
                .then((res) => {
                    console.log(res.data.token);
                    console.log(res.data.status);
                    // console.log(res.cookies.jwt);
                    if(res.data.status === 'success'){
                        // Login is successful
                        // redirect to his profile or  main posts page
                        const token = res.data.token;

                        localStorage.setItem('token',res.data.token) 
                        // console.log(process.env.JWT_COOKIE_EXPIRES_IN);
                        // const token = res.data.token;
                        // const cookieOptions = {
                        //     expires : new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
                        //     // secure:true,
                        //     path : '/',
                        //     httpOnly:true //So that the cookie cannot be accessed or modified anyway by the browser
                        // } 
                        // cookies.set('jwt',token,cookieOptions);
                        // req.session.jwt = token;
                        // axios.get('http://localhost:5000/createcookie',{ withCredentials : true})
                        // .then(res => {
                        //     console.log(res.data);
                        // })
                        // cookies.set('jwt',token,{path : '/',httpOnly:true});
                        axios.get('http://localhost:5000/token', { headers: {"Authorization" : `Bearer ${res.data.token}`} })
                    .then((res) => {
                        console.log(res.data);
                    })
                    .catch((error) => {
                        console.log(error.response.data);
                    });
                    this.props.history.push({
                        pathname : '/posts'
                        // state : {detail : userObject,otp : this.state.otp}
                    });
                    }
                    else{
                        // Entered Wrong Password. Try again!
                        // Redirect to login page
                        console.log('entered wrong password');
                    }
                    // axios.get('http://localhost:5000/users')
                    // .then((res) => {
                    //     console.log(res.data);
                    // })
                    console.log("client");
                    
                    // axios.get('http://localhost:5000/token', { headers: {"Authorization" : `Bearer ${res.data.token}`} })
                    // .then((res) => {
                    //     console.log(res.data);
                    // })
                    // .catch((error) => {
                    //     console.log(error.response.data);
                    // });
                })
                .catch((error) => {
                    console.log(error.response.data)
                })
            }
        }).catch((error) => {
            console.log(error)
        });

        this.setState({ Email: '', Password: '' })
    }
      
    render() {
        return (
            // <div>
            //     <Header />
            //     <br />
            //     <br />
            // <div class="login-div">
                
            //     <form onSubmit={this.onSubmit}>
            //     <div class="logo"></div>
            //     <div class="title">Sign In</div> <div class="sub-title">Use your college mail </div>
            //     <div class="fields">
            //         <div class="username">
            //             <input type="username" value={this.state.Email} onChange={this.onChangeEmail} class="user-input" placeholder="email" />
            //             _
            //         </div>
            //         <div class="password" >
            //              <input type="password" value={this.state.Password} onChange={this.onChangePassword}class="pass-input" placeholder="password" />
            //         </div>
            //     </div>
            //     <div>
            //        <p id="incorrect" style={{display: "none"}}> The details entered are incorrect </p>
            //     </div>
            // <button class="signin-button" onClick = {this.update}>Login</button>
            // <div class="link">
            //     <a href="http://localhost:3000/forgotpwd">Forgot password</a>or <a href="http://localhost:3000/signin">Sign up</a>
            // </div>
            // </form>
            
            // </div>
            // </div>
            <div>
                <Header/>
            <div class="min-h-screen flex items-center justify-center bg-blue-400">
            

            <div class="bg-white p-10 rounded shadow-2xl w-4/5 md:w-1/2 lg:w-1/4">
                <h2 class="text-3xl font-bold mb-6 text-gray-900 flex justify-center">Sign in</h2>
                <h5 class="text-base font-bold mb-2 text-gray-700 flex justify-center">Use your college mail</h5>
                <form class="space-y-5" onSubmit={this.onSubmit}>
                <div>
                    <label class="block mb-1 font-bold text-gray-700">Email</label>
                    <input type="username" class="w-full h-9 border-2 border-gray-200 p-2 rounded outline-none focus:border-purple-500" value={this.state.Email} onChange={this.onChangeEmail} />
                </div>
                
                <div>
                    <label class="block mb-1 font-bold text-gray-700">Password</label>
                    <input type="password" class="w-full h-9 border-2 border-gray-200 p-2 rounded outline-none focus:border-purple-500" value={this.state.Password} onChange={this.onChangePassword} />
                </div>

                <div class="flex justify-center text-red-900">
                    <p id="incorrect" style={{display: "none"}}> The details entered are incorrect </p>
                </div>

                <div class="flex justify-center">
                <button class="font-bold py-2 px-4 rounded bg-blue-500 text-white hover:bg-blue-700" onClick={this.update}>Login</button>
                </div>
                
                <div class="link pt-0">
                    <a href="http://localhost:3000/forgotpwd" class="hover:text-red-900 font-bold">Forgot password</a> or <a href="http://localhost:3000/signin" class="hover:text-red-900 font-bold">Sign up</a>
                </div>
                </form>
            </div>

        </div> </div>
        )
    }
}
function mapStatetoProps(state) {
    console.log(state)
    return {
        authenticated : state.auth.authenticated,
        loading : state.auth.loading
    }
}

export default connect(mapStatetoProps)(Login);