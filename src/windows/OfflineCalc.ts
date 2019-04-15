import {WindowPanel} from "../WindowPanel"
import {Window} from "./Window"
import {config, save} from "../config"
import {calculate} from "../calculator"

const revenueSpan = document.getElementById("revenue") as HTMLSpanElement

export class OfflineCalc extends Window {
    //region Worker Type
    public get workerType() {
        return config.workerType
    }

    public set workerType(w: "sales" | "jun") {
        this.panel.background = w === "sales"
            ? config.styles.colors.sales : config.styles.colors.jun
        config.workerType = w
        // todo: this should be saved on app exit
        save()
        this.calculate()
    }

    //endregion

    //region Meetings count
    private _meetingsCount: number

    public set meetingsCount(m: number) {
        this._meetingsCount = m
        this.calculate()
    }

    public get meetingsCount() {
        return this._meetingsCount
    }

    //endregion

    //region Goal
    private _goal: number

    public set goal(m: number) {
        this._goal = m
        this.calculate()
    }

    public get goal() {
        return this._goal
    }

    //endregion

    //region Achieved
    private _achieved: number

    public set achieved(m: number) {
        this._achieved = m
        this.calculate()
    }

    public get achieved() {
        return this._achieved
    }

    //endregion

    //region Revenue
    private _revenue = 0

    public get revenue() {
        return this._revenue
    }

    //endregion

    /** Calculate total revenue */
    private calculate() {
        revenueSpan.innerText = String(calculate(this.workerType, this.meetingsCount, this.goal, this.achieved))
    }

    constructor(panel: WindowPanel) {
        super(panel)
        this.workerType = "sales"

        const sales = document.getElementById("selectSales")
        const junior = document.getElementById("selectJunior")

        sales.onclick = () => {
            this.workerType = "sales"
            sales.classList.add("active")
            junior.classList.remove("active")
        }
        junior.onclick = () => {
            this.workerType = "jun"
            junior.classList.add("active")
            sales.classList.remove("active")
        }

        const meetings = document.getElementById("inputMeetings") as HTMLInputElement
        const goal = document.getElementById("inputGoal") as HTMLInputElement
        const achieved = document.getElementById("inputAchieved") as HTMLInputElement

        // todo: check allowed characters

        meetings.oninput = () => this.meetingsCount = parseInt(meetings.value, 10)
        goal.oninput = () => this.goal = parseInt(goal.value, 10)
        achieved.oninput = () => this.achieved = parseInt(achieved.value, 10)
    }
}
