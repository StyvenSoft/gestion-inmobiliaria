import sessionReducer from './sessionReducer';
import openSnackbarReducer from './openSnackbarReducer';

export const mainReducer = ({session, openSnackbar}, action) => {
    return {
        session : sessionReducer(session, action),
        openSnackbar : openSnackbarReducer(openSnackbar, action)
    }
}