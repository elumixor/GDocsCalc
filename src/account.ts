import getPort from "get-port"
import express from "express"
import {google} from "googleapis"
import open from "open"
import keys from "./sdata/client_secret.json"
import {readJson, readJsonSync, writeJson} from "./util"
import {settings} from "./settings"

const pathToCredentials = "../config/credentials.json"
const scopes = ["https://www.googleapis.com/auth/spreadsheets"]

export let client = new google.auth.OAuth2(
    keys["web"].client_id,
    keys["web"].client_secret,
    "http://localhost:3000")

export let credentials: {
    access_token: string
    expiry_date: number
    refresh_token: string
    scope: string
    token_type: string
} = (() => {
    try {
        return readJsonSync(pathToCredentials)
    } catch (e) {
        console.warn("Could not load credentials")
        return undefined
    }
})()

export function save() {
    return writeJson(pathToCredentials, credentials)
}

export async function load() {
    credentials = await readJson(pathToCredentials)
}

export async function signIn(): Promise<any> {
    const tokensOk = false // todo: Get tokens from file, check, etc.

    // todo: success -> resolve promise
    if (tokensOk) {
        // todo
        return client
    }
    // failed -> open server
    else {
        // get free port
        const port = await getPort()

        // create express server
        const app = express()

        // Create client
        client = new google.auth.OAuth2(
            keys["web"].client_id,
            keys["web"].client_secret,
            "http://localhost:" + port)

        const authorizeUrl = client.generateAuthUrl({
            access_type: "offline",
            scope: scopes
        })

        return new Promise<any>((resolve, reject) => {
            // Redirect listener
            app.get("/", (req, res) => {
                const code = req.query.code

                client.getToken(code, (err: any, tokens: any) => {
                    if (err) {
                        console.error("Error getting OAuth tokens:")
                        reject(err)
                    }
                    credentials = tokens
                    console.log(tokens)

                    res.send("Application successfully registered. You can close the tab now.")
                    server.close()
                    resolve(client)
                })
            })

            // Open the browser to the authorize url to start the workflow
            const server = app.listen(port, () => {
                open(authorizeUrl, {wait: false})
            })
        })
    }
}
