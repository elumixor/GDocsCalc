import {Window} from "./Window"
import {WindowPanel} from "../WindowPanel"
import {EventEmitter} from "../EventEmitter"
import {SettingOption} from "../Application"
import {createDiv, createSpan, removeChildren} from "../dom"

export class Settings extends Window {
    public saved = new EventEmitter()
    options: SettingOption[] = []
    private readonly window: HTMLDivElement

    constructor(panel: WindowPanel) {
        super(panel)

        this.window = document.getElementById("window-settings") as HTMLDivElement
    }

    public toggle() {
        const content = this.window.firstChild
        removeChildren(content)
        this.options.forEach(option => {
            const div = createDiv("setting-option")
            const span = createSpan("button")
            span.innerText = option.displayName
            span.onclick = option.onSelected
            div.appendChild(span)
            content.appendChild(div)
        })
        if (this.panel.isOpen) this.panel.hide()
        else this.panel.show()
    }

}
