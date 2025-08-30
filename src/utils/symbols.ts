import { mocks } from '@/assets/index.ts';
import { Booking } from '@/core/booking.ts';
import { User } from '@/core/user.ts';
import { Api } from '@/services/api.ts';
import { TimeoutsHandler, IntervalsHandler, Enviroments, CacheManager, getLocalStorageItem, StorageKeys } from '@utils';

export const config = Object.freeze({
	apiRoot: import.meta.env.VITE_API_ROOT,
	enviroment: import.meta.env.VITE_APP_ENV as Enviroments,
	defaultLang: 'en',
	supportedLanguages: ['en', 'es', 'fr', 'it'],
	contact: {
		phone: '+34612345678',
		email: 'test@test.test',
	},
	social: {
		instagram: 'https://www.instagram.com/',
		linkedin: 'https://www.linkedin.com/',
		github: 'https://github.com/',
	},
});

export const intervals = new IntervalsHandler();
export const timeouts = new TimeoutsHandler();
export const cache = new CacheManager([]);
export const booking = new Booking(mocks.default.booking);
export const user = new User(getLocalStorageItem(StorageKeys.USER, mocks.default.user), {
	localStorageKey: StorageKeys.USER,
});
export const api = new Api({
	logRequests: config.enviroment !== Enviroments.PRO,
	root: `${config.apiRoot}/my-app-router`,
});
