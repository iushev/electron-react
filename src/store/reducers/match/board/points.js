import { matchActions, boardActions } from '../../../actions';
import {
    // MOVE_TYPE_DICE_ROLL,
    MOVE_TYPE_CHECKERS_MOVE, PLAYER_WHITE, PLAYER_BLACK,
    // MOVE_TYPE_CUBE_ACTION
} from '../../../../core';

export const initialState = {
    point_1: ['checker_black_1', 'checker_black_2'],
    point_2: [],
    point_3: [],
    point_4: [],
    point_5: [],
    point_6: ['checker_white_11', 'checker_white_12', 'checker_white_13', 'checker_white_14', 'checker_white_15'],
    point_7: [],
    point_8: ['checker_white_8', 'checker_white_9', 'checker_white_10'],
    point_9: [],
    point_10: [],
    point_11: [],
    point_12: ['checker_black_3', 'checker_black_4', 'checker_black_5', 'checker_black_6', 'checker_black_7'],
    point_13: ['checker_white_3', 'checker_white_4', 'checker_white_5', 'checker_white_6', 'checker_white_7'],
    point_14: [],
    point_15: [],
    point_16: [],
    point_17: ['checker_black_8', 'checker_black_9', 'checker_black_10'],
    point_18: [],
    point_19: ['checker_black_11', 'checker_black_12', 'checker_black_13', 'checker_black_14', 'checker_black_15'],
    point_20: [],
    point_21: [],
    point_22: [],
    point_23: [],
    point_24: ['checker_white_1', 'checker_white_2'],
    // point for hitted checkers
    point_25: {
        white: [],
        black: [],
    },
    // point for outed checkers
    point_26: {
        white: [],
        black: [],
    },
};

const doCheckersMoveAction = (state, action) => {
    if (action.actionIndex === null) {
        return state;
    }

    const newBoard = {
        ...state,
        point_25: {
            ...state.point_25,
        },
        point_26: {
            ...state.point_26,
        },
    };
    const act = action.move.action[action.actionIndex];
    // create correct point ids
    let pointFromId = `point_${act.from}`;
    let pointToId = `point_${act.to}`;

    // get checker out from point
    let checker;
    if (pointFromId === 'point_25') {
        let pointFrom = [ ...newBoard[pointFromId][action.move.player] ];
        checker = pointFrom.pop();
        newBoard[pointFromId][action.move.player] = pointFrom;
    } else {
        let pointFrom = [ ...newBoard[pointFromId] ];
        checker = pointFrom.pop();
        newBoard[pointFromId] = pointFrom;
    }

    // put checker to new point
    if (pointToId === 'point_26') {
        // Checker it taking out.
        // Put it to point for outed checkers for player.
        let pointTo = [ ...newBoard['point_26'][action.move.player] ];
        pointTo.push(checker);
        newBoard['point_26'][action.move.player] = pointTo;
    }
    else {
        let pointTo = [ ...newBoard[pointToId] ];
        // Check if has hitted opponent's checker.
        if (pointTo.length === 1) {
            // toPoint has only one checker
            // Check if it is the opponent.
            let tmpChecker = pointTo[0];
            let re = /checker_(white|black)_\d+/;
            let tmpCheckerMatch = re.exec(tmpChecker);
            let checkerMatch = re.exec(checker);
            // If checker on toPoint is oppenent's,
            // move it to hitted checkers point.
            if ( tmpCheckerMatch[1] !== checkerMatch[1]) {
                let hittedPoint = [ ...newBoard.point_25[tmpCheckerMatch[1]] ];
                // take out hiited checker from toPoint
                let hittedChecker = pointTo.pop();
                hittedPoint.push(hittedChecker);
                newBoard.point_25[tmpCheckerMatch[1]] = hittedPoint;
            }
        }

        // put checker in toPoint
        pointTo.push(checker);
        newBoard[pointToId] = pointTo;
    }
    return newBoard;
};

const undoCheckersMoveAction = (state, action) => {
    if (action.actionIndex === null) {
        return state;
    }

    const newBoard = {
        ...state,
        point_25: {
            ...state.point_25,
        },
        point_26: {
            ...state.point_26,
        },
    };

    // create correct point ids
    let pointFromId = `point_${action.move.action[action.actionIndex].from}`;
    let pointToId = `point_${action.move.action[action.actionIndex].to}`;

    // will move checker from pointToId to pointFromId

    // get checker out from pointToId
    let pointTo = [ ...(pointToId === 'point_26' ? state[pointToId][action.move.player] : state[pointToId]) ];
    let checker = pointTo.pop();
    if (pointToId === 'point_26') {
        newBoard[pointToId][action.move.player] = pointTo;
    }
    else {
        newBoard[pointToId] = pointTo;
    }

    // put checker in pointFromId
    if (pointFromId === 'point_25') {
        let pointFrom = [ ...state[pointFromId][action.move.player] ];
        pointFrom.push(checker);
        newBoard[pointFromId][action.move.player] = pointFrom;
    } else {
        let pointFrom = [ ...state[pointFromId] ];
        pointFrom.push(checker);
        newBoard[pointFromId] = pointFrom;
    }

    // Checking if this move action was have hit opponent's checker
    if (action.move.action[action.actionIndex].hit) {
        // move opponect's checker from point for hitted to pointToId
        const opponent = action.move.player === PLAYER_WHITE ? PLAYER_BLACK : PLAYER_WHITE;
        const pointHitted = [ ...state.point_25[opponent] ];
        const hittedChecker = pointHitted.pop();
        newBoard.point_25[opponent] = pointHitted;
        pointTo.push(hittedChecker);
    }

    return newBoard;
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case matchActions.INIT_MATCH:
        case matchActions.LOAD_MATCH:
        case boardActions.INIT_BOARD:
        case matchActions.SET_CURRENT_GAME:
            return initialState;
        case boardActions.MOVE_CHECKER: {
            if (state[action.fromPoint].length === 0) {
                throw new Error('Invalid move');
            }
            const checkerId = state[action.fromPoint][state[action.fromPoint].length - 1];
            const pointFrom = state[action.fromPoint].slice();
            const pointTo = state[action.toPoint].slice();
            pointTo.push(checkerId);
            pointFrom.splice(-1, 1);
            return {
                ...state,
                [action.fromPoint]: pointFrom,
                [action.toPoint]: pointTo,
            };
        }
        case matchActions.DO_MOVE_ACTION: {
            switch (action.move.type) {
                case MOVE_TYPE_CHECKERS_MOVE: return doCheckersMoveAction(state, action);
                default: return state;
            }
        }
        case matchActions.UNDO_MOVE_ACTION: {
            switch (action.move.type) {
                case MOVE_TYPE_CHECKERS_MOVE: return undoCheckersMoveAction(state, action);
                default: return state;
            }
        }
        default:
            return state;
    }
};

export default reducer;
