// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain, shell, dialog } = require('electron');
const path = require('path');

const index = `file://${__dirname}/dist/index.html`;
const land = `file://${__dirname}/dist/land.html`;

let mainWindow;

if (process.defaultApp) {
    if (process.argv.length >= 2) {
        app.setAsDefaultProtocolClient('id-electron', process.execPath, [path.resolve(process.argv[1])]);
    }
} else {
    app.setAsDefaultProtocolClient('id-electron');
}

const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
    app.quit();
} else {
    app.on('second-instance', (event, commandLine, workingDirectory) => {
        // Someone tried to run a second instance, we should focus our window.
        if (mainWindow) {
            if (mainWindow.isMinimized()) {
                mainWindow.restore();
            }

            mainWindow.focus();

            commandLine.forEach((value) => {
                if (value.startsWith('id-electron://open')) {
                    let command = value.replace('id-electron://open', '');
                    mainWindow.loadURL(index + command);
                } else if (value.startsWith('id-electron://auth')) {
                    let command = value.replace('id-electron://auth', '');
                    mainWindow.loadURL(land + command);
                }
            });
        }
    });

    // Create mainWindow, load the rest of the app, etc...
    app.whenReady().then(() => {
        createWindow();
    });
}

function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        }
    })

    mainWindow.loadURL(index);
    
    mainWindow.webContents.openDevTools();

    mainWindow.webContents.setWindowOpenHandler(({ url }) => {
        if (url === 'about:blank') {
            return {
                action: 'allow',
                overrideBrowserWindowOptions: {
                    frame: true,
                    autoHideMenuBar: true,
                    fullscreenable: false,
                    backgroundColor: 'black',
                    webPreferences: {
                        preload: path.join(__dirname, 'preload.js'),
                    }
                }
            }
        } else {
            shell.openExternal(url);
            return { action: 'deny' }
        }
    });
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
