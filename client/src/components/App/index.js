import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import Landing from '../Landing';
import PrivateRoute from '../Navigation/PrivateRoute.js';


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