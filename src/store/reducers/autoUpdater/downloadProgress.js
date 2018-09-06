import { autoUpdaterActions } from '../../actions';

const initialState = {};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case autoUpdaterActions.DOWNLOAD_PROGRESS:
            return action.progressObj;
        case autoUpdaterActions.CHECKING_FOR_UPDATE:
        case autoUpdaterActions.UPDATE_AVAILABLE:
        case autoUpdaterActions.UPDATE_NOT_AVAILABLE:
        case autoUpdaterActions.UPDATE_ERROR:
            return initialState;
        default:
            return state;
    }
};

export default reducer;
