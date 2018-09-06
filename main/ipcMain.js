const { ipcMain } = require('electron');
const { autoUpdater } = require('electron-updater');
const debug = require('debug')('electron:main');

module.exports = (win) => {
    ipcMain.on('install-update',  () => {
        debug('Installing update.');
        autoUpdater.quitAndInstall();
    });
};
