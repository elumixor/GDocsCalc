import "reflect-metadata"
import {remote} from "electron"
import {dragWindowOn, removeInnerWhitespacesRecursively, safeDrag} from "./dom"
import {Calculator, WorkerType} from "./windows/Calculator"
import {WindowPanel} from "./WindowPanel"
import {SignIn} from "./windows/SignIn"
import {SetSheets} from "./windows/SetSheets"

removeInnerWhitespacesRecursively(document.body)

// Draggable window
dragWindowOn()
document.getElementById("window-close")
    .addEventListener("click", safeDrag(() => remote.getCurrentWindow().close()))

const windowSignIn = new WindowPanel("window-sign-in", false)
const windowSetSheets = new WindowPanel("window-set-sheets")
const windowCalculateOffline = new WindowPanel("window-calculate-offline")

const calc = new Calculator(windowCalculateOffline)
const sign = new SignIn(windowSignIn)
const sheets = new SetSheets(windowSetSheets)

const sales = document.getElementById("selectSales")
const junior = document.getElementById("selectJunior")

sales.onclick = () => {
    calc.workerType = WorkerType.Sales
    sales.classList.add("active")
    junior.classList.remove("active")
}
junior.onclick = () => {
    calc.workerType = WorkerType.Junior
    junior.classList.add("active")
    sales.classList.remove("active")
}

const meetings = document.getElementById("inputMeetings") as HTMLInputElement
const goal = document.getElementById("inputGoal") as HTMLInputElement
const achieved = document.getElementById("inputAchieved") as HTMLInputElement

// todo: check allowed characters

meetings.oninput = () => calc.meetingsCount = parseInt(meetings.value, 10)
goal.oninput = () => calc.goal = parseInt(goal.value, 10)
achieved.oninput = () => calc.achieved = parseInt(achieved.value, 10)
