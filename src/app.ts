import "reflect-metadata"
import {dragWindowOn, removeInnerWhitespacesRecursively, safeDrag} from "./dom"
import {container} from "tsyringe"
import {Application} from "./Application"

removeInnerWhitespacesRecursively(document.body)

// Draggable window
dragWindowOn()

const app = container.resolve(Application)
