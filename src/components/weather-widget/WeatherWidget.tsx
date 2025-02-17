import {Button, Card, CardActions, CardContent, CardHeader, Divider, IconButton} from "@mui/material";
import Favorite from "@mui/icons-material/Favorite";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";

import {WidgetEntity} from "../../entities";

import WeatherWidgetBasic from "./WeatherWidgetBasic.tsx";
import WeatherWidgetForecast from "./WeatherWidgetForecast.tsx";
import useWidgetService from "../../services/useWidgetService.ts";

interface WeatherWidgetProps {
    widget: WidgetEntity;
}

const WeatherWidget = ({widget}: WeatherWidgetProps) => {
    const { removeWidget, toggleFavourite, widgets } = useWidgetService();
    const index = widgets.findIndex(sourceWidget => sourceWidget.currentWeather.id === widget.currentWeather.id);

    const handleRemoveWidget = (): void => {
        if (index !== -1) removeWidget(index);
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