import { Typography } from "@mui/material";
import { CurrentWeatherEntity, dateFormatOptions } from "../../entities";

interface WeatherWidgetBasicProps {
    currentWeather: CurrentWeatherEntity
}

const WeatherWidgetBasic = ({ currentWeather }: WeatherWidgetBasicProps) => {
    const tempMin = currentWeather?.main?.temp_min?.toFixed(0);
    const tempMax = currentWeather?.main?.temp_max?.toFixed(0);
    const weatherList = currentWeather?.weather.map((cond, index) => {
        return <Typography key={index}><span>{cond.main}</span>: <span>{cond.description}</span></Typography>
    })
    const formatDate = (date: string, formatOptions = dateFormatOptions) => {
        if (!date) return;
        return new Intl.DateTimeFormat('en-US', formatOptions as Intl.DateTimeFormatOptions).format(new Date(date));
    };
    return (
        <div className="basic">
            <Typography>{formatDate(currentWeather?.dt_txt)}</Typography>
            <Typography>
                Temp: {currentWeather?.main?.temp?.toFixed(0)}&deg; {tempMin !== tempMax && `(${tempMin} - ${tempMax})`}
            </Typography>
            <Typography>Humidity: {currentWeather?.main?.humidity}%</Typography>
            {weatherList}
        </div>
    );
}

export default WeatherWidgetBasic
