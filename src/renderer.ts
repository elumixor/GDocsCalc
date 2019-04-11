import {remote} from "electron"
import {dragWindowOn, removeInnerWhitespacesRecursively, safeDrag} from "./dom"
import {Application, WorkerType} from "./Application"

const app = new Application()

removeInnerWhitespacesRecursively(document.body)

// Draggable window
dragWindowOn()
document.getElementById("window-close")
    .addEventListener("click", safeDrag(() => remote.getCurrentWindow().close()))

const sales = document.getElementById("selectSales")
const junior = document.getElementById("selectJunior")

sales.onclick = () => {
    app.workerType = WorkerType.Sales
    sales.classList.add("active")
    junior.classList.remove("active")
}
junior.onclick = () => {
    app.workerType = WorkerType.Junior
    junior.classList.add("active")
    sales.classList.remove("active")
}

const meetings = document.getElementById("inputMeetings") as HTMLInputElement
const goal = document.getElementById("inputGoal") as HTMLInputElement
const achieved = document.getElementById("inputAchieved") as HTMLInputElement

// todo: check allowed characters

meetings.oninput = () => app.meetingsCount = parseInt(meetings.value, 10)
goal.oninput = () => app.goal = parseInt(goal.value, 10)
achieved.oninput = () => app.achieved = parseInt(achieved.value, 10)
