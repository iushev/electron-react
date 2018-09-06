import { autoUpdaterActions } from '../../actions';

const initialState = null;

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case autoUpdaterActions.UPDATE_ERROR:
            return action.error;
        case autoUpdaterActions.CHECKING_FOR_UPDATE:
        case autoUpdaterActions.UPDATE_AVAILABLE:
        case autoUpdaterActions.UPDATE_NOT_AVAILABLE:
        case autoUpdaterActions.UPDATE_DOWNLOADED:
            return initialState;
        default:
            return state;
    }
};

export default reducer;
