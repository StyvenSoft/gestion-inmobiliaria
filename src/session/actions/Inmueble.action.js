export const getData = async (firebase, pageSize, houseInitial, text) => {
    return new Promise(async (resolve, reject) => {
        let inmuebles = firebase.db
            .collection("Inmuebles")
            .orderBy("address")
            .limit(pageSize);

        if(houseInitial !== null) {
            inmuebles = firebase.db
                .collection("Inmuebles")
                .orderBy("address")
                .startAfter(houseInitial)
                .limit(pageSize)

            if(text.trim() !== '') {
                inmuebles = firebase.db
                    .collection("Inmuebles")
                    .orderBy("address")
                    .where("keywords", "array-contains", text.toLowerCase())
                    .startAfter(houseInitial)
                    .limit(pageSize)
            }
        }

        const snapshot = await inmuebles.get();

        const arrayInmueble = snapshot.docs.map(doc => {
            let data = doc.data();
            let id = doc.id;
            return {id, ...data}
        })

        const initialValue = snapshot.docs[0];
        const endValue = snapshot.docs[snapshot.docs.length - 1];

        const returnValue = {
            arrayInmueble,
            initialValue,
            endValue
        }
        resolve(returnValue);
    })
}

export const getPreviousData = async (firebase, pageSize, houseInitial, text) => {
    return new Promise(async (resolve, reject) => {
        let inmuebles = firebase.db
            .collection("Inmuebles")
            .orderBy("address")
            .limit(pageSize);

        if(houseInitial !== null) {
            inmuebles = firebase.db
                .collection("Inmuebles")
                .orderBy("address")
                .startAt(houseInitial)
                .limit(pageSize)

            if(text.trim() !== '') {
                inmuebles = firebase.db
                    .collection("Inmuebles")
                    .orderBy("address")
                    .where("keywords", "array-contains", text.toLowerCase())
                    .startAt(houseInitial)
                    .limit(pageSize)
            }
        }

        const snapshot = await inmuebles.get();

        const arrayInmueble = snapshot.docs.map(doc => {
            let data = doc.data();
            let id = doc.id;
            return {id, ...data}
        })

        const initialValue = snapshot.docs[0];
        const endValue = snapshot.docs[snapshot.docs.length - 1];

        const returnValue = {
            arrayInmueble,
            initialValue,
            endValue
        }
        resolve(returnValue);
    })
}