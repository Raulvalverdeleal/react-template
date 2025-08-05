import { TimeoutsHandler, IntervalsHandler, Enviroments, CacheManager } from '@utils';

export const Enviroment = (import.meta.env.VITE_APP_ENV as Enviroments) || Enviroments.LOCAL;

export const intervals = new IntervalsHandler();
export const timeouts = new TimeoutsHandler();
export const cache = new CacheManager([]);

export const securedPages: string[] = [];
