import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import history from './history';
import Dashboard from'../Dashboard'
import Home from '../Home';
import SignIn from '../SignIn';
import CreateAccount from '../CreateAccount';

export default function PrivateRoute({
  //authenticated,
  //...rest
}) {
  return (

    <Router history={history}>
      <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/SignIn" exact component={SignIn} />
      <Route path="/CreateAccount" exact component={CreateAccount} />
      <Route path="/Dashboard" exact component={Dashboard} />
      </Switch>
    </Router>
  );
}