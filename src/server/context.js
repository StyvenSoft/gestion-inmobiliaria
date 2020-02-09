import React from 'react';

const FirebaseContext = React.createContext();

export default FirebaseContext;

export const consumerFirebase = Component => props => (
    <FirebaseContext.Consumer>
        {firebase => <Component {...props} firebase={firebase} />}
    </FirebaseContext.Consumer>
)

