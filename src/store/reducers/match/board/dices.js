import { matchActions, boardActions } from '../../../actions';
import { MOVE_TYPE_DICE_ROLL } from '../../../../core';

const initialState = {
    white: {
        dices: [],
    },
    black: {
        dices: [],
    },
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case matchActions.INIT_MATCH:
        case matchActions.LOAD_MATCH:
        case boardActions.INIT_BOARD:
        case matchActions.SET_CURRENT_GAME:
            return initialState;
        case matchActions.DO_MOVE_ACTION:
            if (action.move.type !== MOVE_TYPE_DICE_ROLL) {
                return initialState;
            }
            return {
                ...initialState,
                [action.move.player]: {
                    dices: [
                        +action.move.action[0],
                        +action.move.action[1],
                    ],
                },
            };
        case matchActions.UNDO_MOVE_ACTION:
            if (action.prevMove.type !== MOVE_TYPE_DICE_ROLL) {
                return initialState;
            }
            return {
                ...initialState,
                [action.prevMove.player]: {
                    dices: [
                        +action.prevMove.action[0],
                        +action.prevMove.action[1],
                    ],
                },
            };
        default:
            return state;
    }
};

export default reducer;