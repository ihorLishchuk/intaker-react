import { api } from "../api";

import { appConfig } from "../configs";
import { DEFAULT_FORECAST } from "../consts";
import { CityEntity, CurrentWeatherEntity, ForecastEntity } from "../entities";

export const weatherService = {
    async getCurrentWeatherByCity(cityName: string): Promise<CurrentWeatherEntity> {
        const { weatherAPI, units } = appConfig;
        const response = await api.get<CurrentWeatherEntity>(
            `${weatherAPI}weather?q=${cityName}&units=${units}`
        );
        return response.data;
    },

    async getNDaysForecast({ name, cnt = DEFAULT_FORECAST }: Partial<CityEntity> & { cnt?: number }): Promise<ForecastEntity> {
        const { weatherAPI, units } = appConfig;
        const response = await api.get<ForecastEntity>(
            `${weatherAPI}forecast?q=${name}&cnt=${cnt}&units=${units}`
        );
        return response.data;
    },
};
