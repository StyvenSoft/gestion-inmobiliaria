import { Breadcrumbs, Container, Grid, Link, Paper, Typography } from '@material-ui/core';
import React, { Component } from 'react';
import { consumerFirebase } from '../../server';
import HomeIcon from '@material-ui/icons/Home';

const style = {
    container: {
        paddingTop: "8px"
    },
    paper: {
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItem: "center",
        padding: "20px",
        background: "#f5f5f5"
    },
    link: {
        display: "flex"
    },
    homeIcon: {
        width: 20,
        height: 20,
        marginRight: "4px"
    }
}

class EditImmovables extends Component {
    render() {
        return (
            <Container style={style.container}>
                <Paper style={style.paper}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={8}>
                            <Breadcrumbs arial-label="breadcrumbs">
                                <Link color="inherit" style={style.link} href="/">
                                    <HomeIcon style={style.homeIcon} />
                                    Home
                                </Link>
                                    <Typography color="textPrimary">Editar inmueble</Typography>
                            </Breadcrumbs>
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
        )
    }
}

export default consumerFirebase(EditImmovables);