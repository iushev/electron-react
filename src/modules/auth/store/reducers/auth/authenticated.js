import {
    AUTH_USER,
    UNAUTH_USER,
} from '../../actions';

const initialState = false;

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTH_USER:
            return true;
        case UNAUTH_USER:
            return false;
        default:
            return state;
    }
};

export default reducer;