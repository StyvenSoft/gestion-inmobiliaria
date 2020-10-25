import React, { useState, useEffect } from 'react';
import { useStateValue } from '../../session/store';
import { Container, Avatar, Typography, Grid, TextField, Button } from '@material-ui/core';
import reactPhoto from '../../user.png';
import {consumerFirebase} from '../../server';
import { openScreenMessage } from '../../session/actions/snackbarAction';
import ImageUploader from 'react-images-upload';
import { v4 as uuidv4 } from 'uuid';

const style = {
    paper : {
        marginTop : 8,
        display : "flex",
        flexDirection : "column",
        alignItems : "center"
    },
    form : {
        width: "100%"
    },
    submit : {
        marginTop : 15,
        marginBottom : 20
    },
    avatar : {
        width : 120,
        height : 120
    }
}

const UserProfile = props => {
    const [{session}, dispatch] = useStateValue();
    const firebase = props.firebase;

    let [state, changeState] = useState({
        name : "",
        lastname : "",
        email : "",
        phone : "",
        id : "",
        photo : ""
    });

    const changeData = e => {
        const {name, value} = e.target;
        changeState(prev => ({
            ...prev,
            [name] : value
        }))
    }

    const saveChange = e => {
        e.preventDefault();

        firebase.db
        .collection('Users')
        .doc(firebase.auth.currentUser.uid)
        .set(state, {merge: true})
        .then(success => {
            dispatch({
                type : 'LOGIN',
                session : state,
                authenticated : true
            })
            openScreenMessage(dispatch, {
                open : true,
                messages : 'Se guardaron los cambios'
            })
        })
        .catch(error => {
            openScreenMessage(dispatch, {
                open : true,
                messages : 'Error guardando en la base de datos' + error
            })
        })
    }

    const validationForm = session => {
        if(session) {
            changeState(session.user);
        }
    }

    useEffect(() => {
        if(state.id === ''){
            validationForm(session);
        }
    });

    const uploadPhoto = photos => {
        const photo = photos[0]; // capturar imagen
        const uPhotoKey = uuidv4(); // Renombrar imagen
        const namePhoto = photo.name; // Obtener el nombre de la foto
        const extensPhoto = namePhoto.split('.').pop(); // Obtener la expresión de la imagen
        const alias = (namePhoto.split('.')[0] + "_" + uPhotoKey + "." + extensPhoto).replace(/\s/g,"_").toLowerCase(); // Crear el nuevo nombre de la imagen
        // Llamar objeto firebase
        firebase.saveDocument(alias, photo).then(metadata => {
            firebase.returnDocument(alias).then(urlPhoto => {
                state.photo = urlPhoto;
                firebase.db
                    .collection('Users')
                    .doc(firebase.auth.currentUser.uid)
                    .set(
                        {
                            photo : urlPhoto
                        },
                        { merge : true }
                    )
                    .then(userDB => {
                        dispatch({
                            type : "LOGIN",
                            session : state,
                            authenticated : true
                        })
                    })
            })
        })
    }

    let photoKey = uuidv4();

    return (session
            ? (
                <Container component="main" maxWidth="md" justify="center">
                    <div style={style.paper}>
                        <Avatar style={style.avatar} src={state.photo || reactPhoto}/>

                        <Typography component="h1" variant="h5">Perfil de Usuario</Typography>
                        <form style={style.form}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={12}>
                                    <ImageUploader
                                        withIcon= {false}
                                        key={photoKey}
                                        singleImage={true}
                                        buttonText='Cambie su images de perfil'
                                        onChange={uploadPhoto}
                                        imgExtension={['.jpg', '.png', '.jpeg']}
                                        maxFileSize={5242880}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField name="name" variant="outlined" fullWidth label="Nombre" value={state.name} onChange={changeData} />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField name="lastname" variant="outlined" fullWidth label="Apellido" value={state.lastname} onChange={changeData} />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField name="email" variant="outlined" fullWidth label="Email" value={state.email} onChange={changeData} />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField name="phone" variant="outlined" fullWidth label="Teléfono" value={state.phone} onChange={changeData} />
                                </Grid>
                            </Grid>
                            <Grid container justify="center">
                                <Grid item xs={12} md={6}>
                                    <Button type="submit" fullWidth variant="contained" size="large" color="primary" style={style.submit} onClick={saveChange} >
                                        Guardar cambios
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </div>
                </Container>
            )
            : null
        );
}

export default consumerFirebase(UserProfile);