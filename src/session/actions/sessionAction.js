export const logIn = (dispatch, firebase, email, password) => {
    return new Promise((resolve, eject) => {
        firebase.auth
        .signInWithEmailAndPassword(email, password)
        .then(auth => {
            //auth.user.id
            firebase.db
                .collection("Users")
                .doc(auth.user.uid)
                .get()
                .then(doc => {
                    const userDB = doc.data();
                    dispatch({
                        type : "LOGIN",
                        session : userDB,
                        authenticated : true
                    });
                    resolve({status: true})
                });   
        })
        .catch(error =>{
            console.log('Password Incorrecto', error);
            resolve({status: false, messages : error})
        })
    });
};
export const createUser = (dispatch, firebase, user) => {
    return new Promise((resolve, eject) => {
        firebase.auth
        .createUserWithEmailAndPassword(user.email, user.password)
        .then(auth => {
            firebase.db
                .collection("Users")
                .doc(auth.user.uid)
                .set({
                    id : auth.user.uid,
                    email : user.email,
                    name : user.name,
                    lastname : user.lastname
                }, {merge : true})
                .then(doc => {
                    user.id = auth.user.uid;
                    dispatch({
                        type : "LOGIN",
                        session : user,
                        authenticated : true
                    })
                    resolve();
                }) 
            })
            .catch(error =>{
                console.log('Password Incorrecto', error);
        })
    });
};

export const signOff = (dispatch, firebase) => {
    return new Promise((resolve, eject) => {
        firebase.auth.singOut().then(salir => {
            dispatch({
                type : "LOGOUT",
                newUser : {
                    name : "",
                    lastname : "",
                    email : "",
                    photo : "",
                    id : "",
                    phone : ""
                },
                authenticated : false
            });
            resolve()
        })
    }) 
}