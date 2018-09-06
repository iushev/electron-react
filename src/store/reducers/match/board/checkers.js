import { matchActions, boardActions } from '../../../actions';

const initialState = {
    checker_white_1: {
        color: 'white',
        point: 'point_24',
    },
    checker_white_2: {
        color: 'white',
        point: 'point_24',
    },
    checker_white_3: {
        color: 'white',
        point: 'point_13',
    },
    checker_white_4: {
        color: 'white',
        point: 'point_13',
    },
    checker_white_5: {
        color: 'white',
        point: 'point_13',
    },
    checker_white_6: {
        color: 'white',
        point: 'point_13',
    },
    checker_white_7: {
        color: 'white',
        point: 'point_13',
    },
    checker_white_8: {
        color: 'white',
        point: 'point_8',
    },
    checker_white_9: {
        color: 'white',
        point: 'point_8',
    },
    checker_white_10: {
        color: 'white',
        point: 'point_8',
    },
    checker_white_11: {
        color: 'white',
        point: 'point_6',
    },
    checker_white_12: {
        color: 'white',
        point: 'point_6',
    },
    checker_white_13: {
        color: 'white',
        point: 'point_6',
    },
    checker_white_14: {
        color: 'white',
        point: 'point_6',
    },
    checker_white_15: {
        color: 'white',
        point: 'point_6',
    },



    checker_black_1: {
        color: 'black',
        point: 'point_1',
    },
    checker_black_2: {
        color: 'black',
        point: 'point_1',
    },
    checker_black_3: {
        color: 'black',
        point: 'point_12',
    },
    checker_black_4: {
        color: 'black',
        point: 'point_12',
    },
    checker_black_5: {
        color: 'black',
        point: 'point_12',
    },
    checker_black_6: {
        color: 'black',
        point: 'point_12',
    },
    checker_black_7: {
        color: 'black',
        point: 'point_12',
    },
    checker_black_8: {
        color: 'black',
        point: 'point_17',
    },
    checker_black_9: {
        color: 'black',
        point: 'point_17',
    },
    checker_black_10: {
        color: 'black',
        point: 'point_17',
    },
    checker_black_11: {
        color: 'black',
        point: 'point_19',
    },
    checker_black_12: {
        color: 'black',
        point: 'point_19',
    },
    checker_black_13: {
        color: 'black',
        point: 'point_19',
    },
    checker_black_14: {
        color: 'black',
        point: 'point_19',
    },
    checker_black_15: {
        color: 'black',
        point: 'point_19',
    },
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case matchActions.INIT_MATCH:
        case matchActions.LOAD_MATCH:
        case boardActions.INIT_BOARD:
        case matchActions.SET_CURRENT_GAME:
            return initialState;
        default:
            return state;
    }
};

export default reducer;
