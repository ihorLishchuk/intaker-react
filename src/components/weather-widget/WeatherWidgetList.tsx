import { useEffect, useState } from "react";

import WeatherWidget from "./WeatherWidget.tsx";
import useWidgetService from "../../hooks/useWidgetService.ts";
import favoriteService from "../../services/FavoriteService.ts";

import { WidgetEntity } from "../../entities";

const WeatherWidgetList = () => {
    const widgetService = useWidgetService();
    const [widgets, setWidgets] = useState<WidgetEntity[]>(widgetService.widgets);

    const updateWidgets = () => {
        const showFavorites = favoriteService.value;
        setWidgets(
            widgetService.widgets.filter(({ favourite }) =>
                showFavorites ? favourite : true
            )
        );
    };

    useEffect(() => {
        updateWidgets();

        widgetService.subscribe(updateWidgets);
        favoriteService.subscribe(updateWidgets);

        return () => {
            widgetService.unsubscribe(updateWidgets);
            favoriteService.unsubscribe(updateWidgets);
        };
    }, []);

    return (
        <>
            {widgets.map((widget) => (
                <WeatherWidget
                    widget={widget}
                    key={widget.currentWeather?.id}
                />
            ))}
        </>
    );
};

export default WeatherWidgetList;
