import React, { Component } from 'react';
import './App.css';
import ListImmovables from './components/views/ListImmovables';
import AppNavbar from './components/layout/AppNavbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import theme from './theme/theme';
import Grid from '@material-ui/core/Grid';
import RegisterUser from './components/security/RegisterUser';
import Login from './components/security/Login';

class App extends Component {
  render () {
    return (
      <Router>
        <MuiThemeProvider theme = {theme}>
          <AppNavbar />
          <Grid container>
            <Switch>
              <Route path="/" exact component = { ListImmovables }></Route>
              <Route path="/auth/register-user" exact component = { RegisterUser }></Route>
              <Route path="/auth/login" exact component = { Login }></Route>
            </Switch>
          </Grid>
        </MuiThemeProvider>
      </Router>
    )
  }
}

export default App;
