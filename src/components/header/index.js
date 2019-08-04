import React, { Component } from 'react';
import './style.scss';
import logo from '../../img/terra-logo.png';
import {connect} from'react-redux';
import {logout} from'../../redux/actions';
import {Redirect} from 'react-router-dom';
import Swal from 'sweetalert2';

class Header extends Component {

    componentWillMount(){
        if(localStorage.getItem("user")){
            const user =JSON.parse( localStorage.getItem("user"));
            console.log(user.data)
            this.setState({
                token:user.data,
            })
        }
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.todos.isLogout ){
            this.setState({
                isLogout:true
            })
        }
        if(nextProps.todos.isLog){
            this.setState({
                isLogout:false
            })
        }
    }
    state={
        token:"",
        isLogout:false
    }
    logout=()=>{
        Swal.fire({
            title: 'Logout ?',
            text: "You want logout now!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes!'
          }).then((result) => {
            if (result.value) {
              this.props.onLogout(this.state.token)
              let timerInterval
            Swal.fire({
              title: 'Login!',
              html: 'I will logout in ... seconds.',
              timer: 100,
              onBeforeOpen: () => {
                Swal.showLoading()
                timerInterval = setInterval(() => {
                  
                }, 100)
              },
              onClose: () => {
                clearInterval(timerInterval)
              }
            }).then((result) => {
              if (result.dismiss === Swal.DismissReason.timer) {
              }
            })
            }
          })
    }

    render() {
        if(!localStorage.getItem("user")){
            return <Redirect to="/"></Redirect>
        }
        if(this.state.isLogout){
            localStorage.removeItem("user");
        }
        return (
            <div className="row" id="header">
                <div className="header-logo">
                    <img src={logo} id="logo"></img>
                </div>
                <div className="header-right">
                <div className="dropdown">
                    <button className="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        PROFILE
                    </button>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <a className="dropdown-item" >Profile</a>
                        <a className="dropdown-item" onClick={this.logout} >Logout</a>
                    </div>
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps=(state)=>({
    todos:state.auth    
});
const mapDispatchToProps = dispatch => {
    return {
    onLogout:(token)=>{
       dispatch(logout(token));
        }
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(Header);