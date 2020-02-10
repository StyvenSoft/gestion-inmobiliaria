import React, { Component } from 'react';
import { Container, Avatar, Typography, TextField, Button } from '@material-ui/core';
import LockOutLineIcon from '@material-ui/icons/LockOutlined';
import  { compose } from 'recompose';
import { consumerFirebase } from '../../server';

const style = {
    paper : {
        marginTop : 9,
        display : "flex",
        flexDirection : "column",
        alignItems : "center"
    },
    avatar : {
        margin : 5,
        backgroundColor : "#fd5e53"
    },
    form : {
        width : "100%",
        marginTop : 8
    }
}

class Login extends Component {

    state = {
        firebase : null,
        user : {
            email : '',
            password : ''
        }
    }

    onChange = e => {
        let user = Object.assign({}, this.state.user);
        user[e.target.name] = e.target.value;
        this.setState({
            user : user
        })
    }

    render() {
        return (
            <Container maxWidth="xs">
                <div style={style.paper}>
                    <Avatar style={style.avatar}>
                        <LockOutLineIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">Ingreso Usuario</Typography>
                    <form style={style.form}>
                        <TextField onChange={this.onChange} value={this.state.user.email} variant="outlined" label="Email" name="email" fullWidth margin="normal" />
                        <TextField onChange={this.onChange} value={this.state.user.password} variant="outlined" label="Contraseña" name="password" type="password" fullWidth margin="normal" />
                        <Button variant="contained" type="submit" color="primary" fullWidth >Entrar</Button>                     
                    </form>
                </div>
            </Container>
        )
    }
}

export default compose(consumerFirebase)(Login);