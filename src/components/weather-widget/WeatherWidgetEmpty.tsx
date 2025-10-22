import {useState} from "react";
import {Card, CardActionArea, CardContent} from "@mui/material";
import {Add} from "@mui/icons-material";

import DialogSelectCity from "../select-city/DialogSelectCity.tsx";

import useWeatherService from "../../hooks/useWeatherService.ts";
import useWidgetService from "../../hooks/useWidgetService.ts";
import useSnackbar from "../../hooks/useSnackbar.ts";

import {WidgetEntity} from "../../entities";

const WeatherWidgetEmpty = () => {
    const [openDialog, setOpenDialog] = useState(false);
    const { addNewWidget, hasDuplicates } = useWidgetService();
    const { getCurrentWeatherByCity, getNDaysForecast } = useWeatherService();
    const { showSnackbar } = useSnackbar();

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleClose = async (city: string | null) => {
        setOpenDialog(false);
        if (!city) return;
        if (hasDuplicates(city)) {
            return showSnackbar(`You already have a widget with the city: ${city}`, 'warning');
        }

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
            showSnackbar(`Widget added for ${city}`, 'success');
        } catch {
            showSnackbar('Failed to fetch weather data', 'error');
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
