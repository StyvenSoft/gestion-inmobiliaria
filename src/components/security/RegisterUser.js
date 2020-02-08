import React, { Component } from 'react';
import { Container, Avatar, Typography } from '@material-ui/core';
import LockOutLineIcon from '@material-ui/core/icons/LockOutLineIcon';

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
    }
}

export default class RegisterUser extends Component {
    render() {
        return (
            <Container maxWidth="md">
                <div style={style.paper}>
                    <Avatar style={style.avatar}>
                        <LockOutLineIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">Registre su cuenta</Typography>
                </div>
            </Container>
        )
    }
}
