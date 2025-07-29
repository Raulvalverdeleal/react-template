import { TimeoutsHandler, IntervalsHandler, Enviroments } from '@utils';

export const Enviroment = import.meta.env.VITE_APP_ENV || Enviroments.PRO;

export const intervals = new IntervalsHandler();
export const timeouts = new TimeoutsHandler();

export const securedPages: string[] = [];
