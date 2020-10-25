import React, { Component } from 'react';
import { Container, Paper, Grid, Breadcrumbs, Link, Typography, TextField, Card, CardMedia, CardContent, CardActions, Button } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import { consumerFirebase } from '../../server';
import logo from '../../home.png';

const style = {
    cardGrid: {
        paddingTop: 8,
        paddingBotton: 8
    },
    paper: {
        backgroundColor: "#f5f5f5",
        minHeight: 650,
        padding: '20px'
    },
    link: {
        display: "flex"
    },
    homeIcon: {
        width: 20,
        height: 20,
        marginRight: '4px'
    },
    gridText: {
        marginTop: "20px",
        marginLeft: "15px"
    },
    card: {
        height: "100%",
        display: "flex",
        flexDirection: "column"
    },
    cardMedia: {
        paddingTop: "56.25%",
    },
    cardContent: {
        flexGrow: 1
    }
}

class ListImmovables extends Component {

    state = {
        inmuebles: [],
        searchText: ""
    }

    changeSearchText = e => {
        const self = this;
        self.setState({
            [e.target.name] : e.target.value
        })

        if(self.state.typingTimeout) {
            clearTimeout(self.state.typingTimeout);
        }

        self.setState({
            name: e.target.value,
            typing: false,
            typingTimeout: setTimeout(goTime => {
                let objectQuery = this.props.firebase.db.collection("Inmuebles").orderBy("address")
                .where("keywords", "array-contains", self.state.searchText.toLowerCase());

                if(self.state.searchText.trim() === "") {
                    objectQuery = this.props.firebase.db
                    .collection("Inmuebles").orderBy("address");
                }

                objectQuery.get().then(snapshot => {
                    const arrayInmueble = snapshot.docs.map(doc => {
                        let data = doc.data();
                        let id = doc.id;
                        return {id, ...data}
                    });

                    this.setState({
                        inmuebles: arrayInmueble
                    })
                });
            }, 500)
        })
    }

    async componentDidMount() {
        let objectQuery = this.props.firebase.db.collection("Inmuebles").orderBy("address");
        const snapshot = await objectQuery.get();
        const arrayInmueble = snapshot.docs.map(doc => {
            let data = doc.data();
            let id = doc.id;
            return { id, ...data };
        })

        this.setState({
            inmuebles: arrayInmueble
        })
    }

    deleteInmueble = id => {
        this.props.firebase.db
        .collection("Inmuebles")
        .doc(id)
        .delete()
        .then(success => {
            this.deletedListInmueble(id);
        })
    }

    deletedListInmueble = id => {
        const inmuebleNewList = this.state.inmuebles.filter(
            inmueble => inmueble.id !== id
        )
        this.setState({
            inmuebles: inmuebleNewList
        })
    }

    render() {
        return (
            <Container style={style.cardGrid}>
                <Paper style={style.paper}>
                    <Grid item xs={12} sm={8}>
                        <Breadcrumbs arial-label="breadcrums">
                            <Link color="inherit" style={style.link} href="/">
                                <HomeIcon style={style.homeIcon} />
                                Home
                            </Link>
                            <Typography color="textPrimary">Mis Inmuebles</Typography>
                        </Breadcrumbs>
                    </Grid>
                    <Grid item xs={12} sm={6} style={style.gridText}>
                        <TextField
                            fullWidth
                            InputLabelProps={{
                                shrink: true
                            }}
                            name="searchText"
                            variant="outlined"
                            label="Ingrese el inmueble a buscar"
                            onChange={this.changeSearchText}
                            value={this.state.searchText}
                        ></TextField>
                    </Grid>
                    <Grid item xs={12} sm={12} style={style.gridText}>
                        <Grid container spacing={4}>
                            {this.state.inmuebles.map(card => (
                                <Grid item key={card.id} xs={12} sm={6} md={4}>
                                    <Card style={style.card}>
                                        <CardMedia
                                            style={style.cardMedia}
                                            image={
                                                card.photos
                                                    ? card.photos[0]
                                                        ? card.photos[0]
                                                        : logo
                                                    : logo
                                            }
                                        />
                                        <CardContent style={card.content}>
                                            <Typography gutterBottom variand="h5" component="h2">
                                                {card.city + ", " + card.country}
                                            </Typography>
                                        </CardContent>

                                        <CardActions>
                                            <Button 
                                                size="small"
                                                color="primary"
                                            >
                                                Editar
                                            </Button>
                                            <Button 
                                                size="small"
                                                color="primary"
                                                onClick={() => this.deleteInmueble(card.id)}
                                            >
                                                Eliminar
                                            </Button>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
        )
    }
}

export default consumerFirebase(ListImmovables);