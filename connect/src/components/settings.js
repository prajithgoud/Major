import React, { Component } from "react";
import axios from 'axios';
import Header from "./header";

class Settings extends Component {

    constructor(props){
        super(props)

        this.state = {
            oldpwd:"",
            newpwd:"",
            confirmnewpwd:""
        }

        this.onchangeoldpwd = this.onchangeoldpwd.bind(this);
        this.onchangenewpwd = this.onchangenewpwd.bind(this);
        this.onchangeconfirmnewpwd = this.onchangeconfirmnewpwd.bind(this);
        this.onsubmitpwd = this.onsubmitpwd.bind(this);
    }

    onchangeoldpwd(e){
        this.setState({
            oldpwd : e.target.value,
        })
    }

    onchangenewpwd(e){
        this.setState({
            newpwd : e.target.value,
        })
    }

    onchangeconfirmnewpwd(e){
        this.setState({
            confirmnewpwd : e.target.value 
        })
    }

    onsubmitpwd(e){
        e.preventDefault()

        if(this.state.newpwd !== this.state.confirmnewpwd)
        {
            alert('passwords does not match!')
        }
        else {
            const token = localStorage.getItem('token')
            axios.post('http://localhost:5000/checkpwd', {
                oldpwd: this.state.oldpwd
            },
                {
                    headers: { "Authorization": `Bearer ${token}` }
                })
                .then((res) => {
                    var id = (res.data.id)
                    axios.post('http://localhost:5000/bycryptit', {
                        content: this.state.newpwd
                    }).then((res) => {
                        var newpwd = res.data
                        axios.post(`http://localhost:5000/update/${id}`, {
                            "Password": newpwd
                        })
                    })
                })
        }

        setTimeout(() => {
            this.props.history.push({
                pathname: '/posts',
            });
        },700);
    }

    render(){
        return(
            // <div>
            //     <div>
            //         <form onSubmit={this.onsubmitpwd}>
            //             <br />
            //             <br />
            //             <br />
            //             <br />
            //             <h3>Change Password</h3><br />
            //             <div>
            //             <span>Old pwd:</span>
            //             <input type="password" value={this.state.oldpwd} onChange={this.onchangeoldpwd} />
            //             </div>
            //             <div>
            //             <span>New pwd:</span>
            //             <input type="password" value={this.state.newpwd} onChange={this.onchangenewpwd} />
            //             </div>
            //             <div>
            //             <span>Confirm New pwd:</span>
            //             <input type="password" value={this.state.confirmnewpwd} onChange={this.onchangeconfirmnewpwd} />
            //             </div>
            //             <input type="submit" value = "Submit" />
            //         </form>
            //     </div>
            // </div>
            <div>
            <Header/>
            <div class="min-h-screen flex items-center justify-center bg-blue-400">


            <div class="bg-white p-10 rounded shadow-2xl w-4/5 md:w-1/2 lg:w-1/4">
                <h2 class="text-3xl font-bold mb-10 text-gray-900">Change Password</h2>
                <form class="space-y-5" onSubmit={this.onsubmitpwd}>
                <div>
                    <label class="block mb-1 font-bold text-gray-700">Old Password</label>
                    <input type="password" class="w-full h-9 border-2 border-gray-200 p-2 rounded outline-none focus:border-purple-500" value={this.state.oldpwd} onChange={this.onchangeoldpwd} />
                </div>
                
                <div>
                    <label class="block mb-1 font-bold text-gray-700">New Password</label>
                    <input type="password" class="w-full h-9 border-2 border-gray-200 p-2 rounded outline-none focus:border-purple-500" value={this.state.newpwd} onChange={this.onchangenewpwd} />
                </div>
                
                <div>
                    <label class="block mb-1 font-bold text-gray-700">Confirm New Password</label>
                    <input type="password" class="w-full h-9 border-2 border-gray-200 p-2 rounded outline-none focus:border-purple-500" value={this.state.confirmnewpwd} onChange={this.onchangeconfirmnewpwd} />
                </div>
                <div class="flex justify-center">
                <button class="font-bold py-2 px-4 rounded bg-blue-500 text-white hover:bg-blue-700" onClick={this.onSubmit}>Reset</button>
                </div>
                </form>
            </div>

        </div>
        </div>
        )
    }
}
export default Settings;