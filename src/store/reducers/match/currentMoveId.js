import { matchActions } from '../../actions';

const initialState = null;

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case matchActions.INIT_MATCH:
        case matchActions.LOAD_MATCH:
        case matchActions.SET_CURRENT_GAME:
            return null;
        case matchActions.DO_MOVE_ACTION:
            return action.moveId;
        case matchActions.UNDO_MOVE_ACTION:
            return action.prevMoveId;
        default:
            return state;
    }
};

export default reducer;
