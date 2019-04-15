import {readJson, readJsonSync, writeJson} from "./util"

const pathToConfig = "../config/app.config.json"

export function save() {
    return writeJson(pathToConfig, settings)
}

export async function load() {
    settings = await readJson(pathToConfig)
}

export let settings: {
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
    }
} = readJsonSync(pathToConfig)
