import {Window} from "./Window"
import {WindowPanel} from "../WindowPanel"
import {EventEmitter} from "../EventEmitter"
import * as ss from "../spreadsheets"

export class SetSheets extends Window {
    public saved = new EventEmitter()

    constructor(panel: WindowPanel) {
        super(panel)

        const goalsSheet = document.getElementById("goals-sheet") as HTMLInputElement
        const meetingsSheet = document.getElementById("meetings-sheet") as HTMLInputElement
        const saveSheets = document.getElementById("save-sheets") as HTMLSpanElement

        saveSheets.onclick = () => {
            const goalsUrl = goalsSheet.value
            const meetingsUrl = meetingsSheet.value

            ss.sheets.goals.url = goalsUrl
            ss.sheets.meetings.url = meetingsUrl

            ss.save()

            this.saved.emit()
        }
    }
}
