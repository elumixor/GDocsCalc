import {parseSheetId} from "../src/spreadsheets"

describe("parse id", function () {
    it("should correctly parse sheet id", function () {
        const sheetUrls = ["https://docs.google.com/spreadsheets/d/sheetID/edit?ts=5ca8cf70#gid=0",
            "https://docs.google.com/spreadsheets/d/sheetID/",
            "https://docs.google.com/spreadsheets/d/sheetID",
            "docs.google.com/spreadsheets/d/sheetID/edit?ts=5ca8cf70#gid=0",
            "docs.google.com/spreadsheets/d/sheetID/edit",
            "docs.google.com/spreadsheets/d/sheetID/",
            "docs.google.com/spreadsheets/d/sheetID",
            "sheetID/edit?ts=5ca8cf70#gid=0",
            "sheetID/",
            "sheetID"]

        sheetUrls.forEach(sheet => expect("sheetID").toBe(parseSheetId(sheet).id))
    })
})
