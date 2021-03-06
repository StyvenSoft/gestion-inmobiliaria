import React, { Component } from 'react';
import {
    Container,
    Paper,
    Grid,
    Breadcrumbs,
    Typography,
    TextField,
    Card,
    CardMedia,
    CardContent,
    CardActions,
    Button,
    ButtonGroup
} from '@material-ui/core';
import { consumerFirebase } from '../../../server';
import HomeIcon from '@material-ui/icons/Home'
import logo from '../../../home.png';
import { ArrowLeft, ArrowRight } from "@material-ui/icons";
import { getData, getPreviousData } from '../../../session/actions/Inmueble.action';
import { Link } from 'react-router-dom';
import { style, StyledBreadcrumb } from './style';

class ListImmovables extends Component {

    state = {
        inmuebles: [],
        searchText: "",
        pages: [],
        pageSize: 2,
        houseInitial: null,
        actualPage: 0
    }

    changeSearchText = e => {
        const self = this;
        self.setState({
            [e.target.name]: e.target.value
        })

        if (self.state.typingTimeout) {
            clearTimeout(self.state.typingTimeout);
        }

        self.setState({
            name: e.target.value,
            typing: false,
            typingTimeout: setTimeout(goTime => {
                const firebase = this.props.firebase;
                const { pageSize } = this.state;
                getPreviousData(firebase, pageSize, 0, self.state.searchText).then(firebaseReturnData => {
                    const page = {
                        initialValue: firebaseReturnData.initialValue,
                        endValue: firebaseReturnData.endValue,
                    };
                    const pages = [];
                    pages.push(page);

                    this.setState({
                        actualPage: 0,
                        pages,
                        inmuebles: firebaseReturnData.arrayInmueble
                    })
                })
            }, 500)
        })
    }

    previousPage = () => {
        const { actualPage, pageSize, searchText, pages } = this.state;

        if (actualPage > 0) {
            const firebase = this.props.firebase;
            getPreviousData(firebase, pageSize, pages[actualPage - 1].initialValue, searchText).then(firebaseReturnData => {

                const page = {
                    initialValue: firebaseReturnData.initialValue,
                    endValue: firebaseReturnData.endValue
                }
                pages.push(page);
                this.setState({
                    pages,
                    actualPage: actualPage - 1,
                    inmuebles: firebaseReturnData.arrayInmueble
                })
            })
        }
    }

    nextPage = () => {
        const { actualPage, pageSize, searchText, pages } = this.state;
        const firebase = this.props.firebase;

        getData(firebase, pageSize, pages[actualPage].endValue, searchText).then(firebaseReturnData => {
            if (firebaseReturnData.arrayInmueble.length > 0) {
                const page = {
                    initialValue: firebaseReturnData.initialValue,
                    endValue: firebaseReturnData.endValue
                }
                pages.push(page);
                this.setState({
                    pages,
                    actualPage: actualPage + 1,
                    inmuebles: firebaseReturnData.arrayInmueble
                })
            }
        })
    }

    async componentDidMount() {
        const { pageSize, searchText, houseInitial, pages } = this.state;
        const firebase = this.props.firebase;
        const firebaseReturnData = await getData(firebase, pageSize, houseInitial, searchText);

        const page = {
            initialValue: firebaseReturnData.initialValue,
            endValue: firebaseReturnData.endValue
        }

        pages.push(page);
        this.setState({
            inmuebles: firebaseReturnData.arrayInmueble,
            pages,
            actualPage: 0
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

    editInmueble = id => {
        this.props.history.push("/inmueble/" + id)
    }

    render() {
        return (
            <Container style={style.cardGrid}>
                <Paper style={style.paper}>
                    <Grid item xs={12} sm={8}>
                        <Breadcrumbs aria-label="breadcrumb">
                            <StyledBreadcrumb
                                component={Link}
                                to="/"
                                label="Home"
                                icon={<HomeIcon fontSize="small" />}
                            />
                            <StyledBreadcrumb href="#" label="Inmuebles" />
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
                    <Grid item xs={12} sm={12} style={style.barButton}>
                        <Grid container spacing={1} direction="column" alignItems="flex-end">
                            <ButtonGroup size="small" arial-label="Small outlined group">
                                <Button onClick={this.previousPage}>
                                    <ArrowLeft />
                                </Button>
                                <Button onClick={this.nextPage}>
                                    <ArrowRight />
                                </Button>
                            </ButtonGroup>
                        </Grid>
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
                                                onClick={() => this.editInmueble(card.id)}
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