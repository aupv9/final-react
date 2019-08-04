import React,{Component} from 'react';
import RouterURL from './Router/Router';
import { BrowserRouter as Router } from 'react-router-dom';


class App extends Component{

    render(){
      return (
          <Router >
          <RouterURL></RouterURL>
          </Router>

      );
    }
}

export default App;
