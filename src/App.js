import React, { useEffect } from 'react';
import './App.css';
import ListImmovables from './components/views/ListImmovables';
import AppNavbar from './components/layout/AppNavbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import theme from './theme/theme';
import Grid from '@material-ui/core/Grid';
import RegisterUser from './components/security/RegisterUser';
import Login from './components/security/Login';
import { FirebaseContext } from './server';

function App(props) {

  let firebase = React.useContext(FirebaseContext);
  const [authenticationStarted, setupFirebaseInitial] = React.useState(false);

  useEffect(() => {
    firebase.isStarted().then(val => {
      setupFirebaseInitial(val);
    })
  })

  return authenticationStarted !== false ? (
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
  ) :null;
}

export default App;
