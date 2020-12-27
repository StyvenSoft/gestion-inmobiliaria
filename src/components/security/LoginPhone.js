import React, { Component } from 'react';
// import * as firebaseui from 'firebaseui';
import { Avatar, Button, Container, Grid, TextField, Typography } from '@material-ui/core';
import { LockOpenOutlined } from '@material-ui/icons';
import { consumerFirebase } from '../../server';

const style = {
    paper: {
        marginTop: 9,
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    avatar: {
        margin: 5,
        backgroundColor: "#fd5e53"
    },
    form: {
        width: "100%",
        marginTop: 8
    },
    submit: {
        marginTop: 10,
        marginBottom: 20,
    },
    captcha: {
        flexGrow: 1,
        marginBottom: 10
    }
}

class LoginPhone extends Component {

    componentDidMount() {
        const { firebase } = this.props;

        firebase.auth.lenguageCode = "es";
        window.recaptchaVerifier = new firebase.authorization.RecaptchaVerifier(
            this.recaptcha,
            {
                size: "normal",
                callback: response => {
                    this.setState({
                        disable: false
                    })
                },
                "expired-callback": function () {
                    this.setState({
                        disable: true
                    })
                }
            }
        );

        window.recaptchaVerifier.render().then(function (widgetID) {
            window.recaptchaVerifierId = widgetID;
        });
    }

    render() {
        return (
            <Container maxWidth="xs">
                <div style={style.paper}>
                    <Avatar style={style.avatar}>
                        <LockOpenOutlined />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Ingrese su número telefonico
                    </Typography>
                    <form style={style.form}>
                        <Grid container style={style.captcha} justify="center">
                            <div ref={ref => (this.recaptcha = ref)}></div>
                        </Grid>
                        <TextField
                            variant="outlined"
                            fullWidth
                            name="phone"
                            label="Ingrese número telefonico"
                            required />
                        <Button type="submit" fullWidth variant="contained" color="primary" style={style.submit}>
                            Entrar
                        </Button>
                    </form>
                </div>
            </Container>
        )
    }
}

export default consumerFirebase(LoginPhone);