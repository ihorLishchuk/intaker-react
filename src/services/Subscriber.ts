class Subscriber {
    private listeners = new Set<() => void>();

    // Subscribe a component to updates
    public subscribe(listener: () => void) {
        this.listeners.add(listener);
    }

    // Unsubscribe a component from updates
    public unsubscribe(listener: () => void) {
        this.listeners.delete(listener);
    }

    // Notify all subscribers about changes
    public notifySubscribers() {
        this.listeners.forEach(listener => listener());
    }
}

export default Subscriber;