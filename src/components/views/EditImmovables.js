import { Breadcrumbs, Button, Container, Grid, Link, Paper, Table, TableBody, TableCell, TableRow, TextField, Typography } from '@material-ui/core';
import React, { Component } from 'react';
import { consumerFirebase } from '../../server';
import ImageUploader from 'react-images-upload'
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
    },
    submit: {
        marginTop: 15,
        marginBottom: 10
    }
}

class EditImmovables extends Component {

    state = {
        inmueble: {
            address: '',
            city: '',
            country: '',
            description: '',
            inside: '',
            photos: []
        }
    }

    changeData = e => {
        let inmueble = Object.assign({}, this.state.inmueble);
        inmueble[e.target.name] = e.target.value
        this.setState({ inmueble })
    }

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

                        <Grid item xs={12} md={12}>
                            <TextField
                                name="address"
                                label="Dirección del inmueble"
                                fullWidth
                                onChange={this.changeData}
                                value={this.state.inmueble.address}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                name="city"
                                label="Ciudad"
                                fullWidth
                                onChange={this.changeData}
                                value={this.state.inmueble.city}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                name="country"
                                label="Pais"
                                fullWidth
                                onChange={this.changeData}
                                value={this.state.inmueble.country}
                            />
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <TextField
                                name="description"
                                label="Descripción del inmueble"
                                fullWidth
                                multiline
                                rowsMax="4"
                                onChange={this.changeData}
                                value={this.state.inmueble.description}
                            />
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <TextField
                                name="inside"
                                label="Interior del inmueble"
                                fullWidth
                                multiline
                                onChange={this.changeData}
                                value={this.state.inmueble.inside}
                            />
                        </Grid>
                    </Grid>
                    <Grid container justify="center">
                        <Grid container xs="12" sm="6">
                            <ImageUploader
                                key={1000}
                                withIcon={true}
                                buttonText="Seleccione imagenes"
                                onChange={this.uploadphoto}
                                imgExtension={[".jpg", ".gif", ".png", ".jpeg"]}
                                maxFileSize={5242880}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Table>
                                <TableBody>
                                    {
                                        // this.state.inmueble.photos ?
                                        // photos.map((photo, i) => {
                                        //     <TableRow key={i}>
                                        //             <TableCell align="left">
                                        //                 <img src={photo} style={style.photo} alt="Imagen" />
                                        //             </TableCell>
                                        //         </TableRow>
                                        // }) : ""
                                    }
                                </TableBody>
                            </Table>
                        </Grid>
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
                </Paper>
            </Container>
        )
    }
}

export default consumerFirebase(EditImmovables);