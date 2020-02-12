export const login = (dispatch, firebase, email, password) => {
    return new Promise((resolve, eject) => {
        firebase.auth
        .singInWithEmailAndPassword(email, password)
        .then(auth => {
            //auth.user.id
            firebase.db
                .collection("Users")
                .doc(auth.user.id)
                .get()
                .then(doc => {
                    const userDB = doc.data();
                    dispatch({
                        type : "LOGIN",
                        session : userDB,
                        authenticated : true
                    });
                    resolve()
                });
        });
    });
}