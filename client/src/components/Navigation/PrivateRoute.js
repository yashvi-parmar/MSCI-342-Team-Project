import React from "react";
import { Router, Switch, Route } from "react-router-dom";

import Home from '../Home';
import SignIn from '../SignIn';
import CreateAccount from '../CreateAccount';
<<<<<<< HEAD
=======
import Map from '../Map';


>>>>>>> 700f35c65fd1570b992c2989aafee1922974f290
import history from './history';
import Dashboard from'../Dashboard'
import Share from "../Share";
import PanicButton from "../PanicButton";


export default function PrivateRoute({
  //authenticated,
  //...rest
}) {
  return (

    <Router history={history}>
      <Switch>
      <Route path="/" exact component={Home} />

      <Route path="/Dashboard" exact component={Dashboard} />
      <Route path="/Map" exact component={Map} />
      <Route path="/SignIn" exact component={SignIn} />
      <Route path="/CreateAccount" exact component={CreateAccount} />
      <Route path="/Share" exact component={Share} />
      <Route path="/PanicButton" exact component={PanicButton} />

      </Switch>
    </Router>
  );
}
