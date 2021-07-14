import axios from 'axios';
import React, { Component } from 'react';
import Reload from "./reload"

class ProfilewithId extends Component {

    constructor(props)
    {
        super(props)

        this.state = {
            name : '',
            dob : '',
            gender : '',
            email : '',
            department : '',
            description : ''
        }
    }

    componentDidMount() {
        var id = this.props.match.params.id
        axios.post('http://localhost:5000/find',{
            "_id" : id
        })
        .then((res)=>{
            this.setState({
                name : res.data[0].Name,
                dob : res.data[0].dob,
                gender : res.data[0].gender,
                email : res.data[0].Email, 
                department : res.data[0].department,
                description : res.data[0].description
            })
        })
    }


    render() {
        return (
            <div>
                <Reload />
                <p>Name: {this.state.name}</p>
                <p>DOB: {this.state.dob}</p>
                <p>Gender: {this.state.gender}</p>
                <p>Email: {this.state.email}</p>
                <p>Department: {this.state.department}</p>
                <p>Description: {this.state.description}</p>
            </div>
        );
    }
}

export default ProfilewithId;