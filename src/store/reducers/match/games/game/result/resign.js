import { matchActions } from '../../../../../actions';

const initialState = false;

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case matchActions.INIT_MATCH:
            return initialState;
        default:
            return state;
    }
};

export default reducer;