import * as sheetId from "../sdata/sheetId.json"
import {google} from "googleapis"

const spreadsheetId = sheetId.id
const sheets = google.sheets("v4")

export async function getData(credentials: any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
        const sheet_metadata = sheets.spreadsheets.get({auth: credentials, spreadsheetId}).then(r => {
            sheets.spreadsheets.values.get(
                {
                    auth: credentials,
                    spreadsheetId,
                    range: r.data.sheets[0].properties.title
                },
                (err, res) => {
                    if (err) {
                        console.error("The API returned an error.")
                        console.error(err)
                        reject(err)
                    }
                    resolve(res.data)
                }
            )
        })
    })
}

export async function updateData(calculated: any) {

}
