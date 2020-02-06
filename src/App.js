import React, { Component } from 'react';
import './App.css';
import ListImmovables from './components/views/ListImmovables';
import AppNavbar from './components/layout/AppNavbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import theme from './theme/theme';
import Grid from '@material-ui/core/Grid';

class App extends Component {
  render () {
    return (
      <Router>
        <MuiThemeProvider theme = {theme}>
          <AppNavbar />
          <Grid container>
            <Switch>
              <Route path="/" exact component = { ListImmovables }></Route>
            </Switch>
          </Grid>
        </MuiThemeProvider>
      </Router>
    )
  }
}

export default App;
