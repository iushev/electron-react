import { matchActions } from '../../../../actions';

const initialState = null;

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case matchActions.INIT_MATCH:
            return 0;
        default:
            return state;
    }
};

export default reducer;