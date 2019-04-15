import {singleton} from "tsyringe"
import {WindowPanel} from "../WindowPanel"
import {Window} from "./Window"
import {settings} from "../settings"

export enum WorkerType {
    Sales, Junior
}

const revenueSpan = document.getElementById("revenue") as HTMLSpanElement

export class OfflineCalc extends Window {
    //region Worker Type
    private _workerType: WorkerType

    public get workerType() {
        return this._workerType
    }

    public set workerType(w: WorkerType) {
        this.panel.background = w === WorkerType.Sales
            ? settings.styles.colors.sales : settings.styles.colors.jun
        this._workerType = w
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
        let revenue = 0
        if (this.workerType === WorkerType.Sales) {
            revenue += settings.revenue.fixed.sales

            if (this.meetingsCount >= settings.revenue.meetings.sales.count)
                revenue += settings.revenue.meetings.sales.revenue
        } else {
            revenue += settings.revenue.fixed.jun

            if (this.meetingsCount >= settings.revenue.meetings.jun.count)
                revenue += settings.revenue.meetings.jun.revenue
        }

        revenue = Math.max(revenue, 0)

        if (this._achieved > 0 && this._goal > 0) {

            const percentage = this._achieved / this._goal

            // todo[Spec] in == 0.75, == 90,
            if (percentage > .75 && percentage < .9) {
                revenue += 0.02 * this._achieved
            } else if (percentage > .9) {
                revenue += 0.04 * this._achieved

                if (percentage > 1) {
                    const delta = this._achieved - this._goal
                    revenue += 0.05 * delta
                }
            }
        }

        revenueSpan.innerText = String(revenue)
    }

    constructor(panel: WindowPanel) {
        super(panel)
        this.workerType = WorkerType.Sales

        const sales = document.getElementById("selectSales")
        const junior = document.getElementById("selectJunior")

        sales.onclick = () => {
            this.workerType = WorkerType.Sales
            sales.classList.add("active")
            junior.classList.remove("active")
        }
        junior.onclick = () => {
            this.workerType = WorkerType.Junior
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
