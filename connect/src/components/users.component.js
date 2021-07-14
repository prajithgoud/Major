import React, { Component } from 'react';
import axios from 'axios';
import DataTable from './data-table';

export default class Users extends Component {

    constructor(props) {
        super(props);
        this.state = { usersCollection: [] };
    }

    componentDidMount() {
        axios.get('http://localhost:5000/verifyusers')
            .then(res => {
                this.setState({ usersCollection: res.data });
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    dataTable() {
        return this.state.usersCollection.map((data, i) => {
            return <DataTable obj={data} key={i} />;
        });
    }

    render() {
        return (
            <div className="wrapper-users">
                <div className="container">
                    <table className="table table-striped table-dark">
                        <thead className="thead-dark">
                            <br /> 
                            <br /> 
                            <br /> 
                            <br /> 
                            <tr>
                                <td>IDentification</td>
                                <td>Email</td>
                                {/* <td>Password</td> */}
                            </tr>
                        </thead>
                        <tbody>
                            
                            {this.dataTable()}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}