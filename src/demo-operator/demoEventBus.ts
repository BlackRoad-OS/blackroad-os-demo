export type DemoEventHandler = (event: DemoEvent) => Promise<void> | void;

export interface DemoEvent {
  id: string;
  type: string;
  source: string;
  timestamp: string;
  payload: unknown;
}

export interface DemoEventBus {
  publish(event: DemoEvent): Promise<void>;
  subscribe(type: string, handler: DemoEventHandler): void;
}

export class InMemoryDemoEventBus implements DemoEventBus {
  private handlers = new Map<string, DemoEventHandler[]>();

  subscribe(type: string, handler: DemoEventHandler): void {
    const arr = this.handlers.get(type) || [];
    arr.push(handler);
    this.handlers.set(type, arr);
  }

  async publish(event: DemoEvent): Promise<void> {
    const handlers = this.handlers.get(event.type) || [];
    for (const h of handlers) {
      await h(event);
    }
  }
}
