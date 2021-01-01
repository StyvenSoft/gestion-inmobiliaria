import { Snackbar } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import AppNavbar from './components/layout/AppNavbar/AppNavbar';
import AuthenticatedRoute from './components/security/authenticatedRoute';
import Login from './components/security/Login/Login';
import LoginPhone from './components/security/LoginPhone/LoginPhone';
import RegisterUser from './components/security/RegisterUser/RegisterUser';
import UserProfile from './components/security/UserProfile/UserProfile';
import EditImmovables from './components/views/EditImmovables';
import HomePage from './components/views/HomePage';
import ListImmovables from './components/views/ListImmovables';
import ListUsers from './components/views/ListUsers';
import NewImmovables from './components/views/NewImmovables';
import store from './redux/store';
import { FirebaseContext } from './server';
import { useStateValue } from './session/store';
import theme from './theme/theme';



function App(props) {

  let firebase = React.useContext(FirebaseContext);
  const [authenticationStarted, setupFirebaseInitial] = React.useState(false);

  const [{ openSnackbar }, dispatch] = useStateValue();

  useEffect(() => {
    firebase.isStarted().then(val => {
      setupFirebaseInitial(val);
    })
  })

  return authenticationStarted !== false ? (
    <Provider store={store}>
      <React.Fragment>
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          open={openSnackbar ? openSnackbar.open : false}
          autoHideDuration={3000}
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          message={
            <span id="message-id">
              {openSnackbar ? openSnackbar.messages : ""}
            </span>
          }
          onClose={() =>
            dispatch({
              type: "OPEN_SNACKBAR",
              openMessage: {
                open: false,
                messages: ""
              }
            })
          }
        ></Snackbar>
        <Router>
          <MuiThemeProvider theme={theme}>
            <AppNavbar />
            <Grid container>
              <Switch>
                <AuthenticatedRoute exact path="/" authenticatedFirebase={firebase.auth.currentUser} component={ListImmovables} />
                <AuthenticatedRoute exact path="/auth/profile" authenticatedFirebase={firebase.auth.currentUser} component={UserProfile} />
                <AuthenticatedRoute exact path="/inmueble/nuevo" authenticatedFirebase={firebase.auth.currentUser} component={NewImmovables} />
                <AuthenticatedRoute exact path="/inmueble/:id" authenticatedFirebase={firebase.auth.currentUser} component={EditImmovables} />
                <AuthenticatedRoute exact path="/list/users" authenticatedFirebase={firebase.auth.currentUser} component={ListUsers} />
                <Route path="/" exact component={HomePage}></Route>
                <Route path="/auth/register-user" exact component={RegisterUser}></Route>
                <Route path="/auth/login" exact component={Login}></Route>
                <Route path="/auth/login-phone" exact component={LoginPhone}></Route>
              </Switch>
            </Grid>
          </MuiThemeProvider>
        </Router>
      </React.Fragment>
    </Provider>
  ) : null;
}

export default App;
