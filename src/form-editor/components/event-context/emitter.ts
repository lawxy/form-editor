import { EventEmitter } from 'events';

export class Emitter {
  private emitter = new EventEmitter();
  private listeners: Map<string, ((...args: any[]) => any)[]> = new Map();

  private hasEvent(event: string): boolean {
    return this.listeners.has(event);
  }

  on(event: string, listener: (...args: any) => any) {
    if (this.hasEvent(event)) {
      this.listeners.get(event)?.push(listener);
    } else {
      this.listeners.set(event, [listener]);
    }
    this.emitter.on(event, listener);
  }

  emit(event: string, ...args: any) {
    if (!this.hasEvent(event)) return;
    this.listeners.get(event)?.map((listener) => {
      listener?.(...args);
    });
    this.emitter.emit(event, ...args);
  }

  off(event: string, listener: (...args: any) => any) {
    if (!this.hasEvent(event)) return;
    const listeners = this.listeners.get(event);
    if (!listeners?.length) return;
    const index = listeners?.indexOf(listener);
    if (index !== -1) {
      listeners?.splice(index!, 1);
    }
    this.emitter.off(event, listener);
  }
}
