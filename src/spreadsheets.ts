import {google} from "googleapis"
import {client, credentials} from "./account"
import {readJson, readJsonSync, writeJson} from "./util"

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
    let id = ""
    if (indexOf > 0) {
        const split = url.substring(indexOf + before.length).split("/")
        if (split.length < 1) id = split[0]
        else id = split[0]
    } else {
        const split = url.split("/")
        if (split.length > 0) id = split[0]
    }

    if (id.length < 1) throw new Error("Could not parse spreadsheet id")

    const lastGid = url.lastIndexOf("gid")
    const gid: number = lastGid < 0 ? 0 : parseInt(url.substring(lastGid + "gid".length + 1), 10)

    return {id, gid}
}

const gsheets = google.sheets("v4")

export async function getSheet(sheetData: { id: string, gid: number }): Promise<string[][]> {
    const cl = client
    cl.credentials = credentials
    const spreadsheet = await gsheets.spreadsheets.get({auth: cl, spreadsheetId: sheetData.id})
    const listTitle = (spreadsheet.data.sheets.find(s => s.properties.sheetId === sheetData.gid)
        || spreadsheet.data.sheets[0]).properties.title
    return gsheets.spreadsheets.values.get({
        auth: cl,
        spreadsheetId: sheetData.id,
        range: listTitle
    }).then(value => {
        return value.data.values
    })
}

export async function updateData(calculated: any) {

}
