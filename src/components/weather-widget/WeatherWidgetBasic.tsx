import {CurrentWeatherEntity} from "../../entities";

interface WeatherWidgetBasicProps {
    currentWeather: CurrentWeatherEntity
}

const WeatherWidgetBasic = ({ currentWeather }: WeatherWidgetBasicProps) => {
    const tempMin = currentWeather?.main?.temp_min?.toFixed(0);
    const tempMax = currentWeather?.main?.temp_max?.toFixed(0);
    const weatherList = currentWeather?.weather.map((cond, index) => {
        return <div key={index}><span>{cond.main}</span>: <span>{cond.description}</span></div>
    })
    return (
        <div className="basic">
            <div>{currentWeather?.dt_txt}</div>
            <div>
                Temp: {currentWeather?.main?.temp?.toFixed(0)}&deg; {tempMin !== tempMax && `(${tempMin} - ${tempMax})`}
            </div>
            <div>Humidity: {currentWeather?.main?.humidity}%</div>
            {weatherList}
        </div>
    );
}

export default WeatherWidgetBasic