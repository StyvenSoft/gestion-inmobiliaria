import * as functions from 'firebase-functions';
import * as cors from 'cors';
import * as nodemailer from 'nodemailer';
import * as express from 'express';
import { EMAIL_USER, PASS_EMAIL } from './auth';

const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: EMAIL_USER,
        pass: PASS_EMAIL,
    }
});

const endPointExpress = express();
const corsVal = cors({ origin: true });

endPointExpress.options('*', corsVal);
endPointExpress.use(corsVal);
endPointExpress.use(express.json);

endPointExpress.post('*', (req: any, res: any) => {
    const _email = req.body.email;
    const _title = req.body.title;
    const _message = req.body.message;
    
    const emailOptions = {
        from: 'inmobiliaria@contact.com',
        to: _email,
        subject: _title,
        html: `<p>${_message}<p>`,
    }

    transport.sendMail(emailOptions, (err, info) => {
        if(err) {
            res.send(err);   
        } else {
            res.send("El correo se envió correctamente.");
        }
    })
})

exports = module.exports = functions.https.onRequest((request, response) => {
    return endPointExpress(request, response);
});



