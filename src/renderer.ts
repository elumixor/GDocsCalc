// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

import {remote} from "electron"
import * as path from "path"

const fs = remote.require("fs")

const directoryPath = path.join(__dirname, "../data/data")
//// passing directoryPath and callback function
fs.readdir(directoryPath, (err: any, files: any[]) => {
    // handling error
    if (err) {
        return console.log("Unable to scan directory: " + err)
    }
    // listing all files using forEach
    files.forEach(file => {
        // Do whatever you want to do with the file
        console.log(file)
    })
})
