import { Button, Container, Grid, Paper, Table, TableBody, TableCell, TableRow } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsersApp } from '../../redux/actions/userAction';

const style = {
    paper: {
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItem: "center",
        padding: "20px",
        backGroundColor: "f5f5f5",
    },
    container: {
        paddingTop: "8px"
    }
}

const ListUsers = (props) => {

    const [isLoading, setIsLoading] = useState(false);
    const listArray = useSelector(state => state.userRedux.users);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!isLoading) {
            getUsersApp(dispatch).then(success => {
                setIsLoading(true);
            })
        }
    })

    return (
        <Container style={style.container}>
            <Paper style={style.paper}>
                <Grid container justify="center">
                    <Grid item xs={12} sm={12}>
                        <Table>
                            <TableBody>
                                {listArray
                                    ? listArray.map((row, i) => (
                                        <TableRow key={i}>
                                            <TableCell aling="left">{row.email || row.phone}</TableCell>
                                            <TableCell aling="left">
                                                {row.name ? row.name + " " + row.lastname : ""}
                                            </TableCell>
                                            <TableCell>
                                                <Button variant="contained" color="primary" size="small">Roles</Button>
                                            </TableCell>
                                            <TableCell>
                                                <Button variant="contained" color="primary" size="small">Enviar Mensaje</Button>
                                            </TableCell>
                                        </TableRow>
                                            )
                                        )   
                                    : null
                                }
                            </TableBody>
                        </Table>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    )
}


export default ListUsers;

