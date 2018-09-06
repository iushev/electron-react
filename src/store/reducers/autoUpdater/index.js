import { combineReducers } from 'redux';
import checkingForUpdate from './checkingForUpdate';
import downloadProgress from './downloadProgress';
import updateAvailable from './updateAvailable';
import updateDownloaded from './updateDownloaded';
import updateError from './updateError';
import updateNotAvailable from './updateNotAvailable';

const reducer = combineReducers({
    checkingForUpdate,
    downloadProgress,
    updateAvailable,
    updateDownloaded,
    updateError,
    updateNotAvailable,
});

export default reducer;
