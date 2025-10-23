import { createStore } from "../utils";
import { WidgetEntity } from "../entities";

const STORAGE_KEY = "widgets";
const initial = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");

export const widgetStore = createStore<WidgetEntity[]>(initial);

widgetStore.subscribe(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(widgetStore.get()));
});

export const addNewWidget = (widget: WidgetEntity) => {
    widgetStore.set((prev) => [...prev, { ...widget, favourite: false }]);
};

export const removeWidget = (index: number | undefined) => {
    if (index === undefined) return;
    widgetStore.set((prev) => prev.filter((_, i) => i !== index));
};

export const toggleFavourite = (index: number | undefined) => {
    if (index === undefined) return;
    widgetStore.set((prev) =>
        prev.map((w, i) =>
            i === index ? { ...w, favourite: !w.favourite } : w
        )
    );
};

export const updateWidget = (updated: WidgetEntity) => {
    widgetStore.set((prev) =>
        prev.map((w) =>
            w.currentWeather.id === updated.currentWeather.id ? updated : w
        )
    );
};

export const hasDuplicates = (cityName: string): boolean => {
    return widgetStore.get().some(
        (w) => w.currentWeather.name === cityName
    );
};
