import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignIn from './components/SignIn';

function App() {
  return (


    <Router>
      <Switch>

        <Route exact path ="/">
          <SignIn />
        </Route>

        <Route path="/register">
          Register
        </Route>

      </Switch>
    </Router>


  );
}

export default App;
