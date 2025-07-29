import { translations } from '@assets';

export type IconName =
	| 0
	| 'arrow-back'
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
	| 'error';

export type DateFormats =
	| 'YYYY-MM'
	| 'hh:mm A'
	| 'hh:mm'
	| 'DDD, DD MMM'
	| 'DDD, DD MMM / hh:mm h'
	| 'MMMM YYYY'
	| 'MMM YY'
	| 'DDD'
	| "D MMM'YY";

export type NumFormats = 'X€' | '0X';

export type TranslationKey = keyof typeof translations | (string & {});

export type DateConstructor = string | number | Date;

export type SuperFetchOptions = {
	token?: string | null;
	logRequests?: boolean;
	timeout?: number;
	retries?: number;
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
	product: {
		productId: number;
	};
};

export type DialogView = keyof DialogDataMap;

export type BaseDialogData<K extends DialogView> = {
	view: K;
	className?: string;
} & DialogDataMap[K];

export type DialogData = {
	[K in DialogView]: BaseDialogData<K>;
}[DialogView];
