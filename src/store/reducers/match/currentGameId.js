import { matchActions } from '../../actions';

const initialState = null;

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case matchActions.INIT_MATCH:
            return 0;
        case matchActions.LOAD_MATCH: {
            const { match } = action;
            const gameIds = Object.keys(match.games);
            if (gameIds.length > 0) {
                return +gameIds[0];
            }
            return null;
        }
        case matchActions.SET_CURRENT_GAME:
            return +action.gameId;
        default:
            return state;
    }
};

export default reducer;
