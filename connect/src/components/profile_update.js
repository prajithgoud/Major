import React, { Component } from 'react';
import axios from 'axios';
import "./profileUpdateStyle.css";
import Helmet from 'react-helmet';
// import FormData from 'form-data';
import Header from "./header";

class profile_update extends Component {

    constructor(props) {
        super(props);
        this.onchangedob = this.onchangedob.bind(this);
        this.onChangegender = this.onChangegender.bind(this);
        this.onchangedepartment = this.onchangedepartment.bind(this);
        this.onchangedescription = this.onchangedescription.bind(this);
        this.onsubmit = this.onsubmit.bind(this);
        this.state = {
            dob: '',
            gender: '',
            department: '',
            description: '',
        }
    }


    onChangegender(event) {
        this.setState({
          gender: event.target.value
        });
      }

    onchangedob(e) {
        this.setState({
            dob: e.target.value,
        })
    }

    onchangedepartment(e) {
        this.setState({
            department : e.target.value.toUpperCase()
        })
    }

    onchangedescription(e) {
        this.setState({
            description : e.target.value
        })
    }

    onsubmit(e) {
        e.preventDefault()

        // const data = new FormData();
        // data.append('Photo', this.state.Photo);
        // console.log(this.state.Photo);
        // console.warn(this.state.Photo);
        axios.get('http://localhost:5000/userdetails', { headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` } })
        .then((res)=>{
            var id = res.data._id;
            console.log(res.data);
            axios.post(`http://localhost:5000/update/${id}`,{
                "dob" : this.state.dob,
                "gender" : this.state.gender,
                "department" : this.state.department,
                "description" : this.state.description,
            }).then((res) => {
                console.log(res.data);
            }).catch((err) => {
                console.error(err);
            })
        })

        setTimeout(() => {
            this.props.history.push({
                pathname: '/posts',
            });
        },700);
    }

    render() {
        return (
            // <div>
                 
            //     <form onSubmit={this.onsubmit}>
            //         <br />
            //         <br />
            //         <br />
            //         <br />
            //         <label>Gender: </label>
            //         <input type="radio" value="male" checked={this.state.gender === "male"} onChange={this.onChangegender} /> Male
            //         <input type="radio" value="female" checked={this.state.gender === "female"} onChange={this.onChangegender} /> Female
            //         <br />
            //         <label>Department: </label>
            //         <input type="text" value={this.state.department} onChange={this.onchangedepartment} /> 
            //         <br />
            //         <label>Description: </label>
            //         <input type="text" value={this.state.description} onChange={this.onchangedescription} /> 
            //         <br />
            //         <label>DOB: </label>
            //         <input type="date" value={this.state.dob} onChange={this.onchangedob} /><br /><br />
            //         <button>Submit</button>
            //     </form>
                
            // </div>
            <div>
                <Header/>
            <div class="min-h-screen flex items-center justify-center bg-blue-400">
            

            <div class="bg-white p-10 rounded shadow-2xl w-4/5 md:w-1/2 lg:w-1/4">
                <h2 class="text-3xl font-bold mb-10 text-gray-900 flex justify-center">Profile Update</h2>
                <form class="space-y-5" onSubmit={this.onsubmit}>
                <div>
                <label class="block mb-1 font-bold text-gray-700">Gender</label>
                <label class="inline-flex items-center">
                <input type="radio" class="form-radio" value="male" checked={this.state.gender === "male"} onChange={this.onChangegender} required/>
                    <span class="ml-2">male</span>
                </label>

                <label class="inline-flex items-center ml-6">
                <input type="radio" class="form-radio" value="female" checked={this.state.gender === "female"} onChange={this.onChangegender} required/>
                    <span class="ml-2">female</span>
                </label>
                </div>
                <div>
                    <label class="block mb-1 font-bold text-gray-700">Department</label>
                    <input type="text" class="w-full h-9 border-2 border-gray-200 p-2 rounded outline-none focus:border-purple-500" value={this.state.department} onChange={this.onchangedepartment} required/>
                </div>
                
                <div>
                    <label class="block mb-1 font-bold text-gray-700">Description</label>
                    <input type="text" class="w-full h-9 border-2 border-gray-200 p-2 rounded outline-none focus:border-purple-500" value={this.state.description} onChange={this.onchangedescription} required/>
                </div>

                <div>
                    <label class="block mb-1 font-bold text-gray-700">DOB</label>
                    <input type="date" value={this.state.dob} onChange={this.onchangedob} required/>
                </div>
                <div class="flex justify-center">
                <button class="font-bold py-2 px-4 rounded bg-blue-500 text-white hover:bg-blue-700" onClick={this.onSubmit}>Update</button>
                </div>
                </form>
            </div>

        </div>
        </div>
        );
    }
}

export default profile_update;