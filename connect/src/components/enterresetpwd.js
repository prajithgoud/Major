import axios from 'axios';
import React, { Component } from 'react';

class enterresetpwd extends Component {

    constructor(props)
    {
        super(props);
        this.onchangepwd = this.onchangepwd.bind(this);
        this.onsubmit = this.onsubmit.bind(this);
        this.state = {
            newpwd : ''
        }
    }

    onchangepwd(e) {
        this.setState({
            newpwd : e.target.value
        })
    }


    onsubmit= (st) => (e) => {
        e.preventDefault()
        var email = st.Email
        
        axios.post('http://localhost:5000/find',{
            "Email" : email 
        }).then((res)=>{
            var id = (res.data[0]._id)
            axios.post('http://localhost:5000/bycryptit',{
                content : this.state.newpwd
            }).then((res) => {
                var newpwd = res.data
                axios.post(`http://localhost:5000/update/${id}`,{
                    "Password" : newpwd
                })
            })
        })
    }

    render() {
        const st = this.props.location.state
        return (
            // <div>
            //     <form onSubmit={this.onsubmit(st)}>
            //     <label>Enter new Password:</label>
            //     <input type="text" value={this.state.newpwd} onChange={this.onchangepwd} />
            //     <button>Submit</button>
            //     </form>
            // </div>

            <div class="min-h-screen flex items-center justify-center bg-blue-400">
            <div class="bg-white p-10 rounded shadow-2xl w-4/5 md:w-1/2 lg:w-1/4">
                <h2 class="text-2xl font-bold mb-10 text-gray-900 flex justify-center"></h2>
                
                <form class="space-y-5" onSubmit={this.onsubmit(st)}>
                <div>
                    <label class="block mb-1 font-bold text-gray-700">Enter New Password</label>
                    <input type="password" class="w-full h-9 border-2 border-gray-200 p-2 rounded outline-none focus:border-purple-500" value={this.state.newpwd} onChange={this.onchangepwd} />
                </div>
              
                <div class="flex justify-center">
                <button class="font-bold py-2 px-4 rounded bg-blue-500 text-white hover:bg-blue-700" >Submit</button>
                </div>
                </form>
            </div>

        </div>
        );
    }
}

export default enterresetpwd;