import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {login} from '../../redux/actions'
import Swal from 'sweetalert2'
 import {Link} from 'react-router-dom'


 class Login extends Component {

    componentWillReceiveProps(nextProps){
        if(nextProps.todos.isLogin && this.state.isInputValid){
            this.setState({ 
                isSucess:nextProps.todos.isLogin,
                data:nextProps.todos.data.data.token
            })            
        }else{
            Swal.fire({
                    title: 'Email or Password is not correct ',
                    animation: true,
                    type: 'warning',
                    customClass: {
                      popup: 'animated tada'
                    }
            })
        }
    }
    state={
        isSucess:false,
        data:"",
        email:"",
        password:"",
        isInputValid: true,
        errorMessage: ''
    }
     handleChange=(e)=>{
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }
    FormError=(isHidden,errorMessage) =>{
        if (isHidden) {return null;}
        return (
          <div className="form-warning" >
              {errorMessage}
          </div>
        )
      }
    
    handleInputValidation = event => {
        const { isInputValid, errorMessage } = this.validateInput(this.state.email);
        this.setState({
          isInputValid: isInputValid,
          errorMessage: errorMessage
        })
      }

     validateInput = (checkingText) => {
        const regexp =/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (regexp.exec(checkingText) !== null) {
            return {
                isInputValid: true,
                errorMessage: ''
            };
        } else {
            return {
                isInputValid: false,
                errorMessage: 'Email not valid (abc@vn.com)'
            };
        }
    }
    // method login
    login =()=>{
        if(!this.state.email || !this.state.password ){
            Swal.fire({
                title: 'Email or Password is not null ',
                animation: true,
                type: 'warning',
                customClass: {
                  popup: 'animated tada'
                }
        })}
        else if(!this.state.isInputValid){
            Swal.fire({
                title: 'Email must valid',
                animation: true,
                type: 'warning',
                customClass: {
                  popup: 'animated tada'
                }
            })
        }
        else if( this.state.password.length < 6){
            Swal.fire({
                title: 'Password must be length 8 characters or more',
                animation: true,
                type: 'warning',
                customClass: {
                  popup: 'animated tada'
                }
        })
        }else{
            this.props.onLogin(this.state.email,this.state.password)
            let timerInterval
            Swal.fire({
              title: 'Login!',
              html: 'I will login in ... seconds.',
              timer: 324232000,
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
    }
    
    render() {
        if(localStorage.getItem("user")){
            return <Redirect to="/profile"></Redirect>
             
        }
        if(this.state.isSucess){
            Swal.fire({
                position: 'top-end',
                type: 'success',
                title: 'Login success',
                showConfirmButton: false,
                timer: 1500
              })
            localStorage.setItem("user",JSON.stringify({email:this.state.email,
                password:this.state.password,data:this.state.data}))
            return <Redirect to="/profile"></Redirect>
          }
        return (

              <div className="box-login">
              <h1 className="title-form"><span>LOGIN</span></h1>
              <div className="box-content">
                <form className="form">
                  <div className="form-group">
                    <span>Email</span><br />
                    <input type="email" id="ip-email" onChange={this.handleChange} name="email" onBlur={this.handleInputValidation}></input>
                      {this.FormError(this.state.isInputValid,
                          this.state.errorMessage)}
                  </div>
                <div className="form-group">
                  <span>Password</span><br />
                  <input type="password" id="ip-pass"name="password" onChange={this.handleChange}></input>
                </div>
                <div className="form-group" id="group-btn">
                  <button type="button" id="btn-login" onClick={this.login}>LOGIN</button>
                  <Link to="/home/sign-up" id="sign-up">
                            <button type="button" >SIGN UP</button>
                        </Link>
                </div>
              </form>
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
            onLogin: (email, password) => { 
                dispatch(login(email, password));
            }

        }
};
export default connect(mapStateToProps,mapDispatchToProps)(Login);