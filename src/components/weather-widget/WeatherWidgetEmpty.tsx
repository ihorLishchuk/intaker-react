import {useCallback, useState} from "react";
import {Card, CardActionArea, CardContent} from "@mui/material";
import {Add} from "@mui/icons-material";

import DialogSelectCity from "../dialogs/DialogSelectCity.tsx";
import useWeatherService from "../../services/weather.service.ts";
import useWidgetService from "../../services/useWidgetService.ts";
import {WidgetEntity} from "../../entities";

const WeatherWidgetEmpty = () => {
    const [openDialog, setOpenDialog] = useState(false);
    const { addNewWidget, hasDuplicates } = useWidgetService();
    const { getCurrentWeatherByCity, getNDaysForecast } = useWeatherService();

    useCallback((cityName: string) => {
        if (hasDuplicates(cityName)) {
            // enqueueSnackbar(`You already have a widget with the city: ${cityName}`, { variant: "warning" });
        }
    }, [hasDuplicates, /*enqueueSnackbar*/]);

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleClose = async (city: string | null) => {
        setOpenDialog(false);
        if (!city || hasDuplicates(city)) return;

        try {
            const [currentWeather, forecast] = await Promise.all([
                getCurrentWeatherByCity(city),
                getNDaysForecast({ name: city }),
            ]);

            const newWidget: WidgetEntity = {
                currentWeather,
                forecast,
                favourite: false,
            };

            addNewWidget(newWidget);
            // enqueueSnackbar(`Widget added for ${city}`, { variant: "success" });
        } catch (error) {
            // enqueueSnackbar("Failed to fetch weather data", { variant: "error" });
        }
    };

    return (
        <Card sx={{ flex: '1 1 49%' }}>
            <CardActionArea
                onClick={handleOpenDialog}
                sx={{
                    height: '100%',
                    '&:hover': {
                        backgroundColor: 'action.selectedHover',
                    },
                }}
            >
                <CardContent sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Add />
                </CardContent>
            </CardActionArea>
            <DialogSelectCity
                open={openDialog}
                onClose={handleClose}
            />
        </Card>
    );
}

export default WeatherWidgetEmpty;