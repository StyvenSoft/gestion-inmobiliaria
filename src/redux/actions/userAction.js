import axios from 'axios';

export const getUsersApp = (dispatch) => {
    return new Promise(async (resolve, reject) => {
        const dataRest = await axios.get(`https://us-central1-gestion-inmoviliaria.cloudfunctions.net/usersList/list`);

        dispatch({
            type: "LIST_USERS",
            payload: dataRest.data
        })
        resolve();
    });
};

export const updateRoles = (dispatch, user) => {
    return new Promise(async (resolve, reject) => {
        const dataRest = await axios.get(`https://us-central1-gestion-inmoviliaria.cloudfunctions.net/usersMaintenance`, user);
        dispatch({
            type: "UPDATE_ROLES",
            payload: dataRest.data
        })
        resolve();
    });
};