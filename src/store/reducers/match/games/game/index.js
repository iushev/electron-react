import { combineReducers } from 'redux';
import id from './id';
import name from './name';
import score from './score';
import moves from './moves';
import rule from './rule';
import result from './result';
import matchLength from './matchLength';

export const loadGame = (gameData) => {
    return {
        id: gameData.id,
        matchLength: +gameData.length,
        whiteName: gameData.whiteName,
        blackName: gameData.blackName,
        whiteScore: +gameData.whiteScore,
        blackScore: +gameData.blackScore,
        rule: gameData.rule,
        result: {
            ...gameData.result,
        },
        moves: gameData.moves.reduce((moves, moveData) => {
            moves[`move_${moveData.id}`] = {
                id: `move_${moveData.id}`,
                player: moveData.player,
                type: moveData.type,
                action: moveData.move,
            };
            return moves;
        }, {}),
    };
};

const reducer = combineReducers({
    id,
    matchLength,
    whiteName: name,
    blackName: name,
    whiteScore: score,
    blackScore: score,
    rule,
    result,
    moves,
});

export default reducer;
