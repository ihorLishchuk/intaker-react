import { useSyncExternalStore } from "react";

export function createStore<T>(initialValue: T) {
    let state = initialValue;
    const listeners = new Set<() => void>();

    const getSnapshot = () => state;

    const subscribe = (listener: () => void) => {
        listeners.add(listener);
        return () => listeners.delete(listener);
    };

    const setState = (next: T | ((prev: T) => T)) => {
        state = typeof next === "function" ? (next as (prev: T) => T)(state) : next;
        listeners.forEach(fn => fn());
    };

    const useStore = () => useSyncExternalStore<T>(subscribe, getSnapshot);

    return { get: getSnapshot, set: setState, useStore, subscribe };
}
