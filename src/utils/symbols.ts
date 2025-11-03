import config from '@/config/index.json' with { type: 'json' };
import { createTranslator } from './classes/translator.ts';
import translationsTemplate from '@/assets/translations.json' with { type: 'json' };
import { createCache } from './classes/cache-manager.ts';
import { createApi } from '@/services/api.ts';

// <--- enums --->
export enum Enviroments {
	LOCAL = 'local',
	PRE = 'pre',
	PRO = 'pro',
}

export enum StorageKeys {
	USER = 'user',
	PREFERENCES = 'preferences',
}

// <--- enviroment --->
export const enviroment = (import.meta.env.VITE_APP_ENV as `${Enviroments}`) ?? Enviroments.LOCAL;
console.log({ enviroment, apiRoot: config[enviroment].apiRoot });

// <--- api --->
export const api = createApi({
	log: enviroment === Enviroments.LOCAL,
	root: config[enviroment].apiRoot,
});

// <--- cache --->
export const cache = createCache();

// <--- translator --->
export const translator = createTranslator({
	lang: navigator.language,
	fallbackLang: config.translations.baseLanguage,
	translations: translationsTemplate,
});
