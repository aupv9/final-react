import React, { Component } from 'react';
import Header from '../../components/header';
import Footer from '../../components/footer';
import Profile_Content from '../../components/profile-content';
import './style.scss';


class Profile extends Component {


    render() {
        return (
            <div className="container-fluid" id="profile">
                <Header></Header>
                <Profile_Content></Profile_Content>
                <Footer></Footer>
            </div>
        );
    }
}

export default Profile;