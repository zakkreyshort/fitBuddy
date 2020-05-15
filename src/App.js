import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignIn from './components/SignIn';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './config/theme.config';
import Register from './components/Register';

function App() {
  return (


    <Router>
      <ThemeProvider theme={theme}>

      <Switch>

        <Route exact path ="/">
          <SignIn />
        </Route>

        <Route path="/register">
          <Register />
        </Route>

      </Switch>

      </ThemeProvider>
    </Router>


  );
}

export default App;
