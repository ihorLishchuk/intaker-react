import axios from 'axios';

import environmentJson from '../configs/environment.json';

export const api = axios.create({
    baseURL: environmentJson.weatherAPI,
});
