import React, { Component } from 'react';
import axios from 'axios';
// import Header from "../header";
import Helmet from 'react-helmet';
import { connect } from "react-redux";

class CreateUser extends Component {

    constructor(props) {
        super(props)

        this.onChangecontent = this.onChangecontent.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            content: ''
        }
    }

    onChangecontent(e) {
        this.setState({ content: e.target.value })
    }

    onSubmit(e) {
        
        e.preventDefault()
        const token = localStorage.getItem('token')
        
        const formdet = {
            postId: this.props.match.params.id,
            content: this.state.content,
            token: token
        }

        console.log(formdet)
      
        axios.get('http://localhost:5000/token', { headers: {"Authorization" : `Bearer ${token}`} })
        .then((res) => {
            console.log(res.data);
            if(res.data !== null){
                console.log("inside if");
                axios.post('http://localhost:5000/api/createcomment',formdet,{
                    headers: { "Authorization": `Bearer ${token}` }})
                .then((res) => {
                    console.log(res.data);
                })
                .catch((error) => {
                    console.log(error.response.data);
                })
            }
        })
        .catch((error) => {
            console.log(error.response.data);
        });

        setTimeout(() => {
            this.props.history.push({
                pathname: '/posts',
            });
        },700);
    }
    render() {
        return (
            // <div>
            //     <br />
            //     <br />
            //     <div class="form-container">
            //         <form onSubmit={this.onSubmit} id="form">
            //             <h3>Comment</h3>
            //             <div class="container">
            //                 <input type="text" value={this.state.content} onChange={this.onChangecontent} placeholder="content" />
            //                 <input type="submit" value="Submit" />
            //             </div>
            //         </form>
            //     </div>
            // </div>

            <div class="min-h-screen flex items-center justify-center bg-blue-400">
            <div class="bg-white p-10 rounded shadow-2xl w-4/5 md:w-1/2 lg:w-1/4">

                <h2 class="text-xl font-bold mb-6 text-gray-900 flex justify-center">Add Comment</h2>
                
                <form class="space-y-5" onSubmit={this.onSubmit} id="form">
                <div>
                    <label class="block mb-1 font-bold text-gray-700"></label>
                    <input type="text" class="w-full h-9 border-2 border-gray-200 p-2 rounded outline-none focus:border-purple-500" value={this.state.content} onChange={this.onChangecontent} />
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

export default (CreateUser);