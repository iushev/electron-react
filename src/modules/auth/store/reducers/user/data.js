import {
    RECEIVE_USER,
    CLEAR_USER,
} from '../../actions/user';

const reducer = (state = null, action) => {
    switch (action.type) {
        case RECEIVE_USER:
            return {
                ...action.data,
            };
        case CLEAR_USER:
            return null;
        default:
            return state;
    }
};

export default reducer;
