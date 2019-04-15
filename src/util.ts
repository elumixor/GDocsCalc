import * as fs from "fs"
import * as path from "path"
import {promisify} from "util"

export function writeJson(file: string, data: any) {
    return promisify(fs.writeFile)(path.join(__dirname, file), JSON.stringify(data), "utf8")
}

export async function readJson(file: string) {
    return JSON.parse((await promisify(fs.readFile)(path.join(__dirname, file))).toString())
}

export function readJsonSync(file: string) {
    return JSON.parse(fs.readFileSync(path.join(__dirname, file)).toString("utf8"))
}
