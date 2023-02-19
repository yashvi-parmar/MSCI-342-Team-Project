import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import history from './history';
import Landing from'../Landing'
import Dashboard from'../Dashboard'

export default function PrivateRoute({
  //authenticated,
  //...rest
}) {
  return (

    <Router history={history}>
      <Switch>
      <Route path="/" exact component={Landing} />
      <Route path="/Dashboard" exact component={Dashboard} />
      </Switch>
    </Router>
  );
}