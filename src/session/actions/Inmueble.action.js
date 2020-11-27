export const getData = (firebase, pageSize, houseInitial, text) => {
    return new Promise(async (resolve, eject) => {
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

        const snapshot = inmuebles.get();

        const arrayInmuebles = snapshot.docs.map(doc => {
            let data = doc.data();
            let id = doc.id;
            return {id, ...data}
        })

        const initialValue = snapshot.docs[0];
        const endValue = snapshot.docs[snapshot.docs.length -1];

        const returnValue = {
            arrayInmuebles,
            initialValue,
            endValue
        }
        resolve(returnValue);
    })
}