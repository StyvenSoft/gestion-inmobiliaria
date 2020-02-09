import React, { Component } from 'react';
import { Container, Avatar, Typography } from '@material-ui/core';
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
                </div>
            </Container>
        )
    }
}
