import React, { Component } from 'react';
import { Container, Avatar, Typography, TextField, Button, Grid } from '@material-ui/core';
import LockOutLineIcon from '@material-ui/icons/LockOutlined';
import { compose } from 'recompose';
import { consumerFirebase } from '../../server';
import { logIn } from '../../session/actions/sessionAction';
import { StateContext } from '../../session/store';
import { openScreenMessage } from '../../session/actions/snackbarAction'
import HomePage from '../views/HomePage';
import { Link } from 'react-router-dom';

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
    link: {
        color: "#0e9296",
        textDecoration: "none",
        fontSize: "0.875rem",
        fontFamily: "Roboto"
    }
}

class Login extends Component {

    static contextType = StateContext;

    state = {
        firebase: null,
        user: {
            email: '',
            password: ''
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.firebase === prevState.firebase) {
            return null;
        }
        return {
            firebase: nextProps.firebase
        }
    }

    onChange = e => {
        let user = Object.assign({}, this.state.user);
        user[e.target.name] = e.target.value;
        this.setState({
            user: user
        })
    }

    login = async e => {
        e.preventDefault();
        const [{ session }, dispatch] = this.context;
        const { firebase, user } = this.state;
        const { email, password } = user;
        let callback = await logIn(dispatch, firebase, email, password);
        if (callback.status) {
            this.props.history.push("/");
        } else {
            openScreenMessage(dispatch, {
                open: true,
                messages: callback.messages.message
            })
        }
    }

    resetPassword = () => {
        const { firebase, user } = this.state;
        const [{ session }, dispatch] = this.context;

        firebase.auth.sendPasswordResetEmail(user.email)
            .then(success => {
                openScreenMessage(dispatch, {
                    open: true,
                    messages: "Se ha enviado un correo electronico a su cuenta"
                })
            })
            .catch(error => {
                openScreenMessage(dispatch, {
                    open: true,
                    messages: error.message
                })
            })
    }

    render() {
        return (
            <Grid container direction="column">
                <HomePage />
                <Container maxWidth="xs">
                    <div style={style.paper}>
                        <Avatar style={style.avatar}>
                            <LockOutLineIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">Ingreso Usuario</Typography>
                        <form style={style.form}>
                            <TextField onChange={this.onChange}
                                value={this.state.user.email}
                                variant="outlined" label="Email"
                                name="email"
                                fullWidth
                                margin="normal"
                                required
                            />
                            <TextField onChange={this.onChange}
                                value={this.state.user.password}
                                variant="outlined"
                                label="Contraseña"
                                name="password"
                                type="password"
                                fullWidth
                                margin="normal"
                                autocomple="Off"
                                required
                            />
                            <Button onClick={this.login}
                                variant="contained"
                                type="submit"
                                color="primary"
                                fullWidth
                                style={style.submit}>
                                Entrar</Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link to="#" style={style.link} onClick={this.resetPassword}>
                                        {"Olvido su contraseña?"}
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link to="/auth/register-user" style={style.link}>
                                        {"No tienes cuenta? Registrate"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </form>
                        <Button fullWidth variant="contained" style={style.submit} component={Link} to="/auth/login-phone">
                            Ingrese con su teléfono
                        </Button>
                    </div>
                </Container>
            </Grid>
        )
    }
}

export default compose(consumerFirebase)(Login);