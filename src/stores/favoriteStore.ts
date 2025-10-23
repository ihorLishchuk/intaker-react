import { createStore } from "../utils";

const STORAGE_KEY = "favorites";
const initial = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "false");

export const favoriteStore = createStore<boolean>(initial);

favoriteStore.subscribe(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favoriteStore.get()));
});

export const toggleFavorites = (value: boolean) => {
    favoriteStore.set((prev) => value ?? !prev);
};
