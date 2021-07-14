import React, { Component } from 'react';
import axios from 'axios';
import { hideaccountCreated, showaccountCreated } from '../actions';
import { connect } from 'react-redux';
class checkotp extends Component {

    update = () => {
        this.props.dispatch((showaccountCreated()))
        setTimeout(() => {
            this.props.dispatch(hideaccountCreated())
        },5000);
    }

    constructor(props) {
        super(props)

        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeotp = this.onChangeotp.bind(this);

        this.state = {
            otp : ''
        }
    }

    onChangeotp(e) {
        this.setState({ otp : e.target.value })
    }

    onSubmit = (st) => (event) => {
        event.preventDefault()
        const otp = this.state.otp;
        const origOtp = this.props.location.state.otp;
        console.log(this.props.location.state.otp);
        console.log(otp);
        const userObject = this.props.location.state.detail;

        console.log(userObject);
        if ( origOtp == otp) {
            axios.post('http://localhost:5000/create', userObject)
                .then((res) => {
                    console.log("create");
                    console.log(res.data);
                    this.props.history.push({
                        pathname : '/login'
                        // state : {detail : userObject,otp : this.state.otp}
                    });
                })
                .catch((error) => {
                    console.log(error.response.data)
                });
        }
        else{
            console.log("Users details not stored in db");
        }

        var uid = ""

            // setTimeout(() => {
            //     if (st.detail.role === "Professors") {
            //         axios.get('http://localhost:5000/find',
            //             {
            //                 "Name": st.detail.Name
            //             })
            //             .then((res) => {
            //                 console.log(res)
            //                 console.log(res.data[0]._id)
            //                 axios.post("http://localhost:5000/verifyroles", {
            //                     name: st.detail.Name,
            //                     email: st.detail.Email,
            //                     userid: res.data[0]._id
            //                 }).then((res) => {
            //                         console.log('hello')
            //                     })
            //             })
            //     }
            // }, 4000);

            setTimeout(() => {
                if (st.detail.role !== "Student") {
                    axios.post('http://localhost:5000/find',
                        {
                            "Email": st.detail.Email
                        })
                        .then((res) => {
                            var resp = res
                            axios.post("http://localhost:5000/verifyroles", {
                                name: resp.data[0].Name,
                                email: resp.data[0].Email,
                                userid: resp.data[0]._id
                            }).
                                then((res) => {
                                    console.log('hello')
                                })
                        })
                }
            }, 4000);
        
    }
    render() {
        const st = this.props.location.state
            return (
            // <div>
            //     <br></br>
            //     <br></br>
            //     <br></br>
            //     <br></br>
            // <form onSubmit={this.onSubmit(st)}>
            //     <div>

            //     <label for="Otp">Enter Otp:</label>
            //     <input type="text" value={this.state.otp} onChange={this.onChangeotp}></input><br></br>
            //     <input type="submit" onClick = {this.update} value="Submit" />
            //     </div>
            // </form>
            // </div>

            <div class="min-h-screen flex items-center justify-center bg-blue-400">


            <div class="bg-white p-10 rounded shadow-2xl w-4/5 md:w-1/2 lg:w-1/4">
                <h2 class="text-2xl font-bold mb-10 text-gray-900 flex justify-center">One Time Password</h2>
                <form class="space-y-5" onSubmit={this.onSubmit(st)}>
                <div>
                    <label class="block mb-1 font-bold text-gray-700">Enter OTP</label>
                    <input type="text" class="w-full h-9 border-2 border-gray-200 p-2 rounded outline-none focus:border-purple-500" value={this.state.otp} onChange={this.onChangeotp} />
                </div>
              
                <div class="flex justify-center">
                <button class="font-bold py-2 px-4 rounded bg-blue-500 text-white hover:bg-blue-700" onClick={this.update}>Submit</button>
                </div>
                </form>
            </div>

        </div>
        )
    }
}


function mapStatetoProps(state) {
    console.log(state)
    return {
        authenticated : state.auth.authenticated,
        loading : state.auth.loading,
        accountCreated : state.auth.accountCreated
    }
}

export default connect(mapStatetoProps)(checkotp);