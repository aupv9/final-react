import * as types from '../../types';

var initState={isLogin:false,isSignup:false}

var taskReducer=(state=initState,action)=>{
    state.action=action.type
    switch (action.type) {
        case types.LOGIN_SUCCESS:
            return {
                ...state,
                isLogin: action.isLogin,
                data:action.data,
                isLogout:false,
            }
        case types.LOGIN_FAIL: 
            return  {
                ...state,
                isLogin: action.isLogin,
                data:action.data
            }
        case types.SIGNUP_SUCCESS: 
            return  {
                ...state,
                isSignup: action.data
            }
        case types.SIGNUP_FAIL: 
            return  {
                ...state,
                isSignup: action.data
            }
        case types.GET_PROFILE_SUCCESS: 
            return  {
                ...state,
                isGetProfile:action.isGet,
                data: action.data
            }
        case types.GET_PROFILE_FAIL: 
            return  {
                ...state,
                isGetProfile:action.isGet,
                data: action.data
            }
        case types.SET_PROFILE_SUCCESS: 
            return  {
                ...state,
                isSet:action.isSet,
                data: action.data
            }
        case types.SET_PROFILE_FAIL: 
            return  {
                ...state,
                isSet:action.isSet,
                data: action.data,
            }    
        case types.LOGOUT_SUCCESS: 
            return  {
                ...state,
                isLogout:action.isLogout,
                
            }
        case types.LOGOUT_FAIL: 
            return  {
                ...state,
                isLogout:action.isLogout,
                
            }        
        default:
            return state;
    }
};

export default taskReducer;