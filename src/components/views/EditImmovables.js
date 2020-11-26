import { Breadcrumbs, Button, Container, Grid, Link, Paper, Table, TableBody, TableCell, TableRow, TextField, Typography } from '@material-ui/core';
import React, { Component } from 'react';
import { consumerFirebase } from '../../server';
import ImageUploader from 'react-images-upload'
import HomeIcon from '@material-ui/icons/Home';
import { v4 as uuidv4 } from 'uuid';
import { createKeyword } from '../../session/actions/Keyword';

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
    },
    photoInmueble: {
        height: "100px"
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

    uploadphoto = images => {

        const { inmueble } = this.state;
        const { id } = this.props.match.params;

        Object.keys(images).forEach(key => {
            let dynamicCode = uuidv4();
            let nameImagen = images[key].name;
            let extension = nameImagen.split(".").pop();
            images[key].alias = (nameImagen.split(".")[0] + "_" + dynamicCode + "." + extension).replace(/\s/g, "_").toLowerCase();
        })

        this.props.firebase.saveDocuments(images).then(urlImages => {
            inmueble.photos = inmueble.photos.concat(urlImages);
            this.props.firebase.db
                .collection("Inmuebles")
                .doc(id)
                .set(inmueble, { merge: true })
                .then(success => {
                    this.setState({
                        inmueble
                    })
                })
        })
    }

    deletePhoto = photoUrl => async () => {

        const { inmueble } = this.state;
        const { id } = this.props.match.params;

        let photoID = photoUrl.match(/[\w-]+.(jpg|png|jpeg|gif|svg)/);
        photoID = photoID[0];
        await this.props.firebase.deleteDocument(photoID);

        let photoList = this.state.inmueble.photos.filter(photo => {
            return photo !== photoUrl;
        })
        inmueble.photos = photoList;

        this.props.firebase.db
            .collection("Inmuebles")
            .doc(id)
            .set(inmueble, { merge: true })
            .then(success => {
                this.setState({
                    inmueble
                })
            })
    }

    async componentDidMount() {
        const { id } = this.props.match.params;

        const inmuebleCollection = this.props.firebase.db.collection("Inmuebles");
        const inmuebleDB = await inmuebleCollection.doc(id).get();

        this.setState({
            inmueble: inmuebleDB.data()
        })
    }

    saveInmueble = () => {
        const { inmueble } = this.state;
        const { id } = this.props.match.params;

        const searchText = inmueble.address + " " + inmueble.city + " " + inmueble.country;
        const keyWords = createKeyword(searchText);
        inmueble.keyWords = keyWords;

        this.props.firebase.db
            .collection("Inmuebles")
            .doc(id)
            .set(inmueble, { merge: true })
            .then(success => {
                this.props.history.push("/");
            })
    }

    render() {
        let imageKey = uuidv4();
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
                                key={imageKey}
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
                                        this.state.inmueble.photos ? this.state.inmueble.photos.map((photo, i) => (
                                            <TableRow key={i}>
                                                <TableCell align="left">
                                                    <img src={photo} style={style.photoInmueble} alt="Imagen" />
                                                </TableCell>
                                                <TableCell>
                                                    <Button
                                                        variant="contained"
                                                        color="secondary"
                                                        size="small"
                                                        onClick={this.deletePhoto(photo)}
                                                    >Eliminar</Button>
                                                </TableCell>
                                            </TableRow>
                                        )) : ""
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
                </Paper>
            </Container>
        )
    }
}

export default consumerFirebase(EditImmovables);