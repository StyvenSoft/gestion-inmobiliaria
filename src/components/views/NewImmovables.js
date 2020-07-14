import React, { Component } from 'react'
import { Container, Paper, Grid, Breadcrumbs, Link, Typography, TextField, Button, Table, TableBody, TableRow, TableCell } from '@material-ui/core'
import HomeIcon from '@material-ui/icons/Home'
import { consumerFirebase } from '../../server'
import { openScreenMessage } from '../../session/actions/snackbarAction'
import ImageUploader from 'react-images-upload'
import { v4 as uuidv4 } from 'uuid';

const style = {
    container: {
        paddingTop: '8px'
    },
    paper: {
        margingTop: 8,
        display: 'flex',
        flexDireccion: 'column',
        alingItems: 'center',
        padding: '20px',
        backgroundColor: '#f5f5f5'
    },
    link: {
        display: 'flex'
    },
    homeIcon: {
        width: 20,
        height: 20,
        marginRight: '4px'
    },
    submit: {
        marginTop: 15,
        marginBottom: 10
    },
    photo: {
        height: "100px"
    }
}

class NewImmovables extends Component {

    state = {
        inmueble: {
            address: '',
            city: '',
            country: '',
            description: '',
            inside: '',
            photos: []
        },
        files: []
    }

    enterDataInState = e => {
        let inmueble_ = Object.assign({}, this.state.inmueble);
        inmueble_[e.target.name] = e.target.value;
        this.setState({
            inmueble: inmueble_
        })
    }

    uploadphoto = documents => {
        Object.keys(documents).forEach(function (key) {
            documents[key].urlTemp = URL.createObjectURL(documents[key]);
        })

        this.setState({
            files: this.state.files.concat(documents)
        })
    }

    saveInmueble = () => {
        const { files, inmueble } = this.state;

        // Crea a cada imagen una alias, que es la referencia de invocación 
        // El alias sera almacenado en la base de datos Firebase

        Object.keys(files).forEach(function (key) {
            let valueDinamic = Math.floor(new Date().getTime() / 1000);
            let name = files[key].name;
            let extension = name.split(".").pop();
            files[key].alias = (name.split(".") + "_" + valueDinamic + "." + extension).replace(/\s/g, "_").toLowerCase();
        })
        // const {inmueble} = this.state;

        const searchtext = inmueble.address + ' ' + inmueble.city + ' ' + inmueble.country;
        let keywords = createdKeywords(searchtext);

        this.props.firebase.saveFiles(files).then(arrayUrls => {
            inmueble.photos = arrayUrls;
            inmueble.keywords = keywords;
        })
            .collection("Inmuebles")
            .add(inmueble)
            .then(success => {
                this.props.history.push("/");
            })
            .catch(error => {
                openScreenMessage({
                    open: true,
                    message: error
                });
            });
    };

    deletePhoto = namePhoto => () => {
        this.setState({
            files: this.state.files.filter(file => {
                return file.name !== namePhoto
            })
        })
    }

    render() {
        let imageKey = uuidv4();
        return (
            <Container style={style.container}>
                <Paper style={style.paper}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={8}>
                            <Breadcrumbs arial-label='breadcrumb'>
                                <Link color="inherit" style={style.link} href="/">
                                    <HomeIcon style={style.homeIcon} />
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
                            <Grid container xs="12" sm="6">
                                <ImageUploader
                                    key={imageKey}
                                    withIcon={true}
                                    buttonText="Seleccione imagenes"
                                    onChange={this.uploadphoto}
                                    imgExtension={[".jpg", ".gif", ".png", ".jpeg"]}
                                    maxFileSize={5242880}
                                />
                            </Grid>
                            <Grid>
                                <Table>
                                    <TableBody>
                                        {
                                            this.state.files.map((file, i) => (
                                                <TableRow key={i}>
                                                    <TableCell align="left">
                                                        <img src={file.urlTemp} style={style.photo} alt="Imagen" />
                                                    </TableCell>
                                                    <TableRow>
                                                        <Button
                                                            variant="contained"
                                                            color="secondary"
                                                            size="small"
                                                            onClick={this.deletePhoto(file.name)}
                                                        >Eliminar</Button>
                                                    </TableRow>
                                                </TableRow>
                                            ))
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