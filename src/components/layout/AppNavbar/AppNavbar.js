import AppBar from "@material-ui/core/AppBar";
import { withStyles } from "@material-ui/styles";
import React, { Component } from 'react';
import { compose } from 'recompose';
import { consumerFirebase } from '../../../server';
import { StateContext } from '../../../session/store';
import BarSession from '../BarSession/BarSession';
import { styles } from "./styles";

class AppNavbar extends Component {

    static contextType = StateContext;

    state = {
        firebase: null
    }

    componentDidMount() {
        const { firebase } = this.state;
        const [{ session }, dispatch] = this.context;

        // console.log(firebase.auth.currentUser);

        if (firebase.auth.currentUser !== null && !session) {
            firebase.db
                .collection("Users")
                .doc(firebase.auth.currentUser.uid)
                .get()
                .then(doc => {
                    const userDB = doc.data();
                    dispatch({
                        type: "LOGIN",
                        session: userDB,
                        authenticated: true
                    })
                })
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        let newObjects = {};
        if (nextProps.firebase !== prevState.firebase) {
            newObjects.firebase = nextProps.firebase
        }
        return newObjects;
    }

    render() {

        const [{ session }] = this.context;

        return session ? (session.authenticated ? (
            <div>
                <AppBar position="static">
                    <BarSession />
                </AppBar>
            </div>
            ) : null
        ) : null;
    }
}

export default compose(withStyles(styles), consumerFirebase)(AppNavbar);