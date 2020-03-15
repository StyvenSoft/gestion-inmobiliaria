import app from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

const config = {
    apiKey: "AIzaSyCtV64E49IuGVwTVYdXwjOgZTZt-fucyng",
    authDomain: "gestion-inmoviliaria.firebaseapp.com",
    databaseURL: "https://gestion-inmoviliaria.firebaseio.com",
    projectId: "gestion-inmoviliaria",
    storageBucket: "gestion-inmoviliaria.appspot.com",
    messagingSenderId: "368590167279",
    appId: "1:368590167279:web:c5e9fe43d4448143eccf1a",
    measurementId: "G-X01V32VNTN"
};

class Firebase {
    constructor(){
        app.initializeApp(config);
        this.db = app.firestore();
        this.auth = app.auth();
        this.storage = app.storage();
    }

    isStarted() {
        return new Promise(resolve => {
            this.auth.onAuthStateChanged(resolve);
        })
    }

    saveDocument = (nameDocument, document) => this.storage.ref().child(nameDocument).put(document);

    returnDocument = (documentUrl) => this.storage.ref().child(documentUrl).getDownloadURL();

    
}

export default Firebase;