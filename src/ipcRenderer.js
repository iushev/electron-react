import { autoUpdaterActions, matchActions } from './store/actions';
import store from './store';
// import { ipcRenderer } from 'electron';
const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;


const debug = require('debug')('backgammon');
export default () => {
    ipcRenderer.on('autoUpdater:checking-for-update', (/*event, args*/) => {
        debug('autoUpdater:checking-for-update');
        store.dispatch(autoUpdaterActions.checkingForUpdate());
    });
    ipcRenderer.on('autoUpdater:update-available', (event, args) => {
        debug('autoUpdater:update-available', args);
        store.dispatch(autoUpdaterActions.updateAvailable(args));
    });
    ipcRenderer.on('autoUpdater:update-not-available', (event, args) => {
        debug('autoUpdater:update-not-available', args);
        store.dispatch(autoUpdaterActions.updateNotAvailable(args));
    });
    ipcRenderer.on('autoUpdater:error', (event, args) => {
        debug('autoUpdater:error', args);
        store.dispatch(autoUpdaterActions.updateError(args));
    });
    ipcRenderer.on('autoUpdater:download-progress', (event, args) => {
        debug('autoUpdater:download-progress', args);
        store.dispatch(autoUpdaterActions.downloadProgress(args));
    });
    ipcRenderer.on('autoUpdater:update-downloaded', (event, args) => {
        debug('autoUpdater:update-downloaded', args);
        store.dispatch(autoUpdaterActions.updateDownloaded(args));
    });

    ipcRenderer.on('match:init', (/*event*/) => {
        store.dispatch(matchActions.initMatch());
    });
    ipcRenderer.on('match:load', (event, data) => {
        store.dispatch(matchActions.loadMatch(data));
    });
};