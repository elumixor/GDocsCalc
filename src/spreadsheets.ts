import {google} from "googleapis"
import {client, credentials} from "./account"
import {readJson, readJsonSync, writeJson} from "./util"
import {settings} from "./settings"

const pathToSheets = "../config/spreadsheets.json"
const sheetPrefix = "spreadsheets/d/"

export let sheets: {
    goals: {
        url: string,
        sheet: string
    },
    meetings: {
        url: string,
        sheet: string
    }
} = (() => {
    try {
        return readJsonSync(pathToSheets)
    } catch (err) {
        console.warn("Could not load sheets data")
        return {
            goals: {
                url: "",
                sheet: ""
            },
            meetings: {
                url: "",
                sheet: ""
            }
        }
    }
})()

export function save() {
    return writeJson(pathToSheets, sheets)
}

export async function load() {
    sheets = await readJson(pathToSheets)
}

export function parseSheetId(url: string) {
    let before = sheetPrefix
    let indexOf = url.indexOf(before)
    let result = ""
    if (indexOf > 0) {
        const split = url.substring(indexOf + before.length).split("/")
        if (split.length < 1) result = split[0]
        else result = split[0]
    } else {
        const split = url.split("/")
        if (split.length > 0) result = split[0]
    }

    if (result.length < 1) throw new Error("Could not parse spreadsheet id")

    // todo parse gid (list id)

    return result
}

const gsheets = google.sheets("v4")

export function getSheet(id: string) {
    const cl = client
    cl.credentials = credentials
    console.log(cl)
    console.log(id)
    return gsheets.spreadsheets.get({auth: cl, spreadsheetId: id})
}

//export async function getData(credentials: any): Promise<any> {
//    return new Promise<any>((resolve, reject) => {
//        const sheet_metadata = sheets.spreadsheets.get({auth: credentials, spreadsheetId: "d"}).then(r => {
//            sheets.spreadsheets.values.get(
//                {
//                    auth: credentials,
//                    spreadsheetId,
//                    range: r.data.sheets[0].properties.title
//                },
//                (err, res) => {
//                    if (err) {
//                        console.error("The API returned an error.")
//                        console.error(err)
//                        reject(err)
//                    }
//                    resolve(res.data)
//                }
//            )
//        })
//    })
//}

export async function updateData(calculated: any) {

}
