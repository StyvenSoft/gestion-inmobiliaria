import React, { Component } from 'react';
import { Container, Avatar, Typography, TextField, Button } from '@material-ui/core';
import LockOutLineIcon from '@material-ui/icons/LockOutlined';

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

export default class Login extends Component {
    render() {
        return (
            <Container maxWidth="xs">
                <div style={style.paper}>
                    <Avatar style={style.avatar}>
                        <LockOutLineIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">Ingreso Usuario</Typography>
                    <form style={style.form}>
                        <TextField variant="outlined" label="Email" name="email" fullWidth margin="normal" />
                        <TextField variant="outlined" label="Contraseña" name="password" type="password" fullWidth margin="normal" />
                        <Button variant="contained" type="submit" color="primary" fullWidth >Entrar</Button>                     
                    </form>
                </div>
            </Container>
        )
    }
}
