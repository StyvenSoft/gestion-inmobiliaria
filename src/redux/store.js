import { createStore, compose, applyMiddleware } from "redux";
import { default as thunk } from "redux-thunk";
import rootReducer from './reducers';

const initialState = {};
const middleware = [thunk];

const store = createStore(
    rootReducer,
    initialState,
    compose(
        applyMiddleware(...middleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ 
        ?   window.__REDUX_DEVTOOLS_EXTENSION__ &&
            window.__REDUX_DEVTOOLS_EXTENSION__() 
        : f => f
    )
);

export default store;