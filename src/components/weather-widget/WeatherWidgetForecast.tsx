import {Box} from "@mui/material";
import {ForecastEntity} from "../../entities";
import WeatherWidgetBasic from "./WeatherWidgetBasic.tsx";

interface WeatherWidgetForecastProps {
    forecast: ForecastEntity
}

const WeatherWidgetForecast = ({ forecast }: WeatherWidgetForecastProps) => {
    const forecastList = forecast?.list.map(item => <WeatherWidgetBasic currentWeather={item} key={item.dt}></WeatherWidgetBasic>);
    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem'
        }}>
            {forecastList}
        </Box>
    );
}

export default WeatherWidgetForecast;