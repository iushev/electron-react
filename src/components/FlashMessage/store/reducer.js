import {
    SET_FLASH,
    ADD_FLASH,
    REMOVE_FLASH,
} from './actions';

const initialState = {};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_FLASH:
            return {
                ...state,
                [action.key]: action.value,
            };
        case ADD_FLASH:
            if (typeof state[action.key] === 'undefined') {
                return {
                    ...state,
                    [action.key]: [action.value],
                };
            } else if (Array.isArray(state[action.key])) {
                return {
                    ...state,
                    [action.key]: [...state[action.key], action.value],
                };
            } else {
                return {
                    ...state,
                    [action.key]: [state[action.key], action.value],
                };
            }
        case REMOVE_FLASH: {
            const { ...flashMessages } = state;
            delete flashMessages[action.key];
            return flashMessages;
        }
        default:
            return state;
    }
};

export default reducer;