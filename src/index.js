import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Firebase, { FirebaseContext } from './server';
import { initialState } from './session/initialState';
import { StateProvider } from './session/store';
import sessionReducer from './session/reducers/sessionReducer';
//const FirebaseContext = React.createContext();

ReactDOM.render(
<FirebaseContext.Provider value={new Firebase()}>
    <StateProvider initialState={initialState} reducer={sessionReducer}>
        <App />
    </StateProvider>
</FirebaseContext.Provider>
, document.getElementById('root'));

serviceWorker.unregister();
