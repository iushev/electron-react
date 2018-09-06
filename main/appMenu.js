const { app } = require('electron');

module.exports = (win) => ([
    {
        label: 'File',
        submenu: [
            {
                label: 'Open',
                click() { win.openFile(); },
            },
            // {
            //     label: 'Close',
            //     id:    'closeMenuitem',
            //     click() { win.closeFile();},
            //     //enabled: false
            // },
            {
                label: 'Quit',
                click() { app.quit(); },
            },
        ],
    },
    {
        label: 'Action',
        submenu: [
            {
                id: 'action-sign-up',
                label: 'Register',
                click(menuItem, browserWindow) {
                    browserWindow.webContents.send('navigate:to', '/sign-up');
                },
            },
            {
                id: 'action-sign_in',
                enabled: true,
                label:   'Connect',
                click(menuItem, browserWindow) {
                    browserWindow.webContents.send('navigate:to', '/sign-in');
                },
            },
            // {
            //     type:  'separator',
            // },
            // {   label: 'Ready',
            //     enabled: false,
            // },
            // {
            //     label: 'Away',
            //     enabled: false,
            // },
            // {
            //     type:  'separator',
            // },
            // {
            //     label: 'Invite',
            //     enabled: false,
            // },
            // {
            //     label: 'Watch',
            //     enabled: false,
            // },
            // {
            //     label: 'Talk',
            //     enabled: false,
            // },
            // {
            //     label: 'Info',
            //     enabled: false,
            // },
            // {
            //     type:  'separator',
            // },
            // {
            //     label: 'Friends',
            //     enabled: false,
            // },
            // {
            //     label: 'Blinded',
            //     enabled: false,
            // },
        ],
    },
    {
        label: 'Settings',
        submenu: [
            {
                id: 'settings-profile',
                label: 'Profile',
                enabled: true,
                click(menuItem, browserWindow/*, event*/) {
                    browserWindow.webContents.send('navigate:to', '/profile');
                },
            },
        ],
    },
    {
        role: 'help',
        submenu: [
            {
                label: 'About',
                click() {
                    require('electron').shell.openExternal('https://backgammon.international/about');
                },
            },
            {
                label: 'Contacts',
                click() {
                    require('electron').shell.openExternal('https://backgammon.international/contacts');
                },
            },
            {
                label: 'Open DevTools',
                click() {
                    win.webContents.openDevTools();
                },
            },
        ],
    },
]);
