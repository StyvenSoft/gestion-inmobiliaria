import React from 'react';
import { List, ListItem, ListItemText, Divider } from "@material-ui/core";
import { Link } from 'react-router-dom'


export const LeftMenu = ({classes}) => (
    <div className={classes.list}>
        <List>
            <ListItem component={Link} button to="/auth/profile">
                <i className="material-icons" >account_box</i>
                <ListItemText classes={{primary: classes.listItemText}} primary="Perfil" />
            </ListItem>
        </List>
        <Divider />
        <List>
            <ListItem component={Link} button to="/inmueble/nuevo" >
                <i className="material-icons">add_box</i>
                <ListItemText classes={{primary : classes.listItemText}} primary="Nuevo Inmueble" />
            </ListItem>
            <ListItem component={Link} button to="" >
                <i className="material-icons">business</i>
                <ListItemText classes={{primary : classes.listItemText}} primary="Inmuebles" />
            </ListItem>
            <ListItem component={Link} button to="" >
                <i className="material-icons">mail_outline</i>
                <ListItemText classes={{primary : classes.listItemText}} primary="Mensajes" />
            </ListItem>
            
        </List>
    </div>
)