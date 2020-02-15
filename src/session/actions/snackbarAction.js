export const openScreenMessage = (dispatch, open) => {
    dispatch({
        type : "OPEN_SNACKBAR",
        open : open
    })
}