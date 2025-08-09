import { TimeoutsHandler, IntervalsHandler, Enviroments, CacheManager } from '@utils';

export const apiRoot = import.meta.env.VITE_API_ROOT;
export const enviroment = import.meta.env.VITE_APP_ENV as Enviroments;
export const domain = 'example.com';

export const intervals = new IntervalsHandler();
export const timeouts = new TimeoutsHandler();
export const cache = new CacheManager([]);

export const securedPages: string[] = [];
