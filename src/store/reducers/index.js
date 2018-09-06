import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
// import app from './app';
import match from './match';
import autoUpdater from './autoUpdater';
import auth from '../../modules/auth/store/reducers';
import flashMessages from '../../components/FlashMessage/store/reducer';

const rootReducer = combineReducers({
    form,
    // app,
    autoUpdater,
    match,
    auth,
    flashMessages,
});

export default rootReducer;
