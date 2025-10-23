import { api } from "../api";
import environmentJson from '../configs/environment.json';

export const apiIdInterceptor = ({ weatherAPIKey }: typeof environmentJson) => {
    api.interceptors.request.use(
        (config) => {
            config.params = config.params || {};
            config.params.APPID = weatherAPIKey;
            return config;
        },
        (error) => Promise.reject(error)
    );
};
