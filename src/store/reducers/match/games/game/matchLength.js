import { matchActions } from '../../../../actions';

const initialState = 3;

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case matchActions.INIT_MATCH:
            return initialState;
        default:
            return state;
    }
};

export default reducer;
