
// configureStore.js
import { createStore, applyMiddleware } from 'redux'
import  mainReducer from '../reducers';
import thunk from 'redux-thunk' //import thunk
import logger from 'redux-logger'

 const configureStore=() =>{
  let store = createStore(mainReducer, applyMiddleware(thunk,logger)) // create store sử dụng thunk, logger
  return store
}

export default configureStore;