import sessionReducer from './sessionReducer';
import openSnackbarReducer from './sessionReducer';

export const mainReducer = ({session, openSnackbar}, action) => {
    return {
        session : sessionReducer(session, action),
        openSnackbar : openSnackbarReducer(openSnackbar, action)
    }
}