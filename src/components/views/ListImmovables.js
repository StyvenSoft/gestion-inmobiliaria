import React, { Component } from 'react';
import { Container, Paper, Grid, Breadcrumbs, Link, Typography, TextField } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import { consumerFirebase } from '../../server';

const style = {
    cardGrid: {
        paddingTop: 8,
        paddingBotton: 8
    },
    paper: {
        backgroundColor: "#f5f5f5",
        paddind: "20px",
        height: 650
    },
    link: {
        display: "flex"
    },
    gridText: {
        marginTop: "20px"
    }
}

class ListImmovables extends Component {

    state = {
        inmuebles: [],
        searchText: ""
    }

    changeSearchText = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    async componentDidMount() {
        let objectQuery = this.props.firebase.db.collection("Inmuebles").orderBy("address");
        const snapshot = await objectQuery.get();
        const arrayInmueble = snapshot.docs.map(doc => {
            let data = doc.data();
            let id = doc.id;
            return {id, ...data};
        })

        this.setState({
            inmuebles: arrayInmueble
        })
    }

    render() {
        return (
            <Container style={style.cardGrid}>
                <Paper style={style.paper}>
                    <Grid item xs={12} sm={12}>
                        <Breadcrumbs arial-label="breadcrums">
                            <Link color="inherit" style={style.link} href="/">
                                <HomeIcon />
                                Home
                            </Link>
                            <Typography color="textPrimary">Mis Inmuebles</Typography>
                        </Breadcrumbs>
                    </Grid>
                    <Grid item xs={12} sm={6} style={style.gridText}>
                        <TextField
                            fullWidth
                            ImputsLabelProps={{
                                shrink: true
                            }}
                            name="searchText"
                            variant="outlined"
                            label="Ingrese el inmueble a buscar"
                            onChange={this.changeSearchText}
                            value={this.state.searchText}
                        ></TextField>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <Grid container spacing={4}>
                            {this.state.inmuebles.map(card => {
                                // <Grid item key={card.id} xs={12} sm={6} md={4}>
                                    
                                // </Grid>
                            })}
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
        )
    }
}

export default consumerFirebase(ListImmovables);