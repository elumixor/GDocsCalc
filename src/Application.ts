export enum WorkerType {
    Sales, Junior
}

const revenueSpan = document.getElementById("revenue") as HTMLSpanElement
const fixed = {
    sales: 15_000,
    junior: 10_000
}
const meetings = {
    sales: {
        count: 15,
        revenue: 4_000
    },
    junior: {
        count: 8,
        revenue: 2_000
    }
}

export class Application {
    //region Worker Type
    private _workerType: WorkerType

    public get workerType() {
        return this._workerType
    }

    public set workerType(w: WorkerType) {
        document.body.style.backgroundColor = w === WorkerType.Sales ? "#D8E8FF" : "#E0FFD8"
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
            revenue += fixed.sales

            if (this.meetingsCount >= meetings.sales.count)
                revenue += meetings.sales.revenue
        } else {
            revenue += fixed.junior

            if (this.meetingsCount >= meetings.junior.count)
                revenue += meetings.junior.revenue
        }

        revenue = Math.max(revenue, 0)

        if (this._achieved > 0 && this._goal > 0) {

            const percentage = this._achieved / this._goal
            console.log(percentage)

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

    constructor() {
        this.workerType = WorkerType.Sales
    }
}
