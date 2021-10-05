class EventEmitter {
  constructor() {
    this.events = {};
  }

  on(eventName, callback) {
    if (typeof this.events[eventName] !== "object") {
      this.events[eventName] = [];
    }
    this.events[eventName].push(callback);
  }

  emit(event, ...args) {
    let listeners;
    if (typeof this.events[event] === "object") {
      listeners = this.events[event].slice();

      listeners.forEach((listener) => {
        listener.apply(this, args);
      });
    }
  }
}

export { EventEmitter };
