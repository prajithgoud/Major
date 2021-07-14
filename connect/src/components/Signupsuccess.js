import React, { Component } from 'react'
import "./Loginstyle.css"
import { connect } from 'react-redux'
import Loadergif from  "./loader.gif";

class Signupsuccess extends Component {
state = {}

    render() {
        const {accountCreated} = this.props;

        if(!accountCreated) return null;

        return (
            <div class="loader-container flex justify-center">
                <div className="loader">
                    <label class="font-bold text-2xl text-gray-50 ">Registration Successful <br/> &nbsp; Redirecting to Login...</label>
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

export default connect(mapStatetoProps)(Signupsuccess);
