export class WindowPanel {
    private static readonly panels: WindowPanel[ ] = []
    private panelDiv: HTMLDivElement

    set background(bg: string) {
        this.panelDiv.style.backgroundColor = bg
    }

    get isOpen() {
        return !this.panelDiv.hidden
    }

    constructor(id: string, hidden = true) {
        this.panelDiv = document.getElementById(id) as HTMLDivElement
        this.panelDiv.hidden = hidden
        WindowPanel.panels.push(this)
    }

    show() {
        this.panelDiv.hidden = false
    }

    public overlay() {

    }

    public hide() {
        this.panelDiv.hidden = true
    }
}
