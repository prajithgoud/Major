import axios from 'axios';
import React, { Component } from 'react';
import Header from "./header";

class DataTable extends Component {
    
    constructor(props)
    {
        super(props)

        this.clickhandler = this.clickhandler.bind(this);
    }

    clickhandler(e){
        e.preventDefault();
        console.log(e.target.value)
        axios.post(`http://localhost:5000/update/${e.target.value}`,{
            "isverified" : true
        })
        .then((res)=>{
            // axios.get('http://localhost:5000/userdetails', { headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` } })
            // .then((res) => {
            //     console.log(res);
            //   if (res.data.isverified === "true" ) {
            //     axios.post(`http://localhost:5000/delete/${e.target.value._id}`)
            //     .then((res)=>{
            //     })
            //   }
            // })
        }).catch(err => {
            console.log(err);
        })
    }
    render() {
        return (
            
            <tr>
                
                <td>
                    {this.props.obj.email}
                </td>
                <td>
                    <button className="font-bold py-2 px-4 rounded bg-blue-500 text-white hover:bg-blue-700" value= {this.props.obj.userid} onClick={
                       this.clickhandler
                    }>Accept</button>
                    <button className="font-bold py-2 px-4 ml-2 rounded bg-red-500 text-white hover:bg-red-700" >
                        Reject
                    </button>
                </td>
            </tr>
        );
    }
}

export default DataTable;


