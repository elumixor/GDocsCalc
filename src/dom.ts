import {remote} from "electron"

export function createDiv(className ?: string) {
    const el = document.createElement("div")
    el.className = className || ""
    return el
}

export function createCanvas(className ?: string) {
    const el = document.createElement("canvas")
    el.className = className || ""
    return el
}

export function insertAfter(newNode: Node, referenceNode: Node) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling)
}

/** Recursively removes empty whitespace nodes from an element and its children */
export function removeInnerWhitespacesRecursively(element: Node) {
    for (let i = 0; i < element.childNodes.length; i++) {
        const cn = element.childNodes.item(i)
        if (cn.nodeType === 3) {
            if (!/\S/.test(cn.textContent)) {
                element.removeChild(cn)
                i--
            }
        } else {
            removeInnerWhitespacesRecursively(cn)
        }
    }
}

// Window dragging
let mousePosition
let offset = [0, 0]
let isDown = false
let windowDragged = false

/** Execute the function only if no window dragging has occurred */
export function safeDrag<T extends (...args: any[]) => any>(func: T):
    (...funcArgs: Parameters<T>) => ReturnType<T> | void {

    return (...args: Parameters<T>): ReturnType<T> => {
        if (!windowDragged)
            return func(...args)
    }
}

export function dragWindowOn() {
    const w = remote.getCurrentWindow()

    document.body.addEventListener("mousedown", e => {
        // todo: check if any event is focused

        //e.preventDefault()
        isDown = true
        windowDragged = false

        offset = [
            e.clientX,
            e.clientY
        ]
    }, true)

    addEventListener("mouseup", () => {
        isDown = false
    }, true)

    addEventListener("mousemove", event => {
        event.preventDefault()
        if (isDown) {
            mousePosition = {
                x: event.clientX,
                y: event.clientY
            }
            windowDragged = true
            w.setPosition(w.getPosition()[0] + mousePosition.x - offset[0],
                w.getPosition()[1] + mousePosition.y - offset[1])
        }
        return false
    }, true)
}
