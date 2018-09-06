import { matchActions } from '../../../actions';
import game, { loadGame } from './game';

const initialState = {};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case matchActions.INIT_MATCH: {
            const newGame = game(undefined, action);
            return {
                [newGame.id]: newGame,
            };
        }
        case matchActions.LOAD_MATCH:
            return action.match.games.reduce((games, gameData) => {
                const tmpGame = loadGame(gameData);
                games[tmpGame.id] = tmpGame;
                return games;
            }, {});
        default: {
            const { gameId } = action;
            if (gameId !== null && typeof gameId !== 'undefined') {
                return {
                    ...state,
                    [gameId]: game(state[gameId], action),
                };
            }
            return state;
        }
    }
};

export default reducer;
