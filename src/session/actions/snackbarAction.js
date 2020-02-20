export const openScreenMessage = (dispatch, openMessage) => {
    dispatch({
        type : "OPEN_SNACKBAR",
        openMessage : openMessage
    })
}