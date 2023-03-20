import React from "react";
import { Router, Switch, Route } from "react-router-dom";

import Home from '../Home';
import Map from '../Map';
import history from './history';
import CreateAccount from "../CreateAccount";
import Alerts from '../Alerts'
import Emergency from '../Emergency'
import Profile from "../Profile";
import Friends from "../Friends";
import EmergencyServices from "../EmergencyServices";
import TermsAndConditions from "../TermsAndConditions";
import SignIn from "../SignIn";



export default function PrivateRoute({
  //authenticated,
  //...rest
}) {
  return (

    <Router history={history}>
      <Switch>

      <Route path="/" exact component={Home} />
      <Route path="/Map" exact component={Map} />
      <Route path="/Alerts" exact component={Alerts} />
      <Route path="/SignIn" exact component={SignIn} />
      <Route path="/Profile" exact component={Profile} />
      <Route path="/Friends" exact component={Friends} />
      <Route path="/EmergencyServices" exact component={EmergencyServices} />
      <Route path="/TermsAndConditions" exact component={TermsAndConditions} />
      <Route path="/CreateAccount" exact component={CreateAccount} />

      </Switch>
    </Router>
  );
}
