const getPort = require("get-port")
import express from "express"
import {google} from "googleapis"
import open from "open"
import * as keys from "../sdata/client_secret.json"

const scopes = ["https://www.googleapis.com/auth/spreadsheets"]
export async function login(): Promise<any> {
    const tokensOk = false // todo: Get tokens from file, check, etc.

    // todo: success -> resolve promise
    if (tokensOk) {
        // todo
        const cl = new google.auth.OAuth2(
            keys["web"].client_id,
            keys["web"].client_secret,
            "http://localhost:3000"
        )

        return cl
    }
    // failed -> open server
    else {
        // get free port
        const port = await getPort()
        console.log("Free port found on: " + port)

        // create express server
        const app = express()

        // Create client
        const client = new google.auth.OAuth2(
            keys["web"].client_id,
            keys["web"].client_secret,
            "http://localhost:" + port
        )

        const authorizeUrl = client.generateAuthUrl({
            access_type: "offline",
            scope: scopes
        })

        return new Promise<any>((resolve, reject) => {
            // Redirect listener
            app.get("/", (req, res) => {
                const code = req.query.code

                client.getToken(code, (err, tokens) => {
                    if (err) {
                        console.error("Error getting OAuth tokens:")
                        reject(err)
                    }
                    client.credentials = tokens
                    res.send("Authentication successful! Please return to the console.")
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
