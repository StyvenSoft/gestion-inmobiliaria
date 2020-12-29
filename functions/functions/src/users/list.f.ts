import * as functions from 'firebase-functions';
import * as cors from 'cors';
import * as express from 'express';
import * as admin from 'firebase-admin';
import * as cookieParser from 'cookie-parser';

if (!admin.apps.length) {
    admin.initializeApp();
}

const db = admin.firestore();
const endPointExpress = express();
const corsVal = cors({ origin: true });

endPointExpress.options('*', corsVal);
endPointExpress.use(corsVal);
endPointExpress.use(cookieParser());

endPointExpress.get('/list', async (req: any, res: any) => {
    const users = db.collection('Users');
    const snapshot = await users.get();
    const arrayUsers = snapshot.docs.map(doc => {
        const data = doc.data();
        const id = doc.id;
        return { id, ...data };
    });

    res.status(200);
    res.json({ status: "success", users: arrayUsers })
})

exports = module.exports = functions.https.onRequest((request, response) => {
    return endPointExpress(request, response);
});

