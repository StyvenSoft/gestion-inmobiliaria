import React, { Component } from 'react'
import { Toolbar, Typography, Button, IconButton, Drawer } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import { consumerFirebase } from '../../../server';
import { compose } from 'recompose';
import { StateContext } from '../../../session/store';
import { signOff } from '../../../session/actions/sessionAction';
import { RightMenu } from './rightMenu';
import photoUser from '../../../user.png';
import { withRouter } from 'react-router-dom'

const styles = theme =>({
    sectionDesktop : {
        display : "none",
        [theme.breakpoints.up("md")] : {
            display : "flex"
        }
    },
    sectionMobile : {
        display : "flex",
        [theme.breakpoints.up("md")] : {
            display : "none"
        }
    },
    grow : {
        flexGrow : 1
    },
    avatarSize : {
        width : 80,
        height : 80
    },
    listItemText : {
        fontSize : "14px",
        fontWeight : 600,
        paddingLeft : "15px",
        color : "#212121"
    }
});

class BarSession extends Component {

    static contextType = StateContext;

    state = {
        firebase : null,
        right : false
    }

    signOffApp = () =>{
        const {firebase} = this.state;
        const [{session, dispatch}] = this.context;

        signOff(dispatch, firebase).then(success =>{
            this.props.history.push("/auth/login")
        })
    }

    toggleDrawer = (side, open) => () => {
        this.setState(
            {
                [side] : open
            }
        )
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        let newObjects = {};
        if (nextProps.firebase !== prevState.firebase) {
            newObjects.firebase = nextProps.firebase
        } 
        return newObjects;
    }

    render() {

        const { classes } = this.props;
        const [{session}, dispatch] = this.context;
        const {user} = session;
        let textUser = user.name + " " + user.lastname;
        
        return (
            <div>
                <Drawer open={this.state.right} 
                        onClose={this.toggleDrawer("right", false)} 
                        anchor="right" >
                    <div role="button"
                         onClick={this.toggleDrawer("right", false)}
                         onKeyDown={this.toggleDrawer("right", false)} >
                             <RightMenu classes={classes} user={user} textUser={textUser}
                                        photoUser={photoUser} signOff={this.signOffApp} />
                    </div>
                </Drawer>
                <Toolbar>
                <IconButton color="inherit">
                            <i className="material-icons">menu</i>
                        </IconButton>
                    <Typography variant="h6">Inmobiliaria Seveen</Typography>
                    <div className={classes.grow}></div>
                    <div className={classes.sectionDesktop}>
                        <Button color="inherit">Login</Button>
                    </div>
                    <div className={classes.sectionMobile}>
                        <IconButton color="inherit" onClick= {this.toggleDrawer("right", true)} >
                            <i className="material-icons">more_vert</i>
                        </IconButton>
                    </div>
                </Toolbar>
            </div>
        )
    }
}

export default compose(withRouter, consumerFirebase, withStyles(styles))(BarSession);