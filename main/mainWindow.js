const { BrowserWindow, Menu, ipcMain, dialog } = require('electron');
const fs = require('fs');
const debug = require('debug')('electron:main');

class MainWindow extends BrowserWindow
{
    constructor(options) {
        super(options);

        const appMenu = require('./appMenu')(this);
        Menu.setApplicationMenu(Menu.buildFromTemplate(appMenu));

        ipcMain.on('match:open-file', () => {
            this.openFile();
        });

        ipcMain.on('auth:authenticated', (sender, authenticated) => {
            let menu = Menu.getApplicationMenu();

            menu.getMenuItemById('settings-profile').enabled = authenticated;
            menu.getMenuItemById('action-sign-up').enabled = !authenticated;
            menu.getMenuItemById('action-sign_in').enabled = !authenticated;
        });
    }

    openFile() {
        dialog.showOpenDialog((fileNames) => {
            // fileNames is an array that contains all the selected
            if (fileNames === undefined) {
                debug('No file selected.');
            } else {
                fs.readFile(fileNames[0], 'utf-8', (err, data) => {
                    if(err){
                        alert(`An error ocurred reading the file: ${err.message}`);
                        return;
                    }

                    // handle the file content
                    this.webContents.send('match:load', data);
                });
            }
        });
    }

    closeFile() {
        this.webContents.send('match:init');
    }
}

module.exports = MainWindow;
