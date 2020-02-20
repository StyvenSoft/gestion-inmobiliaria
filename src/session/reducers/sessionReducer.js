export const initialState = {
    user : {
        name : "",
        lastname : "",
        email : "",
        phone : "",
        id : "",
        photo : ""
    },
    authenticated : false
} 

const sessionReducer = (state = initialState, action) => {
    switch (action.type){
        case "LOGIN" : 
            return {
                ...state,
                user : action.session,
                authenticated : action.authenticated
            };
        case "CHANGE-SESSION" :
            return {
                ...state,
                user : action.newUser,
                authenticated : action.authenticated
            };
        case "LOGOUT" :
            return {
                ...state,
                user : action.newUser,
                authenticated : action.authenticated
            }
        default :
            return state;
    }
}

export default sessionReducer;