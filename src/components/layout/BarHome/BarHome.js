import { AppBar, Button, IconButton, Toolbar, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import React from 'react';
import { Link } from 'react-router-dom';
import HomeLogo from '../../../logo.png';
import { useStyles } from './useStyles';

export default function BarHome() {
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
