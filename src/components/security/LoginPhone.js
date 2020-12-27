import React, { Component } from 'react';
// import * as firebaseui from 'firebaseui';
import { Avatar, 
         Button, 
         Container, 
         Dialog, 
         DialogActions, 
         DialogContent, 
         DialogContentText, 
         DialogTitle, 
         Grid, 
         TextField, 
         Typography 
    } from '@material-ui/core';
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

    state = {
        disable: true,
        openDialog: false
    }

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

    verifyNumber = (e) => {
        e.preventDefault();
        this.setState({
            openDialog: true
        })
    }

    render() {
        return (
            <Container maxWidth="xs">
                <Dialog open={this.state.openDialog} 
                        onClose={() => {this.setState({openDialog: false})}}
                >
                    <DialogTitle>Ingrese su código</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Ingrese el código que recibio por mensaje de texto.
                        </DialogContentText>
                        <TextField autoFocus margin="dense" name="code" fullWidth />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => {this.setState({openDialog: false})}} >Cancelar</Button>
                        <Button>Verificar</Button>
                    </DialogActions>
                </Dialog>

                <div style={style.paper}>
                    <Avatar style={style.avatar}>
                        <LockOpenOutlined />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Ingrese su número telefónico
                    </Typography>
                    <form style={style.form}>
                        <Grid container style={style.captcha} justify="center">
                            <div ref={ref => (this.recaptcha = ref)}></div>
                        </Grid>
                        <TextField
                            variant="outlined"
                            fullWidth
                            name="phone"
                            label="Ingrese número telefónico"
                            required />
                        <Button 
                            type="submit" 
                            fullWidth 
                            variant="contained" 
                            color="primary" 
                            style={style.submit}
                            onClick={this.verifyNumber}
                            disabled={this.state.disable}
                        >
                            Enviar
                        </Button>
                    </form>
                </div>
            </Container>
        )
    }
}

export default consumerFirebase(LoginPhone);