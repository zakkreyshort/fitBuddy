import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";



function App() {
  return (


    <Router>
      <Switch>

        <Route exact path ="/">
          Signin
        </Route>

        <Route path="/register">
          Register
        </Route>

      </Switch>
    </Router>


  );
}

export default App;
