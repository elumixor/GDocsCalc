import {singleton} from "tsyringe"
import {Window} from "./windows/Window"
import {OfflineCalc} from "./windows/OfflineCalc"
import {WindowPanel} from "./WindowPanel"
import {SignIn} from "./windows/SignIn"
import {SetSheets} from "./windows/SetSheets"
import {AutoCalc} from "./windows/AutoCalc"
import {Settings} from "./windows/Settings"
import {safeDrag} from "./dom"
import {remote} from "electron"
import * as account from "./account"
import * as s from "./settings"
import {getSheet, parseSheetId, sheets} from "./spreadsheets"

export class SettingOption {
    constructor(public readonly displayName: string,
                public readonly onSelected: () => void,
                public active = true) {}
}

export interface SettingsOptions {
    goOnline: SettingOption,
    changeAccount: SettingOption,
    changeSpreadsheets: SettingOption,
    useOffline: SettingOption,
}

@singleton()
export class Application {
    private goalSheet: any = null
    private meetingsSheet: any = null

    public get isLoggedIn(): boolean {
        return account.credentials != undefined
    }

    private async getSheets() {
        console.log(sheets)
        console.log(sheets.goals)
        console.log(sheets.goals.url)
        return Promise.all([
            (async () => this.goalSheet = await getSheet(parseSheetId(sheets.goals.url)))(),
            (async () => this.meetingsSheet = await getSheet(parseSheetId(sheets.meetings.url)))()])
    }

    public get sheetsOk() {
        return this.goalSheet !== null && this.meetingsSheet !== null
    }

    private usingOffline = false

    private currentWindow: Window

    private windows: { [key: string]: Window } = {}
    private readonly optionsTotal: SettingsOptions

    public get options(): SettingOption[] {
        const options: SettingOption[] = []

        options.push(this.isLoggedIn ?
            this.optionsTotal.changeAccount
            : this.optionsTotal.goOnline)

        options.push(this.optionsTotal.changeSpreadsheets)

        if (this.isLoggedIn) options.push(this.optionsTotal.useOffline)

        return options
    }

    private open(w: Window) {
        this.currentWindow.panel.hide()
        w.panel.show()
        this.currentWindow = w
    }

    constructor() {
        const offlineCalc = new OfflineCalc(new WindowPanel("window-calculate-offline"))
        const sign = new SignIn(new WindowPanel("window-sign-in"))
        const sheets = new SetSheets(new WindowPanel("window-set-sheets"))
        const autoCalc = new AutoCalc(new WindowPanel("window-calculate-online"))
        const settings = new Settings(new WindowPanel("window-settings"))

        this.currentWindow = sign

        // Window control
        document.getElementById("window-close").onclick = safeDrag(() => remote.getCurrentWindow().close())
        document.getElementById("open-settings").onclick = safeDrag(() => {
            settings.options = this.options
            settings.toggle()
        })

        const onSheetsSaved = () => {
            if (this.isLoggedIn) {
                this.getSheets().then(
                    () => {
                        // todo: assign fetched spreadsheet data
                        console.log(this.goalSheet)
                        console.log(this.meetingsSheet)

                        this.open(autoCalc)
                    },
                    err => {
                        console.warn("Could not get spreadsheet data", err)
                        this.open(sheets)
                    })
            } else if (this.usingOffline) this.open(offlineCalc)
            else this.open(sign)
        }

        sign.singedId.subscribe(() => {
            account.signIn().then(() => {
                account.save().then(() => console.log("credentials saved!", account.credentials),
                    err => console.warn("Could not save credentials to a file.", err))
                this.getSheets().then(
                    () => this.open(autoCalc),
                    err => {
                        console.warn("Could not get spreadsheet data", err)
                        this.open(sheets)
                    })
            }, (err) => {
                console.log(err)
            })
        })

        sign.offlineUse.subscribe(() => this.open(offlineCalc))

        sheets.saved.subscribe(() => onSheetsSaved())

        this.optionsTotal = {
            goOnline: new SettingOption("Go online", () => {
                settings.panel.hide()

                this.usingOffline = false
                this.open(sign)
            }),
            changeAccount: new SettingOption("Change account", () => {
                settings.panel.hide()

                // logout
                this.open(sign)

            }),
            changeSpreadsheets: new SettingOption("Change spreadsheets url", () => {
                settings.panel.hide()

                this.open(sheets)

            }),
            useOffline: new SettingOption("Use offline", () => {
                settings.panel.hide()

                this.usingOffline = true
                // logout...
                // actually dont logout.....

                this.open(offlineCalc)
            })
        }

        // Start main logic
        onSheetsSaved()
    }
}
