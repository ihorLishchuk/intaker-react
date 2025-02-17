import { useMemo } from 'react';
import environmentJson from '../configs/environment.json';

const useAppConfig = () => {
    return useMemo(() => environmentJson, []);
};

export default useAppConfig;
