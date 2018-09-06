import {
    AUTH_USER,
    UNAUTH_USER,
} from '../../actions';

const initialState = null;

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTH_USER:
            return action.user;
        case UNAUTH_USER:
            return null;
        default:
            return state;
    }
};

export default reducer;