import React, { Component } from 'react';
import { Container, Avatar, Typography, Grid, TextField, Button } from '@material-ui/core';
import LockOutLineIcon from '@material-ui/icons/LockOutlined';
import  { compose } from 'recompose';
import { consumerFirebase } from '../../server';

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

const userInitial = {
    name : '',
    lastname : '',
    email : '',
    password : ''
}

class RegisterUser extends Component {

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

    RegisterUser = e => {
        e.preventDefault();
        //console.log('imprimir', this.state.user);
        const { user, firebase } = this.state;

        firebase.auth
            .createUserWithEmailAndPassword(user.email, user.password)
            .then(auth =>{
                
                const userDB = {
                    userid : auth.user.uid,
                    email : user.email,
                    name : user.name,
                    lastname : user.lastname
                }

                firebase.db 
                    .collection("Users")
                    .add(userDB)
                    .then(userafter => {
                        console.log('Correcto', userafter);
                        // this.setState({
                        //     user : userInitial
                        // })
                        this.props.history.push('/');
                    })
                    .catch(error => {
                        console.log('Error', error);
                    })
            })
            .catch(error =>{
                console.log(error);
            })
    }

    render() {
        return (
            <Container maxWidth="md">
                <div style={style.paper}>
                    <Avatar style={style.avatar}>
                        <LockOutLineIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">Registre su cuenta</Typography>
                    <form style={style.form}>
                        <Grid container spacing={2}>
                            <Grid item md={6} xs={12}>
                                <TextField name="name" onChange={this.onChange} value={this.state.user.name} fullWidth label="Ingrese su nombre" /> 
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <TextField name="lastname" onChange={this.onChange} value={this.state.user.lastname} fullWidth label="Ingrese su apellido" /> 
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <TextField name="email" onChange={this.onChange} value={this.state.user.email} fullWidth label="Ingrese su email" /> 
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <TextField type="password" onChange={this.onChange} value={this.state.user.password} name="password" fullWidth label="Ingrese su contraseña" /> 
                            </Grid>
                        </Grid>
                        <Grid container justify="center">
                            <Grid item md={6} xs={12}>
                                <Button type="submit" onClick={this.RegisterUser} variant="contained" fullWidth size="large" color="primary" style={style.submit}>
                                    Registrar
                                </Button> 
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Container>
        )
    }
}

export default compose(consumerFirebase)(RegisterUser);