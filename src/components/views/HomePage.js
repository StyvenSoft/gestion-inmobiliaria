import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {AppBar, Toolbar, Button, IconButton, Typography} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import HomeLogo from '../../logo.png';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  logo: {
    width: 35,
    height: 35,
    marginRight: theme.spacing(1),
  }
}));

export default function HomePage() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <img src={HomeLogo} alt="Logo" className={classes.logo} />
          <Typography variant="h6" className={classes.title}>Inmobiliaria Seveen</Typography>
          <Button component={Link} color="inherit" to="/auth/login">Login</Button>
          <Button component={Link} color="inherit" to="/auth/register-user">Register</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
