import {singleton} from "tsyringe"
import * as fs from "fs"
import * as path from "path"

const pathToConfig = "../config/app.config.json"

export interface DataSettings {
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
}

const settings = JSON.parse(fs.readFileSync(path.join(__dirname, pathToConfig)).toString("utf8"))
export default settings
