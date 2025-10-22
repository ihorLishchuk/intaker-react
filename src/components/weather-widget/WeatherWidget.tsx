import {useEffect} from "react";
import {Button, Card, CardActions, CardContent, CardHeader, Divider, IconButton} from "@mui/material";
import Favorite from "@mui/icons-material/Favorite";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";

import {WidgetEntity} from "../../entities";
import {DEFAULT_WEATHER_UPDATE_SEQUENCE} from "../../consts";

import WeatherWidgetBasic from "./WeatherWidgetBasic.tsx";
import WeatherWidgetForecast from "./WeatherWidgetForecast.tsx";

import useWidgetService from "../../hooks/useWidgetService.ts";
import useSnackbar from "../../hooks/useSnackbar.ts";
import useWeatherService from "../../hooks/useWeatherService.ts";

interface WeatherWidgetProps {
    widget: WidgetEntity;
}

const WeatherWidget = ({widget}: WeatherWidgetProps) => {
    const { removeWidget, toggleFavourite, widgets, updateWidget } = useWidgetService();
    const { getCurrentWeatherByCity, getNDaysForecast } = useWeatherService();
    const { showSnackbar } = useSnackbar();
    const index = widgets.findIndex(sourceWidget => sourceWidget.currentWeather.id === widget.currentWeather.id);

    useEffect(() => {
        const interval = setInterval(async () => {
            const name = widget.currentWeather.name;
            const [currentWeather, forecast] = await Promise.all([
                getCurrentWeatherByCity(name),
                getNDaysForecast({ name }),
            ]);

            const updatedWidget: WidgetEntity = {
                currentWeather,
                forecast,
                favourite: widget.favourite,
            };

            updateWidget(updatedWidget);
        }, DEFAULT_WEATHER_UPDATE_SEQUENCE);
        return () => clearInterval(interval);
    }, [])

    const handleRemoveWidget = (): void => {
        if (index !== -1) {
            removeWidget(index);
            showSnackbar('The widget was removed successfully', 'success');
        }
    }

    const handleToggleFavourite = (): void => {
        if (index !== -1) toggleFavourite(index);
    }

    return (
        <Card sx={{ flex: '1 1 49%' }}>
            <CardHeader
                title={widget?.currentWeather?.name}
                action={<IconButton onClick={handleToggleFavourite}>{widget?.favourite ? <Favorite /> : <FavoriteBorder />}</IconButton>}
            ></CardHeader>
            <CardContent>
                <WeatherWidgetBasic currentWeather={widget?.currentWeather}></WeatherWidgetBasic>
                <Divider sx={{ margin: '1rem 0' }}></Divider>
                <WeatherWidgetForecast forecast={widget?.forecast}></WeatherWidgetForecast>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={handleRemoveWidget}>Remove</Button>
            </CardActions>
        </Card>
    );
}

export default WeatherWidget;
