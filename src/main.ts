//import {parseSheetId} from "./spreadsheets"
//
//const sheetUrls = ["https://docs.google.com/spreadsheets/d/sheetID/edit?ts=5ca8cf70#gid=0",
//    "https://docs.google.com/spreadsheets/d/sheetID/",
//    "https://docs.google.com/spreadsheets/d/sheetID",
//    "docs.google.com/spreadsheets/d/sheetID/edit?ts=5ca8cf70#gid=1230",
//    "docs.google.com/spreadsheets/d/sheetID/edit",
//    "docs.google.com/spreadsheets/d/sheetID/",
//    "docs.google.com/spreadsheets/d/sheetID",
//    "sheetID/edit?ts=5ca8cf70#gid=0",
//    "sheetID/",
//    "sheetID"]
//
//sheetUrls.forEach(sheet => {
//    console.log(parseSheetId(sheet))
//})

import {app, BrowserWindow} from "electron"
import * as path from "path"
let mainWindow: Electron.BrowserWindow

function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: 500,
        height: 400,
        frame: false,
        webPreferences: {
            experimentalFeatures: true
        }
    })


    // and load the index.html of the app.
    mainWindow.loadFile(path.join(__dirname, "../index.html"))

    // Open the DevTools.
    mainWindow.webContents.openDevTools()

    // Emitted when the window is closed.
    mainWindow.on("closed", () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null
    })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow)

// Quit when all windows are closed.
app.on("window-all-closed", () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== "darwin") {
        app.quit()
    }
})

app.on("activate", () => {
    // On OS X it"s common to re-create a window in the app when the
    // dock icon is onSelected and there are no other windows open.
    if (mainWindow === null) {
        createWindow()
    }
})
