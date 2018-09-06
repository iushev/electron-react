import { autoUpdaterActions } from '../../actions';

const initialState = false;

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case autoUpdaterActions.CHECKING_FOR_UPDATE:
            return true;
        case autoUpdaterActions.UPDATE_AVAILABLE:
        case autoUpdaterActions.UPDATE_NOT_AVAILABLE:
        case autoUpdaterActions.UPDATE_ERROR:
            return initialState;
        default:
            return state;
    }
};

export default reducer;
