import React, { Component } from 'react';
import './style.scss';


class Footer extends Component {
    render() {
        return (
            <div  className="row" id="footer">
                 <p id="copy-right"><i className="far fa-copyright"></i>2019 Terralogic, InC</p>
            </div>
        );
    }
}

export default Footer;