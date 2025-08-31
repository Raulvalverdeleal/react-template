import { translationsTemplate } from '@assets';
import { CSSProperties } from 'react';

export type IconName =
	| 0
	| 'arrow-back'
	| 'feather'
	| 'chevron'
	| 'scure-payment'
	| 'mastercard'
	| 'visa'
	| 'not-found'
	| 'whatsapp'
	| 'call'
	| 'mail'
	| 'location'
	| 'card'
	| 'error'
	| 'wrong-location'
	| 'refresh'
	| 'motion-arrow'
	| 'menu'
	| 'summary'
	| 'settings'
	| 'log-out'
	| 'undo'
	| 'guidelines'
	| 'phone'
	| 'apple'
	| 'google'
	| 'meta'
	| 'linkedin'
	| 'instagram'
	| 'github'
	| 'add'
	| 'copy'
	| 'check-circle'
	| 'success'
	| 'remove'
	| 'ticket'
	| 'contact'
	| 'calendar'
	| 'clock'
	| 'error';

export type DateFormats =
	| 'YYYY-MM-DD'
	| 'YYYY-MM'
	| 'hh:mm A'
	| 'hh:mm'
	| 'DDD, DD MMM'
	| "D MMM'YY · hh:mm"
	| 'DDD, DD MMM / hh:mm h'
	| 'MMMM YYYY'
	| 'MMM YY'
	| 'DDD'
	| 'DDDD DD MMMM'
	| "D MMM'YY";

export type NumFormats = 'X€' | '0X';

export type TranslationKey = keyof typeof translationsTemplate | (string & {});

export type DateConstructor = string | number | Date;

export type SuperFetchOptions = {
	token?: string | null;
	logRequests?: boolean;
	timeout?: number;
	retries?: number;
};

export type ServiceOptions = SuperFetchOptions & {
	root: string;
};

export interface CustomCSSProperties extends CSSProperties {
	[key: `--${string}`]: number | string;
}

export type StateOptions = {
	sessionStorageKey?: string;
	localStorageKey?: string;
};

export type PageOpacityMotion = {
	opacity: number;
	x?: number;
	y?: number;
};

export type PageMotion = {
	initial?: PageOpacityMotion;
	animate?: PageOpacityMotion;
	exit?: PageOpacityMotion;
	transition?: { duration: number };
};

type DialogDataMap = {
	error: {
		title: string;
		message: string;
	};
};

export type DialogView = keyof DialogDataMap;

export type BaseDialogData<K extends DialogView> = {
	view: K;
	className?: string;
	showCloseButton?: boolean;
} & DialogDataMap[K];

export type DialogData = {
	[K in DialogView]: BaseDialogData<K>;
}[DialogView];

export type CacheItem<T> = {
	value: T;
	expiresAt?: number;
};

export type TableSchema = {
	[tableName: string]: unknown;
};

export type TranslationsMap = Map<string, string> | Map<string, Record<string, string | null>>;
export type TranslationsRecord = Record<string, string | Record<string, string | null>>;

export type TranslatorConstructor = {
	lang: string;
	fallbackLang: string;
	translations: TranslationsRecord;
};

declare global {
	interface Window {
		translationsTemplate: TranslationsRecord;
	}
}

export type RouteMeta = {
	header?: boolean;
	footer?: boolean;
	secured?: boolean;
	redirectTo?: string;
};
