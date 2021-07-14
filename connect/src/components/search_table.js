import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Searchtable extends Component {
    render() {
        return (
            <tr>
                <td>
                <Link className="link-without-underline" to={`/profile/${this.props.obj._id}`}> {this.props.obj.Name} </Link>
                </td>

            </tr>
        );
    }
}

export default Searchtable;