import React, { Component } from 'react';
import * as firebaseui from 'firebaseui';
import { Avatar, Button, Container, Grid, TextField, Typography } from '@material-ui/core';
import { LockOpenOutlined } from '@material-ui/icons';

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

export default class LoginPhone extends Component {
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
                            label="Ingrese número telefonico" />
                        <Button type="submit" fullWidth variant="contained" color="primary" style={style.submit}>
                            Entrar
                        </Button>
                    </form>
                </div>
            </Container>
        )
    }
}
