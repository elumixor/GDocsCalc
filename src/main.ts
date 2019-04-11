import * as auth from "./authorization"
import * as ss from "./spreadsheet"
import {sheets} from "googleapis/build/src/apis/sheets"

// Login
auth.login().then(async (credentials) => {
        // Get data from spreadsheet
        const data = await ss.getData(credentials)

        // Calculate required data
        const calculated = calculateData(data)

        // Updated spreadsheet with calculated data
        ss.updateData(calculated).catch(err => {
            console.error(err)
        })
    }, (err) => {
        console.error(err)
    }
)

/** Calculates TODO from TODO */
function calculateData(data) {
    console.log(data);
    return data;
}
//client.credentials = tokens



///**
// * Print the names and majors of students in a sample spreadsheet:
// * https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
// */
function listMajors(auth) {

    //
    //let requests = []
    //
    //// Change the spreadsheet's title.
    //requests.push({
    //    updateSpreadsheetProperties: {
    //        properties: {
    //            title: "skdjaskdjksj"
    //        },
    //        fields: "title"
    //    }
    //})
    //// Find and replace text.
    //requests.push({
    //    findReplace: {
    //        find: "hellohello",
    //        replacement: "vled",
    //        allSheets: true
    //    }
    //})
    //// Add additional requests (operations) ...
    //const batchUpdateRequest = {requests}
    //
    //sheets.spreadsheets.batchUpdate({
    //    // The ID of the spreadsheet to update.
    //    auth: auth,
    //    spreadsheetId: "1zg_WPZlTZ3rlkSiPNxnd_6jebF3iKMJA0LWfcGAd3UQ",
    //    // The A1 notation of the values to update.
    //    //@ts-ignore
    //    resource: batchUpdateRequest
    //}, (res, err) => {
    //    if (err) {
    //        console.log(err)
    //    }
    //    console.log(res)
    //})

    let values = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [10, 23, "dot"]
    ]
    sheets.spreadsheets.values.update({
        auth: auth,
        spreadsheetId,
        range: "Sheet1!D1:F4",
        valueInputOption: "RAW",
        //@ts-ignore
        resource: {
            values
        }
    }, (err, result) => {
        if (err) {
            // Handle error
            console.log(err)
            throw err
        } else {
            console.log(result)
            console.log("%d cells updated.", result.updatedCells)
        }
    })
}
//
//// [END main_body]
