import React, { Component } from 'react'
import { Container, Paper, Grid, Breadcrumbs, Link } from '@material-ui/core'
import HomeIcon from '@material-ui/icons/Home'

const style = {
    container : {
        paddingTop : '8px'
    },
    paper : {
        margingTop : 8,
        display : 'flex',
        flexDireccion : 'column',
        alingItems : 'center',
        padding : '20px',
        backgroundColor : '#f5f5f5'
    },
    link : {
        display : 'flex'
    },
    homeIcon : {
        width : 20,
        height : 20,
        marginRight : '4px'
    }
}

export default class NewImmovables extends Component {
    render() {
        return (
            <Container style={style.container}>
                <Paper style={style.paper}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={8}>
                            <Breadcrumbs arial-label='breadcrumb'>
                                <Link color="inherit" style={style.link} href="/">
                                    <HomeIcon style={style.homeIcon}/>
                                    Home
                                </Link>
                            </Breadcrumbs>
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
        )
    }
}
