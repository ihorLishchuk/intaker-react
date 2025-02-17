import WeatherWidget from "./WeatherWidget.tsx";
import {useEffect, useState} from "react";
import useWidgetService from "../../services/useWidgetService.ts";
import {WidgetEntity} from "../../entities";

const WeatherWidgetList = ({ showFavorites }: { showFavorites: boolean }) => {
    const widgetService = useWidgetService();
    const [widgets, setWidgets] = useState<WidgetEntity[]>(widgetService.widgets);
    const updateWidgets = () => {
        setWidgets(widgetService.widgets.filter(({ favourite }) => showFavorites ? favourite : true))
    };

    useEffect(() => {
        updateWidgets();

        widgetService.subscribe(updateWidgets);
        return () => {
            widgetService.unsubscribe(updateWidgets);
        };
    }, [showFavorites]);

    return (
        <>
            {widgets.map((widget) => (
                <WeatherWidget widget={widget} key={widget.currentWeather?.id} />
            ))}
        </>
    );
}
export default WeatherWidgetList;