import {WindowPanel} from "../WindowPanel"

export abstract class Window {
    protected constructor(protected panel: WindowPanel) {}
}
