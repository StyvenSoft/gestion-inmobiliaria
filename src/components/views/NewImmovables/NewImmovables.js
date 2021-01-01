import {
    Breadcrumbs,
    Button,
    Container,
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableRow,
    TextField,
} from '@material-ui/core'
import HomeIcon from '@material-ui/icons/Home'
import React, { Component } from 'react'
import ImageUploader from 'react-images-upload'
import { v4 as uuidv4 } from 'uuid'
import { consumerFirebase } from '../../../server'
import { createKeyword } from '../../../session/actions/Keyword'
import { openScreenMessage } from '../../../session/actions/snackbarAction'
import { Link } from 'react-router-dom'
import { style, StyledBreadcrumb } from './style'
import { StateContext } from '../../../session/store';

class NewImmovables extends Component {
    static contextType = StateContext;

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
        const [{ session }, dispatch] = this.context;

        if (inmueble.city === '' || inmueble.country === '' || inmueble.address === '') {
            openScreenMessage(dispatch, {
                open: true,
                messages: "Completa todos los campos requeridos"
            });
        } else {
            this.props.firebase.saveDocuments(files).then(arrayUrls => {

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
                let keywords = createKeyword(searchtext);

                inmueble.photos = arrayUrls;
                inmueble.keywords = keywords;

                this.props.firebase.db
                    .collection("Inmuebles")
                    .add(inmueble)
                    .then(success => {
                        this.props.history.push("/");
                    })
                    .catch(error => {
                        openScreenMessage(dispatch, {
                            open: true,
                            messages: error
                        });
                    });
            });
        }
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
                            <Breadcrumbs aria-label="breadcrumb">
                                <StyledBreadcrumb
                                    component={Link}
                                    to="/"
                                    label="Home"
                                    icon={<HomeIcon fontSize="small" />}
                                />
                                <StyledBreadcrumb href="#" label="Nuevo Inmueble" />
                            </Breadcrumbs>
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <TextField
                                name="address"
                                label="Dirección del inmueble"
                                fullWidth
                                onChange={this.enterDataInState}
                                value={this.state.inmueble.address}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                name="city"
                                label="Ciudad"
                                fullWidth
                                onChange={this.enterDataInState}
                                value={this.state.inmueble.city}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                name="country"
                                label="Pais"
                                fullWidth
                                onChange={this.enterDataInState}
                                value={this.state.inmueble.country}
                                required
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
                                required
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