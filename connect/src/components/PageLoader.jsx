import React, { Component } from 'react'
import "./Loginstyle.css"
import { connect } from 'react-redux'
import Loadergif from  "./loader.gif";

class Pageloader extends Component {
state = {}

    render() {
        const {loading} = this.props;

        if(!loading) return null;

        return (
            <div class="loader-container">
                <div className="loader2">
                    <img src={Loadergif} />
                </div>
            </div>
            // <div class="sk-chase">
            //     <div class="sk-chase-dot"></div> 
            //     <img src={Loadergif} />
            //     <div class="sk-chase-dot"></div>
            //     <div class="sk-chase-dot"></div>
            //     <div class="sk-chase-dot"></div> 
            //     <div class="sk-chase-dot"></div> 
            //     <div class="sk-chase-dot"></div>
            // </div>
        )
    }
}

function mapStatetoProps(state) {
    console.log(state)
    return {
        authenticated : state.auth.authenticated,
        loading : state.auth.loading
    }
}

export default connect(mapStatetoProps)(Pageloader);
