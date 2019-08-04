import React, { Component } from 'react'
import {Route,Switch } from 'react-router-dom'
import Home from '../pages/home';
import Profile from '../pages/profile';
import NOTFOUND404 from '../components/404';



export default class RouterURL extends Component {
    render() {
        return (

               <Switch>
                <Route  path="/home" component={Home} ></Route>  
                <Route exact path="/" component={Home} ></Route>
                <Route path="/profile"  component={({match})=> <Profile match={match}></Profile>} />  
                <Route  component={NOTFOUND404}></Route> 
               </Switch>
           
        )
    }
}
