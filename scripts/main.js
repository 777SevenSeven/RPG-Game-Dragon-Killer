const { app, BrowserWindow, ipcMain } = require('electron');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        fullscreen: true,
        simpleFullscreen: true,
        icon: 'imagens/dragao.ico',
        webPreferences: {
            nodeIntegration: true
        }
    });

    mainWindow.loadFile('intro.html');

    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
        mainWindow.webContents.send('show-menu'); // Envia um sinal para mostrar o menu quando a introdução estiver pronta
    });

    mainWindow.on('closed', function () {
        mainWindow = null;
    });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit();
});

app.on('activate', function () {
    if (mainWindow === null) createWindow();
});

app.on('ready', () => {
    ipcMain.on('show-menu', () => {
        mainWindow.loadFile('menu.html');
    });
});
