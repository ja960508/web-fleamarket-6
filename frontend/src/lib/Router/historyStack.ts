class HistoryStack {
  private historyStack: string[];
  private observers: CallableFunction[];
  constructor() {
    this.historyStack = [location.pathname];
    this.observers = [];
  }

  push(nextHistory: string) {
    this.historyStack.push(nextHistory);
  }

  pop() {
    this.historyStack.pop();
  }

  update(updateHistory: string) {
    this.historyStack[this.historyStack.length - 1] = updateHistory;
  }

  get size() {
    return this.historyStack.length;
  }
}

export default new HistoryStack();
