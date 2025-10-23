import WeatherWidget from "./WeatherWidget.tsx";

import { favoriteStore, widgetStore } from "../../stores";

const WeatherWidgetList = () => {
    const widgets = widgetStore.useStore();
    const showFavorites = favoriteStore.useStore();

    const filtered = showFavorites
        ? widgets.filter((w) => w.favourite)
        : widgets;

    return (
        <>
            {filtered.map((widget) => (
                <WeatherWidget
                    widget={widget}
                    key={widget.currentWeather?.id}
                />
            ))}
        </>
    );
};

export default WeatherWidgetList;
