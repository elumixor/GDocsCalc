import "reflect-metadata"
import {remote} from "electron"
import {dragWindowOn, removeInnerWhitespacesRecursively, safeDrag} from "./dom"
import {OfflineCalc} from "./windows/OfflineCalc"
import {WindowPanel} from "./WindowPanel"
import {SignIn} from "./windows/SignIn"
import {SetSheets} from "./windows/SetSheets"
import {AutoCalc} from "./windows/AutoCalc"
import {Settings} from "./windows/Settings"
import {container} from "tsyringe"
import {Application} from "./Application"

removeInnerWhitespacesRecursively(document.body)

// Draggable window
dragWindowOn()

const app = container.resolve(Application)
