import {CurrentWeatherEntity} from './current-weather.entity';
import {ForecastEntity} from './forecast.entity';

export interface WidgetEntity {
  currentWeather: CurrentWeatherEntity,
  forecast: ForecastEntity,
  favourite: boolean,
}
