import uuidv4 from 'uuid/v4';
import {
    INIT_MATCH,
    LOAD_MATCH,
} from '../../actions/match';

const initialState = null;

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case INIT_MATCH:
            return uuidv4();
        case LOAD_MATCH: {
            const { id } = action;
            return id ? id : state;
        }
        default:
            return state;
    }
};

export default reducer;
