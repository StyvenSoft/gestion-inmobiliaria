import React, { Component } from 'react';
import './App.css';
import ListImmovables from './components/views/ListImmovables';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import theme from './theme/theme';

class App extends Component {
  render () {
    return (
      <MuiThemeProvider theme = {theme}>
        <ListImmovables />
      </MuiThemeProvider>
    )
  }
}

export default App;
