import axios from 'axios';
import environmentJson from '../configs/environment.json';

const api = axios.create({
    baseURL: environmentJson.weatherAPI,
});

export const setupApiIdInterceptor = ({ weatherAPIKey }: typeof environmentJson) => {
    api.interceptors.request.use(
        (config) => {
            config.params = config.params || {};
            config.params.APPID = weatherAPIKey;
            return config;
        },
        (error) => Promise.reject(error)
    );
};

export default api;
