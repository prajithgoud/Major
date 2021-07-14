import React, { Component } from 'react';
import axios from 'axios';
import Header from "../header";


class PostNew extends Component {

    constructor(props) {
        super(props)

        this.onChangetitle = this.onChangetitle.bind(this);
        this.onChangecontent = this.onChangecontent.bind(this);
        this.onchangepriority = this.onchangepriority.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            title: '',
            categories: '',
            ispriority: false,
            postedby: ''
        }
    }



    onChangetitle(e) {
        this.setState({ title: e.target.value })
    }

    onChangecontent(e) {
        this.setState({ content: e.target.value })
    }

    onchangepriority(e) {
        this.setState({
            ispriority: !(this.state.ispriority)
        })
    }

    changestringtoarray() {
        this.setState({
            categories: this.state.categories.split(',')
        })
    }

    onSubmit(e) {
        e.preventDefault()

        const formdet = {
            title: this.state.title,
            content: this.state.content
        }

        const token = localStorage.getItem('token')
        axios.post('http://localhost:5000/api/createevent', formdet, {
            headers: { "Authorization": `Bearer ${token}` }
        })

        if (this.state.ispriority == true) {

            axios.get('http://localhost:5000/userdetails', {
                headers: { "Authorization": `Bearer ${token}` }
            })
                .then((res) => {
                    axios.post('http://localhost:5000/users')
                        .then((resp) => {
                            var name = res.data.Name
                            var len = resp.data.length
                            for (let index = 0; index < len; index++) {
                                axios.post('http://localhost:5000/sendpriorityevent', {
                                    postedby: name,
                                    email: resp.data[index].Email
                                })
                            }
                        })
                })
        }

        setTimeout(() => {
            this.props.history.push({
                pathname: '/events',
            });
        },700);
    }




    render() {
        return (
            // <div>
            //     <div class="form-container">
            //         <form onSubmit={this.onSubmit} id="form">
            //             <h3>New Event</h3>
            //             <div class="container">
            //                 <input type="text" value={this.state.title} onChange={this.onChangetitle} placeholder="title"></input>
            //             </div>
            //             <div class="container">
            //                 <input type="text" value={this.state.content} onChange={this.onChangecontent} placeholder="content" />
            //             </div>
                        // <div class="container">
                        //     <label>
                        //         <input type="checkbox" value={this.state.ispriority} onChange={this.onchangepriority} />
                        //         Priority
                        //     </label>
                        // </div>
            //             <div class="container">
            //                 <input type="submit" value="Submit" />
            //             </div>
            //         </form>
            //     </div>
            // </div>

            <div>
                <Header/>
            <div class="min-h-screen flex items-center justify-center bg-blue-400">
            <div class="bg-white p-10 rounded shadow-2xl w-4/5 md:w-1/2 lg:w-1/4">

                <h2 class="text-3xl font-bold mb-6 text-gray-900 flex justify-center">Add Event</h2>
                
                <form class="space-y-5" onSubmit={this.onSubmit} id="form">
                <div>
                    <label class="block mb-1 font-bold text-gray-700">Title</label>
                    <input type="text" class="w-full h-9 border-2 border-gray-200 p-2 rounded outline-none focus:border-purple-500" value={this.state.title} onChange={this.onChangetitle} />
                </div>
              
                <div>
                    <label class="block mb-1 font-bold text-gray-700">Content</label>
                    <input type="text" class="w-full h-9 border-2 border-gray-200 p-2 rounded outline-none focus:border-purple-500" value={this.state.content} onChange={this.onChangecontent} />
                </div>

                <div class="flex justify-center">
                    <label class="text-blue-600">
                        <input type="checkbox" class="form-checkbox mr-1 h-4 w-4 text-blue-600" value={this.state.ispriority} onChange={this.onchangepriority} />
                           <span class="font-bold text-gray-700">Priority</span> 
                    </label>
                </div>

                <div class="flex justify-center">
                <button class="font-bold py-2 px-4 rounded bg-blue-500 text-white hover:bg-blue-700" onClick={this.update}>Submit</button>
                </div>
    
                </form>
            </div>

        </div>
        </div>
        )
    }
}

export default (PostNew);