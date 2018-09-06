import {
    FETCHING_USER,
    RECEIVE_USER,
    FETCHING_USER_ERROR,
    CLEAR_USER,
} from '../../actions/user';

const reducer = (state = null, action) => {
    switch (action.type) {
        case FETCHING_USER:
        case RECEIVE_USER:
        case CLEAR_USER:
            return null;
        case FETCHING_USER_ERROR:
            return action.error;
        default:
            return state;
    }
};

export default reducer;
