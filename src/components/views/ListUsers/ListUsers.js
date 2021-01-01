import { Button, Container, Grid, Paper, Table, TableBody, TableCell, TableRow } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendEmail } from '../../../redux/actions/emailAction';
import { getUsersApp } from '../../../redux/actions/userAction';
import { useStateValue } from "../../../session/store";
import { openScreenMessage } from '../../../session/actions/snackbarAction';
import { style } from './style';

const ListUsers = (props) => {

    const [{ session }, dispatch] = useStateValue();
    const [isLoading, setIsLoading] = useState(false);
    const listArray = useSelector(state => state.userRedux.users);
    const dispatchRedux = useDispatch();

    useEffect(() => {
        if (!isLoading) {
            getUsersApp(dispatchRedux).then(success => {
                setIsLoading(true);
            }).catch((err) => {
                openScreenMessage(dispatch, {
                    open: true,
                    messages: err.message,
                });
            });
        }
    })

    const buttonSendEmail = (email) => {
        const obj = {
            email: email,
            title: "Mensaje enviado desde la App Inmobiliaria",
            message: "Gracias por enviar el mensaje..."
        }
        sendEmail(obj).then(data => {
            openScreenMessage(dispatch, {
                open: true,
                messages: "Se envió en correo electrónico al destinatario" + email,
            }).catch((err) => {
                openScreenMessage(dispatch, {
                    open: true,
                    messages: err.message,
                });
            });
        })
    };

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
                                                <Button 
                                                    variant="contained" 
                                                    color="primary" 
                                                    size="small"
                                                >Roles</Button>
                                            </TableCell>
                                            <TableCell>
                                                <Button 
                                                    variant="contained" 
                                                    color="primary" 
                                                    size="small"
                                                    onClick={() => buttonSendEmail(row.email)}
                                                >Enviar Mensaje</Button>
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

