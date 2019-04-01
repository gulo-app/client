import React, { Component } from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import Login  from  './components/Login';
import Gulo   from  './components/Gulo';

class Router extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
            <Route path="/Login" component={Login}></Route>
            <Route path="/" component={Gulo}></Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Router;
