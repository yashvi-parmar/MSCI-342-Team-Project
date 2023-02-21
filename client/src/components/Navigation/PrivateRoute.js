import React from "react";
import { Router, Switch, Route } from "react-router-dom";

import Home from '../Home';
import SignIn from '../SignIn';
import CreateAccount from '../CreateAccount';


import history from './history';
import Dashboard from'../Dashboard'
//import Home from '../Home';

export default function PrivateRoute({
  //authenticated,
  //...rest
}) {
  return (

    <Router history={history}>
      <Switch>
      <Route path="/" exact component={Home} />

      <Route path="/Dashboard" exact component={Dashboard} />

      <Route path="/SignIn" exact component={SignIn} />
      <Route path="/CreateAccount" exact component={CreateAccount} />

      </Switch>
    </Router>
  );
}