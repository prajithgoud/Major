import axios from 'axios';
import React, { Component } from 'react';
export default class forgotpassword extends Component {

    constructor(props) {
        super(props)

        this.onSubmit1 = this.onSubmit1.bind(this);
        this.onChangeemail = this.onChangeemail.bind(this);
        this.onSubmit2 = this.onSubmit2.bind(this);
        this.onChangeenteredotp = this.onChangeenteredotp.bind(this);

        this.state = {
            email: '',
            enteredotp: '',
            receivedotp:''
        }
    }

    onChangeemail(e) {
        this.setState({ email: e.target.value })
    }


    onChangeenteredotp(e) {
        this.setState({ enteredotp: e.target.value })
    }

    onSubmit1 = (event) => {
        event.preventDefault()
        axios.post('http://localhost:5000/find',{
            "Email" : this.state.email                        
        })
        .then((res)=>{
            if(res.data.length  === 0)
            {
                alert("no such account exists!")
            }
            else {
                axios({
                    method: "POST",
                    url: "http://localhost:5000/send",
                    data: {
                        email: this.state.email
                    }
                }).then((response) => {
                    if (response.data.msg === 'success') {
                        // console.log(response.data);
                        this.setState({
                            receivedotp: response.data.otp
                        })
                    } else if (response.data.msg === 'fail') {
                        alert("Oops, something went wrong. Try again")
                    }
                })
            }
        })
    }
    
    onSubmit2 = (event) => {
        event.preventDefault()
        var enteredotp = parseInt(this.state.enteredotp)
        var receivedotp = parseInt(this.state.receivedotp)
        if(receivedotp === enteredotp)
        {
            this.props.history.push({
                pathname: '/resetpwd',
                state: { email : this.state.email }
            });
        }
    }

    render() {
        return (
            // <div>
            //     <br />
            //     <br />
            //     <br />
            //     <br />
            //     <br />
            //     <form>
            //         <div>
            //             <label>Enter Email:</label>
            //             <input type="text" value={this.state.email} onChange={this.onChangeemail}></input><br></br>
            //             <button onClick={this.onSubmit1} >Submit</button>
            //             <br />
            //             <label>Enter Otp:</label>
            //             <input type="text" value={this.state.enteredotp} onChange={this.onChangeenteredotp}></input><br></br>
            //             <button onClick={this.onSubmit2} >Submit</button>
            //         </div>
            //     </form>
            // </div>

            <div class="min-h-screen flex items-center justify-center bg-blue-400">


            <div class="bg-white p-10 rounded shadow-2xl w-4/5 md:w-1/2 lg:w-1/4">
                <h2 class="text-2xl font-bold mb-10 text-gray-900 flex justify-center">Enter to Verify</h2>

                <form class="space-y-5">
                <div>
                    <label class="block mb-1 font-bold text-gray-700">Enter Email</label>
                    <input type="text" class="w-full h-9 border-2 border-gray-200 p-2 rounded outline-none focus:border-purple-500" value={this.state.email} onChange={this.onChangeemail} />
                </div>
              
                <div class="flex justify-center">
                <button class="font-bold py-2 px-4 rounded bg-blue-500 text-white hover:bg-blue-700" onClick={this.onSubmit1}>Get OTP</button>
                </div>

                <div>
                    <label class="block mb-1 font-bold text-gray-700">Enter OTP</label>
                    <input type="text" class="w-full h-9 border-2 border-gray-200 p-2 rounded outline-none focus:border-purple-500" value={this.state.enteredotp} onChange={this.onChangeenteredotp} />
                </div>
              
                <div class="flex justify-center">
                <button class="font-bold py-2 px-4 rounded bg-blue-500 text-white hover:bg-blue-700" onClick={this.onSubmit2}>Submit</button>
                </div>
                </form>
            </div>

        </div>
        )
    }
}