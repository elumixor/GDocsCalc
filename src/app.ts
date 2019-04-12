import "reflect-metadata"
import {remote} from "electron"
import {dragWindowOn, removeInnerWhitespacesRecursively, safeDrag} from "./dom"
import {OfflineCalc} from "./windows/OfflineCalc"
import {WindowPanel} from "./WindowPanel"
import {SignIn} from "./windows/SignIn"
import {SetSheets} from "./windows/SetSheets"
import {AutoCalc} from "./windows/AutoCalc"

removeInnerWhitespacesRecursively(document.body)

// Draggable window
dragWindowOn()
document.getElementById("window-close")
    .addEventListener("click", safeDrag(() => remote.getCurrentWindow().close()))

const offlineCalc = new OfflineCalc(new WindowPanel("window-calculate-offline"))
const sign = new SignIn(new WindowPanel("window-sign-in", false))
const sheets = new SetSheets(new WindowPanel("window-set-sheets"))
const autoCalc = new AutoCalc(new WindowPanel("window-calculate-online"))

sign.singedId.subscribe(() => {
    sign.panel.hide()
    sheets.panel.show()
})

sheets.saved.subscribe(() => {
    sheets.panel.hide()
    autoCalc.panel.show()
})
