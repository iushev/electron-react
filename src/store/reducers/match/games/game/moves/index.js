import { matchActions } from '../../../../../actions';
import move from './move';

const initialState = {};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case matchActions.INIT_MATCH:
            return initialState;
        default: {
            const { moveId } = action;
            if (moveId) {
                return {
                    ...state,
                    [moveId]: move(state[moveId], action),
                };
            }
            return state;
        }
    }
};

export default reducer;
