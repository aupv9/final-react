import {combineReducers} from 'redux';
import taskReducer from './auth';



export default combineReducers({
    auth:taskReducer,

    });



