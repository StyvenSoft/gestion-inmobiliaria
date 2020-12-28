import React, { Component } from 'react';
import { Container, Avatar, Typography, Grid, TextField, Button } from '@material-ui/core';
import LockOutLineIcon from '@material-ui/icons/LockOutlined';
import  { compose } from 'recompose';
import { consumerFirebase } from '../../server';
import { createUser } from '../../session/actions/sessionAction';
import { StateContext } from '../../session/store';
import { openScreenMessage } from '../../session/actions/snackbarAction'
import HomePage from '../views/HomePage';

const style = {
    paper : {
        marginTop : 8,
        display : "flex",
        flexDirection : "column",
        alignItems : "center"
    },
    avatar : {
        margin : 8,
        backgroundColor : "#e53935"
    },
    form : {
        width : "100%",
        marginTop : 10
    },
    submit : {
        marginTop : 35,
        marginBotton : 20
    }
}

// const userInitial = {
//     name : '',
//     lastname : '',
//     email : '',
//     password : ''
// }

class RegisterUser extends Component {

    static contextType = StateContext;

    state = {
        firebase : null,
        user : {
            name : '',
            lastname : '',
            email : '',
            password : ''
        }
    }

    static getDerivedStateFromProps(nextProps, prevState){
        if(nextProps.firebase === prevState.firebase) {
            return null;
        }
        return {
            firebase : nextProps.firebase
        }
    }

    onChange = e => {
        let user = Object.assign({}, this.state.user);
        user[e.target.name] = e.target.value;
        
        this.setState({
            user : user
        })
    }

    RegisterUser = async e => {
        e.preventDefault();
        //console.log('imprimir', this.state.user);
        const [{session}, dispatch] = this.context;
        const {firebase, user} = this.state;
        let callback = await createUser(dispatch, firebase, user);
        if (callback.status) {
            this.props.history.push("/");
        } else {
            openScreenMessage(dispatch, {
                open : true,
                messages : callback.messages.message
            })
        }
    }

    render() {
        return (
            <Grid container direction="column">
                <HomePage />
                <Container maxWidth="md">
                    <div style={style.paper}>
                        <Avatar style={style.avatar}>
                            <LockOutLineIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">Registre su cuenta</Typography>
                        <form style={style.form}>
                            <Grid container spacing={2}>
                                <Grid item md={6} xs={12}>
                                    <TextField name="name" 
                                            onChange={this.onChange} 
                                            value={this.state.user.name} 
                                            fullWidth 
                                            label="Ingrese su nombre"
                                            required 
                                    /> 
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <TextField name="lastname" 
                                            onChange={this.onChange} 
                                            value={this.state.user.lastname} 
                                            fullWidth 
                                            label="Ingrese su apellido"
                                            required 
                                    /> 
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <TextField name="email" 
                                            onChange={this.onChange} 
                                            value={this.state.user.email} 
                                            fullWidth 
                                            label="Ingrese su email"
                                            required 
                                    /> 
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <TextField type="password" 
                                            onChange={this.onChange} 
                                            value={this.state.user.password} 
                                            name="password" 
                                            fullWidth 
                                            label="Ingrese su contraseña"
                                            required 
                                    /> 
                                </Grid>
                            </Grid>
                            <Grid container justify="center">
                                <Grid item md={6} xs={12}>
                                    <Button type="submit" 
                                            onClick={this.RegisterUser} 
                                            variant="contained" 
                                            fullWidth 
                                            size="large" 
                                            color="primary" 
                                            style={style.submit}
                                        >
                                        Registrar
                                    </Button> 
                                </Grid>
                            </Grid>
                        </form>
                    </div>
                </Container>
            </Grid>
        )
    }
}

export default compose(consumerFirebase)(RegisterUser);