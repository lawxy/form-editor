export class Emitter {
  listeners: Map<string, ((...args: any[]) => any)[]> = new Map();

  private hasEvent(event: string): boolean {
    return this.listeners.has(event);
  }

  on(event: string, listener: (...args: any) => any) {
    if (this.hasEvent(event)) {
      this.listeners.get(event)?.push(listener);
    } else {
      this.listeners.set(event, [listener]);
    }
  }

  emit(event: string, ...args: any) {
    if (!this.hasEvent(event)) return;
    this.listeners.get(event)?.forEach((listener) => {
      listener?.(...args);
    });
  }

  off(event: string, listener: (...args: any) => any) {
    if (!this.hasEvent(event)) return;
    const listeners = this.listeners.get(event);
    if (!listeners?.length) return;
    const index = listeners?.indexOf(listener);
    if (index !== -1) {
      listeners?.splice(index!, 1);
    }
  }
}
