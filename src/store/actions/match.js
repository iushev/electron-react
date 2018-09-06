import SGF from '../../parsers/SGF';
import {
    MOVE_TYPE_CHECKERS_MOVE,
    MOVE_TYPE_DICE_ROLL,
    MOVE_TYPE_CUBE_ACTION,
    MOVE_TYPE_RESIGN,
} from '../../core';

export const INIT_MATCH = 'INIT_MATCH';
export const LOAD_MATCH = 'LOAD_MATCH';
export const SET_CURRENT_GAME = 'SET_CURRENT_GAME';
export const PROCESS_MOVE_ACTION = 'PROCESS_MOVE_ACTION';
export const DO_MOVE_ACTION = 'DO_MOVE_ACTION';
export const UNDO_MOVE_ACTION = 'UNDO_MOVE_ACTION';

export const initMatch = () => ({
    type: INIT_MATCH,
});

export const loadMatch = (data) => {
    let parser = new SGF();
    return {
        type: LOAD_MATCH,
        match: parser.parseFromString(data),
    };
};

export const setCurrentGame = (gameId) => ({
    type: SET_CURRENT_GAME,
    gameId,
});


export const processMoveAction = (gameId, moveId, actionIndex, board) => ({
    type: PROCESS_MOVE_ACTION,
    gameId,
    moveId,
    actionIndex,
    board,
});

const _doMoveAction = (gameId, moveId, actionIndex, move) => ({
    type: DO_MOVE_ACTION,
    gameId,
    moveId,
    actionIndex,
    move,
});

export const doMoveAction = (gameId, moveId, actionIndex) => {
    return (dispatch, getState) => {
        const { match } = getState();
        // When move forward we need to process move before execute it.
        // This proocess mark move if it hit oponent's checker.
        dispatch(processMoveAction(gameId, moveId, actionIndex, match.board));
        // Execute move
        dispatch(_doMoveAction(gameId, moveId, actionIndex, match.games[gameId].moves[moveId]));
    };
};

const _undoMoveAction = (gameId, moveId, actionIndex, prevMoveId, move, prevMove) => ({
    type: UNDO_MOVE_ACTION,
    gameId,
    moveId,
    actionIndex,
    prevMoveId,
    move,
    prevMove,
});

export const undoMoveAction = (gameId, moveId, actionIndex, prevMoveId) => {
    return (dispatch, getState) => {
        const { match } = getState();
        dispatch(_undoMoveAction(gameId, moveId, actionIndex, prevMoveId,
            match.games[gameId].moves[moveId],
            match.games[gameId].moves[prevMoveId]));
    };
};

export const setCurrentMove = (moveId) => {
    return (dispatch, getState) => {
        const { match } = getState();
        const re = /^move_(\d+)$/;
        const newId = +re.exec(moveId)[1];
        let currId = -1;
        if (match.currentMoveId) {
            currId = +re.exec(match.currentMoveId)[1];
        }
        const moveForward = newId > currId;
        const moves = Object.keys(match.games[match.currentGameId].moves).reduce((accumulator, moveId) => {
            const id = re.exec(moveId)[1];
            if (moveForward && (currId < id && id <= newId)) {
                accumulator[moveId] = match.games[match.currentGameId].moves[moveId];
            }
            else if (newId <= id && id <= currId) {
                accumulator[moveId] = match.games[match.currentGameId].moves[moveId];
            }
            return accumulator;
        }, {});

        if (moveForward) {
            for (let i = currId + 1; i <= newId; i++) {
                const move = moves[`move_${i}`];
                switch (move.type) {
                    case MOVE_TYPE_CHECKERS_MOVE:
                        move.action.forEach((element, actionIndex) => {
                            dispatch(doMoveAction(match.currentGameId, move.id, actionIndex));
                        });
                        break;
                    case MOVE_TYPE_DICE_ROLL:
                    case MOVE_TYPE_CUBE_ACTION:
                    case MOVE_TYPE_RESIGN:
                        dispatch(doMoveAction(match.currentGameId, move.id, null));
                        break;
                    default:
                        break;
                }
            }
        }
        else {
            for (let i = currId; i > newId; i--) {
                const move = moves[`move_${i}`];
                const prevMove = moves[`move_${i - 1}`];
                switch (move.type) {
                    case MOVE_TYPE_CHECKERS_MOVE:
                        for (let actionIndex = move.action.length -1 ; actionIndex >= 0; actionIndex--) {
                            dispatch(undoMoveAction(match.currentGameId, move.id, actionIndex, prevMove.id));
                        }
                        break;
                    case MOVE_TYPE_DICE_ROLL:
                    case MOVE_TYPE_CUBE_ACTION:
                    case MOVE_TYPE_RESIGN:
                        dispatch(undoMoveAction(match.currentGameId, move.id, null, prevMove.id));
                        break;
                    default:
                        break;
                }
            }
        }
    };
};
