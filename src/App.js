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
import { useStateValue } from './session/store'
import openSnackbarReducer from './session/reducers/openSnackBarReducer';
import { Snackbar } from '@material-ui/core';

function App(props) {

  let firebase = React.useContext(FirebaseContext);
  const [authenticationStarted, setupFirebaseInitial] = React.useState(false);

  const [{openSnackbar}, dispatch] = useStateValue();

  useEffect(() => {
    firebase.isStarted().then(val => {
      setupFirebaseInitial(val);
    })
  })

  return authenticationStarted !== false ? (
    <React.Fragment>
      <Snackbar 
        anchorOrigin = {{vertical : "bottom", horizontal : "center"}}
        open = {openSnackbar ? openSnackbarReducer.open : false}
        autoHidenDuration = {3000}
        ContentProps = {{
          "aria-describedby" : "message-id"
        }}
        message = {
          <span id="message-id">  
            {openSnackbar ? openSnackbar.message : ""}
          </span>
        }
        onClose = {() =>
          dispatch({
            type : "OPEN_SNACKBAR",
            openMessage : {
              open : false,
              message : ""
            }
          })
        }
      ></Snackbar>
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
    </React.Fragment>
  ) :null;
}

export default App;
