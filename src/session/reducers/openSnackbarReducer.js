const initialState = {
    open : false,
    messages : ""
}

const openSnackbarReducer = (state = initialState, action) => {
    switch (action.type) {
        case "OPEN_SNACKBAR":             
        return {
            ...state,
            open : action.openMessage.open,
            messages : action.openMessage.messages
        }
        default :
            return state;
    }
};

export default openSnackbarReducer;
