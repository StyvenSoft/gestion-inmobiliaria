import axios from "axios";

export const sendEmail = (email) => {
    return new Promise(async (resolve, reject) => {
        const dataResponse = await axios.post(`https://us-central1-gestion-inmoviliaria.cloudfunctions.net/mailSend`, email);
        resolve(dataResponse);
    });
};