import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import Landing from '../Landing';
import PrivateRoute from '../Navigation/PrivateRoute.js';
const serverURL = "http://ec2-18-216-101-119.us-east-2.compute.amazonaws.com:3060";

const App = () => {

  return (
    <Router>
      <div>
        <PrivateRoute exact path="/" component={Landing} />
      </div>
    </Router>
  );
}

export default App;