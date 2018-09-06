import {
    matchActions,
    boardActions,
} from '../../../actions';
import {
    MOVE_TYPE_CUBE_ACTION,
    CUBE_ACTION_DOUBLE,
    CUBE_ACTION_TAKE,
    CUBE_ACTION_DROP,
} from '../../../../core';

const initialState = {
    value: 1,
    owner: null,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case matchActions.INIT_MATCH:
        case matchActions.LOAD_MATCH:
        case boardActions.INIT_BOARD:
        case matchActions.SET_CURRENT_GAME:
            return initialState;
        case matchActions.DO_MOVE_ACTION:
            if (action.move.type !== MOVE_TYPE_CUBE_ACTION) {
                return state;
            }
            switch (action.move.action) {
                case CUBE_ACTION_DOUBLE:
                    return {
                        ...state,
                        value: (state.value || 1) * 2,
                        owner: null,
                    };
                case CUBE_ACTION_TAKE:
                    return {
                        ...state,
                        owner: action.move.player,
                    };
                case CUBE_ACTION_DROP:
                default:
                    return state;
            }
        case matchActions.UNDO_MOVE_ACTION:
            if (action.move.type !== MOVE_TYPE_CUBE_ACTION) {
                return state;
            }
            switch (action.move.action) {
                case CUBE_ACTION_DOUBLE:
                    return {
                        ...state,
                        value: state.value / 2,
                        owner: (state.value > 2 ? action.prevMove.player : null),
                    };
                case CUBE_ACTION_TAKE:
                    return {
                        ...state,
                        owner: null,
                    };
                default:
                    return state;
            }
        default:
            return state;
    }
};

export default reducer;
