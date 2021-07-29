import React, { Component } from 'react';
import axios from 'axios';
import "./Signup.css";
import Header from "./header";
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import {showLoader,hideLoader} from '../actions';

class CreateUser extends Component {

    update = () => {

        // window.location.reload(false);
        this.props.dispatch(showLoader())
        // this.setState({});
        setTimeout(() => {
            this.props.dispatch(hideLoader())
        },3000);
    }

    componentDidMount()
    {
        if(this.props.authenticated)
        {
            this.props.history.replace('/posts');
        }
    }
    constructor(props) {
        super(props)

        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeConfirm = this.onChangeConfirm.bind(this);
        this.onChangedepartment = this.onChangedepartment.bind(this);
        this.onChangerole = this.onChangerole.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            Email: '',
            Password: '',
            Emailerror:'',
            Name: '',
            Confirm: '',
            department: '',
            otp: '',
            Role:''
        }
    }

    
    onChangeEmail(e) {
        this.setState({ Email: e.target.value })
        }

    onChangePassword(e) {
        this.setState({ Password: e.target.value })
    }

    validate = () => {
        let Emailerror = "";
        let Passworderror = "";
        if (!this.state.Email.includes("@uceou.edu")) {
            // this.setState({
            //     Emailerror : "Confined to uceou.edu account holders"
            // })
            // return 0;
            alert('Confined to uceou.edu account holders');  
        }
        // var pass = this.state.Password;
        // var reg = '/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,32}$/';
        // var test = reg.match(pass);
        // if (test) {
        //     // alert('pass');
        //     return 1;
        // } else{
        //      alert('Password must contain min 8 characters with atleast one numeric digit, one uppercase and one lowercase letter');
        //     this.setState({
        //         Passworderror : " "
        //     })
        //     return 0;
        // }
        if(this.state.Password.length < 8) {
            // this.setState({
            //     Passworderror : "Min. 8 characters"
            // })
            // return 0;
            alert('Minimum 8 characters');
        }
            return 1;
    }
    onChangedepartment(e) {
        this.setState({department : e.target.value.toUpperCase() })
    }
    onChangeName(e) {
        this.setState({ Name: e.target.value })
    }

    onChangeConfirm(e) {
        this.setState({ Confirm : e.target.value })
    }
    onChangerole(e) {
        this.setState({Role : e.target.value })
    }
 

    
    onSubmit(e) {
        e.preventDefault()
        const isValid = this.validate();

        if(isValid) {
        var userObject = {
            Email: this.state.Email,
            Password:this.state.Password,
            Name: this.state.Name,
            department: this.state.department,
            Role:this.state.Role,
            isverified:false
        };

        if (this.state.Password !== this.state.Confirm) {
            document.getElementById("notmatch").style.display = "block";
        }
        
        // axios.post('http://localhost:5000/find', {
        //     "Email":userObject.Email })
        if(this.state.Password !== this.state.Confirm)
        {
            document.getElementById("notmatch").style.display = "block";
        }
        else {
        document.getElementById("notmatch").style.display = "none";
        axios.post('http://localhost:5000/find',{
            "Email" : userObject.Email
        })
        .then((res) => {
            // console.log(res.data.length)
            if(res.data.length > 0)
            {
                // alert("You already have an account")
                document.getElementById("incorrect").style.display = "block";
            }
            else if (res.data.length === 0) 
            {
                    axios({
                        method: "POST",
                        url:"http://localhost:5000/send",
                        data: {
                      name: userObject.Name,
                      email: userObject.Email  
                    }
                    }).then((response)=>{
                        if (response.data.msg === 'success'){
                            // console.log(response.data);
                            this.setState({
                                otp:response.data.otp
                            })
                            this.props.history.push({
                                pathname : '/Checkotp', 
                                state : {detail : userObject,otp : this.state.otp}
                            });
                        }else if(response.data.msg === 'fail'){
                            alert("Oops, something went wrong. Try again")
                        }
                    }).catch((error) => {
                        console.log(error.response.data);
                    })
            }
        }).catch((error) => {
            console.log(error)
        });

        // this.setState({ Email: '', Password: '' })
        this.setState({ Email: '', Password: '',Emailerror:'', Name: '' ,Confirm: '',department: '',Role :''});

    }
    }
}

    
      
    render() {
        return (
           

            <div>
                <Header/>
                <div class="min-h-screen flex items-center justify-center bg-blue-400">
                <div class="bg-white p-10 rounded shadow-2xl w-4/5 md:w-1/2 lg:w-1/4">
                <h2 class="text-3xl font-bold mb-6 text-gray-900 flex justify-center">Sign Up</h2>
                
                <form class="space-y-5" onSubmit={this.onSubmit} id="form">
                <div>
                    <label class="block mb-1 font-bold text-gray-700">Username</label>
                    <input type="text" class="w-full h-9 border-2 border-gray-200 p-2 rounded outline-none focus:border-purple-500" value={this.state.Name} onChange={this.onChangeName} />
                </div>
                
                <div>
                    <label class="block mb-1 font-bold text-gray-700">Email</label>
                    <input type="email" class="w-full h-9 border-2 border-gray-200 p-2 rounded outline-none focus:border-purple-500" value={this.state.Email} onChange={this.onChangeEmail} />
                </div>

               

                <div>
                    <label class="block mb-1 font-bold text-gray-700">Password</label>
                    <input type="password" class="w-full h-9 border-2 border-gray-200 p-2 rounded outline-none focus:border-purple-500" value={this.state.Password} onChange={this.onChangePassword} />
                </div>

                <div>
                    <label class="block mb-1 font-bold text-gray-700">Confirm Password</label>
                    <input type="password" class="w-full h-9 border-2 border-gray-200 p-2 rounded outline-none focus:border-purple-500" value={this.state.Confirm} onChange={this.onChangeConfirm} />
                </div>
                
                <div class="flex justify-start">
                <input class="placeholder-gray-700 font-bold w-full h-9 border-2 border-gray-200 p-2 rounded outline-none focus:border-purple-500 " type="text" list="data" onChange={this.onChangerole} placeholder = "Role"/>
                            <datalist id="data">
                            {
                                <option value = "Student" />
                            }
                            {
                                <option value = "Professor" />
                            }
                            {
                                <option value = "CR" />
                            }
                            </datalist>
                </div>
                    <p id="notmatch" style={{display: "none"}}> The Passwords does not Match </p>
                    <p id="incorrect" style={{display: "none"}}> Your account already exists </p>
                <div class="flex justify-center">
                <button class="font-bold py-2 px-4 rounded bg-blue-500 text-white hover:bg-blue-700" onClick={this.update}>Register</button>
                </div>
                
                <div class="link pt-0">
                    Already have an account? <a href="http://localhost:3000/login" class="hover:text-red-900 font-bold">Login</a>
                </div>
                </form>
            </div>

        </div>
            </div>
        )
    }

}

function mapStatetoProps(state) {
    console.log(state)
    return {
        authenticated : state.auth.authenticated,
    }
}

export default connect(mapStatetoProps)(CreateUser);