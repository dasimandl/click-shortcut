const { app, BrowserWindow } = require('electron')
console.log("🚀 ~ file: main.js ~ line 2 ~ BrowserWindow", BrowserWindow)
console.log("🚀 ~ file: main.js ~ line 2 ~ app", app)

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    })

    win.loadFile('index.html')
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})