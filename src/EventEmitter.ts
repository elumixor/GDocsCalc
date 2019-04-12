export class EventEmitter<T = void> {
    private recipients: Array<(arg: T) => any> = []

    public emit(data: T): void {
        this.recipients.forEach(s => s(data))
    }

    public subscribe(f: (arg: T) => any): void {
        this.recipients.push(f)
    }

    public unsubscribe(): void {
        this.recipients = []
    }
}
