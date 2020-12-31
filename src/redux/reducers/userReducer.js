const initialState = {
    users: [],
    message: {}
}

export default function (state = initialState, action) {
    switch (action.type) {
        case "LIST_USERS":
            return {
                ...state,
                users: action.payload
            };
        case "UPDATE_ROLES":
            return {
                ...state,
                message: action.payload
            };
        default:
            return state;
    }
};