import { autoUpdaterActions } from '../../actions';

const initialState = false;

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case autoUpdaterActions.UPDATE_NOT_AVAILABLE:
            return true;
        case autoUpdaterActions.CHECKING_FOR_UPDATE:
        case autoUpdaterActions.UPDATE_AVAILABLE:
        case autoUpdaterActions.UPDATE_ERROR:
        case autoUpdaterActions.UPDATE_DOWNLOADED:
        case autoUpdaterActions.CHECKING_FOR_UPDATE_DONE:
            return initialState;
        default:
            return state;
    }
};

export default reducer;
