import React, { Component } from 'react';
// import * as firebaseui from 'firebaseui';
import {
    Avatar,
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
import { StateContext } from '../../session/store';
import { openScreenMessage } from '../../session/actions/snackbarAction'

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

    static contextType = StateContext;

    state = {
        disable: true,
        openDialog: false,
        confirmationCode: null,
        user: {
            phone: "",
            code: ""
        }
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
                    window.location.reload();
                }
            }
        );

        window.recaptchaVerifier.render().then(function (widgetID) {
            window.recaptchaVerifierId = widgetID;
        });
    }

    verifyNumber = (e) => {
        e.preventDefault();
        const [{ user }, dispatch] = this.context;
        const { firebase } = this.props;
        const appVerification = window.recaptchaVerifier;

        firebase.auth
            .signInWithPhoneNumber(this.state.user.phone, appVerification)
            .then(codeSent => {
                this.setState({
                    openDialog: true,
                    confirmationCode: codeSent
                })
            }).catch((err) => {
                openScreenMessage(dispatch, {
                    open: true,
                    message: err.message,
                });
            });
    }

    onChange = e => {
        let user = Object.assign({}, this.state.user);
        user[e.target.name] = e.target.value;
        this.setState({ user });
    }

    loginWithPhone = () => {
        const { firebase } = this.props;

        let credent = firebase.authorization.PhoneAuthProvider.credential(
            this.state.confirmationCode.verificationId,
            this.state.user.code
        );

        const [{ user }, dispatch] = this.context;

        firebase.auth
            .signInAndRetrieveDataWithCredential(credent)
            .then((authUser) => {
                firebase.db
                    .collection("Users")
                    .doc(authUser.user.uid)
                    .set({
                        id: authUser.user.uid,
                        phone: authUser.user.phoneNumber
                    }, { merge: true })
                    .then(success => {
                        firebase.db
                            .collection("Users")
                            .doc(authUser.user.uid)
                            .get()
                            .then((doc) => {
                                dispatch({
                                    type: "LOGIN",
                                    session: doc.data(),
                                    authenticated: true,
                                });

                                this.props.history.push("/");
                            });
                    }).catch((err) => {
                        openScreenMessage(dispatch, {
                            open: true,
                            message: err.message,
                        });
                    });
            })
    }

    render() {
        return (
            <Container maxWidth="xs">
                <Dialog open={this.state.openDialog}
                    onClose={() => { this.setState({ openDialog: false }) }}
                >
                    <DialogTitle>Ingrese su código</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Ingrese el código que recibio por mensaje de texto.
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            name="code"
                            fullWidth
                            value={this.state.user.code}
                            onChange={this.onChange}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => { this.setState({ openDialog: false }) }} >Cancelar</Button>
                        <Button onClick={this.loginWithPhone} color="primary">Verificar</Button>
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
                            required
                            value={this.state.user.phone}
                            onChange={this.onChange}
                        />
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