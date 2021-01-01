import { Avatar, Link, List, ListItem, ListItemText } from '@material-ui/core';
import React from 'react';


export const RightMenu = ({ classes, user, textUser, photoUser, signOff }) => (
    <div className={classes.list}>
        <List>
            <ListItem button component={Link} to="/auth/RegisterUser">
                <Avatar src={photoUser} />
                <ListItemText classes={{ primary: classes.listItemText }} primary={textUser} />
            </ListItem>
            <ListItem button onClick={signOff}>
                <ListItemText classes={{ primary: classes.listItemText }} primary="Cerrar sesión" />
            </ListItem>
        </List>
    </div>
);
