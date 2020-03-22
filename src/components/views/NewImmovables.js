import React, { Component } from 'react'
import { Container, Paper, Grid, Breadcrumbs, Link, Typography, TextField, Button } from '@material-ui/core'
import HomeIcon from '@material-ui/icons/Home'
import { consumerFirebase } from '../../server'
import { openScreenMessage } from '../../session/actions/snackbarAction'

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

class NewImmovables extends Component {

    state = {
        inmueble : {
            address : '',
            city : '',
            country : '',
            description : '',
            inside : ''
        }
    }

    enterDataInState = e => {
        let inmueble_ = Object.assign({}, this.state.inmueble);
        inmueble_[e.target.name] = e.target.value;
        this.setState({
            inmueble : inmueble_
        })
    }

    saveInmueble = e => {
        const {inmueble} = this.state;
        
        this.props.firebase.db
            .collection("Inmuebles")
            .add(inmueble)
            .then(success => {
                this.props.history.push("/");
            })
            .catch(error => {
                openScreenMessage({
                    open : true,
                    message : error
                })
            })
    }

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
                                onChange={this.enterDataInState}
                                value={this.state.inmueble.address}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField 
                                name="city"
                                label="Ciudad"
                                fullWidth
                                onChange={this.enterDataInState}
                                value={this.state.inmueble.city}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField 
                                name="country"
                                label="Pais"
                                fullWidth
                                onChange={this.enterDataInState}
                                value={this.state.inmueble.country}
                            />
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <TextField 
                                name="description"
                                label="Descripción del inmueble"
                                fullWidth
                                multiline
                                onChange={this.enterDataInState}
                                value={this.state.inmueble.description}
                            />
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <TextField 
                                name="inside"
                                label="Interior del inmueble"
                                fullWidth
                                multiline
                                onChange={this.enterDataInState}
                                value={this.state.inmueble.inside}
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
                                    onClick={this.saveInmueble}
                                >Guardar</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
        )
    }
}

export default consumerFirebase(NewImmovables);