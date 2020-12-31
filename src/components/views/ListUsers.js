import { Container, Grid, Paper, Table, TableBody } from '@material-ui/core';
import React from 'react';

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
    return (
        <Container style={style.container}>
            <Paper style={style.paper}>
                <Grid container justify="center">
                    <Grid item xs={12} sm={12}>
                        <Table>
                            <TableBody>

                            </TableBody>
                        </Table>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    )
}


export default ListUsers;

