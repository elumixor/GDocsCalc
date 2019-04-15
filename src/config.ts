import {readJson, readJsonSync, writeJson} from "./util"

const pathToConfig = "../config/app.config.json"

export function save() {
    return writeJson(pathToConfig, config)
}

export async function load() {
    config = await readJson(pathToConfig)
}

export let config: {
    revenue: {
        fixed: {
            jun: number,
            sales: number
        },
        meetings: {
            sales: {
                count: number,
                revenue: number
            },
            jun: {
                count: number,
                revenue: number
            }
        }
    },
    styles: {
        colors: {
            sales: string,
            jun: string
        }
    },
    workerType: "sales" | "jun"
} = readJsonSync(pathToConfig)
