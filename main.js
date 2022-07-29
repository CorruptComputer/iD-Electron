// Modules to control application life and create native browser window
const { app, BrowserWindow, shell } = require('electron');
const path = require('path');

const gotTheLock = app.requestSingleInstanceLock()

if (!gotTheLock) {
  app.quit()
}

function createWindow () {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    });


    // and load the index.html of the app.
    mainWindow.loadFile('dist/index.html')

    // Open the DevTools.
    mainWindow.webContents.openDevTools();

    // Open external links in the users browser
    mainWindow.webContents.setWindowOpenHandler(function(e, url) {
        e.preventDefault();
        shell.openExternal(url);
    });
}

app.on('second-instance', (event, commandLine, workingDirectory) => {
    // Someone tried to run a second instance, we should focus our window.
    if (mainWindow) {
        if (mainWindow.isMinimized()) {
            mainWindow.restore();
        }

        mainWindow.focus();
    }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
    createWindow();

    app.on('activate', function () {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

// Handle the protocol. In this case, we choose to show an Error Box.
app.on('open-url', (event, url) => {
    console.log('Arrived from: ' + url);

    // TODO: fix this to actually handle the URL properly
    mainWindow.loadFile('dist/index.html')
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
let isDefault = app.isDefaultProtocolClient('id-electron');

if (!isDefault) {
    console.log('Not the default handler for id-electron:// links, adding...');

    let handlerRegistered = app.setAsDefaultProtocolClient('id-electron');
    console.log('Handler registered successfully? ' + handlerRegistered);
}
