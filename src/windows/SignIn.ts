import {Window} from "./Window"
import {WindowPanel} from "../WindowPanel"
import {EventEmitter} from "../EventEmitter"

export class SignIn extends Window {
    public singedId = new EventEmitter()
    public offlineUse = new EventEmitter()

    constructor(panel: WindowPanel) {
        super(panel)

        const googleButton = document.getElementById("google-sign-in")
        const useOffline = document.getElementById("use-offline")

        googleButton.onclick = () => {
            // todo: what if sign in failed
            this.singedId.emit()
        }

        useOffline.onclick = () => {
            this.offlineUse.emit()
        }
    }
}
