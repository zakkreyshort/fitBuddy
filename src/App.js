import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './config/theme.config';
import SignIn from './components/SignIn';
import Register from './components/Register';
import Dashboard from './components/pages/dashboard';




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
      <Route path="/dashboard">
      <Dashboard />
      </Route>
      </ThemeProvider>
    </Router>


  );
}

export default App;
