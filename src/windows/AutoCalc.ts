import {default as conf, config, save} from "../config"
import {WindowPanel} from "../WindowPanel"
import {Window} from "./Window"
import {calculate} from "../calculator"

const revenueSpan = document.getElementById("onl-revenue") as HTMLSpanElement

export class AutoCalc extends Window {
    private meetingsField: HTMLElement
    private goalsField: HTMLElement

    //region Worker Type
    public get workerType() {
        return config.workerType
    }

    public set workerType(w: "sales" | "jun") {
        this.panel.background = w === "sales"
            ? config.styles.colors.sales : config.styles.colors.jun
        config.workerType = w
        save()
        this.calculate()
    }

    //endregion

    //region Meetings count
    private _meetingsCount: number

    public set meetingsCount(m: number) {
        this._meetingsCount = m
        this.meetingsField.innerText = String(m)
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
        console.log(m)
        this.goalsField.innerText = String(m)
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

    private sales: HTMLElement
    private junior: HTMLElement

    constructor(panel: WindowPanel) {
        super(panel)
        this.workerType = "sales"

        this.sales = document.getElementById("onl-selectSales")
        this.junior = document.getElementById("onl-selectJunior")
        this.meetingsField = document.getElementById("fetched-meetings")
        this.goalsField = document.getElementById("fetched-goal")

        this.sales.onclick = () => {
            this.workerType = "sales"
            this.sales.classList.add("active")
            this.junior.classList.remove("active")
        }
        this.junior.onclick = () => {
            this.workerType = "jun"
            this.junior.classList.add("active")
            this.sales.classList.remove("active")
        }

        const achieved = document.getElementById("onl-inputAchieved") as HTMLInputElement

        // todo: check allowed characters

        achieved.oninput = () => this.achieved = parseInt(achieved.value, 10)
    }
}
