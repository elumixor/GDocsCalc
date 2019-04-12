import {Window} from "./Window"
import {WindowPanel} from "../WindowPanel"
import {EventEmitter} from "../EventEmitter"

export class SetSheets extends Window {
    public saved = new EventEmitter()

    constructor(panel: WindowPanel) {
        super(panel)

        const goalsSheet = document.getElementById("goals-sheet") as HTMLInputElement
        const meetingsSheet = document.getElementById("meetings-sheet") as HTMLInputElement
        const saveSheets = document.getElementById("save-sheets") as HTMLSpanElement

        saveSheets.onclick = () => {
            const goalsUrl = goalsSheet.value
            const meetinsUrl = meetingsSheet.value

            // todo: parse sheets id
            // todo: save values
            // todo: check if sheets ids are ok

            this.saved.emit()
        }
    }
}
