import React, { Component } from 'react';
import './style.scss';
import {connect} from'react-redux';
import {update,getProfile} from'../../redux/actions'
import Swal from 'sweetalert2';
import {Redirect} from 'react-router-dom'
class Profile_Content extends Component {

    componentWillReceiveProps(nextProps){
        let user=nextProps.todos;
        if(user.isGetProfile){
            this.setState({
                display_name:user.data.data.display_name,
                display_info:user.data.data.display_info,
                phone:user.data.data.phone,
                avatar:user.data.data.avatar
            })
        }
        if(user.isSet){
            this.setState({
                display_name:nextProps.todos.data.data.data.display_name,
               display_info:nextProps.todos.data.data.data.display_info,
               phone:nextProps.todos.data.data.data.phone,
               avatar:nextProps.todos.data.data.data.avatar,
               isUpdate:true
            })
        }
    }
    componentWillMount(){
        if(localStorage.getItem("user")){
            const user =JSON.parse( localStorage.getItem("user"));
            console.log(user.data)
            this.props.onGetProfile(user.data)
            this.setState({
                email:user.email,
                password:user.password
            })
        }
    }
    // variable global
    state={
        email:"",
        password:"",
        display_name:"",
        display_info:"",
        phone:"",
        confirmPassword:"",
        isUpdate:false,
        file: "",
        avatar: ""
    }

    updateInfo = () =>{
        const {display_name,display_info, phone,avatar}=this.state;
        if(!this.state.password || !this.state.display_name ||
            !this.state.display_info || !this.state.phone || !this.state.avatar){
            Swal.fire({
                title: 'Info is not null ',
                animation: true,
                type: 'info',
                customClass: {
                  popup: 'animated tada'
                }
        })}
        else if( this.state.password.length < 6){
            Swal.fire({
                title: 'Password must be length 6 characters or more',
                animation: true,
                type: 'info',
                customClass: {
                  popup: 'animated tada'
                }
        })
        }else if(this.state.password !== this.state.confirmPassword){
            Swal.fire({
                title: 'Password mismatched ',
                animation: true,
                type: 'info',
                customClass: {
                  popup: 'animated tada'
                }
        })
        }else{
            const user =JSON.parse( localStorage.getItem("user"));
            this.props.onUpdate({display_name,display_info, phone,avatar},user.data); 
            let timerInterval
            Swal.fire({
              title: 'Login!',
              html: 'I will Set Profile in ... seconds.',
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

    handleChange=(e)=>{
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    handleChangeFile=(e)=>{
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = () => {
          this.setState({
            file: file,
            avatar: reader.result
          });
        }
        reader.readAsDataURL(file)
    }
   
    render() {
        if(localStorage.getItem("user") === null){
            return <Redirect to="/"></Redirect>
        }
        if(this.state.isUpdate){
            Swal.fire({
                title: 'Update Sucess' ,
                type:"success",
                animation: true,
                type: 'info',
                customClass: {
                  popup: 'animated tada'
                }
            })
        }
        return (
            <div id="content" className="row">
                <div id="box-content">
                   <i className="far fa-user-circle" className="icon">
                       <img className="icon" src={this.state.avatar}></img>
                       </i>
                    <label className="btn-bs-file btn btn-lg ">
                    <i className="fas fa-pencil-alt" id="icon-file"></i>
                         <input type="file" name="avatar" onChange={this.handleChangeFile}/>
                 </label>
                    <form id="form-main">
                        <div className="row form-group">
                            <div className="col-xs-6 div-input ">
                                 <label>Display Name</label><br></br>
                                 <input type="text" defaultValue={this.state.display_name} name="display_name"  onChange={this.handleChange} placeholder="Your name"></input>
                            </div>
                            <div className="col-xs-6 div-input">
                            <label>Display Info</label><br></br>
                                 <input type="text" name="display_info" defaultValue={this.state.display_info}onChange={this.handleChange} placeholder="Your info" ></input>
                            </div>
                        </div>
                        <div className="row form-group">
                            <div className="col-xs-6 div-input">
                                 <label>Email</label><br></br>
                                 <input type="Email" disabled defaultValue={this.state.email} onChange={this.handleChange} placeholder="Your Email"></input>
                            </div>
                            <div className="col-xs-6 div-input">
                            <label>Phone Number</label><br></br>
                                 <input type="text" name="phone" defaultValue={this.state.phone}onChange={this.handleChange} placeholder="Phone"></input>
                            </div>
                        </div>
                        <div className="row form-group">
                            <div className="col-xs-6 div-input">
                                 <label>New Password</label><br></br>
                                 <input type="Password" name="password" onChange={this.handleChange} placeholder="Enter New Password"></input>
                            </div>
                            <div className="col-xs-6 div-input">
                            <label>Confim Password</label><br></br>
                                 <input type="Password" name="confirmPassword" onChange={this.handleChange} placeholder="Confirm Password"></input>
                            </div>
                        </div>
                        <div className="row button">
                            <div className="button-right">
                            <button type="button" onClick={this.updateInfo}>UPDATE PROFILE</button>
                            </div>
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
        onGetProfile: token =>{
            dispatch(getProfile(token))
        },
        onUpdate:(infoUpdate,token)=>{
           dispatch(update(infoUpdate,token));
            }
        }
    };

export default connect(mapStateToProps,mapDispatchToProps)(Profile_Content);