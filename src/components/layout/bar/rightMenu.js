import React from 'react';
import { List, Link, ListItem, Avatar, ListItemText } from '@material-ui/core';


export const RightMenu = ({ classes, user, textUser, photoUser, signOff }) => (
    <div className={classes.list}>
        <List>
            <ListItem button component={Link} to="/auth/RegisterUser">
                <Avatar
                    // classes = {{primary : classes.avatarSize}}
                    src={photoUser}
                />
                <ListItemText classes={{ primary: classes.listItemText }} primary={textUser} />
            </ListItem>
            <ListItem button onClick={signOff}>
                <ListItemText classes={{ primary: classes.listItemText }} primary="Cerrar sesión" />
            </ListItem>
        </List>
    </div>
);
