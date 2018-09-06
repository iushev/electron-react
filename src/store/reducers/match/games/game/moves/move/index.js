import { matchActions } from '../../../../../../actions';
import { MOVE_TYPE_CHECKERS_MOVE } from '../../../../../../../core';

const initialState = {};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case matchActions.PROCESS_MOVE_ACTION: {
            if (state.type === MOVE_TYPE_CHECKERS_MOVE && action.actionIndex !== null) {
                const newMove = {
                    ...state,
                    action: [ ...state.action ],
                };
                let pointToId = `point_${state.action[action.actionIndex].to}`;
                let pointTo = action.board.points[pointToId];
                if (pointTo.length === 1) {
                    let tmpChecker = pointTo[0];
                    let re = /checker_(white|black)_\d+/;
                    let tmpCheckerMatch = re.exec(tmpChecker);
                    // If checker on toPoint is oppenent's,
                    // mark move action as hit.
                    if (tmpCheckerMatch[1] !== state.player) {
                        newMove.action[action.actionIndex] = {
                            ...state.action[action.actionIndex],
                            hit: true,
                        };
                    }
                }
                return newMove;
            }
            return state;
        }
        default:
            return state;
    }
};

export default reducer;
