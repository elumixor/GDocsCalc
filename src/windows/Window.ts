import {WindowPanel} from "../WindowPanel"

export abstract class Window {
    protected constructor(public readonly panel: WindowPanel) {}
}
