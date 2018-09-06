const { app } = require('electron');
const { autoUpdater, NoOpLogger } = require('electron-updater');
const url = require('url');
const path = require('path');
const debug = require('debug')('electron:main');
const registerUpdateListeners = require('../main/autoUpdaterListeners');
const MainWindow = require('../main/mainWindow');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

// Disable auto update logger
autoUpdater.logger = new NoOpLogger();

function createWindow() {
    // Create the browser window.
    win = new MainWindow({
        show: false,
    });

    // and load the index.html of the app.
    const startUrl = process.env.ELECTRON_START_URL || url.format({
        pathname: path.join(__dirname, '/../build/index.html'),
        protocol: 'file:',
        slashes: true,
    });
    debug('startUrl:',  startUrl);
    win.loadURL(startUrl);

    // When finish loading show window and check for updates
    win.webContents.once('did-finish-load', () => {
        debug('Show main window.');
        win.show();

        // Open the DevTools in development mode.
        if (process.env.NODE_ENV === 'development') {
            debug('Open the DevTools.');
            win.webContents.openDevTools();
        }

        autoUpdater.checkForUpdates();
    });

    // register listeners
    registerUpdateListeners(win);

    // Emitted when the window is closed.
    win.on('closed', () => {
        debug('Main window is closed.');
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        win = null;
    });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
    if (process.env.NODE_ENV === 'development') {
        debug('Insatlling development extensions.');
        const {
            default: installExtension,
            REACT_DEVELOPER_TOOLS,
            REDUX_DEVTOOLS,
        } = require('electron-devtools-installer');
        await installExtension(REACT_DEVELOPER_TOOLS);
        await installExtension(REDUX_DEVTOOLS);
    }

    createWindow();
});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
        createWindow();
    }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
