import React, { Component } from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';

import App    from  './App.js';
import Login  from  './components/Login';
import Gulo   from  './components/Gulo';

class Router extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
            <Route path="/Login" component={Login}></Route>
            <Route path="/Gulo" component={Gulo}></Route>
            <Route path="/" component={App}></Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Router;
