import React, { Component } from 'react'
import { Container, Paper, Grid, Breadcrumbs, Link, Typography, TextField, Button } from '@material-ui/core'
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
    },
    submit : {
        marginTop : 15,
        marginBottom : 10
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
                                <Typography color="textPrimary">Nuevo Inmueble</Typography>
                            </Breadcrumbs>
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <TextField 
                                name="address"
                                label="Dirección del inmueble"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField 
                                name="city"
                                label="Ciudad"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField 
                                name="country"
                                label="Pais"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <TextField 
                                name="description"
                                label="Descripción del inmueble"
                                fullWidth
                                multiline
                            />
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <TextField 
                                name="inside"
                                label="Interior del inmueble"
                                fullWidth
                                multiline
                            />
                        </Grid>
                   
                        <Grid container justify="center">
                            <Grid item xs={12} md={6}>
                                <Button
                                    type="button"
                                    fullWidth
                                    variant="contained"
                                    size="large"
                                    color="primary"
                                    style={style.submit}
                                >Guardar</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
        )
    }
}
