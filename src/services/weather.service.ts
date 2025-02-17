import api from "../interceptors/setupApiIdInterceptor.ts";

import { DEFAULT_FORECAST } from "../consts";
import { CityEntity, CurrentWeatherEntity, ForecastEntity } from "../entities";
import useAppConfig from "../hooks/useAppConfg.ts";

interface WeatherService {
    getCurrentWeatherByCity: (cityName: string) => Promise<CurrentWeatherEntity>;
    getNDaysForecast: (city: Partial<CityEntity> & { cnt?: number }) => Promise<ForecastEntity>;
}

const useWeatherService = (): WeatherService => {
    const { weatherAPI, units } = useAppConfig();

    const getCurrentWeatherByCity = async (cityName: string): Promise<CurrentWeatherEntity> => {
        const response = await api.get<CurrentWeatherEntity>(
            `${weatherAPI}weather?q=${cityName}&units=${units}`
        );
        return response.data;
    }

    const getNDaysForecast = async ({ name, cnt = DEFAULT_FORECAST }: Partial<CityEntity> & { cnt?: number }): Promise<ForecastEntity> => {
        const response = await api.get<ForecastEntity>(
            `${weatherAPI}forecast?q=${name}&cnt=${cnt}&units=${units}`
        );
        return response.data;
    }
    
    return {
        getCurrentWeatherByCity, 
        getNDaysForecast
    }
};

export default useWeatherService;