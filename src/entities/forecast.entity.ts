import {CurrentWeatherEntity} from './current-weather.entity';

// TODO: Split the entity to smaller parts.
export interface ForecastEntity {
  "cod": string,
  "message": number,
  "cnt": number,
  "list": CurrentWeatherEntity[],
  "city": {
    "id": number,
    "name": string,
    "coord": {
      "lat": number,
      "lon": number
      },
    "country": string,
    "population": number,
    "timezone": number,
    "sunrise": number,
    "sunset": number
  }
}

