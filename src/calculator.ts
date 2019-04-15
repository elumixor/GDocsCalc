import {config} from "./config"

export function calculate(workerType: "sales" | "jun", meetingsCount: number, goal: number, achieved: number): number {
    let revenue = 0
    if (workerType === "sales") {
        revenue += config.revenue.fixed.sales

        if (meetingsCount >= config.revenue.meetings.sales.count)
            revenue += config.revenue.meetings.sales.revenue
    } else {
        revenue += config.revenue.fixed.jun

        if (meetingsCount >= config.revenue.meetings.jun.count)
            revenue += config.revenue.meetings.jun.revenue
    }

    if (achieved > 0 && goal > 0) {

        const percentage = achieved / goal

        if (percentage >= .75 && percentage < .9)
            revenue += 0.02 * achieved
        else if (percentage >= .9) {
            revenue += 0.04 * achieved

            if (percentage > 1) {
                const delta = achieved - goal
                revenue += 0.05 * delta
            }
        }
    }

    return Math.round(Math.max(revenue, 0))
}
