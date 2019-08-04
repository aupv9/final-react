import * as types from '../types';
import axios from 'axios';

export const login = (email,pass) => {
	return dispatch =>{
		const body={
			email:email,
			password:pass
		}
		axios.post('https://terralogic-training.web.app/api/login',body)
		.then(data=>{	
			dispatch({
				type: types.LOGIN_SUCCESS,
				isLogin: true,
					data:data
				})
		})
		.catch(e=>{
			console.log(e);
			dispatch({
				type: types.LOGIN_FAIL,
				isLogin: false,
				data:e
			})
		})
	} 
}

export const singup = (email,pass) => {
	return dispatch =>{
		const body={
			email:email,
			password:pass
		}
		axios.post('https://terralogic-training.web.app/api/sign_up',body)
		.then(data=>{	
			dispatch({
				type: types.SIGNUP_SUCCESS,
					data: true
				})
			})
		.catch(e=>{
			console.log(e);
			dispatch({
				type: types.SIGNUP_FAIL,
				data: false
			})
		})
	} 
}

export const getProfile = (token) => {
	return dispatch =>{
		const headers={
			'x-user-token':token
		}
		axios.post('https://terralogic-training.web.app/api/get_profile',{},{headers:headers})
		.then(data=>{	
			if(data === null){
				data="";
			}
			dispatch({
				type: types.GET_PROFILE_SUCCESS,
					isGet:true,
					data: data
				})
			})
		.catch(e=>{
			console.log(e);
			dispatch({
				type: types.GET_PROFILE_FAIL,
				isGet:false,
				data:{}
			
			})
		})
	} 
}


export const logout = (token) => {
	return dispatch =>{
		const headers={
			'x-user-token':token
		}
		axios.post('https://terralogic-training.web.app/api/logout',{},{headers:headers})
		.then(data=>{	
			dispatch({
				type: types.LOGOUT_SUCCESS,
				isLogout:true
				})
			})
		.catch(e=>{
			console.log(e);
			dispatch({
				type: types.LOGOUT_FAIL,
				isLogout:false
			})
		})
	} 
}

export const update = (info,token) => {
	return dispatch =>{
		const headers={
			'x-user-token':token
		}
		axios.post('https://terralogic-training.web.app/api/set_profile',info,{headers:headers})
		.then(data=>{	
			dispatch({
				type: types.SET_PROFILE_SUCCESS,
				isSet:true,
				data: data
				})
			})
		.catch(e=>{
			console.log(e);
			dispatch({
				type: types.SET_PROFILE_FAIL,
				isSet:false,
				data: {}
			})
			})
	} 
}