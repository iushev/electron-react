import { combineReducers } from 'redux';
import currentGameId from './currentGameId';
import currentMoveId from './currentMoveId';
import id from './id';
import board from './board';
import games from './games';

const reducer = combineReducers({
    id,
    currentGameId,
    currentMoveId,
    games,
    board,
});

export default reducer;
