import React, { Component } from 'react';
import logo from '../../img/terra-logo.png'
class HomeLeft extends Component {

    render() {
        return (
            <div className="home-left">
                <img src={logo} alt="logo" className="logo" />
                <span className="title">We are family</span>
                <p className="copy-right">
                <i className="far fa-copyright" />
                <span>2019 Terralogic, Inc</span>
                </p>
            </div>
            
        );
    }
}
export default HomeLeft;