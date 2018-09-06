import {
    FETCHING_USER,
    RECEIVE_USER,
    FETCHING_USER_ERROR,
    CLEAR_USER,
} from '../../actions/user';

const reducer = (state = false, action) => {
    switch (action.type) {
        case FETCHING_USER:
            return true;
        case RECEIVE_USER:
        case FETCHING_USER_ERROR:
        case CLEAR_USER:
            return false;
        default:
            return state;
    }
};

export default reducer;
